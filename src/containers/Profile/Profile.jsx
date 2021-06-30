
import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { UPDATE_USER, LOGIN } from '../../redux/types';

const Profile = (props) => {

    let history = useHistory();

    // HOOKS
    const [userData, setUserData] = useState({})

    // HANDLERS
    const updateUserData = (e) => {
        setUserData({...userData, [e.target.name]: e.target.value})
    }

    // STATES
    useEffect(()=>{
        viewProfile();
    },[]);

    useEffect(()=>{

    });

    const viewProfile = async () => {
        try {
            let token = props.credentials?.token;

            let body = {
                customerId: props.credentials.customer?.id,
            }
            console.log(Array.from(props.credentials), "array from")


            let res = await axios.post(`http://localhost:3006/customer/id`, body, {headers:{'authorization':'Bearer ' + token}});
            setUserData(res?.data);

        }catch{
            console.log("cargando")
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

            let res = await axios.put(`http://localhost:3006/customer/`, body, {headers:{'authorization':'Bearer ' + token}});

        }catch{
            console.log("cargando")
        }
    }

    const sendModify = () => {
        
    }


    return (
        // <div className="vistaProfile" onChange={setUserData}>{userData.user.map((data, index)=>{
            <div className="vistaProfile">
                <div className="profileCard">
                    <p className="labelData">Name</p>
                    <div className="profileData" >{userData.name}</div>
                    <p className="labelData">Surname1</p>
                    <div className="profileData">{userData.surname1}</div>
                    <p className="labelData">Surname2</p>
                    <div className="profileData">{userData.surname2}</div>
                    <p className="labelData">City</p>
                    <div className="profileData">{userData.city}</div>
                    <p className="labelData">Postalcode</p>
                    <div className="profileData">{userData.postalcode}</div>
                    <p className="labelData">Phone</p>
                    <div className="profileData">{userData.phone}</div>
                    <p className="labelData">Email</p>
                    <div className="profileData">{userData.mail}</div>
                    <br></br>
                    <button className="sendButton" onClick={sendModify}>Modify</button>
                </div>

                <div className="profileCard">
                    {/* <input className="modifyData" defaultValue={props.credentials.customer.name}> */}
                    
                    <div><p className="labelData">Name</p><input className="profileData" name="name" onChange={updateUserData} defaultValue={userData.name} hidden="false"/></div>
                    <div><p className="labelData">Surname1</p><input className="profileData" name="surname1" onChange={updateUserData} defaultValue={userData.surname1}/></ div>
                    <div><p className="labelData">Surname2</p><input className="profileData" name="surname2" onChange={updateUserData} defaultValue={userData.surname2}/></ div>
                    <div><p className="labelData">City</p><input className="profileData" name="city" onChange={updateUserData} defaultValue={userData.city}/></div>
                    <div><p className="labelData">Postalcode</p><input className="profileData" name="postalcode" onChange={updateUserData} defaultValue={userData.postalcode}/></div>
                    <div><p className="labelData">Phone</p><input className="profileData" name="phone" onChange={updateUserData} defaultValue={userData.phone}/></div>

                    <br></br>
                    <button className="sendButton" onClick={modifyProfile}>SEND</button>
                </div>
            </div>
    )
}

export default connect((state)=>({
    credentials: state.credentials
}))(Profile);