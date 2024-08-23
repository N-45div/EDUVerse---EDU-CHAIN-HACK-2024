import GetIpfsUrlFromPinata from "@/app/utils";
import Image from "next/image";
import Link from "next/link";
import styles from "./CourseCard.module.css";

export default function CourseCard({ item }) {
  const IPFSUrl = GetIpfsUrlFromPinata(item.image);

  const limitedDescription =
    item.description.length > 100
      ? item.description.substring(0, 100) + "..."
      : item.description;

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={IPFSUrl}
          alt={item.name}
          width={500}
          height={360}
          className={styles.image}
        />
      </div>
      <div className={styles.content}>
        <Link href={`/course/${item.tokenId}`}>
          <h3 className={styles.title}>{item.name}</h3>
          <p className={styles.description}>{limitedDescription}</p>
        </Link>
      </div>
    </div>
  );
}
