import * as actionTypes from "../actions/actionTypes";

const initialState={
    images:[],
    synced_images:[],
    hosp:null,
    hospitals:[],
    validations:[],
};


const reducer=(state=initialState,action)=>{
    switch (action.type){
        case actionTypes.SAVE_IMAGE: return {...state,images:[...state.images,action.image]};
        case actionTypes.LOAD_IMAGES: return {...state,images:action.images};
        case actionTypes.SYNC_IMAGES: return {...state,synced_images:[...state.synced_images,action.image]};
        case actionTypes.LOAD_SYNCED_IMAGES: return {...state,synced_images:action.images};
        case actionTypes.SET_HOSPITAL: return {...state,hosp:action.hospital};
        case actionTypes.SET_HOSPITALS: return {...state,hospitals:action.hospitals};
        case actionTypes.SET_VALIDATIONS: return {...state,validations:action.validations};
        default: return state;
    }
};


export default reducer;