
export default function GoogleTags() {
    return(
    <>
        <meta name="google-adsense-account" content="ca-pub-5837655994202747"></meta>
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