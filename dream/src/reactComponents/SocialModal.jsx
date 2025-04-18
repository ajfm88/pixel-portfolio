import { useCallback, useEffect, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  isSocialModalVisibleAtom,
  selectedLinkAtom,
  selectedLinkDescriptionAtom,
} from "../store";
import PropTypes from "prop-types";

export default function SocialModal({ areTouchControlsEnabled }) {
  const [isVisible, setIsVisible] = useAtom(isSocialModalVisibleAtom);
  const selectedLink = useAtomValue(selectedLinkAtom);
  const selectedLinkDescription = useAtomValue(selectedLinkDescriptionAtom);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const buttons = ["Yes", "No"];

  const handleClick = useCallback(
    (index) => {
      if (index === 0) {
        window.open(selectedLink, "_blank");
        setIsVisible(false);
        return;
      }

      setIsVisible(false);
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

SocialModal.propTypes = {
  areTouchControlsEnabled: PropTypes.bool,
};
