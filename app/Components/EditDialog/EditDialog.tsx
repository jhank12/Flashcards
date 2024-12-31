"use client";

import React, { Ref, useState } from "react";

import styles from "./EditDialog.module.css";

import Dialog from "../Dialog/Dialog";
import JustifySpaceBetween from "../JustifySpaceBetween/JustifySpaceBetween";
import MainButton from "../MainButton/MainButton";
import FormSubmitButton from "../FormSubmitButton/FormSubmitButton";

import { closeModal } from "@/app/lib/modalFunctions";

interface Props {
  dialogRef: Ref<HTMLDialogElement> | null;
  editQuestionSubmit: (updatedField: string) => void;
  currentKey: string;
  isForm: boolean;
}

export default function EditDialog({
  dialogRef,
  editQuestionSubmit,
  currentKey,
  isForm,
}: Props) {
  const [updatedField, setUpdatedField] = useState("");

  function capitalizeKey(word: string): string {
    const splitArr = word.split(" ");

    if (splitArr.length > 1) {
      let newWord: string = "";

      for (let i = 0; i < word.split(" ").length; i++) {
        if (i < splitArr.length - 1) {
          newWord += `${
            splitArr[i].slice(0, 1).toUpperCase() + splitArr[i].slice(1)
          } `;
        } else {
          newWord +=
            splitArr[i].slice(0, 1).toUpperCase() + splitArr[i].slice(1);
        }
      }
      return newWord;
    } else {
      return word.slice(0, 1).toUpperCase() + word.slice(1);
    }
  }

  function formSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();
    editQuestionSubmit(updatedField);
    setUpdatedField("");
    closeModal(dialogRef, e);
  }

  return (
    <Dialog dialogRef={dialogRef}>
      <JustifySpaceBetween>
        <h2>Edit {capitalizeKey(currentKey)}</h2>

        <i
          className="ri-close-line modalCloseIcon"
          onClick={(e) => closeModal(dialogRef, e)}
        />
      </JustifySpaceBetween>

      {isForm ? (
        <form className={styles.editDialogForm} onSubmit={formSubmit}>
          <input
            type="text"
            onChange={(e) => setUpdatedField(e.target.value)}
          />

          <FormSubmitButton text={`Update ${capitalizeKey(currentKey)}`} />
        </form>
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => setUpdatedField(e.target.value)}
            value={updatedField}
          />

          <MainButton
            text={`Update ${capitalizeKey(currentKey)}`}
            onClick={formSubmit}
            btnType={"button"}
          />
        </>
      )}
    </Dialog>
  );
}
