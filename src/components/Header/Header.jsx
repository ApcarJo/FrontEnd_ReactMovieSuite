
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

    if(props.credentials.customer?.name){

        return(
            <div className="header">

                <div className="headerLinks">
                    <Button path="/" destination="HOME"/>
                    <Button path="/orders" destination="ORDERS"/>
                    <Button path="/profile" destination="PROFILE"/>
                </div>

                <div className="headerUser">
                    <Button path="/profile" destination={props.credentials.customer?.name}/>
                    <p>|</p>
                    <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>
                </div>

        </div>


    )} else if (props.credentials.customer?.admin!=null){
        return(
            <div className="header">

                <div className="headerLinks">
                    <Button path="/" destination="HOME"/>
                    <Button path="/orders" destination="ORDERS"/>
                    <Button path="/profile" destination="PROFILE"/>
                </div>

                <div className="headerUser">
                    <Button path="/profile" destination={props.credentials.customer?.name}/>
                    <p>|</p>
                    <div className="linkLogout" onClick={() => logOut()}>LOGOUT</div>
                </div>

        </div>


    )} else {


        return(
            <div className="header">

                <div className="headerLinks">
                    <Button path="/" destination="HOME"/>
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