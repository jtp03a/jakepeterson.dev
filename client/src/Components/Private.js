import React from 'react';
import ContactList from './ContactList';
import PrivateNavbar from './PrivateNavbar';

function Private() {
    return (
        <div>
            <PrivateNavbar />
            <ContactList />
        </div>
    )
}

export default Private;