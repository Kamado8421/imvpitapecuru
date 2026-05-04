'use client';

import HeaderPage from "@/components/header-page";
import WhiteBox from "@/components/white-box";
import { ChurchIcon, HandCoinsIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { EventType } from "@/app/api/server/types/database-tables.type";
import { createEntrie, getEventTypes } from "./fetchs";

const entrySchema = z.object({
    value: z.coerce
        .number({ message: 'Informe um valor válido' })
        .positive('O valor deve ser maior que R$ 0.00'),

    type: z.enum(['oferta', 'dizimo'], {
        message: 'Selecione o tipo (Oferta ou Dízimo)'
    }),

    paymentMethod: z.enum(['ESPECIE', 'PIX'], {
        message: 'Selecione a forma de entrada'
    }),
});

export default function EntriesPage() {

    // EVENTO (não limpa)
    const [eventType, setEventType] = useState('');
    const [eventDate, setEventDate] = useState('');

    // ENTRADA (vai limpar)
    const [value, setValue] = useState('');
    const [type, setType] = useState<'oferta' | 'dizimo' | 'gerais' | ''>('');
    const [paymentMethod, setPaymentMethod] = useState('');

    const [events, setEvents] = useState<EventType[] | null>(null);

    useEffect(() => {
        const fetchs = async () => {
            const dataEvents = await getEventTypes();
            setEvents(dataEvents);
        }

        const date = new Date();
        const dd = date.getDate();
        const mm = date.getMonth() + 1;
        const yy = date.getFullYear();

        setEventDate(`${yy}-${mm < 10 ? '0' + mm : mm}-${dd < 10 ? '0' + dd : dd}`);

        fetchs();
    }, [])

    async function handleRegister() {

        if (!eventType) {
            return toast.error('Selecione o Evento da Igreja')
        }

        if (!eventDate) {
            return toast.error('Verifique a data informada');
        }

        const mm = new Date().getMonth() + 1;
        const month = eventDate.split('-')[1]
        if (month !== (mm < 10 ? '0' + mm : mm)) {
            return toast.warning('A data precisa ser do mês ' + mm);
        }

        const parsedValue = Number(value);

        const result = entrySchema.safeParse({
            value: parsedValue,
            type,
            paymentMethod,
        });

        if (!result.success) {
            result.error.issues.forEach(err => {
                toast.error(err.message);
            });
            return;
        }

        try {

            const success = await createEntrie({
                entrieChannel: paymentMethod === 'PIX' ? 'PIX' : 'ESPECIE',
                entrieType: type === 'dizimo' ? 'DIZIMO' : type === 'oferta' ? 'OFERTA' : 'GERAIS',
                eventDate,
                eventTypeId: parseInt(eventType),
                value: parsedValue
            })

            if (!success) {
                toast.error('Algo deu errado, verifique o formulário e tente novamente');
                setTimeout(() => toast.warning('Se persistir, contate o Desenvolvedor'), 3000);
                return;
            }


            toast.success('Registrado com sucesso');

            // limpa SOMENTE os campos de entrada
            setValue('');
            setType('');
            setPaymentMethod('');

        } catch (error) {
            toast.error('Erro ao registrar entrada');
        }
    }

    return (
        <div className="h-screen">
            <HeaderPage title="Cadastrar Entrada" />

            <div className="px-5 mt-5">
                <WhiteBox>
                    <div className="flex items-center gap-2">
                        <ChurchIcon color="#3b9b6e" size={18} />
                        <span className="font-medium">Informações do Evento</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="event-type" className="font-medium text-[14px] text-gray-500">
                            Tipo de Evento
                        </label>
                        <select
                            id="event-type"
                            value={eventType}
                            onChange={(e) => setEventType(e.target.value)}
                            className="bg-[#F6F9F7] border outline-[#3b9b6e] border-gray-400 p-2 rounded-lg"
                        >
                            <option value="">Selecione o evento</option>
                            {events && events.map((e, i) => <option key={i} value={e.id}>{e.name}</option>)}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="event-date" className="font-medium text-[14px] text-gray-500">
                            Data do Evento
                        </label>
                        <input
                            id="event-date"
                            type="date"
                            value={eventDate}
                            onChange={(e) => setEventDate(e.target.value)}
                            className="bg-[#F6F9F7] border outline-[#3b9b6e] border-gray-400 p-2 rounded-lg"
                        />
                    </div>
                </WhiteBox>

                <br />

                <WhiteBox>
                    <div className="flex items-center gap-2">
                        <HandCoinsIcon color="#3b9b6e" size={18} />
                        <span className="font-medium">Informações da Entrada</span>
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

                    <div className="flex items-center gap-4 justify-start">
                        <div className="flex gap-2 items-center mt-5">
                            <input
                                id="oferta"
                                type="radio"
                                name="tipo-arrecadado"
                                value="oferta"
                                checked={type === 'oferta'}
                                onChange={() => setType('oferta')}
                            />
                            <label htmlFor="oferta" className="font-medium text-[14px] text-gray-500">
                                Oferta
                            </label>
                        </div>

                        <div className="flex gap-2 items-center mt-5">
                            <input
                                id="dizimo"
                                type="radio"
                                name="tipo-arrecadado"
                                value="dizimo"
                                checked={type === 'dizimo'}
                                onChange={() => setType('dizimo')}
                            />
                            <label htmlFor="dizimo" className="font-medium text-[14px] text-gray-500">
                                Dízimo
                            </label>
                        </div>

                        <div className="flex gap-2 items-center mt-5">
                            <input
                                id="gerais"
                                type="radio"
                                name="tipo-arrecadado"
                                value="gerais"
                                checked={type === 'gerais'}
                                onChange={() => setType('gerais')}
                            />
                            <label htmlFor="gerais" className="font-medium text-[14px] text-gray-500">
                                Ofertas Gerais
                            </label>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-5">
                        <label htmlFor="payment" className="font-medium text-[14px] text-gray-500">
                            O valor foi arrecadado em:
                        </label>
                        <select
                            id="payment"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="bg-[#F6F9F7] border outline-[#3b9b6e] border-gray-400 p-2 rounded-lg"
                        >
                            <option value="">Selecione o tipo</option>
                            <option value="ESPECIE">Espécie</option>
                            <option value="PIX">Pix</option>
                        </select>
                    </div>

                    <button
                        onClick={handleRegister}
                        className="w-full text-white font-semibold cursor-pointer bg-[#3b9b6e] hover:bg-[#237750] p-3 rounded-lg mt-5"
                    >
                        Registrar Entrada
                    </button>
                </WhiteBox>
            </div>
        </div>
    )
}