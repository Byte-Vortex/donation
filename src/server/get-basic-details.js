import { makeRequest } from "@/lib/fetch";

export async function getBasicDetails(){
    const response = await makeRequest("/basicdetails/");
    return response.data;
}