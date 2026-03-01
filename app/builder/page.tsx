"use client";

import { EditorPane } from "@/components/EditorPane";
import { PreviewPane } from "@/components/PreviewPane";
import { useResumeState } from "@/hooks/useResumeState";
import Link from "next/link";
import { ArrowLeft, Edit3, Eye } from "lucide-react";
import { useState } from "react";

export default function BuilderPage() {
    const hook = useResumeState();
    const [mobileView, setMobileView] = useState<"editor" | "preview">("editor");

    return (
        <div className="flex h-screen w-full flex-col overflow-hidden bg-white dark:bg-zinc-950 font-sans selection:bg-indigo-500/30">

            {/* Top Navbar */}
            <header className="flex h-14 shrink-0 items-center justify-between border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 px-4 md:px-6 backdrop-blur-md">
                <Link href="/" className="flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    <ArrowLeft className="h-4 w-4" /> Back home
                </Link>

                {/* Mobile View Toggle */}
                <div className="flex md:hidden rounded-lg bg-zinc-200 dark:bg-zinc-800 p-1">
                    <button
                        onClick={() => setMobileView("editor")}
                        className={`flex items-center gap-2 rounded px-3 py-1 text-xs font-medium transition-all ${mobileView === "editor" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-400"}`}
                    >
                        <Edit3 className="h-3 w-3" /> Edit
                    </button>
                    <button
                        onClick={() => setMobileView("preview")}
                        className={`flex items-center gap-2 rounded px-3 py-1 text-xs font-medium transition-all ${mobileView === "preview" ? "bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm" : "text-zinc-500 hover:text-zinc-400"}`}
                    >
                        <Eye className="h-3 w-3" /> Preview
                    </button>
                </div>

                <div className="hidden md:block text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                    Resumate Builder
                </div>
            </header>

            {/* Main Split Interface */}
            <main className="flex flex-1 overflow-hidden">

                {/* Editor Pane (Left on Desktop, toggled on Mobile) */}
                <div className={`flex-1 overflow-y-auto border-r border-zinc-200 dark:border-zinc-800 custom-scrollbar ${mobileView === "preview" ? "hidden md:block" : "block"}`}>
                    <EditorPane hook={hook} />
                </div>

                {/* Preview Pane (Right on Desktop, toggled on Mobile) */}
                <div className={`flex-1 bg-zinc-100 dark:bg-zinc-950/50 flex flex-col ${mobileView === "editor" ? "hidden md:flex" : "flex"}`}>
                    {hook.data && <PreviewPane data={hook.data} />}
                </div>

            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #3f3f46;
          border-radius: 20px;
        }
      `}} />
        </div>
    );
}
