import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import ReactTooltip from 'react-tooltip'

import * as css from './index.module.css'

import clamp from '../utils/clamp'
import throttle from '../utils/throttle'
import usePrevious from '../utils/usePrevious'
import copyToClipboard from '../utils/copyToClipboard'

import Bubbles from '../components/bubbles/Bubbles'
import ArrowDown from '../components/icons/ArrowDown'
import ArrowUp from '../components/icons/ArrowUp'

const isBrowser = typeof window !== 'undefined'

const IndexPage = () => {
  const [slide, setSlide] = useState(isBrowser ? localStorage.getItem('slide') || 0 : 0)
  const prevSlideIndex = usePrevious(slide)
  const [bubblesIsActive, setBubblesIsActive] = useState(false)
  const isScrolling = useRef(false)
  const timeout = useRef()

  const setSlideIndex = callback => {
    if (isScrolling.current) {
      return
    }

    setSlide(i => {
      const newIndex = clamp(callback(i), 0, 2)

      if (newIndex !== i) {
        setBubblesIsActive(true)

        clearTimeout(timeout.current)

        timeout.current = setTimeout(() => {
          setBubblesIsActive(false)
        }, 1000)
      }

      localStorage.setItem('slide', newIndex)

      return newIndex
    })
  }

  const nextSlide = () => {
    setSlideIndex(i => i + 1)
  }

  const prevSlide = () => {
    setSlideIndex(i => i - 1)
  }

  useEffect(() => {
    const handleWheel = throttle((e) => {
      const scrollDir = e.wheelDelta || -e.deltaY || -e.detail

      if (scrollDir < 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }, 200)

    document.addEventListener('wheel', handleWheel)

    let scrollingTimeout = null

    const handleScroll = (e) => {
      isScrolling.current = true
      clearTimeout(scrollingTimeout)

      scrollingTimeout = setTimeout(() => {
        isScrolling.current = false
      }, 400)
    }

    document.addEventListener('scroll', handleScroll)

    return () => {
      document.removeEventListener('wheel', handleWheel)
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    window.scroll({
      top: window.innerHeight * slide, 
      left: 0, 
      behavior: 'smooth'
    })
  }, [slide])

  return (
    <div>
      <Bubbles
        isActive={bubblesIsActive}
        number={isBrowser ? clamp(Math.round(window.innerWidth / 20), 10, 150) : 0}
        dir={slide > prevSlideIndex}
      />
      <div className={css.slide}>
        <div className={css.content}>
          <h1 className={css.title}>Ocean of Anarchy</h1>
          <p className={css.info}>
            <span>или</span>
            <br />
            Тысяча и один способ умереть под водой
          </p>
          <div className={css.menu}>
            <Link to='/discord' className={css.menuLink}>Discord</Link>
            <Link to='/help' className={css.menuLink}>Help</Link>
            <Link to='/shop' className={css.menuLink}>Shop</Link>
            <a href='#' className={`${css.menuLink} ${css.filled}`} onClick={() => setSlide(1)}>Play Now</a>
          </div>
        </div>
        <div className={css.go} onClick={nextSlide} >
          <ArrowDown />
        </div>
      </div>
      <div className={css.slide}>
        <div className={css.go} onClick={prevSlide} >
          <ArrowUp />
        </div>
        <div className={css.content}>
          <ReactTooltip place='bottom' effect='solid' className={css.tooltip} />
          <h1 className={css.title}>Play Now</h1>
          <button
            onClick={(e) => copyToClipboard(e.target.innerText.toLowerCase())}
            className={css.ip}
            data-tip='Нажми, чтобы скопировать'
          >play.peha.fun</button>
        </div>
        <div className={css.go} onClick={nextSlide} >
          <ArrowDown />
        </div>
      </div>
      <div className={css.slide}>
        <div className={css.go} onClick={prevSlide} >
          <ArrowUp />
        </div>
        <div className={css.content}>
          <h1 className={css.title}>🤔</h1>
        </div>
      </div>
    </div>
  )
}

export default IndexPage
