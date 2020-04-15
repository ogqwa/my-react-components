import * as React from "react";
import { createPortal } from "react-dom";
import { usePortal } from "../hooks";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalManager = (props: Props) => {
  return props.isOpen ? <Modal {...props} /> : null;
};

const Modal = (props: Props) => {
  const modalElement = (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: 0,
        left: 0,
      }}
    >
      <div
        style={{
          position: "fixed",
          width: "50%",
          height: "50%",
          backgroundColor: "white",
        }}
      >
        {props.children}
      </div>
    </div>
  );
  const target = usePortal("modal");
  return createPortal(modalElement, target);
};

export { ModalManager as Modal };
