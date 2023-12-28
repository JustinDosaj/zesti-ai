export function RewardfulTag() {
    return(
        <>
            <script dangerouslySetInnerHTML={{ __html: `
                (function(w,r){w._rwq=r;w[r]=w[r]||function(){(w[r].q=w[r].q||[]).push(arguments)}})(window,'rewardful');
            `}}></script>
            <script async src='https://r.wdfl.co/rw.js' data-rewardful='74fbe8'></script>
        </>
    )
}

export function PromoteKitTag(){
    return(
        <script async src="https://cdn.promotekit.com/promotekit.js" data-promotekit="8fee0c20-1351-4c3c-b2dc-d51f88aee32f"></script>
    )
}