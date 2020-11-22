import React, { useContext, useState } from 'react';
import { AxiosContext } from '../context/AxiosContext';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { raw } from 'body-parser';

function AddPost() {
    const initialPost = {
        postTitle: '',
        postImage: '',
        post: {},
        tags: [{ tagName: 'test 1' }, { tagName: 'test 2' }]
    }

    const axiosContext = useContext(AxiosContext);
    const [post, setPost] = useState(initialPost);
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )
    const [rawPost, setRawPost] = useState()

    const convertJSON = () => {
        setPost(prevState => {
            const newPost = { ...prevState, post: JSON.stringify(convertToRaw(editorState.getCurrentContent())) }
            return newPost
        })
    }

    const submitPost = async (newPost) => {
        try {
            const { data } = await axiosContext.authAxios.post('./private/posts', post);
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
                        <label htmlFor="postTitle">Post Title</label>
                        <input className="form-control" id="postTitle" name="postTitle" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="postImage">Post Image</label>
                        <input className="form-control" id="postImage" name="postImage" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">Post Tags</label>
                        <input className="form-control" id="tags" name="tags" onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="post">Post</label>
                        <Editor
                            editorState={editorState}
                            wrapperClassName="rich-editor demo-wrapper"
                            editorClassName="demo-editor"
                            onEditorStateChange={setEditorState}
                            onBlur={convertJSON}
                            placeholder="Type your post here" />
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mt-2" onClick={submitPost}>
                            Submit
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPost;