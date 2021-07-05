
import { ADD_MOVIE, REMOVE_MOVIE } from '../types';

const initialState = {
    movies : []
};

const movieReducer = (state = initialState, action) => {

    switch(action.type){
        case ADD_MOVIE :
            return action.payload;

        case REMOVE_MOVIE :
            return initialState;

        default:
            return state;
    }
}

export default movieReducer;