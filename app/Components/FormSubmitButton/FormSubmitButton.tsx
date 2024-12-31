import React from "react";

import styles from "./FormSubmitButton.module.css";

interface Props {
  text: string;
}

export default function FormSubmitButton({ text }: Props) {
  return <button className={styles.formSubmitBtn}>{text}</button>;
}
