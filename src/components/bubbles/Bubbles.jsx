import React from 'react'

import Bubble from './Bubble'

const Bubbles = ({
    isActive = false,
    number = 100,
    dir = true
}) => {
    if (!isActive) {
        return null
    }

    return Array.from(new Array(number)).map((_, index) => {
        return <Bubble key={index} dir={dir} />
    })
}

export default Bubbles
