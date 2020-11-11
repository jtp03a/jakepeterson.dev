import React from 'react';
import axiosContext from '../context/AxiosContext'
import ContactList from './ContactList';

function Private() {
    return (
        <div>
            <ContactList />
        </div>
    )
}

export default Private;