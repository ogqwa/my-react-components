import * as React from "react";
import { createPortal } from "react-dom";
import { usePortal } from "../hooks";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ModalManager = (props: Props) => {
  React.useEffect(() => {
    document.addEventListener("keydown", props.onClose, false);

    return () => {
      document.removeEventListener("keydown", props.onClose, false);
    };
  }, []);

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
      onClick={(_: React.MouseEvent<HTMLInputElement>) => props.onClose()}
    >
      <div
        style={{
          position: "fixed",
          width: "50%",
          height: "50%",
          backgroundColor: "white",
        }}
        onClick={(e: React.MouseEvent<HTMLInputElement>) => e.stopPropagation()}
      >
        {props.children}
      </div>
    </div>
  );
  const target = usePortal("modal");
  return createPortal(modalElement, target);
};

export { ModalManager as Modal };
