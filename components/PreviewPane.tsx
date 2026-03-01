"use client";

import { useEffect, useState } from "react";
import { PDFViewer, PDFDownloadLink } from "@react-pdf/renderer";
import { ResumeDocument } from "./ResumeDocument";
import { ResumeData } from "../types/resume";
import { Download, Loader2 } from "lucide-react";

export function PreviewPane({ data }: { data: ResumeData }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-zinc-100 dark:bg-zinc-800/50 rounded-xl">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-400" />
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col h-screen overflow-hidden bg-zinc-100 dark:bg-zinc-950/50 p-4">
            <div className="mb-4 flex items-center justify-between px-2">
                <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Live Preview</h2>
                <PDFDownloadLink
                    document={<ResumeDocument data={data} />}
                    fileName={`${data.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`}
                    className="flex items-center gap-2 rounded-full bg-indigo-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 transition-colors"
                >
                    {({ loading }) => (
                        <>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                            {loading ? "Generating..." : "Download PDF"}
                        </>
                    )}
                </PDFDownloadLink>
            </div>

            <div className="flex-1 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xl">
                <PDFViewer width="100%" height="100%" className="border-none">
                    <ResumeDocument data={data} />
                </PDFViewer>
            </div>
        </div>
    );
}
