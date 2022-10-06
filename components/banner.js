import React from "react";
import styles from "./banner.module.css";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

const StyledButton = styled("Button")(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  cursor: "pointer",
  color: "white",
  outline: "0",
  border: "0px",
  paddingTop: "1rem",
  paddingBottom: "1rem",
  fontSize: "1.125rem",
  lineHeight: "1.75rem",
  paddingLeft: "2.5rem",
  paddingRight: "2.5rem",
}));

export default function banner({ buttonText, handleOnClick }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Coffee</span>
        <span className={styles.title2}>Cannoiseur</span>
      </h1>
      <p className={styles.subTitle}>Discover your local coffee shops</p>
      <Button
        color="primary"
        sx={{
          cursor: "pointer",
          outline: "0",
          border: "0px",
          paddingTop: "1rem",
          paddingBottom: "1rem",
          fontSize: "1.125rem",
          lineHeight: "1.75rem",
          paddingLeft: "2.5rem",
          paddingRight: "2.5rem",
        }}
        onClick={handleOnClick}
        variant="contained"
      >
        {buttonText}
      </Button>
    </div>
  );
}
