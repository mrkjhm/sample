'use client'
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter for programmatic navigation
import { AnimatePresence, motion } from 'framer-motion';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Nav from './Nav';
import Magnetic from "@/common/Magnetic";
import Rounded from "@/common/RoundedButton";
import styles from './style.module.scss';

const routes = [
    { path: '/work', label: 'Work' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
];

export default function Index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const [backgroundAnimation, setBackgroundAnimation] = useState(false);
    const [routeDetail, setRouteDetail] = useState(null);  // Default to 'Work'
    const pathname = usePathname();
    const router = useRouter(); // useRouter hook for programmatic navigation
    const button = useRef(null);

    useEffect(() => {
        // Sync route details immediately when pathname changes
        const activeRoute = routes.find(route => route.path === pathname);
        setRouteDetail(activeRoute ? activeRoute.label : null);
    }, [pathname, isActive]);

    useEffect(() => {
        if (isActive) setIsActive(false);
    }, [pathname]);

    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        gsap.to(button.current, {
            scrollTrigger: {
                trigger: document.documentElement,
                // 1st top: trigger element
                // 2nd top: start position or viewport top
                start: "top top",
                // 1st percent: trigger element
                // 2nd percent: end position or viewport height
                end: "40% 30%",
                onLeave: () => { gsap.to(button.current, { scale: 1, duration: 0.25, ease: "power1.out" }) },
                onEnterBack: () => { gsap.to(button.current, { scale: 0, duration: 0.25, ease: "power1.out" }, setIsActive(false)) },
                markers: true,
            }
        });
    }, []);

    const handleNavLinkClick = (event, targetUrl) => {
        event.preventDefault(); // Prevent immediate navigation

        // Sync the routeDetail immediately to the target route
        const targetRoute = routes.find(route => route.path === targetUrl);
        setRouteDetail(targetRoute ? targetRoute.label : null);

        // Start the background animation for entering
        setBackgroundAnimation(true);

        // After animation finishes (1 second), navigate to the new page
        setTimeout(() => {
            setBackgroundAnimation(false);  // Reset the background animation
            router.push(targetUrl); // Navigate to the new page after animation completes
        }, 1000);  // Duration should match the background animation time
    };

    const text = {
        initial: {
            opacity: 0,
        },
        enter: {
            opacity: 1,
            top: "-10%",
            transition: {
                duration: .75,
                delay: .3,
                ease: [0.76, 0, 0.24, 1]
            },
            transitionEnd: {
                top: "47.5%"
            }
        },
        exit: {
            opacity: 1,
            top: "40%",
            transition: {
                duration: .5,
                delay: 0.4,
                ease: [0.33, 1, 0.68, 1]
            },
            transitionEnd: {
                opacity: 0,
            }
        }
    }
    return (
        <>
            <div ref={header} className={styles.header}>
                <Magnetic>
                    <div className={styles.logo}>
                        <p className={styles.copyright}>©</p>
                        <Link href="/">
                            <div className={styles.name}>
                                <p className={styles.codeBy}>Code by</p>
                                <p className={styles.mrkjhm}>Mrkjhm</p>
                                <p className={styles.amerns}>Amerna</p>
                            </div>
                        </Link>
                    </div>
                </Magnetic>
                <div className={styles.nav}>
                    {routes.map(route => (
                        <Magnetic key={route.path}>
                            <div className={styles.el}>
                                <Link href={route.path} onClick={(e) => handleNavLinkClick(e, route.path)}>
                                    {route.label}
                                </Link>
                                <div className={`${styles.indicator} ${pathname === route.path ? styles.active : ""}`}></div> {/* Dynamically add active class */}
                            </div>
                        </Magnetic>
                    ))}
                </div>
            </div>
            <div ref={button} className={styles.headerButtonContainer}>
                <Rounded onClick={() => { setIsActive(!isActive); }} className={`${styles.button}`}>
                    <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
                </Rounded>
            </div>
            <AnimatePresence>
                {isActive && <Nav />}

                {backgroundAnimation && (
                    <motion.div
                        className={styles.slide}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}  // Duration and easing for the animation
                    >
                        <motion.div
                            className={styles.text}
                            initial={text.initial}
                            animate={text.enter}
                            exit={text.exit}

                        >
                            <div className={styles.dot}></div>
                            <p className={styles.route}>{routeDetail || "Loading..."}</p>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
