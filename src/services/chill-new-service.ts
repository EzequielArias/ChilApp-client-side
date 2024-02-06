import axios from 'axios';
import { LoadAbort } from '../utilities';
import { API_URL } from '../constants';
import { IChillNewApi } from '../interfaces';

export const getChillnews = () => {
    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${localStorage.getItem('jwt')}`
    }

    return {
        call : axios.get(`${API_URL}/chill-news`, { headers }),
        controller
    }
}

export const getChillNewById = ( id : string ) => {
    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${localStorage.getItem('jwt')}`
    }

    return {
        call : axios.get(`${API_URL}/chill-news/${id}`, { headers }),
        controller
    }
}

export const addChillNew = ( data : IChillNewApi ) => {
    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${localStorage.getItem('jwt')}`
    }

    return {
        call : axios.post(`${API_URL}/chill-news` , data , { headers }),
        controller
    }
}

export const updateChillNew = ( data : IChillNewApi, id : string ) => {
    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${localStorage.getItem('jwt')}`
    }

    return {
        call : axios.post(`${API_URL}/chill-news/${id}` , data , { headers }),
        controller
    }
}

export const removeChillNew = ( id : string ) => {
    const controller = LoadAbort();

    const headers = {
        Authorization : `Bearer ${localStorage.getItem('jwt')}`
    }

    return {
        call : axios.post(`${API_URL}/chill-news/${id}`, { headers }),
        controller
    }
}