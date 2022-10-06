import Image from "next/image";
import Link from "next/link";
import cls from "classnames";

import styles from "./card.module.css";
import { Typography } from "@mui/material";

const Card = (props) => {
  return (
    <Link href={props.href}>
      <a className={styles.cardLink}>
        <div className={styles.container}>
          <div className={styles.cardHeaderWrapper}>
            <Typography
              variant="h6"
              sx={{ marginTop: "0.75rem", marginBottom: "0.75rem" }}
            >
              {props.name}
            </Typography>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              alt={props.name}
              className={styles.cardImage}
              src={props.imgUrl}
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
