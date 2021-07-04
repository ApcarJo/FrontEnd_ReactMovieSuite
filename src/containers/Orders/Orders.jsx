
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const Orders = (props) => {

    // HOOKS
    const [viewOrders, setViewOrders] = useState ({
        movieInfo: []
    });

    const [movieOrders, setMovieOrders] = useState ({
        drawMovieOrders: []
    });

    // HANDLERS

     // STATES
     useEffect(()=>{
        findOrders();
        findMoviesById();
        
    },[]);

    useEffect(()=>{

    });

    const findOrders = async () => {
        try {
            let token = props.credentials?.token;

            let body = {
                customerId: props.credentials.customer?.id,
            }

            let res = await axios.post(`http://localhost:3006/order/customerId`, body, {headers:{'authorization':'Bearer ' + token}});
            setViewOrders({...viewOrders, movieInfo: res.data});

            console.log(viewOrders.movieInfo)

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

    // viewOrders.movieInfo.map((value, index)=> {
    //     findMoviesById(value.movieId);
    // })
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"


    return (
        <div className="viewOrders">
                    <div className="movieCard">
                    <div className="movieImg">

                     {/* <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/> */}
                        <div className="movieData">
                         {/* <p> Movie: {movieOrders.drawMovieOrders.title} </p> */}
                         {/* <p> Rated : {movie.vote_average} </p> */}
                         {/* <p> Id : {movie.id} </p> */}
                         {/* <button className="rentButton" onClick={()=>orderMovie(movie.id)}>Rent</button> */}
                        </div>
                     {/* Crear en CSS gradientes con transparencias, overflow: scroll. */}
                      {/* <p> DENTIST : {movie.genre_ids} </p> */}           
                      {/* <div className="buttons1">
                        <div className="buttonUpdateA" onClick={() => saveAppointment(appointment)}>UPDATE</div>
                        <div className="buttonDeleteA" onClick={() => deleteAppointment(appointment)}>REMOVE</div>
                      </div> */} 
                    </div>
                </div>
        </div>
    )
}

export default connect((state)=>({
    credentials: state.credentials
}))(Orders);