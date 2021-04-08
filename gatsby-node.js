exports.createPages = ({ actions, graphql }) => {
	return graphql(`
		{
			allMarkdownRemark(limit: 1000) {
				edges {
					node {
						frontmatter {
							path
						}
					}
				}
			}
		}
	`).then(({ data, errors }) => {
		if (errors) {
			return Promise.reject(errors)
		}

		const template = require.resolve('./src/templates/WikiTemplate.js')

		return data.allMarkdownRemark.edges.forEach(({ node }) => {
			actions.createPage({
				path: node.frontmatter.path,
				component: template,
				context: {},
			})
		})
	})
}
