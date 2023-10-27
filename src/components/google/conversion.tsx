import Script from 'next/script'

export default function GoogleTags() {
    return(
    <>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBIC_GOOGLE_CONVERSION_ID}`}></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBIC_GOOGLE_CONVERSION_ID}');
          `
        }} />
        {/*<Script
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBIC_GOOGLE_CONVERSION_ID}`}
            strategy="afterInteractive"
            async
        />
        <Script id="google-tag-manager" strategy="afterInteractive">
            {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBIC_GOOGLE_CONVERSION_ID}');
            `}
        </Script>*/}
    </>
    )
}
