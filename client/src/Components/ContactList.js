import React, { useState, useEffect, useContext } from 'react';
import { AxiosContext } from '../context/AxiosContext';

function ContactList() {
    const axiosContext = useContext(AxiosContext);
    const [contacts, setContacts] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(-1)
    const [selectedContact, setSelectedContact] = useState();
    const [message, setMessage] = useState('');

    useEffect(() => {
        getContacts();
    }, []);

    const getContacts = async () => {
        try {
            const { data } = await axiosContext.authAxios.get('/private/contacts');
            setContacts(data);
        } catch (err) {
            console.log(err);
        }
    }

    const handleResponded = async (id) => {
        try {
            const { data } = await axiosContext.authAxios.patch('/private/contacts/responded/' + id);
            setMessage(data);
            getContacts();
        } catch (err) {
            console.log(err);
        }
    }

    const handleDelete = async (id) => {
        try {
            const { data } = await axiosContext.authAxios.delete('/private/contacts/delete/' + id);
            setMessage(data);
            setSelectedContact();
            getContacts();
        } catch (err) {
            console.log(err);
        }
    }

    const handleSelectedContact = (contact, index) => {
        setSelectedContact(contact);
        setCurrentIndex(index);
    };

    return (
        <>
            <div className="container mt-5">
                <div className="row">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header" id="cardHeader">
                            <h3>Contacts</h3>
                        </div>
                        <div className="card-body">
                            <ul className="list-group">
                                {contacts &&
                                    contacts.map((contact, index) => (
                                        <li
                                            className={
                                                "list-group-item " + (index === currentIndex ? "active" : "")
                                            }
                                            onClick={() => handleSelectedContact(contact, index)}
                                            key={index}
                                        >
                                            {contact.email}
                                        </li>
                                    ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    {selectedContact ? (
                        <div className="card">
                            <div className="card-body"> 
                            <div>
                                <label>
                                    <strong>Name:</strong>
                                </label>{" "}
                                {selectedContact.firstname + " " + selectedContact.lastname}
                            </div>
                            <div>
                                <label>
                                    <strong>Email:</strong>
                                </label>{" "}
                                {selectedContact.email}
                            </div>
                            <div>
                                <label>
                                    <strong>Message:</strong>
                                </label>{" "}
                                {selectedContact.message}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {selectedContact.responded ? (<p>Responded</p>) : (<p>Not Responded</p>) }
                            </div>
                            <div>
                                <button className="badge badge-warning mr-2" onClick={() => handleResponded(selectedContact._id)} >Responded</button>
                                <button className="badge badge-danger" onClick={() => handleDelete(selectedContact._id)}>Delete</button>
                            </div>
                            <div className="mt-1">
                                {message}
                            </div>
                            </div>
                        </div>
                    ) : (
                            <div>
                                <br />
                                <p>Click on a contact</p>
                            </div>
                        )}
                </div>
                </div>
            </div>
        </>
    );
}
export default ContactList;