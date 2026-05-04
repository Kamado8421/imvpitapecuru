'use client';

import HeaderPage from "@/components/header-page";
import { InfoIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import WhiteBox from "@/components/white-box";
import { getCurrentMonthYear } from "@/app/api/server/utils";
import { createOutflow, getOutflowsCategories } from "./fetchs";
import { OutflowsCategoryType } from "@/app/api/server/types/database-tables.type";

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

export default function OutflowsPage() {

    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState('');
    const [date, setDate] = useState('');
    const [categories, setCategories] = useState<OutflowsCategoryType[]>([]);

    useEffect(() => {
        const today = new Date();

        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        setDate(formattedDate);

        const fetchs = async () => {
            const dataCategories = await getOutflowsCategories();
            setCategories(dataCategories)
        }

        fetchs();
    }, []);

    async function handleRegister() {

        const result = outflowSchema.safeParse({
            description,
            category,
            value,
            date,
        });

        if (!result.success) {
            result.error.issues.forEach(err => {
                toast.error(err.message);
            });
            return;
        }

        const [year, month] = date.split('-');

        const today = new Date();
        const currentYear = String(today.getFullYear());
        const currentMonth = String(today.getMonth() + 1).padStart(2, '0');

        if (year !== currentYear) {
            return toast.error(`O ano da data deve ser ${currentYear}`);
        }

        if (month !== currentMonth) {
            return toast.error(`O mês da data deve ser o atual (${currentMonth})`);
        }

        if (!category) {
            return toast.error(`Selecione uma categoria!`);
        }

        try {
            // 👉 você implementa 
            const success = await createOutflow({
                value: Number(value),
                description,
                categoryId: parseInt(category),
                dateOutflow: date
            });

            if (!success) {
                toast.error('Algo deu errado, verifique o formulário e tente novamente');
                setTimeout(() => toast.warning('Se persistir, contate o Desenvolvedor'), 3000);
                return;
            }

            toast.success('Saída registrada com sucesso');

            // limpa tudo (aqui pode limpar geral mesmo)
            setDescription('');
            setCategory('');
            setValue('');
            setDate('');

        } catch (error) {
            toast.error('Erro ao registrar saída');
        }
    }

    return (
        <div className="h-screen">
            <HeaderPage title="Registrar Saída" />

            <div className="px-5 mt-5">
                <div className="bg-[#3b9b6e1a] w-full rounded-2xl flex items-center gap-3 p-4">
                    <InfoIcon color="#3b9b6e" />
                    <span className="text-[14px] text-gray-600">
                        Esta saída será vinculada ao mês de <span className="font-semibold text-black">{getCurrentMonthYear()}.</span>
                    </span>
                </div>

                <br />

                <WhiteBox>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="font-medium text-[14px] text-gray-500">
                            Descrição
                        </label>
                        <textarea
                            id="description"
                            placeholder="Ex: Compras básicas de casa"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="bg-[#F6F9F7] border outline-[#3b9b6e] h-20 max-h-20 border-gray-400 p-2 rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="category" className="font-medium text-[14px] text-gray-500">
                            Categoria
                        </label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="bg-[#F6F9F7] border outline-[#3b9b6e] border-gray-400 p-2 rounded-lg"
                        >
                            <option value="">Selecione a categoria</option>
                            {categories.map((c, i) => <option key={i} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="value" className="font-medium text-[14px] text-gray-500">
                            Valor R$
                        </label>
                        <input
                            id="value"
                            type="number"
                            placeholder="R$ 0,00"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            className="bg-[#F6F9F7] border outline-[#3b9b6e] border-gray-400 p-2 rounded-lg"
                        />
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="date" className="font-medium text-[14px] text-gray-500">
                            Data de Saída
                        </label>
                        <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-[#F6F9F7] border outline-[#3b9b6e] border-gray-400 p-2 rounded-lg"
                        />
                    </div>

                    <button
                        onClick={handleRegister}
                        className="w-full text-white font-semibold cursor-pointer bg-red-500 hover:bg-red-800 p-3 rounded-lg mt-5"
                    >
                        Registrar Saída
                    </button>
                </WhiteBox>
            </div>
        </div>
    )
}