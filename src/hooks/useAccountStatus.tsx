import { useAuth } from '@/pages/api/auth/auth';
import { useEffect, useState } from 'react';


/*

1. User gets isCreator = true ('intro')
2. User Connects TikTok (get activeToken and access token etc. 'connect_tiktok')
3. Then user collects affilaite code - 'create_affilaite'
4. Then use generates page - 'generate_page'
5 'complete'

*/

const useAccountStatus = (userData: any, isLoading: boolean, creatorData: any) => {
    
    const [ accountStatus, setAccountStatus ] = useState<string>('')
    const [ accountStatusMessage, setAccountStatusMessage ] = useState<string>('')
    const [ loadingStatus, setLoadingStatus ] = useState<boolean>(true)
    const [ navCreator, setNavCreator ] = useState<string>('')
    const { loginWithTikTok, user } = useAuth()

    useEffect(() => { 
        if (!isLoading && userData && user) {
            if(userData.account_status == 'base_user') {
                setAccountStatus("base_user")
                setAccountStatusMessage("My Recipes")
                setNavCreator(`/my-recipes`)
            }
            else if(userData.account_status == 'creator_connect_tiktok') { 
                setAccountStatus('creator_connect_tiktok')
                setAccountStatusMessage("Connect TikTok")
            }
            else if(userData.account_status == 'creator_connect_affiliate') {
                setAccountStatus("creator_connect_affiliate")
                setAccountStatusMessage("Setup Affiliate")
                setNavCreator('/nav/profile')
            }
            else if(userData.account_status == 'creator_generate_page') { 
                setAccountStatus("creator_generate_page")
                setAccountStatusMessage("Generate Page")
                setNavCreator('/nav/profile')
            }
            else if(userData.account_status == 'creator_complete') {
                setAccountStatus("creator_complete")
                setAccountStatusMessage("View Your Page")
                setNavCreator(`/${creatorData.display_url}`)
            }

            setLoadingStatus(false)

        } else { 
            setAccountStatusMessage("Login")
            setNavCreator('/auth/login')
            setAccountStatus('')
            setLoadingStatus(false)
        }
    },[userData, isLoading, accountStatus, accountStatusMessage, navCreator, user, loadingStatus])
    
    return { accountStatus, accountStatusMessage, loginWithTikTok, navCreator, loadingStatus}
}

export default useAccountStatus

