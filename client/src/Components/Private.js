import React, { useContext } from 'react';
import ContactList from './ContactList';
import AddPost from './AddPost';
import PostList from './PostList';

function Private() {
    
    return (
        <div>
            <ContactList />
            <AddPost />
            <PostList />
        </div>
    )
}

export default Private;