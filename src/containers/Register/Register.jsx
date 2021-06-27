
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Calendar from '../../components/Calendar/Calendar';


const Register = (props) => {

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
        // e.preventDefault();
        
        let body = {
            name: datosUser.name,
            mail : datosUser.email,
            password : datosUser.password,

            // {
            //     "name": "Api",
            //     "surname1": "Api2",
            //     "surname2": "Api3",
            //     "dni": "114523698",
            //     "birthdate": "1980-05-05",
            //     "phone": "968473362",
            //     "address": "C/ aeaedasd",
            //     "city": "Valencia",
            //     "postalcode": "46001",
            //     "mail": "api@gmail.com",
            //     "password": "1234",
            //     "admin": true
            //   }

            //Crear un constructor escalable de datos de registro con variables en un array para el mensaje de errores y variables dinámicas en el nombre de la clase y el nombre del div donde se imprimen los inputs.
        }
        // console.log(body);

        let res = await axios.post('http://localhost:3006/customer', body);
        console.log(res);
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

            // case 'password':
            //     if (! /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(datosUser.password)){
            //     // if (datosUser.password.length < 8){
            //         setErrors({...errors, ePassword: 'At least 8 characters, must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number. Can contain special characters'});
            //     }else{
            //         setErrors({...errors, ePassword: ''});
            //     }
            // break;

            case 'phone':
                if ((! /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(datosUser.phone))||(datosUser.phone.length > 16)){
                // if (datosUser.password.length < 8){
                    setErrors({...errors, ePhone: 'Wrong phone number'});
                }else{
                    setErrors({...errors, ePhone: ''});
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
     const errorStyle = (arg) =>{
        
        let errorDefault = "name";
        let errorWarning = "red";

        if (errors.eName!== ''){
            return errorWarning;
        }

        return errorDefault;
     }

    return (
        <div className="vistaRegisterCustomer">
            <div className="leftSide">
            <pre>{JSON.stringify(datosUser, null,2)}</pre>
            </div>
            <div className="formulario1">
                <div className="box1">
                        <input className="inputRegister" name="name" type="text" onChange={updateFormulario} onBlur={()=>checkError("name")} placeholder="Name" required/>
                </div>
                {/*<div className="box1">
                        <input className="input" name="lastname1" type="text" onChange={updateFormulario} onBlur={()=>checkError("lastname")} required/>
                </div>
                <div className="box1">
                        <input className="input" name="lastname2" type="text" onChange={updateFormulario} onBlur={()=>checkError("name")}/>
                </div> */}
                <div className="box1">
                        <input className="inputRegister" name="email" type="text" onChange={updateFormulario} onBlur={()=>checkError("email")} placeholder="E-mail" required/>
                </div>
                {/* <div className="box1">
                        <input className="input2" name="phone" type="text" onChange={updateFormulario} onBlur={()=>checkError("phone")}required/>
                </div> */}
                <div className="box1">
                        <input className="inputRegister" name="password" type="password" onChange={updateFormulario} onBlur={()=>checkError("password")} placeholder="Password" required/>
                </div>
                <div className="box1">
                        <input className="inputRegister" name="password2" type="password" onChange={updateFormulario} onBlur={()=>checkError("password2")} placeholder="Repeat Password" required/>
                </div>
                {/* <div className="box1">
                            <input className="input5" name="city" type="text" onChange={updateFormulario} onBlur={()=>checkError("city")}required/>
                </div>  
                <div className="box1">
                        <input className="input6" name="cp" type="text" onChange={updateFormulario} onBlur={()=>checkError("cp")}required/>
                </div> */}
                
                {/* <Calendar/> */}
                    {/* <input className="name" name="dateOfBirth" type="date" onChange=        {updateFormulario} onBlur={()=>checkError("dateOfBirth")}      placeholder="dateOfBirth"></  input><br></br>
                    <div>{errors.eDateofbirth}</div> */}
                <div className="registerButton" onClick={()=>applyRegister()}>Enviar</div>
            </div>
        </div>
    )
}

export default Register;

// export default connect((state)=>({
//     calendar: state.calendar
// }))(Register);