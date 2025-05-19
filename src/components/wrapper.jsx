"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ContributorsToast } from "@/components/contributors-toast";

const Wrapper = ({ children }) => {
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const hiddenPaths = ["/check-out/", "/thank-you/"];
    const shouldHide = hiddenPaths.some((path) => pathname.startsWith(path));
    setShowToast(!shouldHide);
  }, [pathname]);

  return (
    <>
      {children}
      {showToast && <ContributorsToast />}
    </>
  );
};

export default Wrapper;

