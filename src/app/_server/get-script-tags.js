import { makeRequest } from "@/lib/fetch";

export async function getScriptTags(slug = "global") {

    try {
        const response = await makeRequest("/donation/header_scripts/", {
            method: "POST",
            data: {
                slug
            }
        })
        return response.data.scripts;
    } catch (error) {
        return [];
    }
}