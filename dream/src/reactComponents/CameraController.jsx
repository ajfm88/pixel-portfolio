import { useAtom } from "jotai";
import { cameraZoomValueAtom } from "../state";

const MAX_BOUND = 2;
const MIN_BOUND = 0.2;
export function CameraController() {
  const [camZoomValue, setCamZoomValue] = useAtom(cameraZoomValueAtom);

  return (
    <div className="camera-controller">
      <button
        className="ui-btn"
        onClick={() => {
          const newZoomVal = camZoomValue + 0.2;
          if (newZoomVal <= MAX_BOUND && newZoomVal >= MIN_BOUND) {
            setCamZoomValue(newZoomVal);
          }
        }}
      >
        +
      </button>
      <button
        className="ui-btn"
        onClick={() => {
          setCamZoomValue((prevZoomVal) => {
            const newZoomVal = prevZoomVal - 0.2;
            if (newZoomVal <= MAX_BOUND && newZoomVal >= MIN_BOUND) {
              return newZoomVal;
            }

            return prevZoomVal;
          });
        }}
      >
        -
      </button>
    </div>
  );
}
