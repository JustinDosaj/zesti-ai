
export function GoogleTags() {
    return(
    <>
        <meta name="google-adsense-account" content="ca-pub-5837655994202747"></meta>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_ID}`}></script>
        <meta name="google-adsense-account" content="ca-pub-5837655994202747"></meta>
        <script dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_ID}');
          `
        }} />
    </>
    )
}

export function PageViewConversion() {
    return(
        <script dangerouslySetInnerHTML={{
            __html: `
                gtag('event', 'conversion', {
                    'send_to': '${process.env.NEXT_PUBLIC_GOOGLE_CONVERSION_ID}/FZ3ACNvpj9EZEP-V05k-',
                    'value': 1.0,
                    'currency': 'USD'
                });
            `
            }} />
    )
}

