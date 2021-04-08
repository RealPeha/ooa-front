import React from 'react'
import { graphql } from 'gatsby'

import WikiLayout from '../layouts/wiki-layout/WikiLayout'

const WikiTemplate = ({ data }) => {
	const { frontmatter: meta, html } = data.markdownRemark

  return (
    <WikiLayout>
      <h1>{meta.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </WikiLayout>
  )
}

export const pageQuery = graphql`
	query($path: String!) {
		markdownRemark(frontmatter: { path: { eq: $path } }) {
			html
			frontmatter {
				path
				title
			}
		}
	}
`

export default WikiTemplate
