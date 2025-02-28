"use client";
import { useContext } from "react";
import Header from "./components/header/Header.js";
import styles from "./page.module.css";
import 'animate.css';
import animationData from "../../assets/Animation - 1724397007104.json";
import Lottie from "lottie-react";
import Link from "next/link";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import { WalletContext } from "@/context/wallet";

export default function HomePage() {
  const { authState } = useOCAuth();
  const { isConnected } = useContext(WalletContext);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.hero}>
        <h1 className={styles.heading}>EDUVerse</h1>
        <p className={styles.description}>
          Where Education Meets Blockchain Innovation. Dive into EDUVerse, the
          tokenized course marketplace transforming education with the Open
          Campus blockchain. Discover a secure, transparent, and decentralized
          learning adventure—what will you unlock next?
        </p>
        <div className={styles.btns}>
          {(!authState?.isAuthenticated || !isConnected) ? (
            <>
              <Link href="#" onClick={() => alert("Please connect your wallet to browse courses.")} className={styles.btn}>
                Browse Courses
              </Link>
              <Link href="#" onClick={() => alert("Please connect your wallet to list your course.")} className={styles.btn}>
                List Your Course
              </Link>
            </>
          ) : (
            <>
              <Link href="/marketplace" className={styles.btn}>
                Browse Courses
              </Link>
              <Link href="/sell" className={styles.btn}>
                List Your Course
              </Link>
            </>
          )}
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
            © 2024 EDUVerse. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
