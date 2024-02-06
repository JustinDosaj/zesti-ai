import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';


/*

1. User gets isCreator = true ('intro')
2. User Connects TikTok (get activeToken and access token etc. 'connect_tiktok')
3. Then user collects affilaite code - 'create_affilaite'
4. Then use generates page - 'generate_page'
5 'complete'

*/

const useCreatorStatus = (userData: any, isLoading: boolean) => {
    
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

export default useCreatorStatus

