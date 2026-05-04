'use client';

import HeaderPage from "@/components/header-page";
import { DownloadIcon, FileBarChart2Icon, FileBarChartIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import WhiteBox from "@/components/white-box";
import { useAuth } from "@/contexts/auth.context";
import EntriesList from "./entries-list";
import OutflowsList from "./outflows-list";
import Link from "next/link";

const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

const outflowSchema = z.object({
    description: z
        .string()
        .min(3, 'A descrição deve ter pelo menos 3 caracteres'),

    category: z
        .string()
        .min(1, 'Selecione uma categoria'),

    value: z.coerce
        .number({ message: 'Informe um valor válido' })
        .positive('O valor deve ser maior que R$ 0,00'),

    date: z
        .string()
        .min(1, 'Selecione uma data'),
});

export default function RegistrationsPage() {


    const [month, setMonth] = useState('');

    const [screen, setScreen] = useState<'entradas' | 'saidas'>('entradas')

    useEffect(() => {
        const now = new Date();
        const monthName = monthNames[now.getMonth()];
        const year = now.getFullYear();
        setMonth(`${monthName} ${year}`);
    }, [])

    return (
        <div className="h-screen">
            <HeaderPage title="Registros" />

            <br />
            <div className="px-5">
                <WhiteBox>
                    <div className="flex items-center justify-between w-full">
                        <span className="font-semibold text-[18px]">{month}</span>
                        <Link href={'/dashboard/relatory'} className="flex gap-2 items-center text-white text-[14px] cursor-pointer bg-[#3b9b6e] p-2 rounded-md font-semibold"><FileBarChart2Icon /> Gerar Relatório</Link>
                    </div>
                </WhiteBox>
                <br />
                <div className="bg-gray-200 p-3 rounded-2xl flex items-center gap-2">
                    <button onClick={() => setScreen('entradas')} className={`${screen === 'entradas' ? 'text-black bg-white' : 'text-gray-500 bg-transparent'} rounded-lg p-2 flex-1 cursor-pointer hover:bg-gray-100`}>Entradas</button>
                    <button onClick={() => setScreen('saidas')} className={`${screen === 'saidas' ? 'text-black bg-white' : 'text-gray-500 bg-transparent'} rounded-lg p-2 flex-1 cursor-pointer hover:bg-gray-100`}>Saídas</button>
                </div>
                <br />
                {screen === 'entradas' ? <EntriesList /> : <OutflowsList />}
            </div>
        </div>
    )
}