import { useAtom, useAtomValue } from "jotai";
import { areTouchControlsEnabledAtom, DPadInputAtom } from "../state";

export function VirtualDPad() {
  const areTouchControlsEnabled = useAtomValue(areTouchControlsEnabledAtom);
  const [DPadInput, setDpadInput] = useAtom(DPadInputAtom);

  return (
    areTouchControlsEnabled && (
      <div className="dpad">
        <button
          className="ui-btn up"
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
          className="ui-btn down"
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
          className="ui-btn left"
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
          className="ui-btn right"
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
