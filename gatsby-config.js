module.exports = {
	pathPrefix: '/ooa-front',
	siteMetadata: {
		title: 'Mine',
	},
	plugins: [
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'articles',
				path: `${__dirname}/articles`,
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				plugins: [
					{
						resolve: 'gatsby-remark-autolink-headers',
						options: {
							isIconAfterHeader: true,
						},
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-catch-links',
			options: {
				excludePattern: /(excluded-link|external)/,
			},
		},
	],
}
