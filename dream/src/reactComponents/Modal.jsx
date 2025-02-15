import { useAtomValue } from "jotai";
import { isVisibleAtom } from "../state";

export default function Modal() {
  const isVisible = useAtomValue(isVisibleAtom);
  return (
    isVisible && (
      <div className="modal">
        <div className="modal-content">
          <h1>Do you want to open this link?</h1>
          <span>https://github.com/jslegenddev</span>
          <div className="modal-btn-container">
            <button className="modal-btn">Yes</button>
            <button className="modal-btn">No</button>
          </div>
        </div>
      </div>
    )
  );
}
