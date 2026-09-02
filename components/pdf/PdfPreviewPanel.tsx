"use client"

import { ResumeDataType } from "@/app/data/data"
import dynamic from "next/dynamic"
import { ResumePdfDocumnet } from "./ResumePdfDocument"
import { Button } from "../ui/button"


const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((m) => m.PDFViewer),
    { ssr: false }
);
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((m) => m.PDFDownloadLink),
    { ssr: false }
);

interface PdfPreviewPanelProps {
    data: ResumeDataType,
    sectionOrder?: string[]
}

export default function PdfPreviewPanel(
    {
        data,
        sectionOrder
    }: PdfPreviewPanelProps
) {
    //document 
    const doc = <ResumePdfDocumnet data={data} sectionOrder={sectionOrder} />

    const fileName = `${data.profile.name.replace(/\s+/g, "_")}_Resume.pdf`;


    return (
        <div>
            <PDFDownloadLink document={doc} fileName={fileName}>
                {
                    ({ loading }: { loading: boolean }) => (
                        <Button disabled={loading}>
                            {loading ? "Generating..." : "Download PDF"}
                        </Button>
                    )
                }
            </PDFDownloadLink>

            <div>
                <PDFViewer width="100%" height="100%" showToolbar={false}>
                    {doc}
                </PDFViewer>
            </div>

            {/* Mobile fallback */}
            <div className="flex-1 md:hidden flex flex-col items-center justify-center gap-4 p-8">
                <p className="text-sm text-zinc-500 text-center">
                    PDF preview is available on desktop.
                    Tap the button above to download your resume.
                </p>
            </div>
        </div>
    )
}