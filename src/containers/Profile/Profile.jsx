
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
        history.push('/modify')
    }

if (userData!=1){
    return (
        // <div className="vistaProfile" onChange={setUserData}>{userData.user.map((data, index)=>{
            <div className="vistaProfile">
                <div className="profileData" >name: {userData.name}</div>
                <div className="profileData">surname1 : {userData.surname1}</div>
                <div className="profileData">surname2 : {userData.surname2}</div>
                <div className="profileData">city : {userData.city}</div>
                <div className="profileData">postalcode : {userData.postalcode}</div>
                <div className="profileData">phone : {userData.phone}</div>
                <div className="profileData">e-mail : {userData.mail}</div>

                <button onClick={sendModify}>Modify</button>



                {/* <input className="modifyData" defaultValue={props.credentials.customer.name}> */}
                {/* <div><input className="profileData" name="name" onChange={updateUserData} defaultValue={userData.name} hidden={false}/></div>
                <div><input className="profileData" name="surname1" onChange={updateUserData} defaultValue={userData.surname1}/></ div>
                <div><input className="profileData" name="surname2" onChange={updateUserData} defaultValue={userData.surname2}/></ div>
                <div><input className="profileData" name="city" onChange={updateUserData} defaultValue={userData.city}/></div>
                <div><input className="profileData" name="postalcode" onChange={updateUserData} defaultValue={userData.postalcode}/></div>
                <div><input className="profileData" name="phone" onChange={updateUserData} defaultValue={userData.phone}/></div>


                <button onClick={modifyProfile}>SEND</button> */}
            </div>
    )
    } else {
        return(
            <div>
                <div><input className="profileData" name="name" onChange={updateUserData} defaultValue={userData.name} hidden={false}/></div>
                <div><input className="profileData" name="surname1" onChange={updateUserData} defaultValue={userData.surname1}/></ div>
                <div><input className="profileData" name="surname2" onChange={updateUserData} defaultValue={userData.surname2}/></ div>
                <div><input className="profileData" name="city" onChange={updateUserData} defaultValue={userData.city}/></div>
                <div><input className="profileData" name="postalcode" onChange={updateUserData} defaultValue={userData.postalcode}/></div>
                <div><input className="profileData" name="phone" onChange={updateUserData} defaultValue={userData.phone}/></div>


                <button onClick={modifyProfile}>SEND</button>
            </div>
        )
    }
}

export default connect((state)=>({
    credentials: state.credentials
}))(Profile);