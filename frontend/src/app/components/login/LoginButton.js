"use client";

import { useOCAuth } from "@opencampus/ocid-connect-js";
import React from "react";

const whiteTheme = {
  background: "#ffffff",
  color: "#000000",
  button: {
    background: "#ffffff",
    border: "#e5e5e5",
    color: "#000000",
    colorSuccess: "#333333",
  },
};

const genStyle = (theme, pill = false) => ({
  display: "flex",
  alignItems: "center",
  height: 44,
  width: 160,
  padding: "10px 12px",
  fontSize: 14,
  border: "1px solid",
  borderColor: theme.button.border,
  borderRadius: pill ? 40 : 8,
  background: theme.button.background,
  color: theme.button.color,
});

export default function LoginButton({ pill, disabled }) {
  const { ocAuth } = useOCAuth();
  const style = genStyle(whiteTheme, pill);

  const loginWithRedirect = async () => {
    await ocAuth.signInWithRedirect({
      state: "opencampus",
    });
  };

  return (
    <button disabled={disabled} onClick={loginWithRedirect} style={style}>
      <img
        alt="logo"
        src="https://static.opencampus.xyz/assets/oc_logo.svg"
        width="26px"
        height="25px"
      />
      <span style={{ marginLeft: "10px" }}>
        Connect&nbsp;<strong>OCID</strong>
      </span>
    </button>
  );
}
