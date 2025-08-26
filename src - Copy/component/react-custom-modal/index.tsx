"use client";

import React, { useRef, useState } from "react";
import Modal from "react-modal";

// Custom styles
const customStyles: Modal.Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Bind modal to the app element for accessibility
if (typeof window !== "undefined") {
  Modal.setAppElement("#__next"); // For Next.js, use the root div id
}

export default function CustomModal() {
  const subtitleRef = useRef<HTMLHeadingElement | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    if (subtitleRef.current) {
      subtitleRef.current.style.color = "#f00";
    }
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <button onClick={openModal}>Open Modal</button>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={subtitleRef}>Hello</h2>
        <button onClick={closeModal}>Close</button>
        <div>I am a modal</div>
        <form>
          <input />
          <button type="button">tab navigation</button>
          <button type="button">stays</button>
          <button type="button">inside</button>
          <button type="button">the modal</button>
        </form>
      </Modal>
    </div>
  );
}
