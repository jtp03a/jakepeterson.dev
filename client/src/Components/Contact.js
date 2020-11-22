import React, { useState } from "react";
import { Form, Formik, Field } from 'formik';
import * as Yup from 'yup';
import { publicService } from './../util/public.service';

const contactSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required')
})

function Contact(props) {

    const [submitSuccess, setSubmitSuccess] = useState();

    const submitContactInfo = async contactInfo => {
        try {
            const { data } = await publicService.post(`contacts`, contactInfo);
            console.log(data);
            setSubmitSuccess(data.message);
        } catch (error) {
            const { data } = error.response;
        }
    };

    return (
        <div className="section section-light">
            <div className="section-content" id={props.id}>
                <div className='card'>
                    <div id="cardHeader" className='card-header'>
                        <h1>{props.title}</h1>
                    </div>
                    <div className='card-body'>
                        <Formik
                            initialValues={{ firstname: '', lastname: '', email: '', message: '' }}
                            onSubmit={values => submitContactInfo(values)}
                            validationSchema={contactSchema} >
                            <Form>
                                <div className="row">
                                    <div className="col">
                                        <label id="cardLabel">First Name:</label>
                                        <Field className="form-control" id="firstname" name="firstname" placeholder="First Name" />
                                    </div>
                                    <div className="col">
                                        <label id="cardLabel">Last Name</label>
                                        <Field className="form-control mb-1" id="lastname" name="lastname" placeholder="Last Name" />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label id="cardLabel">Email address</label>
                                    <Field type="email" className="form-control" id="email" name="email" placeholder="Email Address" />
                                </div>
                                <div class="form-group">
                                    <label id="cardLabel">Message</label>
                                    <Field as="textarea" className="form-control" id="message" name="message" rows="4" placeholder="Type your message" />
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary mt-2">
                                        Submit
                                    </button>

                                </div>
                            </Form>
                        </Formik>
                        <div className="d-flex justify-content-center mt-2">
                            <p>{submitSuccess}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;