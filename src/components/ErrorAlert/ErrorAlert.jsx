// components/ErrorAlert.jsx

import React from "react";
import { Alert } from "@mui/material";

export default function ErrorAlert({ message, visible }) {
  return visible ? <Alert severity="error">{message}</Alert> : null;
}
