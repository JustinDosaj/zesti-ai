
export default function GoogleTags() {
    return(
    <>
        <meta name="google-adsense-account" content="ca-pub-5837655994202747"></meta>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBIC_GOOGLE_CONVERSION_ID}`}></script>
        <meta name="google-adsense-account" content="ca-pub-5837655994202747"></meta>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBIC_GOOGLE_CONVERSION_ID}');
          `
        }} />
    </>
    )
}