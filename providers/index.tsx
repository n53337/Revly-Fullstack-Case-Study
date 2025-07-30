"use client";
import AntPoviders from "@/providers/ant.provider";
import QueryProvider from "@/providers/query.provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <AntPoviders>
            <QueryProvider>
                {children}
            </QueryProvider>
        </AntPoviders>
    );
};