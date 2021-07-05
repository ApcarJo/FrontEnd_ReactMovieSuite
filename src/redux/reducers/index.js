import { combineReducers } from "redux";
import credentials from './credentials-reducer'
import calendar from './calendar-reducer';
import movie from './movie-reducer';



const rootReducer = combineReducers ({
    credentials,
    calendar,
    movie
});

export default rootReducer;