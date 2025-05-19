import { makeRequest } from "@/lib/fetch";
import { getSlug } from "./slug-context";
export async function getCampaignDetails() {
    const pagename = getSlug() ?? "square-feet-seva";
    const response = await makeRequest("/donation/campaigndetails/" + pagename);
    return response.data;
}