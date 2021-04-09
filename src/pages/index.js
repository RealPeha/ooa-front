import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'

import * as css from './index.module.css'

import clamp from '../utils/clamp'

import Bubbles from '../components/bubbles/Bubbles'
import ArrowDown from '../components/icons/ArrowDown'
import ArrowUp from '../components/icons/ArrowUp'

const scrollTimeout = 100

const usePrevious = (value) => {
    const ref = useRef(null)

    useEffect(() => {
        ref.current = value
    })

    return ref.current
}

const IndexPage = () => {
    const [slide, setSlide] = useState(0)
    const prevSlideIndex = usePrevious(slide)
    const [bubblesIsActive, setBubblesIsActive] = useState(false)
    const isScrolling = useRef(false)
    const timeout = useRef()

    const setSlideIndex = callback => {
        if (isScrolling.current) {
            return
        }

        setSlide(i => {
            const newIndex = clamp(callback(i), 0, 4)

            // if (newIndex > i) {
                setBubblesIsActive(true)
    
                clearTimeout(timeout.current)
    
                timeout.current = setTimeout(() => {
                    setBubblesIsActive(false)
                }, 800)
            // }

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
        const handleWheel = (e) => {
            const scrollDir = e.wheelDelta || -e.deltaY || -e.detail

            if (scrollDir < 0) {
                nextSlide()
            } else {
                prevSlide()
            }
        }

        document.addEventListener('wheel', handleWheel)

        let scrollingTimeout = null

        const handleScroll = () => {
            isScrolling.current = true
            clearTimeout(scrollingTimeout)

            scrollingTimeout = setTimeout(() => {
                isScrolling.current = false
            }, scrollTimeout)
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
        <div className={css.page}>
            <Bubbles
                isActive={bubblesIsActive}
                number={clamp(Math.round(window.innerWidth / 20), 10, 150)}
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
                        <a href='#' className={css.menuLink}>Discord</a>
                        <Link to='/help' className={css.menuLink}>Help</Link>
                        <a href='#' className={css.menuLink}>Shop</a>
                        <a href='#' className={`${css.menuLink} ${css.filled}`}>Play Now</a>
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
                    <h1 className={css.title}>wantid</h1>
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
                    <h1 className={css.title}>loh</h1>
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
                    <h1 className={css.title}>???</h1>
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
