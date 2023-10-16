import axios from 'axios'
import OpenAI from 'openai';

export async function DownloadVideo() {
    const options = {
        method: 'GET',
        url: 'https://youtube-mp310.p.rapidapi.com/download/mp3',
        params: {
          url: 'https://www.youtube.com/shorts/eeDz1Ilak54'
        },
        headers: {
          'X-RapidAPI-Key': '2fffa4118fmsh3a9b118e2f8b730p14358djsn079fd7f6a771',
          'X-RapidAPI-Host': 'youtube-mp310.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }
}