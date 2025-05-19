// app/thankyou/page.jsx

import { ThankYouClient } from "./client";
import { Footer } from "@/components/footer/footer";

export default function ThankYouPage({ searchParams }) {
    const token = searchParams.token;

    return (
        <>
            <ThankYouClient token={token} >
                <Footer />
            </ThankYouClient>
        </>
    );
}
