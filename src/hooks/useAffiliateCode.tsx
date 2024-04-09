import { useEffect } from 'react';
import { SendErrorToFirestore } from '@/pages/api/firebase/functions';
import { setCookie } from '@/pages/api/handler/cookies';

interface CreatorData {
  owner?: {
    affiliate_code?: string;
  };
}

const useAffiliateCode = (creatorData: CreatorData | null, referer: string | null) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (creatorData?.owner?.affiliate_code && referer && !referer.includes(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}`)) {
        try {
          setCookie('affiliate_code', creatorData.owner.affiliate_code, 30);
        } catch (error) {
          SendErrorToFirestore(null, error, null, __filename);
        }
      }
    }
  }, [creatorData, referer]);
};

export default useAffiliateCode;
