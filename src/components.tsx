type FielProps = {
    label: string; id: string; value: string;
    onChange: (v:string) => void; type?:string; error?:string; 
};
export function Field({label, id, value, onChange, type="text", error}:FielProps)

{
    return (
        <div className="flex flex-col gap-1"> 
        <label htmlFor={id}>{label}</label>
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} className="input" />
        {error && <p className="text-red-600 text-sm">{error}</p>}

        </div>
    );
}

type Option = {value: string; label: string};

type selectProps = {
    label: string; id: string; value: string;
    onChange: (v:string) => void; options: Option[]; error?:string;
};

export function select({label, id, value, onChange, options, error }: selectProps)
{
    return (
        <div className="Flex flex-col gap-1">
            <label htmlFor={id} >{label}</label>
            <select id = {id} value = {value} onChange = {(e) => onChange(e.target.value)} className="input"><option value="">--selecciona--</option>{options.map((o) => <option key = {o.value} value = {o.value}>{o.label}</option>
            )}</select>
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    );
}

type PaginationProps = {
    page: number; totalPages: number; onChange: (page:number) => void
};

export function Pagination({page, totalPages, onChange}:PaginationProps){
return (
    <div role="group" aria-label="Pagination" className="flex gap-4 items-center justify-center mt-4">
        <button className="btn" disabled={page <= 1 || totalPages === 0} onClick={() => onChange(page - 1)}>Anterior</button>
        <span>Pagina {page} de {totalPages}</span>
        <button className="btn" disabled={page >= totalPages} onClick={() => onChange(page + 1)}>Siguiente</button>
    </div>
);
}
