
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

    
    // STATES
    useEffect(()=>{
        findOrders();
        // findMoviesById();
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
           
        }catch{
            console.log("cargando")
        }
    } 

    const findMoviesById = async () => {
        try {
            let body = {
                id: "441"
            }

            let res = await axios.post(`http://localhost:3006/movies/id`, body);
            setMovieOrders(res?.data);

            // movieOrders.drawMovieOrders.push(res?.data)      
        }catch{
            console.log("cargando")
        }
    }

   
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"
    return (
        <div className="viewOrders">
            <div className="contentOrders">
                {viewOrders.map((movie, index)=> (
                    <div className="movieCard">
                        <div className="movieImg">

                            <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                        </div>
                        <div className="movieData">
                            <div>Client ID : {movie.customerId}</div>
                            <div>Rent Start: {movie.rentStart}</div>
                            <div>Rent End : {movie.rentEnd}</div>
                            <div>Movie ID : {movie.movieId}</div>
                        </div>
                    </div>
                ))}
            </div>  
        </div>
    )
}

export default connect((state)=>({
    credentials: state.credentials
}))(Orders);