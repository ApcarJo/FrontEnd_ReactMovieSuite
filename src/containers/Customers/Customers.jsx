
            
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { UPDATE_USER, LOGIN } from '../../redux/types';

const Customer = (props) => {

    let history = useHistory();

    // HOOKS
    const [userData, setUserData] = useState({})

    const [view, setView] = useState({
        modifyView: 'modifyCard',
        modifyViewP: 'profileCard'
    })

    // HANDLERS
    const updateUserData = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    // STATES
    useEffect(()=>{
        viewProfile();
        viewAllProfiles();
    },[]);

    useEffect(()=>{

    });

    const viewProfile = async () => {
        try {
            let token = props.credentials?.token;

            // let res = await axios.post(`http://localhost:3006/customer/`, {headers:{'authorization':'Bearer ' + token}});
            // setUserData(res?.data);
            
            let body = {
                customerId: props.credentials.customer?.id, // CHANGE THIS VALUE FOR A HOOKS
            }

            let res = await axios.post(`https://localhost:3006/customer/id`, body, {headers:{'authorization':'Bearer ' + token}});
            setUserData(res?.data);

        } catch (error) {
            console.log(error);
        }
    }

    const viewAllProfiles = async () => {
        try {
            let token = props.credentials?.token;

            let res = await axios.get(`https://localhost:3006/`, {headers:{'authorization':'Bearer ' + token}});
            setUserData(res?.data);
            console.log(res.data)

        } catch (error) {
            console.log(error);
        }
    } 

    const modifyProfile = async () => {
        try {
            let token = props.credentials?.token;

            let body = {
                customerId: props.credentials.customer?.id,
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

            let res = await axios.put(`https://localhost:3006/`, body, {headers:{'authorization':'Bearer ' + token}});
            
            sendModify();

        } catch (error) {
            console.log(error);
        }
    }

    const sendModify = () => {

        // Switch view implemented

        (view.modifyView=='profileCard') ? view.modifyView='modifyCard' : view.modifyView='profileCard';

        (view.modifyViewP=='profileCard') ? view.modifyViewP='modifyCard' : view.modifyViewP='profileCard';
       
        //console.log(view.modifyView, view.modifyViewP);
        viewProfile();
    }

    return (
        <div className="allCustomers">        
            <div className="vistaProfile">
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
                {/* <div className={view.modifyViewP}> */}
                <div className="tableGrid">
                    {}
                    <div className="row">
                        <div className="customerData">{userData.name}</div>
                        <div className="customerData">{userData.surname1}</div>
                        <div className="customerData">{userData.surname2}</div>
                        <div className="customerData">{userData.city}</div>
                        <div className="customerData">{userData.postalcode}</div>
                        <div className="customerData">{userData.address}</div>
                        <div className="customerData">{userData.phone}</div>
                        <div className="customerData">{userData.mail}</div>
                        <br></br>
                        <button className="sendButton" onClick={sendModify}>Modify</button>
                    </div>   
                </div>


                <div className={view.modifyView}>
                    {/* <input className="modifyData" defaultValue={props.credentials.customer.name}> */}
                    <div className="labelData">Name</div><input className="profileData" name="name" onChange={updateUserData} defaultValue={userData.name}/>
                    <div className="labelData">Surname1</div><input className="profileData" name="surname1" onChange={updateUserData}defaultValue={userData.surname1}/>
                    <div className="labelData">Surname2</div><input className="profileData" name="surname2" onChange={updateUserData}defaultValue={userData.surname2}/>
                    <div className="row">
                        <div className="col">
                            <div className="labelData1">City</div><input className="profileData1" name="city" onChange={updateUserData} defaultValue={userData.city}/>
                        </div>
                        <div className="col">
                            <div className="labelPc">P.C.</div><input className="profileDataPc" name="postalcode" onChange={updateUserData} defaultValue={userData.postalcode}/>
                        </div>
                    </div>
                    <div className="labelData">Address</div><input className="profileData" name="address" onChange={updateUserData} defaultValue={userData.address}/>
                    <div className="labelData">Phone</div><input className="profileData" name="phone" onChange={updateUserData} defaultValue={userData.phone}/>
                    <br></br>
                    <div className="row">
                        <button className="sendButton" onClick={modifyProfile}>SAVE</button>
                        <button className="sendButton" onClick={sendModify}>BACK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect((state)=>({
    credentials: state.credentials
}))(Customer);