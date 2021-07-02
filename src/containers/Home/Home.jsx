
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ADD_MOVIE } from '../../redux/reducers/movie-reducer';

const Home = (props) => {

    // HOOKS
    const [movieData, setMovieData] = useState({
        resultsMovies: [],
        pageNum: '1'
    })
    const [searchMovie, setSearchMovie] = useState({
        movie: '',
        resultsMovieFind: {}
    })

    const [rentMovie, setRentMovie] = useState({
        movieId: '',
        userId: props.credentials.customer.id,

    })

    // HANDLERS
    const updateMovieData = (e) => {
        setMovieData({...movieData, [e.target.name]: e.target.value})
    }
    const updateSearchMovie = (e) => {
        setSearchMovie({...searchMovie, [e.target.name]: e.target.value})
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
            let res = await axios.get(`https://api.themoviedb.org/3/movie/300/recommendations?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=${movieData.pageNum}` );
            setMovieData({...movieData, resultsMovies: res.data.results, totalPages: res.data?.total_pages});
            // setMovieData(res.data.results);
            // props.dispatch({type:ADD_MOVIE, payload:res.data.results});
            
        }catch{
            console.log("error loading")
        }
    }

    const findMovie = async () => {

        try {
            let body = {
                title: searchMovie.movie
            }
            let res = await axios.post(`http://localhost:3006/movies/title`, body);
            setSearchMovie({...searchMovie, resultsMovieFind: res.data.results});

        }catch {
            console.log("cargando")
        }
    }

    const orderMovie = async (move) => {
        let newDate = new Date();
        let token = props.credentials.token;
        console.log(newDate)
        let body = {
            customerId: props.credentials.customer.id,
            movieId: move,
            rentStart: newDate,
            rentEnd: newDate
        }
        console.log(body, "body de la order")
        let res = await axios.post(`http://localhost:3006/order`, body, {headers:{'authorization':'Bearer ' + token}});

        console.log( res, "res de la order")

    }

    const baseImgUrl = "https://image.tmdb.org/t/p"
    const size = "w200" 
    const add = () => {
        if (movieData.pageNum < movieData.totalPages) {
            movieData.pageNum++;
        } else {
            movieData.pageNum=1;
        }
        topRatedMovies();
    };
    
    
    const rest = () => {
        if (movieData.pageNum > 1) {
            movieData.pageNum--;
        } else {
          movieData.pageNum=2;
        }
        topRatedMovies();
    };
    

    if (searchMovie.resultsMovieFind[0]==null) {
        
        return (
            <div className="vistaHome" >
                <div className="contentSearchBar">
                    <input className="searchMovie" name="movie" placeholder="Movie name" onBlur={updateSearchMovie}></input>
                    <button className="findMovieButton" onClick={findMovie}>Search</button>
                </div>
                <p>TOP RATED MOVIES</p>
                <div className="contentMovies">
                    {movieData.resultsMovies.map((movie, index) => (
                    <div className="movieCard">
                        <div key={index} className="movieImg">

                            <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                            <div className="movieData">
                                <p> Movie: {movie.title} </p>
                                <p> Rated : {movie.vote_average} </p>
                                {/* <p> Id : {movie.id} </p> */}
                                <button className="rentButton" onClick={()=>orderMovie(movie.id)}>Rent</button>
                            </div>
                            {/* Crear en CSS gradientes con transparencias, overflow: scroll. */}
                             {/* <p> DENTIST : {movie.genre_ids} </p> */}           
                             {/* <div className="buttons1">
                               <div className="buttonUpdateA" onClick={() => saveAppointment(appointment)}>UPDATE</div>
                               <div className="buttonDeleteA" onClick={() => deleteAppointment(appointment)}>REMOVE</div>
                             </div> */} 
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        )
    } else {
        return (
            <div className="vistaHome" >
                <div className="contentSearchBar">
                    <input className="searchMovie" name="movie" placeholder="Movie name" onBlur={updateSearchMovie}></input>
                    <button className="findMovieButton" onClick={findMovie}>Search</button>
                </div>

                <p>YOUR SEARCH RESULTS</p>
                <div className="contentMovies">
                    {searchMovie.resultsMovieFind.map((movie, index) => (
                        <div className="movieCard">
                            <div key={index} className="movieImg">
                                <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                            </div>
                            <div className="movieData">
                                <p> Movie: {movie.title} </p>
                            </div>  
                        </div>
                    ))}
                </div>
                <div className="contentMovies">
                    <div name="rest" onClick={rest}>| - | : </div><div>TOP RATED MOVIES</div><div name="add" onClick={add}> : | + |</div>
                </div>
                <div className="contentMovies">
                    {movieData.resultsMovies.map((movie, index) => (
                    <div className="movieCard">
                        <div key={index} className="movieImg">
                            <img src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                        </div>
                        <div className="movieData">
                            <p> Movie: {movie.title} </p>
                            <p> Rated : {movie.vote_average} </p>
                            <button className="rentButton" onClick={()=>orderMovie(movie.id)}>Rent</button>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
            
        )
    }
}

export default connect((state)=>({
    movie: state.movie,
    credentials: state.credentials
}))(Home);