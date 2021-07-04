
import React from 'react';
import { connect } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Button from '../Button/Button';
import { LOGOUT } from '../../redux/types';

const Header = (props) => {

    let history = useHistory();

    const logOut = () => {

        props.dispatch({type:LOGOUT});
        history.push("/")
    }

    if(props.credentials.client?.name){

        return(
            <div className="header">

            <div className="headerLinks">
                
                <Button path="/clinics" destination="CLINICS"/>
                <Button path="/aboutus" destination="ABOUT US"/>

                <Button path="/dentists" destination="DENTISTS"/>
                <Button path="/clientappointments" destination="MY APPOINTMENTS"/>
                <Button path="/appointments" destination="CREATE APPOINTMENT"/>
            </div>

            <div className="headerUser">
            <Button path="/clientprofile" destination={props.credentials?.client.name}/>
            <p>|</p>
            <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>
            </div>

        </div>


    )} else if (props.credentials.dentist?.name){
        return(
            <div className="header">

            <div className="headerLinks">
                <Button path="/aboutus" destination="ABOUT US"/>
                <Button path="/clinics" destination="CLINICS"/>
                <Button path="/contact" destination="CONTACT"/>
                <Button path="/dentistschedule" destination="MY HISTORY"/>
            </div>

            <div className="headerUser">
            <Button path="/dentistprofile" destination={props.credentials?.dentist.name}/>
            <p>|</p>
            <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>
            </div>

        </div>


    )} else {


        return(
            <div className="header">

                <div className="headerLinks">
                    <Button path="/" destination="HOME"/>
                    <Button path="/orders" destination="ORDERS"/>
                    <Button path="/profile" destination="PROFILE"/>
                </div>
    
                <div className="headerUser">
                    <Button path="/login" destination="LOGIN"/>
                    <p>|</p>
                    <Button path="/register" destination="REGISTER"/>
                </div>
            </div>
        )

    }

}

export default connect((state) => ({

    credentials:state.credentials

    }))(Header);