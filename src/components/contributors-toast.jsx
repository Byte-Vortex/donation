"use client";

import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "@/lib/fetch";
import { useCallback, useEffect, useRef } from "react";
import { formatDistanceToNow, differenceInMinutes } from "date-fns";
import { formatIndianCurrency } from "@/lib/utils";
import { usePathname } from "next/navigation";

function sortContributors(data) {
  let thirtyMinutes = [];
  let others = [];

  for (let item of data) {
    if (differenceInMinutes(new Date(), new Date(item.date)) < 30)
      thirtyMinutes.push(item);
    else others.push(item);
  }

  thirtyMinutes = thirtyMinutes.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  for (let i = 0; i < others.length; i++) {
    let currentLength = others.length - i;
    let randomIndex = Math.floor(Math.random() * currentLength);
    let temp = others[randomIndex];
    others[randomIndex] = others[currentLength - 1];
    others[currentLength - 1] = temp;
  }

  return [...thirtyMinutes, ...others];
}

export function ContributorsToast() {
  const toastGenerationStarted = useRef(false);
  const showToast = useRef(true);

  // We'll still use usePathname for initial logging and dependency changes,
  // but inside our async functions we'll refer to window.location.pathname.
  const pathname = usePathname();

  const donationIndex = useRef(0);
  const squarefeetIndex = useRef(0);

  const query = useQuery({
    queryKey: ["recent-contributors"],
    queryFn: async () => {
      const res = await makeRequest("/recentcontributors");
      return {
        donations: sortContributors(res.data[0]),
        squarefeetDonations: sortContributors(res.data[1]),
      };
    },
  });

  const displayToast = useCallback(
    (data) => {
      const currentPath = window.location.pathname;
      if (currentPath.startsWith("/check-out")) {
        return Promise.resolve();
      }

      return new Promise((resolve) => {
        let word = "";
        if (differenceInMinutes(new Date(), new Date(data.date)) < 30) {
          word = formatDistanceToNow(new Date(data.date), { addSuffix: true });
        } else {
          word = "recently!";
        }

        toast.info(
          <div>
            <div>
              <span className="font-bold">{data.name}</span> donated{" "}
              <span className="font-bold">
                {formatIndianCurrency(data.amount, {
                  maximumFractionDigits: 0,
                })}
              </span>{" "}
              {word}
            </div>
          </div>,
          {
            duration: 5000,
            position: "bottom-left",
            onAutoClose: () => {
              resolve();
            },
            onDismiss: () => {
              showToast.current = false;
              resolve();
            },
          }
        );
      });
    },
    [] // no need for pathname in dependency now
  );

  const generateToast = useCallback(async () => {
    const currentPath = window.location.pathname;
    if (
      currentPath.startsWith("/check-out") ||
      currentPath.startsWith("/checkout")
    ) {
      return;
    }
    if (!showToast.current) {
      return;
    }

    while (
      donationIndex.current < query.data?.donations.length ||
      squarefeetIndex.current < query.data?.squarefeetDonations.length
    ) {
      // Check live pathname at each iteration
      const livePath = window.location.pathname;
      if (
        livePath.startsWith("/check-out") ||
        livePath.startsWith("/checkout")
      ) {
        break;
      }
      if (!showToast.current) {
        break;
      }

      const random = Math.random();
      const showNormalDonationToast =
        random < 0.5 &&
        donationIndex.current < query.data.donations.length &&
        !livePath.startsWith("/c/");

      let toastData = null;
      if (showNormalDonationToast) {
        toastData = query.data.donations[donationIndex.current];
        donationIndex.current++;
      } else if (
        squarefeetIndex.current < query.data.squarefeetDonations.length
      ) {
        toastData = query.data.squarefeetDonations[squarefeetIndex.current];
        squarefeetIndex.current++;
      }

      if (toastData) {
        await displayToast(toastData);
      }

      // Delay between toasts
      await new Promise((res) => setTimeout(res, 2000));
    }
  }, [query.data, displayToast]);

  useEffect(() => {
    if (!query.data || toastGenerationStarted.current) {
      return;
    }
    toastGenerationStarted.current = true;
    if (!window.location.pathname.startsWith("/check-out")) {
      generateToast();
    } else {
    }
  }, [query.data, generateToast]);

  return null;
}
