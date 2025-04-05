import { useAtom } from "jotai";
import { cameraZoomValueAtom } from "../store";
import { ZOOM_MAX_BOUND, ZOOM_MIN_BOUND } from "../constants";
import PropTypes from "prop-types";

export function CameraController({ isVisible }) {
  const [camZoomValue, setCamZoomValue] = useAtom(cameraZoomValueAtom);

  return (
    isVisible && (
      <div className="camera-controller">
        <button
          className="camera-controller-btn"
          onClick={() => {
            const newZoomValue = camZoomValue + 0.2;

            if (
              newZoomValue <= ZOOM_MAX_BOUND &&
              newZoomValue >= ZOOM_MIN_BOUND
            ) {
              setCamZoomValue(newZoomValue);
            }
          }}
        >
          +
        </button>
        <button
          className="camera-controller-btn"
          onClick={() => {
            const newZoomValue = camZoomValue - 0.2;
            if (
              newZoomValue <= ZOOM_MAX_BOUND &&
              newZoomValue >= ZOOM_MIN_BOUND
            ) {
              setCamZoomValue(newZoomValue);
            }
          }}
        >
          -
        </button>
      </div>
    )
  );
}

CameraController.propTypes = {
  isVisible: PropTypes.bool,
};
