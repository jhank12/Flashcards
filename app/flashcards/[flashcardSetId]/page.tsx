import React from "react";

import "remixicon/fonts/remixicon.css";

import Link from "@/node_modules/next/link";

import styles from "./page.module.css";

import PageContainer from "@/app/Components/PageContainer/PageContainer";

export default async function page({ params }) {
  const pageParams = await params;

  return (
    <PageContainer>
      <div className={styles.flashcardOptionPage}>
        <Link
          className={styles.flashcardOptionLink}
          href={`./${pageParams.flashcardSetId}/study?card=0`}
        >
          <div className={styles.flashcardSetOption}>
            {/* <i className="ri-book-open-fill" /> */}
            <i className="ri-book-2-fill"></i>
            <p>Study</p>
          </div>
        </Link>

        <Link
          className={styles.flashcardOptionLink}
          href={`./${pageParams.flashcardSetId}/edit`}
        >
          <div className={styles.flashcardSetOption}>
            <i className="ri-pencil-fill"></i>
            <p>Edit</p>
          </div>
        </Link>
      </div>
    </PageContainer>
  );
}
