import { Notify } from "@/components/shared/notify";

export async function fetchTikTokUserInfo(accessToken: string, fields = ['open_id', 'union_id', 'avatar_url', 'display_name', 'bio_description', 'profile_deep_link', 'is_verified', 'follower_count', 'likes_count', 'video_count']) {
    try {
        const response = await fetch(`https://open.tiktokapis.com/v2/user/info/?fields=${fields.join(',')}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching TikTok user info:', error);
        throw error;
    }
}

export async function fetchTikTokVideoList(accessToken: string, maxCount = 20, cursor = 0, fields = ['cover_image_url', 'id', 'title']) {
    try {
        const requestBody = {
            max_count: maxCount,
            cursor: cursor // Cursor for pagination
        };

        const response = await fetch(`https://open.tiktokapis.com/v2/video/list/?fields=${fields.join(',')}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })

        /*const response = await fetch('https://open.tiktokapis.com/v2/video/list/', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });*/

        if (!response.ok) {
            
            Notify("Problem getting creator page. Please try again later.")
            throw new Error(`HTTP error ${response.status}`);

        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching TikTok video list:', error);
        throw error;
    }
}
