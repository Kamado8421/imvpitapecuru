'use client';

import TabBar from "@/components/tab-bar";
import { useAuth } from "@/contexts/auth.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


export default function Layout({ children }: { children: React.ReactNode }) {

    const { fetchUserData, user } = useAuth()
    const router = useRouter();
    useEffect(() => {

        const check = async () => {
            const success = await fetchUserData();

            if (!success) {
                router.replace('/login')
            }
        }

        check();
    }, [user]);

    return (
        <div className="bg-[#F6F9F7] max-h-screen flex flex-col">
            <div className="flex-1 overflow-y-auto h-screen hide-scrollbar">
                {children}
            </div>
            <TabBar />
        </div>
    );

}