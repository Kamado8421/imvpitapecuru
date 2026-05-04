"use client";

import { useEffect, useState } from "react";
import HeaderPage from "@/components/header-page";
import WhiteBox from "@/components/white-box";

type Entry = {
    title: string;
    total: number;
};

type Outflow = {
    description: string;
    total: number;
};

type Report = {
    entries: Entry[];
    outflows: Outflow[];
    totalEntries: number;
    totalOutflows: number;
    totalGeral: number;
};

export default function RelatoryPage() {
    const [data, setData] = useState<Report | null>(null);
    const [loading, setLoading] = useState(true);

    const now = new Date();
    const mesAno = now.toLocaleDateString("pt-BR", {
        month: "numeric",
        year: "numeric",
    });

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch("/api/relatory", {
                    method: "POST",
                });

                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error(err);
            } finally {
                setTimeout(() =>  setLoading(false), 2500);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center">
                Gerando relatório...
            </div>
        );
    }

    if (!data) {
        return (
            <div className="h-screen flex items-center justify-center">
                Erro ao carregar relatório
            </div>
        );
    }

    const entriesFiltered = data.entries.filter((e) => e.total > 0);
    const outflowsFiltered = data.outflows.filter((o) => o.total > 0);

    return (
        <div className="h-screen p-4 md:p-6">
            <HeaderPage title={`Relatório | ${mesAno}`} />

            <br />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* ENTRADAS */}
                <WhiteBox>
                    <h2 className="text-lg font-semibold mb-4">
                        Resumo de Entradas
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="pb-2">Descrição</th>
                                    <th className="pb-2 text-right">Valor</th>
                                </tr>
                            </thead>

                            <tbody>
                                {entriesFiltered.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2">{item.title}</td>
                                        <td className="py-2 text-right">
                                            {item.total.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </td>
                                    </tr>
                                ))}

                                <tr className="font-bold">
                                    <td className="pt-3">Total</td>
                                    <td className="pt-3 text-right">
                                        {data.totalEntries.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </WhiteBox>

                {/* SAÍDAS */}
                <WhiteBox>
                    <h2 className="text-lg font-semibold mb-4">
                        Resumo de Saídas
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b text-left">
                                    <th className="pb-2">Descrição</th>
                                    <th className="pb-2 text-right">Valor</th>
                                </tr>
                            </thead>

                            <tbody>
                                {outflowsFiltered.map((item, index) => (
                                    <tr key={index} className="border-b">
                                        <td className="py-2">{item.description}</td>
                                        <td className="py-2 text-right">
                                            {item.total.toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </td>
                                    </tr>
                                ))}

                                <tr className="font-bold">
                                    <td className="pt-3">Total</td>
                                    <td className="pt-3 text-right">
                                        {data.totalOutflows.toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </WhiteBox>
            </div>

            {/* TOTAL GERAL */}
            <div className="mt-6">
                <WhiteBox>
                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Geral</span>
                        <span>
                            {data.totalGeral.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </span>
                    </div>
                </WhiteBox>
            </div>
        </div>
    );
}