import { makeRequest } from "@/lib/fetch";

export async function getDonationPageDetails(){
    const response = await makeRequest("/donation/donationhomepage/");
    return response.data;
}