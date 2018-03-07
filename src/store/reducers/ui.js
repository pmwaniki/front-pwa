import * as actionTypes from "../actions/actionTypes";

const initialState={
    snackbarOpen:false,
    snackbarMessage:''
};


const reducer=(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.SNACKBAR_MESSAGE: return {...state,snackbarMessage:action.message};
        case actionTypes.SNACKBAR_OPEN: return {...state,snackbarOpen:action.isOpen};
        default: return state;
    }
};


export default reducer;