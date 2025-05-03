'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.scss';

export default function Index() {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);

    let xPercent = 0;
    let direction = -1;

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        requestAnimationFrame(animation);

        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: true,
                onUpdate: (e) => direction = e.direction * -1
            },
            x: "-=100px"
        });
    }, []);

    const animation = () => {
        if (xPercent <= -100) {
            xPercent = 0;
        }

        if (xPercent > 0) {
            xPercent = -100;
        }

        gsap.set(firstText.current, { xPercent: xPercent });
        gsap.set(secondText.current, { xPercent: xPercent });
        xPercent += 0.1 * direction;
        requestAnimationFrame(animation);
    }

    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <h1>mrkjhm</h1>
                    <div className={styles.position}>
                        <i className={`ri-arrow-right-down-long-line ${styles.icon}`}></i>
                        <p>Multimedia Designer</p>
                        <p>Web Developer</p>
                    </div>
                </div>
                <div ref={slider} className={styles.sliderContainer}>
                    <div className={styles.slider}>
                        <p ref={firstText} className={styles.text}>Mark Jhem Amerna - </p>
                        <p ref={secondText}>Mark Jhem Amerna -</p>
                    </div>
                </div>
            </div>
        </>
    );
}
