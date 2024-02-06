// hooks/useAffiliateCode.ts

// 1. Change
import { useEffect } from 'react';
import { setCookie } from '@/pages/api/handler/cookies';

const useAffiliateCode = (creatorData: { affiliate_code?: string } | null, referer: string | null) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (creatorData?.affiliate_code && referer && !referer.includes(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}`)) {
        setCookie('affiliate_code', creatorData.affiliate_code, 30);
      }
    }
  }, [creatorData, referer]);
};

export default useAffiliateCode;
