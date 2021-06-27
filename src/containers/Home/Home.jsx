
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const Home = (props) => {

    // HOOKS
    const [movieData, setMovieData] = useState([])

    // HANDLERS
    const updateMovieData = (e) => {
        setMovieData({...movieData, [e.target.name]: e.target.value})
    }

    // REACT STATES

    useEffect(()=>{
        topRatedMovies();
    },[]);

    useEffect(()=>{

    });

    const topRatedMovies = async () => {
        try{
            // let res = await axios.get(`http://localhost:3006/movies` );
            let res = await axios.get(`https://api.themoviedb.org/3/movie/300/recommendations?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=1` );
            setMovieData(res.data.results);
        }catch{
            console.log("error loading")
        }
    
    }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w500" 

    return (
        <div className="vistaHome">
            <div className="tarjeta">
            {movieData.map((movie, index) => (
           
            <div key={index} className="appointmentCard1">

            <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>

            <p> Movie: {movie.title} </p>
            <p> Rated : {movie.vote_average} </p>
            <p> Id : {movie.id} </p>
            // Crear en CSS gradientes con transparencias, overflow: scroll.
             {/* <p> DENTIST : {movie.genre_ids} </p> */}

             
             {/* <div className="buttons1">
               <div
                 className="buttonUpdateA"
                 onClick={() => saveAppointment(appointment)}
               >
                 UPDATE
               </div>
               <div className="buttonDeleteA" onClick={() => deleteAppointment(appointment)}>REMOVE</div>
             </div> */} 
            </div>
            ))}

            </div>
        </div>
    )
}

export default connect()(Home);