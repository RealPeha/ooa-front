import React from 'react'
import { Link } from 'gatsby'

import * as css from './index.module.css'

const IndexPage = () => {
    return (
        <div className={css.page}>
            <div className={css.content}>
                <h1 className={css.title}>Ocean of Anarchy</h1>
                <p className={css.about}>
                    A Minecraft server with new experiences and the latest content in Minecraft.
                    <br />
                    Join our community and make new friends to play with!
                </p>
                <div className={css.menu}>
                    <a href='#' className={css.menuLink}>Discord</a>
                    <Link to='/help' className={css.menuLink}>Help</Link>
                    <a href='#' className={css.menuLink}>Shop</a>
                    <a href='#' className={`${css.menuLink} ${css.filled}`}>Play Now</a>
                </div>
            </div>
        </div>
    )
}

export default IndexPage
