export async function fetchRequest(url: string, tokenId: string) {
    try {
        const headers = {
            Authorization: tokenId,
        };

        const response = await fetch(url, { headers: headers });

        if (!response.ok) {
            throw new Error('Fetch request failed');
        }
        const data = await response.json();

        return data;
    } catch (error) {
        throw new Error(error?.message ?? 'Request failed');
    }
}

export async function postRequest(url: string, tokenId: string, payload?: any) {
    try {
        const headers = {
            Accept: 'application/json',
            Authorization: tokenId,
            'Content-Type': 'application/json',
        };

        console.log('%crequests.ts line:26 here', 'color: #007acc;');
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(payload),
        });

        console.log(response);
        if (!response.ok) {
            throw new Error('Fetch request failed');
        }
        const data = await response.json();

        return data;
    } catch (error) {
        console.log(
            '%crequests.ts line:43 error',
            'color: white; background-color: #007acc;',
            error
        );
        throw new Error(
            error?.response?.error ?? error?.message ?? 'Post Request failed'
        );
    }
}
