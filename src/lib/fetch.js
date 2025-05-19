import { notFound } from "next/navigation";

/*
A simple wrapper over the fetch api,
by default we are preventing the cache behavior of next js, can easily add a option to
enable it if needed.
*/
export async function makeRequest(endpoint = "/", options = { method: 'GET', data: {} }) {

    let { method, data } = options;
    method = method.toUpperCase();

    const fetchOptions = {
        // cache: "no-cache",
        revalidate: 0,
        method: method,
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
            'Accept': 'application/json; charset=UTF-8',
            'Content-Type': 'application/json'
        }
    }
    if (method === 'GET' || method === 'HEAD') {
        delete fetchOptions.body;
    }

    const res = await fetch(
        process.env.NEXT_PUBLIC_API_URL + endpoint,
        fetchOptions
    )

    if (res.status >= 400) {
        // This will activate the closest `error.js` Error Boundary
        if (res.status === 404) {
            notFound()
        } else {
            throw new Error('Failed to fetch data')
        }
    }

    return res.json();
}