"use client"
import { Toaster } from "sonner";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

export function ClientToaster() {

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])
    return (
        mounted && createPortal(
            <Toaster richColors theme="dark" className="mb-[35px] min-[900px]:mb-5"  toastOptions={{
                className:
                  "text-xs px-3 py-3 rounded-xl w-fit max-w-[75vw]"
              }}/>
            ,
            document.body
        )

    )
}