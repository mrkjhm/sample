'use client'

import {useState, useEffect} from "react";
import Lenis from "lenis";
import {AnimatePresence} from "framer-motion";
import Preloader from "@/components/Preloader";
import Landing from "@/components/Landing";
import Description from "@/components/Description"
import styles from './style.module.scss'



export default function Home() {

    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {

        const lenis = new Lenis();

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

    }, []);


    useEffect( () => {
        (
            async () => {
                const LocomotiveScroll = (await import('locomotive-scroll')).default
                const locomotiveScroll = new LocomotiveScroll();

                setTimeout( () => {
                    setIsLoading(false);
                    document.body.style.cursor = 'default'
                    window.scrollTo(0,0);
                }, 1000)
            }
        )()
    }, [])

  return (
    <main className={styles.main}>
        <AnimatePresence mode="wait">
            {isLoading && <Preloader />}
        </AnimatePresence>
        <Landing />
        <Description />
    </main>
  );
}
