'use client'
import { useEffect, useState } from "react"
import BoxList from "./box-list";
import { EntrieWithEventType, getCurrentMonthEntries } from "./fetchs";
import { formatDateToBR } from "@/app/api/server/utils/date";

export default function EntriesList() {

    const [entries, setEntries] = useState<EntrieWithEventType[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchs = async () => {
            setLoading(true)
            const data = await getCurrentMonthEntries();
            setEntries(data);
            setLoading(false);
        }

        fetchs()
    }, [])


    return (
        <div>

            {entries.length === 0 && !loading && <p className="text-center w-full mt-10">Sem Entradas no momento</p>}
            {entries.length === 0 && loading && <p className="text-center w-full mt-10">Carregando lista...</p>}
            {entries.map((e, i) => (
                <div className="mt-3" key={e.id}>
                    <BoxList
                        date={formatDateToBR(e.eventDate)}
                        title={e.eventType?.name}
                        entrie={e.entrieType === 'DIZIMO' ? 'dizimo' : 'oferta'}
                        type="addition"
                        id={e.id}
                        value={e.value}
                        key={i}
                        donationMethod={e.entrieChannel === 'PIX' ? 'pix' : 'especie'}
                    />
                </div>

            ))}

            <br />
        </div>
    )
}