import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosContext } from '../context/AxiosContext';
import { createClient } from 'pexels';
import draftToHtml from 'draftjs-to-html';

function Post(props) {
    const axiosContext = useContext(AxiosContext);
    const { postID } = useParams();
    const [post, setPost] = useState();
    const [image, setImage] = useState();

    const client = createClient('563492ad6f91700001000001b9a332f548444ba4b34f7a37e76b75ba');

    useEffect(() => {
        getPost();
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
            const data = await client.photos.show({ id: pexelID })
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
                </div>
                <div className="card-body" >

                    <div className="">
                    {image && <img src={image.src.large} className="d-block w-100" />}
                    {post && <div className="mt-2" dangerouslySetInnerHTML={{__html: draftToHtml(JSON.parse(post.post))}} />}
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
}

export default Post;