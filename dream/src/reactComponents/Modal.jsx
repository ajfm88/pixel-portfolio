import { useAtom, useAtomValue } from "jotai";
import { isVisibleAtom, selectedLinkAtom } from "../state";
import { useEffect, useRef, useState } from "react";

export default function Modal() {
  const canvasRef = useRef(null);
  const modalRef = useRef(null);
  const yesBtnRef = useRef(null);
  const noBtnRef = useRef(null);
  const [isVisible, setIsVisible] = useAtom(isVisibleAtom);
  const selectedLink = useAtomValue(selectedLinkAtom);

  const [activeBtn, setActiveBtn] = useState(null);
  const activeBtnRef = useRef(null);

  useEffect(() => {
    console.log(yesBtnRef.current);
    setActiveBtn(yesBtnRef.current);
    activeBtnRef.current = yesBtnRef.current;
  }, [isVisible]);

  useEffect(() => {
    setActiveBtn(activeBtnRef.current);
  }, [activeBtnRef]);

  useEffect(() => {
    const keyboardControls = window.addEventListener("keydown", (e) => {
      if (e.code === "KeyS" || e.code === "ArrowDown") {
        activeBtnRef.current = noBtnRef.current;
        return;
      }

      if (e.code === "KeyW" || e.code === "ArrowUp") {
        activeBtnRef.current = yesBtnRef.current;
      }
    });

    const confirmControl = window.addEventListener("keypress", (e) => {
      if (e.code === "Space") {
        activeBtn.click();
      }
    });

    return () => {
      window.removeEventListener("keydown", keyboardControls);
      window.removeEventListener("keypress", confirmControl);
    };
  }, [activeBtn]);

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
            <button
              ref={yesBtnRef}
              className={`modal-btn ${
                activeBtn?.innerText === "Yes" ? "active" : null
              }`}
              onClick={() => {
                window.open(selectedLink, "_blank");
                setIsVisible(false);
                canvasRef.current.focus();
              }}
            >
              Yes
            </button>
            <button
              ref={noBtnRef}
              className={`modal-btn ${
                activeBtn?.innerText === "No" ? "active" : null
              }`}
              onClick={() => {
                setIsVisible(false);
                canvasRef.current.focus();
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    )
  );
}
