import { useAtom, useAtomValue } from "jotai";
import { isModalVisibleAtom, selectedLinkAtom } from "../state";
import { useCallback, useEffect, useRef, useState } from "react";

export default function Modal() {
  const canvasRef = useRef(null);
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useAtom(isModalVisibleAtom);
  const selectedLink = useAtomValue(selectedLinkAtom);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ["Yes", "No"];

  const handleClick = useCallback(
    (index) => {
      if (index === 0) {
        window.open(selectedLink, "_blank");
        setIsVisible(false);
        canvasRef.current.focus();
        return;
      }

      setIsVisible(false);
      canvasRef.current.focus();
    },
    [selectedLink, setIsVisible]
  );
  const keyboardControls = useCallback(
    (e) => {
      if (e.code === "KeyS" || e.code === "ArrowDown") {
        setSelectedIndex(1);
        return;
      }

      if (e.code === "KeyW" || e.code === "ArrowUp") {
        setSelectedIndex(0);
      }

      if (e.code === "Space") {
        handleClick(selectedIndex);
      }
    },
    [handleClick, selectedIndex]
  );

  useEffect(() => {
    window.addEventListener("keydown", keyboardControls);

    return () => {
      window.removeEventListener("keydown", keyboardControls);
    };
  }, [selectedIndex, keyboardControls]);

  useEffect(() => {
    if (!canvasRef.current) {
      canvasRef.current = document.getElementsByTagName("canvas")[0];
    }
  }, [isVisible]);

  return (
    isVisible && (
      <div ref={modalRef} className="modal">
        <div className="modal-content">
          <h1>Do you want to open this link?</h1>
          <span>{selectedLink}</span>
          <div className="modal-btn-container">
            {buttons.map((button, index) => (
              <button
                key={button}
                className={`modal-btn ${
                  selectedIndex === index ? "active" : null
                }`}
                onClick={() => handleClick(index)}
              >
                {button}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  );
}
