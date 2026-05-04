import { ArrowLeftIcon, ChevronRight, ListIcon, MinusCircleIcon, PlusCircleIcon } from "lucide-react";

export default function ActionsButton() {
    return (
        <div>
            <a href="/dashboard/entries" className="bg-white border border-gray-400 rounded-2xl p-5 mt-3 flex items-center justify-between hover:bg-gray-100">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-[#3b9b6e] flex items-center justify-center rounded-md">
                        <PlusCircleIcon color="white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Cadastrar Entradas</span>
                        <span className="text-[12px] text-gray-500">Dízimos e ofertas</span>
                    </div>
                </div>
                <ChevronRight color="gray" />
            </a>

            <a href="/dashboard/outflows" className="bg-white border border-gray-400 rounded-2xl p-5 mt-3 flex items-center justify-between hover:bg-gray-100">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-red-500 flex items-center justify-center rounded-md">
                        <MinusCircleIcon color="white" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Registrar Saídas</span>
                        <span className="text-[12px] text-gray-500">Despesas e pagamentos</span>
                    </div>
                </div>
                <ChevronRight color="gray" />
            </a>

            <a href="/dashboard/registrations" className="bg-white border border-gray-400 rounded-2xl p-5 mt-3 flex items-center justify-between hover:bg-gray-100">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 bg-gray-200 flex items-center justify-center rounded-md">
                        <ListIcon color="gray" />
                    </div>
                    <div className="flex flex-col">
                        <span className="font-semibold">Ver Registros</span>
                        <span className="text-[12px] text-gray-500">Entradas e saídas</span>
                    </div>
                </div>
                <ChevronRight color="gray" />
            </a>
        </div>
    )
}