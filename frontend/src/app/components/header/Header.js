"use client";
import { WalletContext } from "@/context/wallet";
import { BrowserProvider } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";
import styles from "./Header.module.css";

export default function Header() {
  const {
    isConnected,
    setIsConnected,
    userAddress,
    setUserAddress,
    signer,
    setSigner,
  } = useContext(WalletContext);

  const connectWallet = async () => {
    if (!window.ethereum) {
      throw new Error("Please install Metamask");
    }

    try {
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setSigner(signer);
      const accounts = await provider.send("eth_requestAccounts", []);
      setIsConnected(true);
      setUserAddress(accounts[0]);
      const network = await provider.getNetwork();
      const chainID = network.chainId;
      const opencampusNetworkId = "656476";

      if (chainID.toString() !== opencampusNetworkId) {
        alert("Please switch to the Open Campus network");
        return;
      }
    } catch (error) {
      console.error("connection error: ", error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/">
            <Image src="/logo.png" width={280} height={44} alt="logo" />
          </Link>
        </div>
        <nav className={styles.nav}>
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
          <button
            className={`${styles.ctaBtn} ${
              isConnected ? styles.activebtn : styles.inactivebtn
            }`}
            onClick={connectWallet}
          >
            {isConnected ? (
              <>{userAddress?.slice(0, 8)}...</>
            ) : (
              "Connect wallet"
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
