import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { code } = req.body;
      const tokenEndpoint = 'https://open.tiktokapis.com/v2/oauth/token/';

      const params = new URLSearchParams({
        client_key: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_KEY!, // Replace with your client key
        client_secret: process.env.NEXT_PUBLIC_TIKTOK_CLIENT_SECRET!, // Replace with your client secret
        code: code,
        grant_type: 'authorization_code',
        redirect_uri: `${process.env.NEXT_PUBLIC_TIKTOK_REDIRECT_URI}` // Replace with your redirect URI
      });

      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Cache-Control': 'no-cache'
        },
        body: params.toString()
      });

      const data = await response.json();
      console.log('response:', data);
      res.status(200).json(data);
    } catch (error: any) {
      console.error('Error during token exchange:', error.message);
      res.status(500).send('An error occurred during the login process.');
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}