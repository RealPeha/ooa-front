import React from 'react'

import * as css from './style.module.css'

import bubbleImg1 from '../../images/bubble1.png'
import bubbleImg2 from '../../images/bubble2.png'
import bubbleImg3 from '../../images/bubble3.png'

const bubbleImgs = [bubbleImg1, bubbleImg2, bubbleImg3]

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const randomFloat = (min, max) => {
  return Math.random() * (max - min) + min
}

const Bubble = ({ dir }) => {
  const size = random(40, 100)
  const bubbleImg = bubbleImgs[random(0, bubbleImgs.length - 1)]
  const animationName = dir ? 'bubblingUp' : 'bubblingDown'

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    left: `${random(-size / 2, window.innerWidth - size / 2)}px`,
    animation: `${animationName} ${randomFloat(0.5, 1)}s linear, sideWays ${randomFloat(0.3, 0.7)}s ease-in-out infinite alternate`,
    ...(dir ? { bottom: '-25%' } : { top: '-25%' }),
  }

  return (
    <img
      src={bubbleImg}
      className={css.bubble}
      style={style}
    />
  )
}

export default Bubble
