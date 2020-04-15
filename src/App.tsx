import * as React from "react";

import { Modal } from "./Modal";

export const App = () => {
  const [isOpen, setOpen] = React.useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!isOpen)}>click</button>
      {isOpen ? (
        <Modal isOpen={isOpen} onClose={() => console.log("onClose")}>
          <h1>hello</h1>
          <button onClick={() => setOpen(false)}>close</button>
        </Modal>
      ) : (
        <Modal isOpen={isOpen} onClose={() => console.log("onClose")}>
          <h1>hello</h1>
          <button onClick={() => setOpen(false)}>close</button>
        </Modal>
      )}
    </div>
  );
};
