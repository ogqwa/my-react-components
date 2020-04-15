import * as React from "react";
import { useEffect } from "react";

export const usePortal = (id: string) => {
  const rootRef = React.useRef(null);
  rootRef.current = document.createElement("div");

  useEffect(() => {
    const existingRoot = document.querySelector(`#${id}`);
    const root = existingRoot || createRootElement(id);

    if (!existingRoot) {
      document.body.insertBefore(
        root,
        document.body.lastElementChild.nextElementSibling
      );
    }
    root.appendChild(rootRef.current);

    return () => {
      rootRef.current.remove();
      root.remove();
    };
  }, []);

  return rootRef.current;
};

const createRootElement = (id: string): HTMLElement => {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
};
