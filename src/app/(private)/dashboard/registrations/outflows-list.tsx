'use client'
import { useEffect, useState } from "react"
import BoxList from "./box-list";
import { useAuth } from "@/contexts/auth.context";
import { getCurrentMonthOutflows, OutflowWithCategory } from "./fetchs";
import { formatDateToBR } from "@/app/api/server/utils/date";

export default function OutflowsList() {

    const [outflows, setOutflows] = useState<OutflowWithCategory[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchs = async () => {
            setLoading(true)
            const data = await getCurrentMonthOutflows();
            setOutflows(data);
            setLoading(false);
        }

        fetchs()
    }, [])

    const { user } = useAuth();
    return (
        <div>
            {user?.isAdmin ? (
                <>
                    {outflows.length === 0 && !loading && <p className="text-center w-full mt-10">Sem saídas no momento</p>}
                    {outflows.length === 0 && loading && <p className="text-center w-full mt-10">Carregando lista...</p>}
                    {outflows.map((outf, i) => (
                        <div key={i} className="mt-3">
                            <BoxList
                                date={formatDateToBR(outf.dateOutflow)}
                                title={outf.category.name}
                                description={outf.description}
                                type="subtraction"
                                value={outf.value}
                                id={outf.id!}
                                key={i+1}
                                donationMethod="pix"
                            />
                        </div>
                    ))}
                </>
            ) : <p className="text-center mt-10">Nada para se ver aqui...👀</p>
            }

        </div>
    )
}