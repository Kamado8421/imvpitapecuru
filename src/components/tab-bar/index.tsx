'use client'
import { useAuth } from "@/contexts/auth.context";
import { HomeIcon, ListIcon, MinusCircleIcon, PlusCircleIcon } from "lucide-react"
import { usePathname } from "next/navigation"

const routes = [
    { title: 'Início', path: '/dashboard', Icon: HomeIcon, active: true, onlyAdmin: false },
    { title: 'Entrada', path: '/dashboard/entries', Icon: PlusCircleIcon, active: false, onlyAdmin: false },
    { title: 'Saída', path: '/dashboard/outflows', Icon: MinusCircleIcon, active: false, onlyAdmin: true },
    { title: 'Registros', path: '/dashboard/registrations', Icon: ListIcon, active: false },
]

export default function TabBar() {

    const currentPath = usePathname();
    const { user } = useAuth();

    return (
        <div className="bg-white border-t border-t-gray-300 px-3 py-2 flex items-center justify-around gap-1">
            {routes.map((r, i) => (
                !user?.isAdmin && r.onlyAdmin ? null : <a key={i} href={r.path} className={`flex text-[14px] font-medium flex-col items-center ${r.path.endsWith(currentPath) ? 'text-[#2d7754] bg-[#2d77555d]' : 'text-gray-600 bg-transparent'} flex-1 rounded-2xl py-2`}>
                    <r.Icon size={20} color={r.path.endsWith(currentPath) ? '#2d7754' : 'gray'} />
                    {r.title}
                </a>
            ))}
        </div>
    )
}