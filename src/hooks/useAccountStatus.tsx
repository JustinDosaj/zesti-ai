import { useAuth } from '@/pages/api/auth/auth';
import { useEffect, useState } from 'react';


/*

1. User gets isCreator = true ('intro')
2. User Connects TikTok (get activeToken and access token etc. 'connect_tiktok')
3. Then user collects affilaite code - 'create_affilaite'
4. Then use generates page - 'generate_page'
5 'complete'

*/


/**
 * @desc Used to track status of user and current stage
 * 
 * @users
 * account_status = base_user
 * 
 * @creators
 * account_status = creator_connect_tiktok || creator_connect_affiliate || creator_generate_page || creator_complete
 * 
 * 
 * @returns account_status from firebase user
 */
const useAccountStatus = () => {
    
    const { loginWithTikTok, user, userData, creatorData, isLoading } = useAuth()
    const [ accountStatus, setAccountStatus ] = useState<string>('')
    const [ accountStatusMessage, setAccountStatusMessage ] = useState<string>('')
    const [ loadingStatus, setLoadingStatus ] = useState<boolean>(true)
    const [ navCreator, setNavCreator ] = useState<string>('')

    useEffect(() => { 
        if (!isLoading && userData && user) {
            if(userData.account_status == 'user') {
                setAccountStatus("user")
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
            else if(userData.account_status == 'creator') {
                setAccountStatus("creator")
                setAccountStatusMessage("View Your Page")
                setNavCreator(`/${creatorData?.display_url}`)
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

