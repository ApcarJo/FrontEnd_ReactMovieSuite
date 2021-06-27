

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Profile = () => {

    // HOOKS

    // HANDLERS

    // STATES
    const viewProfile = async () => {
        try {
            let id;
            let res = await axios.post(`http://localhost:3006/customer/id`, id);
        }catch{
            console.log("cargando")
        }
    }
    

    return (
        <div>Hola, soy Profile</div>
    )
}

export default Profile;