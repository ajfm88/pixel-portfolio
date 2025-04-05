import PropTypes from "prop-types";
import { useAtom } from "jotai";
import { DPadInputAtom } from "../store";

export function VirtualDPad({ isVisible }) {
  const [DPadInput, setDpadInput] = useAtom(DPadInputAtom);

  return (
    isVisible && (
      <div className="dpad">
        <button
          className="dpad-btn up"
          onMouseDown={() => {
            DPadInput.isUpPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isUpPressed = false;
            setDpadInput(DPadInput);
          }}
          onMouseLeave={() => {
            DPadInput.isUpPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          ▲
        </button>
        <button
          className="dpad-btn down"
          onMouseDown={() => {
            DPadInput.isDownPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isDownPressed = false;
            setDpadInput(DPadInput);
          }}
          onMouseLeave={() => {
            DPadInput.isDownPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          ▼
        </button>
        <button
          className="dpad-btn left"
          onMouseDown={() => {
            DPadInput.isLeftPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isLeftPressed = false;
            setDpadInput(DPadInput);
          }}
          onMouseLeave={() => {
            DPadInput.isLeftPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          ◀
        </button>
        <button
          className="dpad-btn right"
          onMouseDown={() => {
            DPadInput.isRightPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isRightPressed = false;
            setDpadInput(DPadInput);
          }}
          onMouseLeave={() => {
            DPadInput.isRightPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          ▶
        </button>
      </div>
    )
  );
}

VirtualDPad.propTypes = {
  isVisible: PropTypes.bool,
};
