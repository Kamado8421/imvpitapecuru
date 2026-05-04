'use client'
import { formatCurrency } from "@/app/api/server/utils";
import WhiteBox from "@/components/white-box";
import { ChevronDownIcon, ChevronRightIcon, MoveDownRightIcon, MoveUpRightIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { deleteEntrieById, deleteOutflowById } from "./fetchs";
import { toast } from "sonner";

export default function BoxList({ type, description, title, date, value, id, donationMethod: donation, entrie }: { type: 'addition' | 'subtraction', title: string, date: string, id: string, value: number, donationMethod: 'pix' | 'especie', entrie?: 'oferta' | 'dizimo', description?: string }) {

    const [expand, setExpand] = useState(false)

    async function handleDelete() {

        if (!confirm('Certeza que deseja deletar esse ítem?')) {
            return;
        }

        try {
            if (type === 'addition') {
                const res = await deleteEntrieById(id);

                if (res) {
                    return toast.success(`${title} Deletado com sucesso! Atualize a página`)
                }

                return toast.error('Não foi possível deletar esse ítem. Tente novamente.')
            }

            if(type === 'subtraction'){
                 const res = await deleteOutflowById(id);

                if (res) {
                    return toast.success(`${title} Deletado com sucesso! Atualize a página`)
                }

                return toast.error('Não foi possível deletar esse ítem. Tente novamente.')
            }
        } catch (error) {
            toast.warning('Algo deu errado! Se persistir, contato o desenvolvedor');
        }
    }

    return (
        <WhiteBox>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 flex items-center justify-center rounded-md ${type === 'addition' ? 'bg-[#2d775549] ' : 'bg-[#ff000027]'}`}>
                        {type === "addition" ? <MoveUpRightIcon color="#3b9b6e" /> : <MoveDownRightIcon color="red" />}
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[18px] font-semibold">{title}</span>
                        <span className="text-[14px] text-gray-400">{date}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <span className={`font-bold text-[18px] ${type === 'addition' ? 'text-[#3b9b6e]' : 'text-red-500'}`}>{type === 'addition' ? '+' : '-'} {formatCurrency(value)}</span>
                    <button onClick={() => setExpand(!expand)}>
                        {expand ? <ChevronDownIcon /> : <ChevronRightIcon />}
                    </button>
                </div>
            </div>
            {expand && <div>
                <br />
                {type === 'addition' ? <span>A entrada ({entrie}) foi em <strong>{donation}</strong></span> : <span><strong>Descrição: </strong> {description}</span>}
                <button onClick={handleDelete} className="w-full bg-[#ff000027] hover:bg-[#ff00004f] p-3 cursor-pointer  rounded-lg mt-2 flex items-center justify-center gap-3 text-red-500 font-semibold">
                    <Trash2Icon /> Excluir
                </button>
            </div>}
        </WhiteBox>
    )
}