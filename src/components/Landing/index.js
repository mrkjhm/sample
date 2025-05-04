'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './style.module.scss';

export default function Index() {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);

    const xPercent = useRef(0);
    const direction = useRef(-1);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        requestAnimationFrame(animation);

        gsap.to(slider.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                start: 0,
                end: window.innerHeight,
                scrub: true,
                onUpdate: (e) => direction.current = e.direction * -1
            },
            x: "-=100px"
        });
    }, []);

    const animation = () => {
        if (xPercent.current <= -103) {
            xPercent.current = 0;
        }

        if (xPercent.current > 0) {
            xPercent.current = -103;
        }

        gsap.set(firstText.current, { xPercent: xPercent.current });
        gsap.set(secondText.current, { xPercent: xPercent.current });
        xPercent.current += 0.05 * direction.current;
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
                        <button>Download Cv</button>
                    </div>
                </div>
                <div ref={slider} className={styles.sliderContainer}>
                    <div className={styles.slider}>
                        <p ref={firstText} className={styles.text}>Mark Jhem Amerna — </p>
                        <p ref={secondText}>Mark Jhem Amerna —</p>
                    </div>
                </div>
            </div>
        </>
    );
}
