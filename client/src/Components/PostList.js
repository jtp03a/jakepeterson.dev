import React, { useState, useEffect, useContext } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import { publicService } from './../util/public.service';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

function PostList() {
    const axiosContext = useContext(AxiosContext);
    const [posts, setPosts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [selectedPost, setSelectedPost] = useState();
    const [message, setMessage] = useState('');
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {
        try {
            const { data } = await axiosContext.authAxios.get('private/posts/all');
            setPosts(data);
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdate = async (id) => {
        try {
            const { data } = await axiosContext.authAxios.patch('/private/posts/update/' + id, selectedPost);
            setMessage(data.message);
            getPosts();
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosContext.authAxios.delete('/private/posts/delete/' + id);
            setMessage(data.message);
            setSelectedPost();
            getPosts();
        } catch (err) {
            console.log(err);
        }
    }

    const handleSelectedPost = (post, index) => {
        const raw = convertFromRaw(JSON.parse(post.post))
        setSelectedPost(post)
        setMessage('')
        setEditorState(() => EditorState.createWithContent(convertFromRaw(JSON.parse(post.post))))
        setCurrentIndex(index);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedPost({ ...selectedPost, [name]: value });
    };

    const convertJSON = () => {
        setSelectedPost(prevState => {
            const newPost = { ...prevState, post: JSON.stringify(convertToRaw(editorState.getCurrentContent())) }
            return newPost
        })
    }

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header" id="cardHeader">
                                <h3>Posts</h3>
                            </div>
                            <div className="card-body">
                                <ul className="list-group">
                                    {posts &&
                                        posts.map((post, index) => (
                                            <li
                                                className={
                                                    "list-group-item " + (index === currentIndex ? "active" : "")
                                                }
                                                onClick={() => handleSelectedPost(post, index)}
                                                key={index}
                                            >
                                                {post.postTitle}
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {selectedPost ? (
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        <label>
                                            <strong>Title:</strong>
                                        </label>{" "}
                                        <input size="50" id="postTitle" name="postTitle" value={selectedPost.postTitle} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label>
                                            <strong>Post Image:</strong>
                                        </label>{" "}
                                        <input size="10" id="postImage" name="postImage" value={selectedPost.postImage} onChange={handleInputChange} />
                                    </div>
                                    <div>
                                        <label>
                                            <strong>Post:</strong>
                                        </label>{" "}
                                        <Editor
                                            editorState={editorState}
                                            wrapperClassName="rich-editor"
                                            editorClassName="rich-editor"
                                            onEditorStateChange={setEditorState}
                                            onBlur={convertJSON}
                                            placeholder="Type your post here" />
                                    </div>
                                    <div>
                                        <button className="badge badge-warning mr-2" onClick={() => handleUpdate(selectedPost._id)} >Save</button>
                                        <button className="badge badge-danger" onClick={() => handleDelete(selectedPost._id)}>Delete</button>
                                    </div>
                                    <div className="mt-1">
                                        {message}
                                    </div>
                                </div>
                            </div>
                        ) : (
                                <div>
                                    <br />
                                    <p>Click on a post</p>
                                </div>
                            )}
                    </div>
                </div>
            </div>
        </>
    );
}
export default PostList;