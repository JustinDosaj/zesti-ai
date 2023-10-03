
//VULNERABLE FUNCTION REMOVE API KEY HERE

export async function Scrape(url: string) {

    const axios = require('axios');

    const parseData = await axios.get('https://app.scrapingbee.com/api/v1', {
        params: {
            'api_key': 'I9RAG6V2SBY9UN8II37KAYX531KY0LI5H29GZYO6UY1ILM6OFECQX2TEA0OJ619NJSIP3NBNXARRAOQ2',
            'url': url,  
        } 
        }).then((response: any) => {
            const res = parseHtml(response.data)
            return res
        })
        .catch((error: any) => {
            console.log(error);
        });

        return parseData
}

export function parseHtml(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return doc.body.textContent || '';
}
