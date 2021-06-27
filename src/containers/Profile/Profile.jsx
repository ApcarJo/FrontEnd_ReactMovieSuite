
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Profile = (props) => {

    // HOOKS
    const [userData, setUserData] = useState({
        user: [],
    })

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

            let res = await axios.put(`http://localhost:3006/customer/id`, body, {headers:{'authorization':'Bearer ' + token}});
            console.log(res, "esto es res")
            

        }catch{
            console.log("cargando")
        }
    }
    

    return (
        // <div className="vistaProfile" onChange={setUserData}>{userData.user.map((data, index)=>{
            <div>
            <div >name: {props.credentials.customer.name}</div>
            <div >surname1 : {props.credentials.customer.surname1}</div>
            <div >surname2 : {props.credentials.customer.surname2}</div>
            <div >city: {props.credentials.customer.city}</div>
            <div >postalcode : {props.credentials.customer.postalcode}</div>
            <input placeholder={props.credentials.customer.phone}></input>
            <div >{props.credentials.customer.mail}</div>
            </div>
        
    )
}

export default connect((state)=>({
    credentials: state.credentials
}))(Profile);