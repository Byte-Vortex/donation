"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Image } from "@/components/image";
import CheckoutImage from "@/assets/images/checkOut.png";
import { Button } from "@/components/ui/button";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPrompt, setShowPrompt] = useState(false);
  const ref = useRef();
  const canGoBack = useRef(false);
  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "start",
    });
  }, []);

  useEffect(() => {
    const handlePopState = (e) => {
      if (canGoBack.current) {
        return;
      }
      event.preventDefault();
      setShowPrompt(true);
      window.history.pushState(null, "", window.location.href);
    };
    // Block back navigation
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  const allowBack = () => {
    canGoBack.current = true;
    window.history.back();
    window.history.back();
    setTimeout(() => {
      router.refresh();
    }, 800)
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      {showPrompt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-2xl text-center w-[4300px] md:max-w-md ">
            <div className="flex flex-col justify-center items-center mb-4">
              <Image
                src={CheckoutImage}
                alt="Checkout Image"
                className="w-auto h-32 "
              />
              <div className="h-1 bg-gray-300 w-32 rounded-full my-2"></div>
            </div>
            <h4 className="font-semibold">You were just few moments away from a great sacred act.</h4>
            <p className="text-sm text-gray-600 mt-2 mb-5">
              In the Skanda Purana it is said that by donating for the construction of a temple delivers oneself from sins committed in seven births.<br />
              Please donate now !

            </p>
            <div className="flex justify-center gap-4 ">
              <Button onClick={allowBack}
                className="bg-gray-200 px-4 py-2 rounded font-semibold"
              >
                Hopefully Next Time
              </Button>
              <Button
                className="bg-gradient-to-r from-purple-700 to-blue-500 text-white px-4 py-2 rounded font-semibold "
                onClick={() => setShowPrompt(false)}

              >
                Yes ! I Wish to Serve
              </Button>
            </div>
            <div className="pt-4">
              <Button onClick={allowBack} variant="link" className="font-semibold text-sm">Update Seva
              </Button></div>
          </div>
        </div>
      )}

      <iframe
        ref={ref}
        src={`https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction&merchant_id=${searchParams.get(
          "merchant_id"
        )}&encRequest=${searchParams.get(
          "encRequest"
        )}&access_code=${searchParams.get("accessCode")}`}
        className="w-full bg-white h-[96vh] rounded-3xl shadow-md"
        id="paymentFrame"
      ></iframe>
    </div>
  );
}
