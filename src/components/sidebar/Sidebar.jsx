import React from 'react'
import { StaticQuery, Link, graphql } from 'gatsby'

import * as css from './style.module.css'

const Sidebar = () => {
  return (
    <div className={css.sidebar}>
      <div className={css.header}>
        <h2>Ocean of Anarchy Wiki</h2>
      </div>
      <div className={css.menu}>
        <StaticQuery
          query={graphql`
            {
              allMarkdownRemark(sort: { fields: [frontmatter___path], order: ASC }) {
                edges {
                  node {
                    frontmatter {
                      path
                      title
                      menuTitle
                    }
                  }
                }
              }
            }
          `}
          render={({ allMarkdownRemark: { edges } }) => {
            return edges.map(({ node: { frontmatter: page } }) => {
              return (
                <Link key={page.path} to={page.path}>{page.menuTitle || page.title}</Link>
              )
            })
          }}
        />
      </div>
    </div>
  )
}

export default Sidebar
