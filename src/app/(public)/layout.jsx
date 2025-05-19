import { FormStoreProvider } from "@/components/misc/_store/form-store";
import Wrapper from "@/components/wrapper";
import { WebVitals } from "./_components/web-vitals";

export default function Layout({ children }) {
    return (
        <FormStoreProvider>
            {/* <WebVitals /> */}
            <div className="z-[1000]">
            {children}
            </div>
            <Wrapper/>
        </FormStoreProvider>
    )
}