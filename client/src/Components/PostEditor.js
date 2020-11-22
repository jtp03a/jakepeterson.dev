import React, { useState } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

function PostEditor() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    )
    const [formatedMessage, setFormattedMessage] = useState()
    const [renderedMessage, setRenderedMessage] = useState()

    const convertoRaw = () => {
        setFormattedMessage(convertToRaw(editorState.getCurrentContent()))
    }

    const convertoHTML = () => {
        setRenderedMessage(draftToHtml(formatedMessage))
    }

    return (
        <div className="container">
            <Editor
                editorState={editorState}
                wrapperClassName="rich-editor demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={setEditorState}
                placeholder="The message goes here..." />
                <button onClick={convertoRaw} >Convert To Raw</button>
                <button onClick={convertoHTML} >Convert to HTML</button>
            <div>
                <div dangerouslySetInnerHTML={{__html: renderedMessage}} />
            </div>
        </div>
    )
}

export default PostEditor;