import axios, { AxiosRequestConfig } from 'axios'
import { UploadMP3ToFirebase } from '../firebase/functions';

export async function DownloadVideo(url: any) {

    const options: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://youtube-mp310.p.rapidapi.com/download/mp3',
        params: {
          url: url
        },
        headers: {
          'X-RapidAPI-Key': '2fffa4118fmsh3a9b118e2f8b730p14358djsn079fd7f6a771',
          'X-RapidAPI-Host': 'youtube-mp310.p.rapidapi.com'
        },
        responseType: 'blob',
      };
      const response = await axios.request(options);
      const jsonData = await response.data.text();
      const parsedData = JSON.parse(jsonData);
      
      // Downloading the MP3 file
      const mp3Response = await axios.get(parsedData.downloadUrl, { responseType: 'blob' });
      const mp3Blob = mp3Response.data;
      console.log(mp3Response)
      // Uploading the MP3 blob to Firebase
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/))([a-zA-Z0-9_-]{11})/);
      const id = match ? match[1] : null;

      await UploadMP3ToFirebase(mp3Blob, id);
      
      return; 
}