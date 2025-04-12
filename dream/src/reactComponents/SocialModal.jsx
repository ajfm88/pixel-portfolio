import { useCallback, useEffect, useRef, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  areTouchControlsEnabledAtom,
  isSocialModalVisibleAtom,
  selectedLinkAtom,
  selectedLinkDescriptionAtom,
} from "../store";

export default function SocialModal() {
  const canvasRef = useRef(null);
  const modalRef = useRef(null);
  const [isVisible, setIsVisible] = useAtom(isSocialModalVisibleAtom);
  const selectedLink = useAtomValue(selectedLinkAtom);
  const selectedLinkDescription = useAtomValue(selectedLinkDescriptionAtom);
  const areTouchControlsEnabled = useAtomValue(areTouchControlsEnabledAtom);

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
        console.log("pressing the space key within SocialModal");
        handleClick(selectedIndex);
      }
    },
    [handleClick, selectedIndex]
  );

  useEffect(() => {
    if (areTouchControlsEnabled) return;

    window.addEventListener("keydown", keyboardControls);

    return () => {
      window.removeEventListener("keydown", keyboardControls);
    };
  }, [selectedIndex, keyboardControls, areTouchControlsEnabled]);

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
          <p>{selectedLinkDescription}</p>
          <div className="modal-btn-container">
            {buttons.map((button, index) => (
              <button
                key={button}
                className={`modal-btn ${
                  selectedIndex === index && !areTouchControlsEnabled
                    ? "active"
                    : null
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
