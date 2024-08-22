import Image from "next/image";
import Header from "./components/header/Header";
import styles from "./page.module.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.hero}>
        <div>
          <h1 className={styles.heading}>
            EduVerse-
          </h1>
          <h2 className={styles.heading2}>Where Education Meets Blockchain Innovation</h2>
          <p className={styles.description}>
            Dive into EduVerse, the tokenized course marketplace that’s
            transforming education with the Open Campus blockchain. Discover a
            secure, transparent, and decentralized learning adventure—what will
            you unlock next?
          </p>
          <div className={styles.btns}>
            <Link
              href="/marketplace"
              className={`${styles.btn} ${styles.buyBtn}`}
            >
              Browse Courses
            </Link>
            <Link href="/sell" className={styles.btn}>
              List Your Course
            </Link>
          </div>
        </div>
        <Image src="/home.png" alt="home" width={1075} height={650} />
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
