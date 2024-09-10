import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Notify } from "@/components/shared/notify";

interface RecipeExpirationProps {
    delete_at: any;
    hideTimer: boolean;
}

export function RecipeExpiration({delete_at, hideTimer}: RecipeExpirationProps) {

    const [remainingTime, setRemainingTime] = useState<string>("Expired");
    const router = useRouter();

    useEffect(() => {
        
        if (!delete_at) return;

    
        const deleteTime = new Date(delete_at.seconds ? delete_at.seconds * 1000 : delete_at); // Support Firestore Timestamp or ISO string
    
        const interval = setInterval(() => {
          const now = new Date();
          const timeDifference = deleteTime.getTime() - now.getTime();
    
          if (timeDifference <= 0) {
            clearInterval(interval);
            setRemainingTime('Expired');
            router.push('/tools/ai-recipe-generator')
            Notify("Recipe expied")
            return;
          }
    
          const minutes = Math.floor(timeDifference / 1000 / 60);
          const seconds = Math.floor((timeDifference / 1000) % 60);
    
          // Format as MM:SS or M:SS for single-digit minutes
          const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
          setRemainingTime(formattedTime);
        }, 1000);
    
        return () => clearInterval(interval); // Cleanup on unmount
      }, [delete_at]);

    if(remainingTime === 'Expired' || hideTimer) return null;
      
    return (
        <div className="inline-flex items-center space-x-2 text-gray-700 justify-center mb-4 w-full">
            <span className="border font-semibold rounded-md py-0.5 px-1.5 bg-gray-50 border-gray-300">
                {remainingTime !== 'Expired' && (<span>Recipe Expires in</span>)} {remainingTime}
            </span>
        </div>
    )
}