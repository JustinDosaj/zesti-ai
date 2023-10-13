
//VULNERABLE FUNCTION REMOVE API KEY HERE

export async function Scrape(url: string) {

    const axios = require('axios');

    const parseData = await axios.get('https://app.scrapingbee.com/api/v1', {
        params: {
            'api_key': 'I9RAG6V2SBY9UN8II37KAYX531KY0LI5H29GZYO6UY1ILM6OFECQX2TEA0OJ619NJSIP3NBNXARRAOQ2',
            'url': url,
            'block_ads': 'true',
            'render_js': 'false',
            'json_response': 'true',
        } 
        }).then(async (response: any) => {
            const res = await parseHtml(response.data.body)
            return res
        })
        .catch((error: any) => {
            console.log(error);
        });

        return parseData
}

export async function parseHtml(html: string) {
    // Remove all text between {}
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
  
    // Remove all <script> and <svg> tags and their content
    Array.from(doc.querySelectorAll('script, svg, style, link')).forEach(el => {
        el.remove();
    });

    // Use textContent to get the raw text
    const rawText = doc.body.textContent || "";
    
    // Remove all newline characters and replace multiple spaces with a single space
    const cleanedText = rawText.replace(/\s+/g, ' ').trim();
    const cutText = cleanedText.substring(0, 10000);

    return cutText;
}

