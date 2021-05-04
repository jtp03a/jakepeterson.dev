import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosContext } from '../context/AxiosContext';
import draftToHtml from 'draftjs-to-html';
import DOMPurify from 'dompurify';
import { publicService } from './../util/public.service';
import { HomeContext } from '../context/HomeContext'
import { Link } from 'react-router-dom'

function Post(props) {
    const axiosContext = useContext(AxiosContext);
    const homeContext = useContext(HomeContext)
    const { postID } = useParams();
    const [post, setPost] = useState();
    const [image, setImage] = useState();

    useEffect(() => {
        getPost();
        homeContext.setAwayHome();
    }, []);

    const getPost = async () => {
        try {
            const { data } = await axiosContext.authAxios.get('/posts/' + postID);
            setPost(data);
            getImage(data.postImage)
        } catch (err) {
            console.log(err);
        }
    }

    const getImage = async (pexelID) => {
        try {
            const { data } = await publicService.post('/pexelimages/', {pexelID: pexelID});
            setImage(data)
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className="container d-flex justify-content-center">
            <div className="col-lg-10">
            <div className="card mt-5 ">
                <div className="card-header" id="cardHeader">
                    <h2>{post && post.postTitle}</h2>
                    <h5>{post && post.author.firstname + " " + post.author.lastname}</h5>
                    {post && post.date.slice(0, 10)}
                    <div><Link to={'/'} ><button className='btn btn-danger'>Back</button></Link></div>

                </div>
                <div className="card-body" >

                    <div className="">
                    {image && <img src={image.src.large} className="d-block w-100" />}
                    {post && <div className="mt-2" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(draftToHtml(JSON.parse(post.post)))}} />}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Post;