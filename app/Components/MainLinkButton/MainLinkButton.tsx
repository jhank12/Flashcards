import React from "react";

import Link from "@/node_modules/next/link";

import styles from "./MainLinkButton.module.css";

interface Props {
  text: string;
  href: string;
}

export default function MainLinkButton({ text, href }: Props) {
  return (
    <Link className={styles.linkBtnMain} href={href}>
      {text}
    </Link>
  );
}
