/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://thepuneetstory.com",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/" },
      { userAgent: "*", disallow: "/api/" },
    ],
    additionalSitemaps: [],
  },
  exclude: ["/api/*"],
};
