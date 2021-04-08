import React from 'react'
import { graphql } from 'gatsby'

import WikiLayout from '../layouts/wiki-layout/WikiLayout'

const WikiTemplate = () => {
  return (
    <WikiLayout>
      <h1>Welcome lohi</h1>
      <div>
        <p>Minecraft server, yes</p>
      </div>
    </WikiLayout>
  )
}

export default WikiTemplate
