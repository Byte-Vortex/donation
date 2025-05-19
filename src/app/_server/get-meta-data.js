export async function getMetaData(slug="global") {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/donation/meta_data/", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            slug,
        })
    });
    const res = await response.json();

    return res.data;
}