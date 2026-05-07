'use client';

import { useAuth } from "@/contexts/auth.context";
import GeneralReport from "./general-report";
import ActionsButton from "./actions-button";

export default function DashboardPage() {

    const { user } = useAuth();

    return (
        <div className="h-screen px-5">
            <h1 className="text-2xl font-semibold mt-10 mb-5">Olá, {user?.firstName} 👋</h1>
            <span className="text-gray-500 font-semibold">RESUMO DO MÊS</span>
            <GeneralReport />
            <br />
            <span className="text-gray-500 font-semibold">AÇÕES RÁPIDAS</span>
            <ActionsButton admin={user.isAdmin}/>
        </div>
    )
}
