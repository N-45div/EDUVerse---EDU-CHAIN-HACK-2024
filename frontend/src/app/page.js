"use client"
import Image from "next/image";
import Header from "./components/header/Header.js";
import styles from "./page.module.css";
import 'animate.css';
import animationData from "../../assets/Animation - 1724397007104.json"
import Lottie from "lottie-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.hero}>
        <h1 className={styles.heading}>EDUVerse</h1>
        <p className={styles.description}>
          Where Education Meets Blockchain Innovation. Dive into EduVerse, the
          tokenized course marketplace transforming education with the Open
          Campus blockchain. Discover a secure, transparent, and decentralized
          learning adventure—what will you unlock next?
        </p>
        <div className={styles.btns}>
          <Link href="/marketplace" className={styles.btn}>
            Browse Courses
          </Link>
          <Link href="/sell" className={styles.btn}>
            List Your Course
          </Link>
        </div>
        <Lottie animationData={animationData} loop={true} />
      </div>
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <Link href="/about">About Us</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/privacy">Privacy Policy</Link>
          </div>
          <p className={styles.footerText}>
            © 2024 EduVerse. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
