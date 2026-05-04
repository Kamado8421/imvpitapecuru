'use client';
import { formatCurrency } from "@/app/api/server/utils";
import { TrendingDownIcon, TrendingUpIcon, WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type DataType = {
    totalEntries: number,
    totalOutflows: number,
    balance: number
}

export default function GeneralReport() {

    const [data, setData] = useState<DataType | null | 'error'>(null);

    useEffect(() => {
        const fetchs = async () => {
            const res = await fetch('/api/dashboard', { method: 'GET', credentials: 'include' });

            if (!res.ok) {
                toast.error('Ocorreu um erro ao sicronizar os dados');
                return setData('error')
            }

            const data = await res.json() as DataType;

            setData(data)
        }

        fetchs();
    }, [])

    return (
        <div className="mt-2">
            <div className="flex justify-between gap-3">
                <div className="flex-1 bg-white border border-gray-400 rounded-2xl p-3  flex flex-col">
                    <div className="flex justify-between  items-center">
                        <span className="text-gray-500 text-[12px] font-semibold">ENTRADAS</span>
                        <div className="bg-[#2d775549] p-2 rounded-md">
                            <TrendingUpIcon size={20} color="#3b9b6e" />
                        </div>
                    </div>

                    {!data && <span>Buscando...</span>}
                    {data && data === 'error' && <span className="font-medium text-red-500">Erro de busca</span>}
                    {data && data !== 'error' && <span className="text-[20px] font-bold mt-4">{formatCurrency(data.totalEntries)}</span>}

                </div>

                <div className="flex-1 bg-white border border-gray-400 rounded-2xl p-3 flex flex-col">
                    <div className="flex justify-between  items-center">
                        <span className="text-gray-500 text-[12px] font-semibold">SAÍDAS</span>
                        <div className="bg-[#ff000027] p-2 rounded-md">
                            <TrendingDownIcon size={20} color="red" />
                        </div>
                    </div>

                    {!data && <span>Buscando...</span>}
                    {data && data === 'error' && <span className="font-medium text-red-500">Erro de busca</span>}
                    {data && data !== 'error' && <span className="text-[20px] font-bold mt-4">{formatCurrency(data.totalOutflows)}</span>}


                </div>

            </div>

            <div className="bg-white border border-gray-400 rounded-2xl p-5 mt-3 flex items-center justify-between">

                <div className="flex flex-col">
                    <span className="text-gray-500 text-[12px] font-semibold">POSSÍVEL SALDO ATUAL</span>


                    {!data && <span>Buscando...</span>}
                    {data && data === 'error' && <span className="font-medium text-red-500">Erro de busca</span>}
                    {data && data !== 'error' && <span className={`text-[24px] ${data.balance >= 0 ? 'text-[#3b9b6e]' : 'text-red-500'} font-bold mt-4`}>{formatCurrency(data.balance)}</span>}

                </div>

                <div className="bg-[#2d775549] p-2 rounded-md">
                    <WalletIcon size={32} color="#3b9b6e" />
                </div>
            </div>
        </div>
    )
}