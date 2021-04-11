import React from 'react'

import * as css from './style.module.css'

import Bubble from './Bubble'

const Bubbles = ({
    number = 100,
    dir,
}) => {
    if (!dir) {
        return null
    }

    return (
    	<div className={css.bubblesContainer}>
	    	{Array.from(new Array(number)).map((_, index) => {
		        return <Bubble key={index} dir={dir.dir} />
		    })}
    	</div>
	)
}

export default Bubbles
