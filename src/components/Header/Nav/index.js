'use client'
import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation'; // Import useRouter for programmatic navigation
import { menuSlide } from '../anim';
import Link from 'next/link';
import Curve from './Curve';
import Footer from './Footer';
import Magnetic from "@/common/Magnetic";

const navItems = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Work",
        href: "/work",
    },
    {
        title: "About",
        href: "/about",
    },
    {
        title: "Contact",
        href: "/contact",
    },
];

const routes = {
    '/': 'Home',
    '/work': 'Work',
    '/about': 'Description',
    '/contact': 'Contact',
}

export default function Index() {
    const pathname = usePathname();
    const router = useRouter();

    // Sync the routeDetail immediately when pathname changes
    const [routeDetail, setRouteDetail] = useState(routes[pathname] || 'Home');
    const [selectedIndicator, setSelectedIndicator] = useState(pathname);
    const [backgroundAnimation, setBackgroundAnimation] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);  // Add state for burger menu

    // Handle NavLink click and trigger background animation
    const handleNavLinkClick = (event, targetUrl) => {
        event.preventDefault(); // Prevent immediate navigation

        // Close the burger menu before transitioning
        setIsBurgerOpen(false);

        // Set the active route immediately
        setSelectedIndicator(targetUrl);
        setRouteDetail(routes[targetUrl]); // Update routeDetail for the background animation

        // Start the background animation for entering
        setBackgroundAnimation(true);

        // After animation finishes (1 second), navigate to the new page
        setTimeout(() => {
            setBackgroundAnimation(false);  // Reset the background animation
            router.push(targetUrl); // Navigate to the new page after animation completes
        }, 1000);  // Duration should match the background animation time
    };

    // Effect to disable/enable scrolling
    useEffect(() => {
        // Disable scroll when the menu is active
        document.body.style.overflow = 'hidden';

        // Re-enable scroll when the menu is closed
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedIndicator]);

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

        <motion.div
            variants={menuSlide}
            initial="initial"
            animate="enter"
            exit="exit"
            className={styles.menu}
        >
            <div className={styles.body}>
                <div onMouseLeave={() => { setSelectedIndicator(pathname) }} className={styles.nav}>
                    <div className={styles.header}>
                        <p>Navigation</p>
                    </div>



                    {navItems.map((data, index) => (
                        <Magnetic key={index}>
                        <div className={styles.el}>

                            <Link
                                href={data.href}
                                className={selectedIndicator === data.href ? styles.active : ''}
                                onClick={(e) => handleNavLinkClick(e, data.href)}
                            >
                                {data.title}
                            </Link>
                            <div className={styles.indicator}></div>
                        </div>
                        </Magnetic>
                    ))}


                </div>
                <Footer />
            </div>
            <Curve />

        </motion.div>
            <AnimatePresence>
                {backgroundAnimation && (
                    <motion.div
                        className={styles.slide1}
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
                    >
                        <div className={styles.text1}
                             initial={text.initial}
                             animate={text.enter}
                             exit={text.exit}
                        >
                            <div className={styles.dot1}></div>
                            <p className={styles.route1}>{routeDetail}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
