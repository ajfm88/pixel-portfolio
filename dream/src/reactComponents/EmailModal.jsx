import { useState, useCallback } from "react";
import { useAtom, useAtomValue } from "jotai";
import { isEmailModalVisibleAtom, emailAtom } from "../store";

export default function EmailModal() {
  const [isVisible, setIsVisible] = useAtom(isEmailModalVisibleAtom);
  const email = useAtomValue(emailAtom);

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
