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