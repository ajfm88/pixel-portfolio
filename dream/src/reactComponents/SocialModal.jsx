import { useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import {
  isSocialModalVisibleAtom,
  selectedLinkAtom,
  selectedLinkDescriptionAtom,
} from "../store";

export default function SocialModal() {
  const [isVisible, setIsVisible] = useAtom(isSocialModalVisibleAtom);
  const selectedLink = useAtomValue(selectedLinkAtom);
  const selectedLinkDescription = useAtomValue(selectedLinkDescriptionAtom);

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
                className={"modal-btn"}
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
