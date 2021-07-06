
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { LOGIN } from '../../redux/types';

const Login = (props) => {

    let history = useHistory();

    // Hooks
    const [credentials,setCredentials] = useState({email:'',password:''});
    const [msgError, setMensajeError] = useState({eEmail:'',ePassword: '',eValidate:''});
    // const [statusRole, setStatusRole] = useState({roleStatus: ''});

    // Esto es un Handler
    const updateCredentials = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    useEffect(()=>{
    },[]);
    
    useEffect(()=>{
    },);

    const checkError = async (arg) => {

        switch (arg){

            case 'email':

                if (credentials.email.length < 1){
                    setMensajeError({...msgError, eEmail: "Please enter your email"});
                }else {
                    setMensajeError({...msgError, eEmail: ""});
                }

                // let body = {
                //     email: credentials.email
                // }
        
                // let role = await axios.post('http://localhost:3006/clients/email', body);
        
                // if (role.data !== null){
                //     setStatusRole({...statusRole, roleStatus: 'client'});
                // }
        
                // if (role.data == null){
                //     role = await axios.post('http://localhost:3006/dentists/email', body);
                //     if (role.data !== null) { 
                //         setStatusRole({...statusRole, roleStatus: 'dentist'});
                //     } 
                // }
            break;

            case 'password':

                if (credentials.password.length < 1){
                    setMensajeError({...msgError, ePassword: "Please enter your password"});
                }else {
                    setMensajeError({...msgError, ePassword: ""});
                }
            break;

            default:
                break;
        }
    }

    const logeame = async () => {
        // if (! /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(this.state.email) ) {
        try{
        // A continuamos, generamos el body para enviar los datos por axios
        let body = {
            email : credentials.email,
            password : credentials.password
        }
        // Envío por axios
        let res = await axios.post(`https://moviesuiteback.herokuapp.com/login`, body);
        // let token = res.data.token;
        //
        props.dispatch({type:LOGIN, payload:res.data});

        // redirección
        setTimeout(()=>{
            history.push(`/profile`);
        },250);

        }catch{
            setMensajeError({...msgError, eValidate: 'Wrong email or password'});
        }
    }

    return(
        <div className="vistaLogin">
            {/* <pre>{JSON.stringify(credentials, null,2)}</pre> */}
                <div className="loginCard">
                    LOGIN
                    <input className="loginBox" name="email" type="text"  onChange={updateCredentials} onBlur={()=>checkError("mail")}  placeholder="email" required/>
                    <div className="errorsText">{msgError.eEmail}</div>
                    
                    <input className="loginBox" name="password" type="password" onChange={updateCredentials} onBlur={()=>checkError ("password")} placeholder="password" required/>
                    <div className="errorsText">{msgError.ePassword}</div>
                    <br></br>
                    <div className="divRow">
                        <div className="sendButton" onClick={()=>logeame()}>Sign in</div>
                        <div>{msgError.eValidate}</div>
                        <div className="sendButton" onClick={() => history.push('/register')}>Register now!</div>
                    </div>
                </div>
        </div>  
    )
}
export default connect()(Login);
// export default connect((state)=> ({
//     credentials: state.credentials
// }))(Login);