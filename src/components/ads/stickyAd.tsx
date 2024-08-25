import AdSense from "../tags/adsense";
import { useAuth } from "@/context/AuthContext";


interface StickyAdProps {
    adSlot: string;
}

export function StickyAd({adSlot}: StickyAdProps) {

    const { stripeRole } = useAuth();

    return(
        <div className="hidden lg:block mt-10">
            <div className="sticky top-20">
            {/* Right Sticky Ad */}
            <AdSense 
                adSlot={`${adSlot}`}  // Replace with your Ad Slot ID
                adFormat="vertical"
                adStyle={{ width: '300px', minHeight: '550px', maxHeight: '600px' }}
                role={stripeRole}
            />
            </div>
        </div>
    )
}