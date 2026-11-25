import useEffect, useState from 'react';
import {Link} from 'react-router-dom';
import {api} from '../api';
import {Field} from '../components';
import { useState } from 'react';
export default function List() {
    const [Page, setPage] = useState(1);
    const [data, setData] = useState(<any>)null);
    const [retry, setRetry] = useState(0);
    useEffect(() => {
            setData(null); 
            setError(false);
            api.get(`/activities?page=${Page}`).then((res) => {
                setData(res.data);
                .catch (()= > setError(true));
            }, [Page, retry]);
            if (error) return <div className="text-red-500">Error al cargar los datos. <button onClick={() => setRetry(retry + 1)} className="text-blue-600 underline">Reintentar</button></div>;
            if (!data) return <div>Cargando...</div>;
            return (

                <div className="grid gap-3">
                    {data.items.map((it:any) => (
                        <Link key={it.id} to={`/activities/${it.id}`} className="card">
                            <h2 className="text-lg font-bold">{it.name}</h2>
                            )}




                    