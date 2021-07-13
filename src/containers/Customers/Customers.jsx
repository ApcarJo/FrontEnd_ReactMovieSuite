

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { UPDATE_USER, LOGIN } from '../../redux/types';

const Customer = (props) => {

    let history = useHistory();

    // HOOKS
    const [userData, setUserData] = useState({})
    const [userDataId, setUserDataId] = useState({})

    const [view, setView] = useState({
        modifyView: 'modifyCard',
        modifyViewP: 'vistaCustomers'
    })

    // HANDLERS
    const updateUserData = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value })
    }

    // STATES
    useEffect(() => {
        viewAllProfiles();
    }, []);

    useEffect(() => {
    });

    const viewAllProfiles = async () => {
        try {
            let token = props.credentials?.token;

            let res = await axios.get(`http://localhost:3006/customer`, { headers: { 'authorization': 'Bearer ' + token } });
            setUserData(res?.data);

        } catch (error) {
            console.log(error);
        }
    }

    const viewProfile = async () => {
        try {
            let token = props.credentials?.token;

            let body = {
                customerId: userData.id,
            }

            let res = await axios.post(`https://localhost:3006/customer/id`, body, { headers: { 'authorization': 'Bearer ' + token } });
            setUserDataId(res?.data);

        } catch (error) {
            console.log(error);
        }
    }

    const modifyProfile = async () => {
        try {
            let token = props.credentials?.token;

            let body = {
                customerId: userData.id,
                name: userData.name,
                surname1: userData.surname1,
                surname2: userData.surname2,
                birthdate: userData.birthdate,
                phone: userData.phone,
                address: userData.address,
                city: userData.city,
                postalcode: userData.postalcode,
                password: userData.password
            }

            let res = await axios.put(`https://localhost:3006/`, body, { headers: { 'authorization': 'Bearer ' + token } });

            sendModify();

        } catch (error) {
            console.log(error);
        }
    }

    const sendModify = () => {
        // Switch view implemented
        (view.modifyView == 'profileCard') ? view.modifyView = 'modifyCard' : view.modifyView = 'profileCard';
        (view.modifyViewP == 'vistaCustomers') ? view.modifyViewP = 'hideCard' : view.modifyViewP = 'vistaCustomers';
        viewProfile();
    }

    if (userData[0]!=undefined){
    return (
        <div className="allCustomers">
            <div className="vistaCustomers">
                <div className={view.modifyViewP}>
                    <div className="row">
                        <div className="customerLabel">Name</div>
                        <div className="customerLabel">Surname1</div>
                        <div className="customerLabel">Surname2</div>
                        <div className="customerLabel">City</div>
                        <div className="customerLabel">P.C.</div>
                        <div className="customerLabel">Address</div>
                        <div className="customerLabel">Phone</div>
                        <div className="customerLabel">Email</div>
                    </div>

                    <div className="tableGrid">
                        <div className="column">
                            {userData.map((value, index) => (
                                <div className="row">
                                    <div className="customerData">{value.name}</div>
                                    <div className="customerData">{value.surname1}</div>
                                    <div className="customerData">{value.surname2}</div>
                                    <div className="customerData">{value.city}</div>
                                    <div className="customerData">{value.postalcode}</div>
                                    <div className="customerData">{value.address}</div>
                                    <div className="customerData">{value.phone}</div>
                                    <div className="customerData">{value.mail}</div>
                                    <br></br>
                                    <button className="sendButton" onClick={sendModify}>Modify</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className={view.modifyView}>

                    <div className="labelData">Name</div><input className="profileData" name="name" onChange={updateUserData} defaultValue={userDataId.name} />
                    <div className="labelData">Surname1</div><input className="profileData" name="surname1" onChange={updateUserData} defaultValue={userDataId.surname1} />
                    <div className="labelData">Surname2</div><input className="profileData" name="surname2" onChange={updateUserData} defaultValue={userDataId.surname2} />
                    <div className="row">
                        <div className="col">
                            <div className="labelData1">City</div><input className="profileData1" name="city" onChange={updateUserData} defaultValue={userDataId.city} />
                        </div>
                        <div className="col">
                            <div className="labelPc">P.C.</div><input className="profileDataPc" name="postalcode" onChange={updateUserData} defaultValue={userDataId.postalcode} />
                        </div>
                    </div>
                    <div className="labelData">Address</div>
                    <input className="profileData" name="address" onChange={updateUserData} defaultValue={userDataId.address} />
                    <div className="labelData">Phone</div>
                    <input className="profileData" name="phone" onChange={updateUserData} defaultValue={userDataId.phone} />
                    <br></br>
                    <div className="row">
                        <button className="sendButton" onClick={modifyProfile}>SAVE</button>
                        <button className="sendButton" onClick={sendModify}>BACK</button>
                    </div>
                </div>
            </div>
        </div>
    )
    } else {
        return (
            <div>LOADING</div>
        )
    }
                            
}

export default connect((state) => ({
    credentials: state.credentials
}))(Customer);