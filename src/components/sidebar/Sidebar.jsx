import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import * as css from './style.module.css'

const Sidebar = () => {
  return (
    <StaticQuery
      query={graphql`
        {
          allMarkdownRemark(sort: { fields: [frontmatter___path], order: ASC }) {
            edges {
              node {
                frontmatter {
                  path
                  title
                }
              }
            }
          }
        }
      `}
      render={({ allMarkdownRemark: { edges } }) => {
        console.log(edges)
        return (
          <div className={css.sidebar}>Yes</div>
        )
      }}
    />
  )
}

export default Sidebar
