
import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { ADD_MOVIE } from '../../redux/reducers/movie-reducer';
import Calendar from '../../components/Calendar/Calendar.jsx'

const Home = (props) => {

    // HOOKS
    const [movieData, setMovieData] = useState({
        listMovies: [],
        totalPages: '',
        cont: '',
        pageNum: '1'
    })
    const [searchMovie, setSearchMovie] = useState({
        movie: '',
        findMovieList: {},
        
    })

    const [selectGenre, setSelectGenre] = useState({
        listMoviesGenre: [],
        totalPagesGenre: '',
        pageNum: '1',
        movieGenre: 'Fantasy',
        genreTypes: []
    })

    const [rentMovie, setRentMovie] = useState({
        movieId: '',
        userId: props.credentials.customer.id,

    })

    const [movieOrders, setMovieOrders] = useState ({
        drawMovieOrders: [],
        rentStartMovie: '',
        rentEndMovie: ''
    });

    // HANDLERS
    const updateMovieData = (e) => {
        setMovieData({...movieData, [e.target.name]: e.target.value})
    }
    const updateSearchMovie = (e) => {
        setSearchMovie({...searchMovie, [e.target.name]: e.target.value})
    }

    const updateGenres = (e) => {
        setSelectGenre ({...selectGenre, [e.target.name]: e.target.value})
    }

    // REACT STATES

    useEffect(()=>{
        topRatedMovies();
        byGenre();

    },[]);

    useEffect(()=>{
        
    });

    const topRatedMovies = async () => {

        try{
            const onlyUnique = (value, index, self) => {
                return self.indexOf(value) === index;
              }
            // let res = await axios.get(`http://localhost:3006/movies` );
            let res = await axios.get(`https://api.themoviedb.org/3/movie/300/recommendations?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US&page=${movieData.pageNum}` );
            setMovieData({...movieData, listMovies: res.data.results, totalPages: res.data?.total_pages});
            // setMovieData(res.data.results);
            // props.dispatch({type:ADD_MOVIE, payload:res.data.results});
            
        }catch{
            console.log("error loading")
        }
    }

    const byGenre = async () => {

        try{
            let listId = await axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=210d6a5dd3f16419ce349c9f1b200d6d&language=en-US');
            for (let i in listId.data.genres){
                selectGenre.genreTypes.push(listId.data.genres[i].name)
            }
            let body = {
                genre: selectGenre.movieGenre,
                page: selectGenre.pageNum
            }
            let res = await axios.post(`http://localhost:3006/movies/genre`, body);
            setSelectGenre({...selectGenre, listMoviesGenre: res.data.results, totalPagesGenre: res.data?.total_pages});
            
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
            setSearchMovie({...searchMovie, findMovieList: res.data.results});

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
            movieId: move.id,
            poster_path: move.poster_path,
            rentStart: movieOrders.rentStartMovie,
            rentEnd: movieOrders.rentEndMovie
        }
        let res = await axios.post(`http://localhost:3006/order`, body, {headers:{'authorization':'Bearer ' + token}});
    }

    const findMovieById = async (value) => {
        try {
            let body = {
                id: value.id
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
          movieData.pageNum=movieData.totalPages;
        }
        topRatedMovies();
    };

    const add1 = () => {
        if (selectGenre.pageNum < selectGenre.totalPagesGenre) {
            selectGenre.pageNum++;
        } else {
            selectGenre.pageNum=1;
        }
        byGenre();
    };
    
    
    const rest1 = () => {
        if (selectGenre.pageNum > 1) {
            selectGenre.pageNum--;
        } else {
            selectGenre.pageNum=selectGenre.totalPagesGenre;
        }
        byGenre();
    };
    let e=null;
    let a=null;
    
    const updateRentStart = () => {
        console.log("AHORA");
        movieOrders.rentStartMovie = props.calendar.date;
        
    }

    const updateRentEnd = () => {
        console.log("NUNCA");
        movieOrders.rentEndMovie = props.calendar.date;

    }




    if (searchMovie.findMovieList[0]==null) {
        
        return (
            <div className="vistaHome" >
                <div className="contentSearchBar">
                    <input className="searchMovie" name="movie" placeholder="Movie name" onBlur={updateSearchMovie}></input>
                    <button className="findMovieButton" onClick={findMovie}>Search</button>
                </div>
                    <div className="pickMovie">
                        <div className="row">
                            <img src={`${baseImgUrl}/${size}${movieOrders.poster_path}`}alt="poster"/>
                            <div className="col">
                                <div>Title : {movieOrders.title}</div>
                                <div>Rated : {movieOrders.vote_average}</div>
                                <div>Review: {movieOrders.overview}</div>
                                <div className="rentBox">
                                    <div className="squareCalendar">Date Start <input type="text" defaultValue={movieOrders.rentStartMovie}></input>
                                        <div className="showCalendar" onClick={()=>updateRentStart()}>
                                            <Calendar ></Calendar>
                                        </div>
                                    </div>
                                    <div className="squareCalendar" onClick={()=>updateRentEnd()}>Date End <input type="text" defaultValue={movieOrders.rentEndMovie}></input>
                                        <div className="showCalendar">
                                            <Calendar ></Calendar>
                                        </div>
                                    </div>
                                    <button className="rentButton" onClick={()=>orderMovie(movieOrders)}>Rent</button>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="headerMovies">
                    <div name="rest" onClick={rest}>| - | : </div><div>TOP RATED MOVIES</div><div name="add" onClick={add}> : | + |</div>
                </div>
                <div className="contentMovies">
                    {movieData.listMovies.map((movie, index) => (
                    <div className="movieCard">
                        <div key={index} className="movieImg">

                            {/* <img onClick={()=>findMovieById(movie)} src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/> */}
                            <img onClick={()=>findMovieById(movie)} src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                            
                            <div className="movieData">
                                {/* <p> Movie: {movie.title} </p> */}
                                <p> Rated : {movie.vote_average} </p>
                                {/* <p> Id : {movie.id} </p> */}
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

                <div className="headerMovies">
                    <div name="rest" onClick={rest1}>| - | : </div><div>MOVIES BY GENRE</div><div name="add" onClick={add1}> : | + |</div>
                </div>
                <select className="genreSelector" name="movieGenre" onChange={updateGenres} onClick={()=>byGenre()} defaultValue="Action">
                    {selectGenre.genreTypes.map((genre, index)=> (<option key={index}>{genre}</option>))}
                </select>
                <div className="contentMovies">
                    {selectGenre.listMoviesGenre.map((movie, index) => (
                    <div className="movieCard">
                        <div key={index} className="movieImg">
                            <img onClick={()=>findMovieById(movie)} src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                        </div>
                        <div className="movieData">
                            <p> Movie: {movie.title} </p>
                            <p> Rated : {movie.vote_average} </p>
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
                    <div className="pickMovie">
                        <div className="row">
                            <img src={`${baseImgUrl}/${size}${movieOrders.poster_path}`}alt="poster"/>
                            <div className="col">
                                <div>Title : {movieOrders.title}</div>
                                <div>Rated : {movieOrders.vote_average}</div>
                                <div>Review: {movieOrders.overview}</div>
                                <div className="rentBox"> 
                                    <button className="rentButton" onClick={()=>orderMovie(movieOrders.id)}
                                >Rent</button>
                                </div>
                            </div>
                        </div>
                    </div>

                <p>YOUR SEARCH RESULTS</p>
                <div className="contentMovies">
                    {searchMovie.findMovieList.map((movie, index) => (
                        <div className="movieCard">
                            <div key={index} className="movieImg">
                                <img onClick={()=>findMovieById(movie)} src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                            </div>
                            {/* <div className="movieData">
                                <p> Movie: {movie.title} </p>
                            </div>   */}
                        </div>
                    ))}
                </div>
                <div className="headerMovies">
                    <div name="rest" onClick={rest}>| - | : </div><div>TOP RATED MOVIES</div><div name="add" onClick={add}> : | + |</div>
                </div>
                <div className="contentMovies">
                    {movieData.listMovies.map((movie, index) => (
                    <div className="movieCard">
                        <div key={index} className="movieImg">
                            <img onClick={()=>findMovieById(movie)} src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
                        </div>
                        <div className="movieData">
                            {/* <p> Movie: {movie.title} </p> */}
                            <p> Rated : {movie.vote_average} </p>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="headerMovies">
                    <div name="rest" onClick={rest}>| - | : </div><div>MOVIES BY GENRE</div><div name="add" onClick={add}> : | + |</div>
                </div>
                <select className="genreSelector" name="movieGenre" onChange={updateGenres} onClick={()=>byGenre()} defaultValue="Action">
                    {selectGenre.genreTypes.map((genre, index)=> (<option key={index}>{genre}</option>))}
                </select>
                <div className="contentMovies">
                    {selectGenre.listMoviesGenre.map((movie, index) => (
                    <div className="movieCard">
                        <div key={index} className="movieImg">
                            <img onClick={()=>findMovieById(movie)} src={`${baseImgUrl}/${size}${movie.poster_path}`}  alt="poster"/>
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
    credentials: state.credentials,
    calendar: state.calendar
}))(Home);