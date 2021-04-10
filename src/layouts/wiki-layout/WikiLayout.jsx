import React from 'react'

import Sidebar from '../../components/sidebar/Sidebar'

import * as css from './style.module.css'

const WikiLayout = ({ children }) => {
  return (
    <div className={css.page}>
      <Sidebar />
      <div className={css.content}>
        <div className={css.contentInner}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default WikiLayout
