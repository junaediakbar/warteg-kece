const $ = document.querySelector.bind(document);
(function(){
    'use strict'

    const track = $('.carousel__track')
    const slides = Array.from(track.children)
    const nextButton = $('.carousel__button--right')
    const prevButton = $('.carousel__button--left')
    const dotsNav = $('.carousel__nav')
    const dots = Array.from(dotsNav.children)
    const setSlidePosition = () => {
        const slideWidth = slides[0].getBoundingClientRect().width
        slides.map(({ style },i) => { style.left = `${slideWidth * i}px` })
    }

    setSlidePosition()
    window.addEventListener('resize', setSlidePosition)

    const moveToSlide =  (currentSlide, targetSlide) => {
        track.style.transform = `translateX(-${targetSlide.style.left})`
        currentSlide.classList.remove('current-slide')
        targetSlide.classList.add('current-slide')
    }

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide')
        targetDot.classList.add('current-slide')
    }

    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide')
        const nextSlide = currentSlide.nextElementSibling
        const currentDot = $('button.current-slide')

        if (nextSlide) {
            updateDots(currentDot, currentDot.nextElementSibling)
            moveToSlide(currentSlide, nextSlide)
        } else {
            track.style = ''
            currentSlide.classList.remove('current-slide')
            track.children[0].classList.add('current-slide')
            updateDots(currentDot, dots[0])
        }
    })

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide')
        const prevSlide = currentSlide.previousElementSibling
        const currentDot = $('button.current-slide')

        if (prevSlide) {
            updateDots(currentDot, currentDot.previousElementSibling)
            moveToSlide(currentSlide, prevSlide)
        } else {
            const lastSlide = track.children[track.children.length - 1]
            track.style.transform = `translateX(-${lastSlide.style.left})`
            track.children[0].classList.remove('current-slide')
            lastSlide.classList.add('current-slide')
            updateDots(currentDot, dots[dots.length -1])
        }
    })

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button')

        if (!targetDot) return

        const currentSlide = track.querySelector('.current-slide')
        const currentDot = dotsNav.querySelector('.current-slide')
        const targetIndex = dots.findIndex(dot => dot === targetDot)

        moveToSlide(currentSlide, slides[targetIndex])
        updateDots(currentDot, targetDot)
    })
})()