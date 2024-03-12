import { useAuth } from '@/pages/api/auth/auth';
import { useEffect, useState } from 'react';
import useCreatorDoc from './creator/useCreatorDoc';

const useAccountStatus = () => {
    
    const { loginWithTikTok, user, userData, creatorData, isLoading } = useAuth()
    const [ accountStatus, setAccountStatus ] = useState<string>('')
    const { hasPage } = useCreatorDoc(user?.uid) 
    const [ accountStatusMessage, setAccountStatusMessage ] = useState<string>('Login')
    const [ loadingStatus, setLoadingStatus ] = useState<boolean>(true)
    const [ navCreator, setNavCreator ] = useState<string>('/auth/login')

    useEffect(() => { 
        if (!isLoading && user) {
            if(userData?.account_status == 'user') {
                setAccountStatus("user")
                setAccountStatusMessage("My Recipes")
                setNavCreator(`/my-recipes`)
                setLoadingStatus(false)
            }
            else if(userData?.account_status == 'creator') {
                setAccountStatus("creator")
                setAccountStatusMessage("View Your Page")
                if(hasPage == true) {
                    setNavCreator(`/${creatorData?.affiliate_code}`)
                    setAccountStatusMessage("View Your Page")
                } else {
                    setNavCreator(`/account`)
                    setAccountStatusMessage("Get Started")
                }
                setLoadingStatus(false)
            }
        } 
        setLoadingStatus(false)
    },[userData, isLoading, accountStatus, accountStatusMessage, navCreator, user, loadingStatus])
    
    return { accountStatus, accountStatusMessage, loginWithTikTok, navCreator, loadingStatus}
}

export default useAccountStatus

