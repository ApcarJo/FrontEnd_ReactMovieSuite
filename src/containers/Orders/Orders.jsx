
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

            console.log(props.credentials.customer.admin)
            

            if (props.credentials.customer.admin==null){

                let res = await axios.post(`http://localhost:3006/order/customerId`, body, {headers:{'authorization':'Bearer ' + token}});
                setViewOrders(res?.data);

            } else if (props.credentials.customer.admin==true) {
                let res = await axios.get(`http://localhost:3006/order/`, {headers:{'authorization':'Bearer ' + token}});
                setViewOrders(res?.data);
            }
           
        } catch (error) {
            console.log(error);
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
        } catch (error) {
            console.log(error);
        }
    }

    const convertDate = (date) => {
        let newDate = new Date (date)
        let day = newDate.getDate();
        let month = newDate.getMonth()+1;
        let year = newDate.getFullYear();
        let date2= day+'/'+month+'/'+year;
        return date2;
        }

   
    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200"
    return (
        <div className="viewOrders">
            <div className="contentOrders">
                {viewOrders.map((movie, index)=> (
                    <div className="ordersCard">
                        <div className="movieImg">

                            <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                        </div>
                        <div className="movieData">
                            <div>Client ID : {movie.customerId}</div>
                            <div>Rent Start: {convertDate(movie.rentStart)}</div>
                            <div>Rent End : {convertDate(movie.rentEnd)}</div>
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