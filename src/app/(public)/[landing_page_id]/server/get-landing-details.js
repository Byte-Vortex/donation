import { makeRequest } from "@/lib/fetch";
import { getSlug } from "./slug-context";
export async function getLandingDetails() {

    const response = await makeRequest("/donation/" + (getSlug() ?? ""));
    return response.data;
}