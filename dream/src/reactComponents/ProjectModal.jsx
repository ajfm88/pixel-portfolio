import { useState, useEffect } from "react";
import { useAtomValue, useAtom } from "jotai";
import { isProjectModalVisibleAtom, selectedProjectDataAtom } from "../store";
import PropTypes from "prop-types";

export default function ProjectModal({ areTouchControlsEnabled }) {
  const projectData = useAtomValue(selectedProjectDataAtom);
  const [isVisible, setIsVisible] = useAtom(isProjectModalVisibleAtom);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    console.log(projectData);
  }, [projectData]);

  return (
    isVisible && (
      <div className="project-modal">
        <div className="modal-content">
          <h1>{projectData.title}</h1>
          <img src={projectData.imageSrc} className="project-img" />
          <p>{projectData.description}</p>
          <div className="modal-btn-container">
            {projectData.links.map((linkData, index) => (
              <button
                key={linkData}
                className={`modal-btn ${
                  selectedIndex === index && !areTouchControlsEnabled
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
                selectedIndex === projectData.links.length - 1 &&
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
