import { useAtom, useAtomValue } from "jotai";
import { areTouchControlsEnabledAtom, DPadInputAtom } from "../state";

export function VirtualDPad() {
  const areTouchControlsEnabled = useAtomValue(areTouchControlsEnabledAtom);
  const [DPadInput, setDpadInput] = useAtom(DPadInputAtom);

  return (
    areTouchControlsEnabled && (
      <div className="dpad">
        <button
          className="dpad-btn-color up"
          onMouseDown={() => {
            DPadInput.isUpPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isUpPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          ▲
        </button>
        <button
          className="dpad-btn-color down"
          onMouseDown={() => {
            DPadInput.isDownPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isDownPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          ▼
        </button>
        <button
          className="dpad-btn-color left"
          onMouseDown={() => {
            DPadInput.isLeftPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
            DPadInput.isLeftPressed = false;
            setDpadInput(DPadInput);
          }}
        >
          ◀
        </button>
        <button
          className="dpad-btn-color right"
          onMouseDown={() => {
            DPadInput.isRightPressed = true;
            setDpadInput(DPadInput);
          }}
          onMouseUp={() => {
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
