import React, { useEffect, useContext } from 'react';
import ContactList from './ContactList';
import AddPost from './AddPost';
import PostList from './PostList';
import { HomeContext } from '../context/HomeContext'

function Private() {
    const homeContext = useContext(HomeContext)

    useEffect(() => {
      homeContext.setAwayHome();
    }, []);

    return (
        <div>
            <ContactList />
            <AddPost />
            <PostList />
        </div>
    )
}

export default Private;