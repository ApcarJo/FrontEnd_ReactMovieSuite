
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Calendar from '../../components/Calendar/Calendar';
import { useHistory } from 'react-router-dom';


const Register = () => {

    let history = useHistory();

    // Hook
    const [datosUser,setDatosUser] = useState(
        {
        name:'',
        email:'',
        phone:'',
        password:'',
        password2: '',
        dateOfBirth: '',
        city: '',
        cp: ''
    });

    const [errors, setErrors] = useState({
        eName: '',
        eEmail: '',
        ePhone: '',
        ePassword: '',
        ePassword2: '',
        eDateofbirth: '',
        eCity: '',
        eCp: ''

    });

    // Handler
    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value})
    }

    const applyRegister = async () => {
        let body = {
            name: datosUser.name,
            mail : datosUser.email,
            password : datosUser.password
        }

        if(datosUser.password==datosUser.password2){
            let res = await axios.post('http://localhost:3006/customer', body);
            
            setTimeout(()=>{
                history.push(`/login`);
            },750);
        }
    }

    const checkError = (arg) => {
        switch (arg){
            case 'name':
                if ((datosUser.name.length < 2)||(! /^[a-z ,.'-]+$/i.test(datosUser.name))||(datosUser.name.length > 20)){
                    setErrors({...errors, eName: 'Introduce un nombre válido'});
                }else{
                    setErrors({...errors, eName: ''});
                }
            break;

            case 'email':
                if (! /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g.test(datosUser.email)){
                    setErrors({...errors, eEmail: 'Introduce un email válido'});
                }else{
                    setErrors({...errors, eEmail: ''});
                }
                
            break;

            case 'phone':
                if ((! /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(datosUser.phone))||(datosUser.phone.length > 16)){
                    setErrors({...errors, ePhone: 'Wrong phone number'});
                }else{
                    setErrors({...errors, ePhone: ''});
                }
            break;

            case 'password':
                if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(datosUser.password)){
                    setErrors({...errors, ePassword: 'At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'});
                }else{
                    setErrors({...errors, ePassword: ''});
                }
            break;

            case 'password2':
                if (datosUser.password !== datosUser.password2){
                    setErrors({...errors, ePassword2: 'Password should be the same'});
                }else{
                    setErrors({...errors, ePassword2: ''});
                }
            break;

            default:
                break;
        }
    }

    return (
        <div className="vistaRegisterCustomer">
            <div className="registerCard">
                REGISTER
                <div className="box1">
                    <input className="inputRegister" name="name" type="text" onChange={updateFormulario} onBlur={()=>checkError("name")} placeholder="Name" required/>
                    <div className="errorsText">{errors.eName}</div>
                </div>
                
 
                <div className="box1">
                    <input className="inputRegister" name="email" type="text" onChange={updateFormulario} onBlur={()=>checkError("email")} placeholder="Email" required/>
                    <div className="errorsText">{errors.eEmail}</div>
                </div>
                

                <div className="box1">
                    <input className="inputRegister" name="password" type="password" onChange={updateFormulario} onBlur={()=>checkError("password")} placeholder="Password" required/>
                    <div className="errorsText">{errors.ePassword}</div>
                </div>
                
                <div className="box1">
                    <input className="inputRegister" name="password2" type="password" onChange={updateFormulario} onBlur={()=>checkError("password2")} placeholder="Repeat Password" required/>
                    <div className="errorsText">{errors.ePassword2}</div>
                </div>
                
                <div className="sendButton" onClick={()=>applyRegister()}>Register</div>
            </div>
        </div>
    )
}

export default Register;