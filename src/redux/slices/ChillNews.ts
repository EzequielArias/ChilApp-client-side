import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChillNewApi } from "../../interfaces";

interface ChillNew {
    news : IChillNewApi[],
    newsDetail : IChillNewApi
}

const ChillNewsState : ChillNew = {
    news : [],
    newsDetail : {
        id : "", // Id of the post
        avatar : "",
        chillNewContent : "",
        userId : ""
    }
}


export const ChillNewSlice  = createSlice({
    name : 'chill-new',
    initialState : ChillNewsState,
    reducers : {

        getChillNews : ( state, action : PayloadAction<IChillNewApi[]> ) => {

            return {
               ...state,
               news : action.payload
            }
        },

        setChillNewDetail : ( state, action : PayloadAction<IChillNewApi> ) => {
            return {
                ...state,
                newsDetail : action.payload
            }
        }
    }
})

export const { getChillNews } = ChillNewSlice.actions;