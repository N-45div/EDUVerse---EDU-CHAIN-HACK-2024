<<<<<<< HEAD
"use client"
=======
"use client";
import { useContext } from "react";
>>>>>>> 809371df806d2d7586a2dd0ae691ce6e7b9fd613
import Image from "next/image";
import Header from "./components/header/Header.js";
import styles from "./page.module.css";
import 'animate.css';
import animationData from "../../assets/Animation - 1724397007104.json"
import Lottie from "lottie-react";
import Link from "next/link";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import Login from "./components/login/page";
import { WalletContext } from "@/context/wallet";

export default function HomePage() {
  const { authState } = useOCAuth();
  const { isConnected } = useContext(WalletContext);
  return (
<<<<<<< HEAD
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
=======
    <div>
      {!authState || !authState.isAuthenticated || !isConnected ? (
        <Login />
      ) : (
        <div className={styles.container}>
          <Header />

          <div className={styles.hero}>
            <div>
              <h1 className={styles.heading}>EDUVERSE</h1>
              {/* <div>
                <h4>User Info</h4>
                <pre>{JSON.stringify(ocAuth.getAuthInfo(), null, 2)}</pre>
              </div> */}
              <h2 className={styles.heading2}>
                Empowering Decentralized Knowledge Sharing, One Collectible at a
                Time.
              </h2>
              <p className={styles.description}>
                EDUVERSE is a decentralized platform where users can share,
                sell, and mint both educational courses and unique content as
                collectibles. Harness the power of blockchain to engage in
                transparent, secure, and innovative exchanges, transforming the
                way knowledge and creativity are shared and collected in the
                digital age.
              </p>
              <div className={styles.btns}>
                <Link
                  href="/marketplace"
                  className={`${styles.btn} ${styles.buyBtn}`}
                >
                  Browse
                </Link>
                <Link href="/sell" className={styles.btn}>
                  List Your Content
                </Link>
              </div>
            </div>
            <Image src="/home.png" alt="home" width={700} height={700} />
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
      )}
>>>>>>> 809371df806d2d7586a2dd0ae691ce6e7b9fd613
    </div>
  );
}
