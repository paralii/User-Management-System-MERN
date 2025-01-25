import {configureStore} from "@reduxjs/toolkit" ;

import {persistStore , persistReducer} from 'redux-persist'

import authReducer from "./authSlice";

import storage from "redux-persist/lib/storage"; 

const authTokenPersist = {
    key :'token',
    storage
}


const authPersistReducer = persistReducer(authTokenPersist , authReducer)

const store = configureStore({
    reducer:{ 
        auth : authPersistReducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({serializableCheck:false}),
});

const persistor = persistStore(store);


export { store, persistor };
