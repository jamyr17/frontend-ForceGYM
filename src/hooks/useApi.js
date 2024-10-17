import { useState, useEffect, useCallback } from 'react'; 
import axios from 'axios';

export function useGetData(urlApi) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchData = useCallback(() => {
        if(!urlApi) return;
        setLoading(true);

        axios.get(urlApi)
            .then((response) => {
                setData(response.data.data);
            })
            .catch((error) => {
                setError(error);
                console.error("Error fetching data:", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [urlApi]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, refetchGet: fetchData, error };
}

export async function postData(urlApi, data){
    if(!urlApi || !data) return;
    
    try {
        const response = await axios.post(urlApi, data);
        return response.data.message;
    } catch (error) {
        return null; 
    }

}

export async function putData(urlApi, data){
    if(!urlApi || !data) return;
    
    try {
        const response = await axios.put(urlApi, data);
        return response.data.message;
    } catch (error) {
        return null; 
    }

}

export async function deleteData(urlApi, data){
    if(!urlApi || !data) return;
    
    try {
        const response = await axios.delete(urlApi, data);
        return response.data.message;
    } catch (error) {
        return null; 
    }

}
