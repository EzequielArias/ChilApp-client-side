import { configureStore } from "@reduxjs/toolkit";
import { ChatSlice, Query_results, RenderingSlice, UsersSlice,ChillNewSlice } from "./slices";

export const store = configureStore({
    reducer : {
       user : UsersSlice.reducer,
       chat : ChatSlice.reducer,
       rendering : RenderingSlice.reducer,
       query_results : Query_results.reducer,
       chill_news : ChillNewSlice.reducer
    }
})

export type StoreType = ReturnType<typeof store.getState>