const siteUrl = 'https://www.zesti.ai'

const nextSiteMap = {
    siteUrl: siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        additionalSitemaps: [
            `${siteUrl}/sitemap.xml`,
            `${siteUrl}/server-sitemap.xml`,
        ]
    },
    exclude: [
        "/account", 
        "/auth/admin",
        "/auth/reset",
        "/server-sitemap.xml" 
    ],
}

module.exports = nextSiteMap