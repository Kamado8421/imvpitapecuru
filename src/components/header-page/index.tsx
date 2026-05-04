import { ArrowLeftIcon } from "lucide-react";

export default function HeaderPage({ title }: { title: string }) {
    return (
        <div className="bg-[#F6F9F7] w-full flex items-center justify-start border-b border-b-gray-200 px-5 py-3 gap-3 sticky top-0">
            <a href="/dashboard" className="h-10 w-10 rounded-md hover:bg-gray-300 bg-gray-200 flex items-center justify-center">
                <ArrowLeftIcon size={20} />
            </a>
            <h1 className="text-[20px] font-semibold">{title}</h1>
        </div>
    )
}