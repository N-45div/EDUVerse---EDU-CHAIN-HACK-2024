"use client";
import { useContext, useState } from "react";
import styles from "./sell.module.css";
import Header from "../components/header/Header";
import { useRouter } from "next/navigation";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import marketplace from "./../marketplace.json";
import { ethers } from "ethers";
import { WalletContext } from "@/context/wallet";

export default function SellCourse() {
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });
  const [imageURL, setImageURL] = useState();
  const [courseContentURL, setCourseContentURL] = useState();
  const [message, updateMessage] = useState("");
  const [btn, setBtn] = useState(false);
  const [btnContent, setBtnContent] = useState("List Course");
  const router = useRouter();
  const { isConnected, signer } = useContext(WalletContext);

  async function onFileChange(e, type) {
    try {
      const file = e.target.files[0];
      const data = new FormData();
      data.set("file", file);
      setBtn(false);
      updateMessage(`Uploading ${type}... Please wait...`);
      const response = await uploadFileToIPFS(data);
      if (response.success === true) {
        setBtn(true);
        updateMessage("");
        if (type === "image") {
          setImageURL(response.pinataURL);
        } else if (type === "course content") {
          setCourseContentURL(response.pinataURL);
        }
      }
    } catch (e) {
      console.log(`Error during ${type} upload...`, e);
    }
  }

  async function uploadMetadataToIPFS() {
    const { name, description, price } = formParams;
    if (!name || !description || !price || !imageURL || !courseContentURL) {
      updateMessage("You missed something!");
      return -1;
    }

    const nftJSON = {
      name,
      description,
      price,
      image: imageURL,
      courseContent: courseContentURL,
    };

    try {
      const response = await uploadJSONToIPFS(nftJSON);
      if (response.success === true) {
        return response.pinataURL;
      }
    } catch (e) {
      console.log("Error uploading JSON metadata: ", e);
    }
  }

  async function listNFT(e) {
    try {
      setBtnContent("Processing...");
      const metadataURL = await uploadMetadataToIPFS();
      if (metadataURL === -1) return;

      updateMessage("Uploading NFT...");

      let contract = new ethers.Contract(
        marketplace.address,
        marketplace.abi,
        signer
      );
      const price = ethers.parseEther(formParams.price);

      let transaction = await contract.mintToken(metadataURL, price);
      await transaction.wait();

      setBtnContent("List Course");
      setBtn(false);
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      alert("Successfully listed your Course!");
      router.push("/");
    } catch (e) {
      alert("Upload error", e);
    }
  }

  return (
    <div className={styles.container}>
      <Header />
      {isConnected ? (
        <div className={styles.innerContainer}>
          <div className={styles.content}>
            <h2 className={styles.heading}>Upload your Course</h2>
            <div className={styles.Form}>
              <div className={styles.FormContent}>
                <label className={styles.Label}>Course name</label>
                <input
                  type="text"
                  className={styles.Input}
                  value={formParams.name}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                />
              </div>
              <div className={styles.FormContent}>
                <label className={styles.Label}>Course description</label>
                <textarea
                  type="text"
                  className={`${styles.Input} ${styles.TextArea}`}
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.FormContent}>
                <label className={styles.Label}>Price (in EDU)</label>
                <input
                  type="number"
                  className={styles.Input}
                  value={formParams.price}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, price: e.target.value })
                  }
                />
              </div>
              <div className={styles.FormContent}>
                <label className={styles.Label}>Upload course image</label>
                <input
                  type="file"
                  className={styles.Input}
                  onChange={(e) => onFileChange(e, "image")}
                />
              </div>
              <div className={styles.FormContent}>
                <label className={styles.Label}>
                  Upload course content (pdf or video)
                </label>
                <input
                  type="file"
                  className={styles.Input}
                  onChange={(e) => onFileChange(e, "course content")}
                />
              </div>
              <br></br>
              <div className={styles.msg}>{message}</div>
              <button
                onClick={listNFT}
                type="submit"
                className={
                  btn
                    ? `${styles.btn} ${styles.activebtn}`
                    : `${styles.btn} ${styles.inactivebtn}`
                }
              >
                {btnContent === "Processing..." && (
                  <span className={styles.spinner} />
                )}
                {btnContent}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.innerContainer}>
          <div className={styles.notConnected}>
            Connect Your Wallet to Continue...
          </div>
        </div>
      )}
    </div>
  );
}
