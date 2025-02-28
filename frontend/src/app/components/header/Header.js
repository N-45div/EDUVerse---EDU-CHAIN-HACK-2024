"use client";

import { useContext, useEffect } from "react";
import { WalletContext } from "@/context/wallet";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import styles from "./Header.module.css";

export default function Header() {
  const {
    isConnected,

    userAddress,
  } = useContext(WalletContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const { authState, ocAuth } = useOCAuth();

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.png" width={200} height={44} alt="EduVerse Logo" />
          </Link>
        </div>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/marketplace" className={styles.link}>
                Buy
              </Link>
            </li>
            <li>
              <Link href="/sell" className={styles.link}>
                Sell
              </Link>
            </li>
            <li>
              <Link href="/profile" className={styles.link}>
                Profile
              </Link>
            </li>
          </ul>
          <div className={styles.authButtons}>
            {authState.isAuthenticated ? (
              <button>
                You are logged in as {ocAuth.getAuthInfo().edu_username}
              </button>
            ) : (
              "Connect Wallet"
            )}
            <button
              className={`${styles.ctaBtn} ${
                isConnected ? styles.activebtn : styles.inactivebtn
              }`}
            >
              {isConnected ? (
                <>{userAddress?.slice(0, 8)}...</>
              ) : (
                "Connect wallet"
              )}
            </button>
          </div>
        </nav>
        <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </div>
      </div>
    </header>
  );
}
