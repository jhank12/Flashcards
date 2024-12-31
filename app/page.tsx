import styles from "./page.module.css";

import MainLinkButton from "./Components/MainLinkButton/MainLinkButton";

export default function Home() {
  return (
    <div className={styles.landingContent}>
      <div className={styles.landingText}>
        <h1>
          Preparing for a test or quiz? Use APP_NAME to create custom flashcard
          sets to help you study.
        </h1>

        <MainLinkButton text={"Get Started"} href={"/flashcards"} />
      </div>
    </div>
  );
}
