import { useEffect, useState, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isEmailModalVisibleAtom, emailAtom } from "../store";
import PropTypes from "prop-types";

export default function EmailModal({ areTouchControlsEnabled }) {
  const [isVisible, setIsVisible] = useAtom(isEmailModalVisibleAtom);
  const email = useAtomValue(emailAtom);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [onCopyMessage, setOnCopyMessage] = useState("");

  const buttons = ["Yes", "No"];

  const handleClick = useCallback(
    (index) => {
      if (index === 0) {
        navigator.clipboard.writeText(email);
        setOnCopyMessage("Email copied to clipboard!");
        return;
      }

      setIsVisible(false);
    },
    [email, setIsVisible]
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
        console.log("pressing the space key within EmailModal");
        handleClick(selectedIndex);
      }
    },
    [handleClick, selectedIndex]
  );

  useEffect(() => {
    if (!isVisible) return;
    if (areTouchControlsEnabled) return;

    window.addEventListener("keydown", keyboardControls);

    return () => {
      window.removeEventListener("keydown", keyboardControls);
    };
  }, [keyboardControls, areTouchControlsEnabled, isVisible]);

  return (
    isVisible && (
      <div className="modal">
        <div className="modal-content">
          <h1>Copy my email to your clipboard?</h1>
          <span>{email}</span>
          <p>{onCopyMessage}</p>
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

EmailModal.propTypes = {
  areTouchControlsEnabled: PropTypes.bool,
};
