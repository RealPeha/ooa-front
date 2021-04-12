import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import ReactTooltip from 'react-tooltip'
import { FormattedMessage } from 'react-intl'

import * as css from './index.module.css'

import clamp from '../utils/clamp'
import throttle from '../utils/throttle'
import copyToClipboard from '../utils/copyToClipboard'

import App from '../App'
import Bubbles from '../components/bubbles/Bubbles'
import ArrowDown from '../components/icons/ArrowDown'
import ArrowUp from '../components/icons/ArrowUp'

const isBrowser = typeof window !== 'undefined'

const SLIDES = 5
const BUBBLES_MIN = 10
const BUBBLES_MAX = 100
const BUBBLES_AMOUNT_FACTOR = 25

const IndexPage = () => {
  const [slide, setSlide] = useState(isBrowser ? localStorage.getItem('slide') || 0 : 0)
  const [bubbles, setBubbles] = useState()
  const isScrolling = useRef(false)
  const timeout = useRef()

  const setSlideIndex = callback => {
    if (isScrolling.current) {
      return
    }

    setSlide(i => {
      const index = typeof callback === 'function' ? callback(i) : callback
      const newIndex = clamp(index, 0, SLIDES - 1)

      if (newIndex !== i) {
        setBubbles({ dir: newIndex - i })

        clearTimeout(timeout.current)

        timeout.current = setTimeout(() => {
          setBubbles()
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
      }, 500)
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

  const bubblesAmount = isBrowser
    ? clamp(Math.round(window.innerWidth / BUBBLES_AMOUNT_FACTOR), BUBBLES_MIN, BUBBLES_MAX)
    : 0

  return (
    <App>
      <div>
        <Bubbles
          number={bubblesAmount}
          dir={bubbles}
        />

        {/* Home */}
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
              <a
                href='#'
                className={`${css.menuLink} ${css.filled}`}
                onClick={() => setSlideIndex(1)}
              >Play Now</a>
              <Link to='/shop' className={css.menuLink}>Shop</Link>
              <a
                href='#'
                className={`${css.menuLink}`}
                onClick={() => setSlideIndex(2)}
              >AQUA</a>
            </div>
          </div>
          <div className={css.arrow} onClick={nextSlide} >
            <ArrowDown />
          </div>
        </div>

        {/* Play Now */}
        <div className={css.slide}>
          <div className={css.arrow} onClick={prevSlide} >
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
          <div className={css.arrow} onClick={nextSlide} >
            <ArrowDown />
          </div>
        </div>

        {/* What is AQUA */}
        <div className={css.slide}>
          <div className={css.arrow} onClick={prevSlide} >
            <ArrowUp />
          </div>
          <div className={css.content}>
            <h1 className={css.title}>Что такое Aqua Token?</h1>
            <div className={css.content}>
              <div className={css.table}>
                <div className={css.column}>
                  <h3>Цифровая валюта сервера Ocean of Anarchy</h3>
                  <p>
                    Aqua Token - это цифровая валюта сервера Ocean of Anarchy
                  </p>
                  <Link to='/help/aqua' className={`${css.menuLink} ${css.filled}`}>Узнать больше</Link>
                </div>
                <div className={css.column}>
                  <h3>Ну, точно что-то еще</h3>
                  <p>
                    Aqua Token - это что-то еще очень полезное, которое хотелось бы использовать не только на нашем сервере
                  </p>
                  <Link to='/help/aqua' className={`${css.menuLink} ${css.filled}`}>Узнать больше</Link>
                </div>
              </div>
            </div>
          </div>
          <div className={css.arrow} onClick={nextSlide} >
            <ArrowDown />
          </div>
        </div>

        {/* How to get AQUA */}
        <div className={css.slide}>
          <div className={css.arrow} onClick={prevSlide} >
            <ArrowUp />
          </div>
          <div className={css.content}>
            <h1 className={css.title}>Как получить Aqua?</h1>
            <div className={css.content}>
              Yes
            </div>
          </div>
          <div className={css.arrow} onClick={nextSlide} >
            <ArrowDown />
          </div>
        </div>

        {/* How to use AQUA */}
        <div className={css.slide}>
          <div className={css.arrow} onClick={prevSlide} >
            <ArrowUp />
          </div>
          <div className={css.content}>
            <h1 className={css.title}>Как использовать Aqua?</h1>
            <div className={css.content}>
              Yes
            </div>
          </div>
        </div>
      </div>
    </App>
  )
}

export default IndexPage
