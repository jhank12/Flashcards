import { Ref, MouseEvent, RefObject } from "react";

export const showModal = (dialogRef: RefObject<null>, e = null) => {
  if (e) {
    e.preventDefault();
  }
  dialogRef.current?.showModal();
};

export const closeModal = (dialogRef: Ref<HTMLDialogElement>, e = null) => {
  if (e) {
    e.preventDefault();
  }

  dialogRef.current?.close();
};
