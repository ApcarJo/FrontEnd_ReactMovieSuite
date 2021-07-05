
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Calendar from '../../components/Calendar/Calendar';

const Orders = (props) => {
    let newDate = new Date();
    // HOOKS
    const [viewOrders, setViewOrders] = useState ([]);

    const [movieOrders, setMovieOrders] = useState ({
        drawMovieOrders: []
    });

    const [datosUser,setDatosUser] = useState(
        {
        dia:'16',
        mes: '6',
		mesW: '',
        anyo: '2021',
        semana1: [],
        diasMes1: '',
		day: '',
		year: '',
		monthy: '',
		arrayDate: '',
		actualDate: ''
    	});

    // HANDLERS
    const updateFormulario = (e) => {
        setDatosUser({...datosUser, [e.target.name]: e.target.value})
    }
    
    // STATES
    useEffect(()=>{
        findOrders();
        // findMoviesById();
        // Schedule();   
    },[]);

    useEffect(()=>{

    });

    const findOrders = async () => {
        try {
            let token = props.credentials?.token;

            let body = {
                customerId: props.credentials.customer.id,
            }

            let res = await axios.post(`http://localhost:3006/order/customerId`, body, {headers:{'authorization':'Bearer ' + token}});
            setViewOrders(res?.data);

            schedule();
            
        }catch{
            console.log("cargando")
        }
    } 

    // const findMoviesById = async () => {
    //     try {
    //         let body = {
    //             id: "441"
    //         }

    //         let res = await axios.post(`http://localhost:3006/movies/id`, body);
    //         setMovieOrders(res?.data);

    //         // movieOrders.drawMovieOrders.push(res?.data)      
    //     }catch{
    //         console.log("cargando")
    //     }
    // }

    const schedule = () => {
        let anyo = newDate.getFullYear();
	    let mes = datosUser.mes;
	    let dia = newDate.getDate();
        
        let x=0, b=0;
	    let principal=1;
	    let dias;   

	    for (principal=1; principal<anyo; principal++){
	    	x++;
	    	if ((principal%4===0 && principal%100!==0) || (principal%400===0)){
	    		b++;
	    	}
	    }
        let semana = ["Lunes ", "Martes ", "Miércoles ", "Jueves ", "Viernes ", "Sábado ", "Domingo "];
	    let mesi = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((anyo%4===0 && anyo%100!==0) || (anyo%400===0)) {
	    	mesi[1]=29;
	    }else{
	    	mesi[1]=28;
	    }
    
	    let days=0;

	    for (let i=0; i<mes-1; i++){
	    	days=days+mesi[i];
	    }

	    let mes1=days;
	    dias=(b*366)+((x-b)*365)+(dia)+(mes1);
	    let i=dias%7-1;
	    if(i<0)
	    i=6;

        dias=(b*366)+((x-b)*365)+(dia)+(mes1);
	    let resto1=(dias-dia)%7;
	
	    if (resto1<0) {
		    resto1=resto1*-1;
        }

        var diasMes=[];
	    var mesDias=[];
	    if (resto1!==0){
		    for (let j=0; j<resto1; j++)
		        diasMes.push('');
                mesDias.push('');
	    }
        
        viewOrders.orderMovieInfo?.map((value, index)=>{
            console.log(value?.rentStart);
        })
	    for (i=1; i<=mesi[mes-1]; i++){
		    diasMes.push(i);
            // if (viewOrders.orderMovieInfo[i].rentStart.getDate()==i) {
		    //     mesDias.push(
            //         <div className="movieImg">
            //             <img src={`${baseImgUrl}/${size}${viewOrders.poster_path}`}     alt="poster"/>
            //             <div className="movieData">
            //                 <div>Client ID : {viewOrders.customerId}</div>
            //                 <div>Rent Start: {viewOrders.rentStart}</div>
            //                 <div>Rent End : {viewOrders.rentEnd}</div>
            //                 <div>Movie ID : {viewOrders.movieId}</div>
            //             </div>
            //         </div>
            //     );
            // }
	    };
        datosUser.diasMes1=diasMes;
        datosUser.semana1=semana;

        // viewOrders.movieInfo.map((value, index)=> {
        //     findMoviesById(value.movieId);
        // })
    }
    const sum = (mes, anyo) => {
        if (mes < 12) {
            mes++;
        } else {
            anyo++;
            mes=1;
        }
        datosUser.mes=mes;
        datosUser.anyo=anyo;
    }

    const rest = (mes, anyo) => {
        if (mes > 1) {
            mes--;
        } else {
            anyo--;
            mes=12;
        }
        datosUser.mes=mes;
        datosUser.anyo=anyo;
    }
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"
    return (
        <div className="viewOrders">
            <div className="movieCard">
                {viewOrders.map((movie, index)=> (
                    <div className="movieImg">

                        <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                        <div className="movieData">
                            <div>Client ID : {movie.customerId}</div>
                            <div>Rent Start: {movie.rentStart}</div>
                            <div>Rent End : {movie.rentEnd}</div>
                            <div>Movie ID : {movie.movieId}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="contentCalendar">
                <div className="addMonth" name="mes" onClick={()=>sum(datosUser.mes, datosUser.anyo)}>+</div>
				<div className="addMonth" name="mes" onClick={()=>rest(datosUser.mes, datosUser.anyo)}>-</div>
                <div className="drawCalendar">
			    	{datosUser.semana1.map((semana2, index) => (
			    			<div className="dayBox1" key={index}>
			    					<p>{semana2}</p>
			    			</div>
			    	))}
			    	{datosUser.diasMes1.map((diasMes2, index) => (
			    		<div className="dayBox1" id={index} key={index}>
			    				<p>{diasMes2}</p>
			    		</div>
			    	))}
			    </div>
            </div>
        </div>
    )
}

export default connect((state)=>({
    credentials: state.credentials
}))(Orders);