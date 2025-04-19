import { useState, useEffect } from "react";
import { useAtomValue, useAtom } from "jotai";
import { isProjectModalVisibleAtom, chosenProjectDataAtom } from "../store";
import PropTypes from "prop-types";

export default function ProjectModal({ areTouchControlsEnabled }) {
  const projectData = useAtomValue(chosenProjectDataAtom);
  const [isVisible, setIsVisible] = useAtom(isProjectModalVisibleAtom);
  const [chosenIndex, setChosenIndex] = useState(0);

  const keyboardControls = (e) => {
    if (e.code === "KeyS" || e.code === "ArrowDown") {
      setChosenIndex(chosenIndex + 1);
      return;
    }

    if (e.code === "KeyW" || e.code === "ArrowUp") {
      setChosenIndex(chosenIndex - 1);
    }

    if (e.code === "Space") {
      // TODO
    }
  };

  useEffect(() => {
    if (!isVisible) return;
    if (areTouchControlsEnabled) return;

    window.addEventListener("keydown", keyboardControls);

    return () => {
      window.removeEventListener("keydown", keyboardControls);
    };
  }, [projectData]);

  return (
    isVisible && (
      <div className="modal">
        <div className="modal-content">
          <h1>{projectData.title}</h1>
          <div className="modal-btn-container">
            {projectData.links.map((linkData, index) => (
              <button
                key={linkData.id}
                className={`modal-btn ${
                  chosenIndex === index && !areTouchControlsEnabled
                    ? "active"
                    : null
                }`}
                onClick={() => {
                  console.log(linkData.link);
                }}
              >
                {linkData.name}
              </button>
            ))}
            <button
              className={`modal-btn ${
                chosenIndex === projectData.links.length - 1 &&
                !areTouchControlsEnabled
                  ? "active"
                  : null
              }`}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}

ProjectModal.propTypes = {
  areTouchControlsEnabled: PropTypes.bool,
};
