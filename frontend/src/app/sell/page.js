"use client";
import { useContext, useState } from "react";
import styles from "./sell.module.css";
import Header from "../components/header/Header";
import { useRouter } from "next/navigation";
import { uploadFileToIPFS, uploadJSONToIPFS } from "../pinata";
import marketplace from "../marketplace.json";
import { ethers } from "ethers";
import { WalletContext } from "@/context/wallet";
import { useOCAuth } from "@opencampus/ocid-connect-js";
import Login from "../components/login/page";

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
  const [btnContent, setBtnContent] = useState("Upload listing");
  const router = useRouter();
  const { isConnected, signer } = useContext(WalletContext);
  const { authState } = useOCAuth();

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

      setBtnContent("List");
      setBtn(false);
      updateMessage("");
      updateFormParams({ name: "", description: "", price: "" });
      alert("Successfully listed!");
      router.push("/");
    } catch (e) {
      alert("Upload error", e);
    }
  }

  return (
<<<<<<< HEAD
    <div className={styles.container}>
      <Header />
      {isConnected ? (
        <div className={styles.innerContainer}>
          <div className={styles.content}>
            <h2 className={styles.heading}>Upload your Course</h2>
            <div className={styles.form}>
              <div className={styles.formContent}>
                <label className={styles.label}>Course Name</label>
                <input
                  type="text"
                  className={styles.input}
                  value={formParams.name}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, name: e.target.value })
                  }
                />
              </div>
              <div className={styles.formContent}>
                <label className={styles.label}>Course Description</label>
                <textarea
                  className={`${styles.input} ${styles.textArea}`}
                  value={formParams.description}
                  onChange={(e) =>
                    updateFormParams({
                      ...formParams,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className={styles.formContent}>
                <label className={styles.label}>Price (in EDU)</label>
                <input
                  type="number"
                  className={styles.input}
                  value={formParams.price}
                  onChange={(e) =>
                    updateFormParams({ ...formParams, price: e.target.value })
                  }
                />
              </div>
              <div className={styles.formContent}>
                <label className={styles.label}>Upload Course Image</label>
                <input
                  type="file"
                  className={styles.input}
                  onChange={(e) => onFileChange(e, "image")}
                />
              </div>
              <div className={styles.formContent}>
                <label className={styles.label}>
                  Upload Course Content (PDF or Video)
                </label>
                <input
                  type="file"
                  className={styles.input}
                  onChange={(e) => onFileChange(e, "course content")}
                />
              </div>
              <br />
              <div className={styles.message}>{message}</div>
              <button
                onClick={listNFT}
                type="submit"
                className={
                  btn
                    ? `${styles.btn} ${styles.activeBtn}`
                    : `${styles.btn} ${styles.inactiveBtn}`
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
=======
    <div>
      {!authState || !authState.isAuthenticated || !isConnected ? (
        <Login />
>>>>>>> 809371df806d2d7586a2dd0ae691ce6e7b9fd613
      ) : (
        <div className={styles.container}>
          <Header />

          <div className={styles.innerContainer}>
            <div className={styles.content}>
              <h2 className={styles.heading}>Upload your Content or Course</h2>
              <div className={styles.Form}>
                <div className={styles.FormContent}>
                  <label className={styles.Label}>Name your listing</label>
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
                  <label className={styles.Label}>Short Description</label>
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
                  <label className={styles.Label}>Mint Price (in EDU)</label>
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
                  <label className={styles.Label}>Upload preview image</label>
                  <input
                    type="file"
                    className={styles.Input}
                    onChange={(e) => onFileChange(e, "image")}
                  />
                </div>
                <div className={styles.FormContent}>
                  <label className={styles.Label}>
                    Upload full content (pdf or video)
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
        </div>
      )}
    </div>
  );
}
