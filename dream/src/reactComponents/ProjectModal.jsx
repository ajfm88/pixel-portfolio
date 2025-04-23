import { useAtomValue, useAtom } from "jotai";
import { isProjectModalVisibleAtom, chosenProjectDataAtom } from "../store";

export default function ProjectModal() {
  const projectData = useAtomValue(chosenProjectDataAtom);
  const [isVisible, setIsVisible] = useAtom(isProjectModalVisibleAtom);

  return (
    isVisible && (
      <div className="modal">
        <div className="modal-content">
          <h1>{projectData.title}</h1>
          <div className="modal-btn-container">
            {projectData.links.map((linkData) => (
              <button
                key={linkData.id}
                className={"modal-btn"}
                onClick={() => {
                  console.log(linkData.link);
                  setIsVisible(false);
                }}
              >
                {linkData.name}
              </button>
            ))}
            <button
              className={"modal-btn"}
              onClick={() => {
                setIsVisible(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}
