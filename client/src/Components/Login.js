import React, { useState, useContext, useEffect } from 'react';
import { publicService } from './../util/public.service';
import { AuthContext } from './../context/AuthContext';
import { Redirect } from 'react-router-dom';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { HomeContext } from '../context/HomeContext'

const LoginSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});

function Login() {

    const authContext = useContext(AuthContext);
    const [loginRedirect, setLoginRedirect] = useState(false);
    const [passwordChangeSuccess, setPasswordChangeSuccess] = useState()

    const homeContext = useContext(HomeContext)

    useEffect(() => {
      homeContext.setAwayHome();
    }, []);

    const submitCredentials = async credentials => {
        try {
            const { data } = await publicService.post(`auth/login`, credentials);
            authContext.setAuthState(data);
            setLoginRedirect(true);
        } catch (error) {
            const { data } = error.response;
            if (data.passwordstatus) {
                console.log('You need to change your password')
                const passwordprompt = prompt('Enter a new password')
                if (passwordprompt === null || passwordprompt === "") {
                    console.log('You didnt enter anything')
                } else {
                    credentials.newpass = passwordprompt
                    const { data } = await publicService.post(`auth/changepassword`, credentials);
                    setPasswordChangeSuccess(data.message)
                }
            }
        }
    };

    return (
        <div className="h-100 d-flex justify-content-center mt-5">
            {loginRedirect && <Redirect to='/private' />}
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={values => submitCredentials(values)}
                validationSchema={LoginSchema}
            >
                <Form className="h-100">
                    <div className="container h-100">
                        <div className="row h-100">
                            <div className="col-sm-12 my-auto">
                                <div className="card">
                                    <div className="card-header" id="cardHeader">
                                        <h3>Sign In</h3>
                                    </div>
                                    <div className="card-body">
                                        <div className="input group form-group">
                                            <label>Username: </label>
                                            <Field type="text" name="username" className="form-control" />
                                        </div>
                                        <div className="form-group">
                                            <label>Password: </label>
                                            <Field type="password" name="password" className="form-control" />
                                            <div className="d-flex justify-content-end">
                                                <button type="submit" className="btn btn-primary mt-2">
                                                    Submit
                                                </button>
                                            </div>
                                            <div>
                                                    {passwordChangeSuccess}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

export default Login;