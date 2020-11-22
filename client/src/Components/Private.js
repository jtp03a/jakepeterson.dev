import React, { useContext } from 'react';
import ContactList from './ContactList';
import AddPost from './AddPost';
import PostEditor from './PostEditor';

function Private() {
    
    return (
        <div>
            <ContactList />
            <AddPost />
        </div>
    )
}

export default Private;