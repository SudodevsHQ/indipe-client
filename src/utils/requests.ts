export async function fetchRequest(url: string, tokenId: string) {
    try {
        const headers = {
            Authorization: tokenId,
        };

        const response = await fetch(url, { headers: headers });

        if (!response.ok) {
            throw new Error('Fetch request failed');
        }
        const data = await response.json;

        return data;
    } catch (error) {
        console.log('\x1b[41m%s\x1b[0m', 'requests.ts line:10 error', error);
        return error;
    }
}
