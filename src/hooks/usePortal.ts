import * as React from "react";
import { useEffect } from "react";

export const usePortal = (id: string) => {
  const rootRef = React.useRef(null);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parent = existingParent || createRootElement(id);

    if (!existingParent) {
      addRootElement(parent);
    }

    parent.appendChild(rootRef.current);

    return () => {
      console.log("hi");
      rootRef.current.remove();
      parent.remove();
    };
  }, []);

  const getRootElem = () => {
    if (!rootRef.current) {
      rootRef.current = document.createElement("div");
    }
    return rootRef.current;
  };

  return getRootElem();
};

const createRootElement = (id: string): HTMLElement => {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
};

const addRootElement = (rootElem: Element): void => {
  document.body.insertBefore(
    rootElem,
    document.body.lastElementChild.nextElementSibling
  );
};
