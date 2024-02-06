import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


/*

'new' - creator account is fresh |
'token' = 'valid' | 'invalid' - token does not exist or is no longer valid
'affiliate' = ''
'complete' - 'creator page is completely setup'

1. User gets isCreator = true ('intro')
2. User Connects TikTok (get activeToken and access token etc. 'connect_tiktok')
3. Then user collects affilaite code - 'create_affilaite'
4. Then use generates page - 'generate_page'
5 'complete'

*/

const getCreatorStatus = (userData: any, isLoading: boolean) => {
    
    const router = useRouter()
    const [ creatorStage, setCreatorStage ] = useState<string>('')

    useEffect(() => { 
        if (!isLoading && userData) {
            if(userData.creator_setup_stage == 'connect_tiktok') { 
                setCreatorStage('Connect TikTok')
                router.push('/nav/profile')
            }
            else if(userData.creator_setup_stage == 'connect_affiliate') {
                setCreatorStage("Connect Affiliate") 
                router.push('/nav/profile')
            }
            else if(userData.creator_setup_stage == 'generate_page') { 
                setCreatorStage("Generate Page")
                router.push('/nav/profile') 
            }
            else if(userData.creator_setup_stage == 'complete') {
                setCreatorStage("Setup Complete")
            }
        }
    },[userData, isLoading, creatorStage])
    
    return { creatorStage }
}

export default getCreatorStatus

