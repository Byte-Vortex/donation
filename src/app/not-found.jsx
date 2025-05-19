import Link from "next/link"
import { Header } from "./(public)/(home)/_components/header"
import { Footer } from "@/components/footer/footer"

export default function NotFoundPage() {
    return (
        <>
        <Header/>
        <div className="text-center min-h-[80vh] flex items-center justify-center flex-col">
            <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
            <p className="mb-4 text-lg text-gray-600">Oops! Looks like you&apos;re lost.</p>
            <div className="animate-bounce">
                <svg className="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
            </div>
            <p className="mt-4 text-gray-600">Let&apos;s get you back <Link href="/" className="text-primary hover:underline">home</Link>.</p>
        </div>
        <Footer/>
        </>
    )
}