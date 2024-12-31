import "./globals.css";

import Navbar from "./Components/Navbar/Navbar";

import styles from "./page.module.css";

import FlashcardsContextProvider from "@/context/FlashcardsContextProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <FlashcardsContextProvider>
          <div className="siteContainer">
            <section className={styles.landingPage}>
              <Navbar />

              {children}
            </section>
          </div>
        </FlashcardsContextProvider>
      </body>
    </html>
  );
}
