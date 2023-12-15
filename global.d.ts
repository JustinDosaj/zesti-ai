declare global {
    interface Window {
      adsbygoogle: any[];
      Rewardful?:{
        referral?:string;
      }
    }

    interface CheckoutSessionData {
      price: string;
      success_url: string;
      cancel_url: string;
      mode: string;
      clientReferenceId?: string;
    }
  }
  
  export {};