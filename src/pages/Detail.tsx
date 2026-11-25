import {useEffect, useState} from "react";
import {link, useParams} from "react-router-dom";
import {api, errorInfo } from "../components";
import{select} from "../components";
type experiencia = {"BEGINNER, "INTERMEDIATE", "ADVANCED"};
const LEVELS: {value: Level; label: string}[] = [ //aqui solicito el nivel de experiencia para luego validar y mostar el error junto al campo
    {value: "BEGINNER", label: "Principiante"},
    {value: "INTERMEDIATE", label: "Intermedio"},
    {value: "ADVANCED", label: "Avanzado"},

];

Export default function DetailPage() {
    const {id} = useParams();
    const [detail, setLevel] = UseState<any>(null);
    const [level, setLevel] = useState<Level>("BEGINNER");
    const [msg, setMsg] = useState("");
    const [error, setError] = useState("");
    const [sending, setSending] = useState(false);
    const load = () => api.get(`/activities/${id}`).then((res) => setDetail(res.data)).catch(() => setError("Error al cargar los datos")); // en activities id obtengo el registro por id
    //y muestro el nomnbre, descripcion, fecha, ubicacion y vacantes

    useEffect(() => {load();}, [id]);
    const submit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLevelError(level?"": "Seleccione un nivel de experiencia");
        //luego confirmo que se envio un formulario a la api, que se muestre la confirmacion y vuelva a consultar los datos del detalle para ver estado actual, el boton permanece desahibilitado en la perticion 



        if (!level) return;
        setSending(true);
        try {
            await api.post(`/activities/${id}/register`, {level});
            setMsg("Registro exitoso");
            load();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.code === "ALREADY_ENROLLED") {
                setMsg("Ya estás registrado en esta actividad");
            } else {
                setError("Error al registrar");
            }
        }
        setSending(false);
    };
    if (!detail) return <div>Cargando...</div>;
    return (
        <div className="max-w-md mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{detail.name}</h1>
            <p className="mb-2">{detail.description}</p>
            <p className="mb-2">Fecha: {detail.date}</p>
            <p className="mb-2">Ubicación: {detail.location}</p>
            <p className="mb-2">Vacantes: {detail.vacancies}</p>
            return (
                <form onSubmit={submit} className="flex flex-col gap-4">
                    <select label="Nivel de experiencia" id="level" value={level} onChange={(v) => setLevel(v)} options={LEVELS} error={levelError} />
                    <button type="submit" className="btn" disabled={sending}>Registrarse</button>
                    {msg && <p className="text-green-600">{msg}</p>}
                    {error && <p className="text-red-600">{error}</p>}
                </form>
            );
        </div>
    );
}