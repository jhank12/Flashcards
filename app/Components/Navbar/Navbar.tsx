"use client";

import React, { useEffect, useRef } from "react";

import "remixicon/fonts/remixicon.css";

import "./Navbar.css";

import Link from "@/node_modules/next/link";

import { usePathname } from "@/node_modules/next/navigation";

import { showModal, closeModal } from "@/app/lib/modalFunctions";

import JustifySpaceBetween from "../JustifySpaceBetween/JustifySpaceBetween";

export default function Navbar() {
  const navRef = useRef(null);

  const pathname = usePathname();

  useEffect(() => {
    closeModal(navRef);
  }, [pathname]);

  return (
    <header>
      <Link href={"/"}>
        <h3>Flashcards</h3>
      </Link>
      <nav className="regularNav">
        <ul>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/flashcards"}>Flashcards</Link>
          </li>
        </ul>
      </nav>

      <i
        className="ri-menu-line hamburger"
        onClick={(e) => showModal(navRef, e)}
      />

      <dialog className="mobileNavDialog" ref={navRef}>
        <JustifySpaceBetween>
          <Link href={"/"}>
            <h3>Flashcards</h3>
          </Link>
          <i
            className="ri-close-line modalCloseIcon"
            onClick={(e) => closeModal(navRef, e)}
          />
        </JustifySpaceBetween>
        <nav className="mobileNav">
          <ul>
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            {/* has dropdown that shows sets with link */}
            <li>
              <Link href={"/flashcards"}>Flashcards</Link>
            </li>
          </ul>
        </nav>
      </dialog>
    </header>
  );
}
