import React, { useContext, useState } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

function AddPost() {
    const initialPost = {
        postTitle: '',
        postImage: '',
        post: {},
        tags: [{ tagName: 'Tag 1' }, { tagName: 'Tag 2' }]
    }

    const axiosContext = useContext(AxiosContext);
    const [post, setPost] = useState(initialPost);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )
    const [message, setMessage] = useState()

    const convertJSON = () => {
        setPost(prevState => {
            const newPost = { ...prevState, post: JSON.stringify(convertToRaw(editorState.getCurrentContent())) }
            return newPost
        })
    }

    const submitPost = async () => {
        try {
            const { data } = await axiosContext.authAxios.post('./private/posts', post);
            setMessage(data.message)
            setPost(initialPost)
            setEditorState(() => EditorState.createEmpty())
        } catch (err) {
            console.log(err);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPost({ ...post, [name]: value });
    };

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header" id="cardHeader">
                    <h3>Add Post</h3>
                </div>
                <div className="card-body">
                    <div className="form-group">
                        <label htmlFor="postTitle"><strong>Post Title:</strong></label>
                        <input className="form-control" id="postTitle" name="postTitle" value={post.postTitle} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postImage"><strong>Post Image: (Use the ID of an image from pexels.com)</strong></label>
                        <input className="form-control" id="postImage" name="postImage" value={post.postImage} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="post"><strong>Post:</strong></label>
                        <Editor
                            editorState={editorState}
                            wrapperClassName="rich-editor"
                            editorClassName="rich-editor"
                            onEditorStateChange={setEditorState}
                            onBlur={convertJSON}
                            placeholder="Type your post here" 
                             />
                    </div>
                    <div className="d-flex justify-content-center form-group">
                        <button type="submit" className="btn btn-primary mt-2" onClick={submitPost}>
                            Submit
                        </button>
                    </div>
                    <div className="d-flex justify-content-center form-group"> 
                        <h4 className="mt-2">{message}</h4>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost;