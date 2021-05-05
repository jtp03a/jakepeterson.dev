import React, { useState, useEffect }from "react";
import { publicService } from './../util/public.service';
import PostTile from './PostTile';
import { Link } from 'react-router-dom';

function Blog (props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const { data } = await publicService.get('/publicposts/');
            setPosts(data);
        } catch(err) {
            console.log(err)
        }
    } 

        return (
            <div className="section + section-light">
                <div className="section-content" id={props.id}>
                <div className='card'>
                    <div id="cardHeader" className='card-header'>
                        <h1>{props.title}</h1>
                    </div>
                    <div className='card-body' id="cardBody">
                    {posts && posts.map(post => (                        
                        <Link to={'/posts/' + post._id}>
                        <PostTile postTitle={post.postTitle} postImage={post.postImage} />
                        </Link>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        );
    
}

export default Blog;