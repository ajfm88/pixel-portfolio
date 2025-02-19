import { useAtom } from "jotai";
import { DPadInputAtom } from "../state";

export function VirtualDPad() {
  const [DPadInput, setDpadInput] = useAtom(DPadInputAtom);

  return (
    <div className="dpad">
      <button
        onMouseDown={() => {
          DPadInput.isUpPressed = true;
          setDpadInput(DPadInput);
        }}
        onMouseUp={() => {
          DPadInput.isUpPressed = false;
          setDpadInput(DPadInput);
        }}
      >
        Up
      </button>
      <button
        onMouseDown={() => {
          DPadInput.isDownPressed = true;
          setDpadInput(DPadInput);
        }}
        onMouseUp={() => {
          DPadInput.isDownPressed = false;
          setDpadInput(DPadInput);
        }}
      >
        Down
      </button>
      <button
        onMouseDown={() => {
          DPadInput.isLeftPressed = true;
          setDpadInput(DPadInput);
        }}
        onMouseUp={() => {
          DPadInput.isLeftPressed = false;
          setDpadInput(DPadInput);
        }}
      >
        Left
      </button>
      <button
        onMouseDown={() => {
          DPadInput.isRightPressed = true;
          setDpadInput(DPadInput);
        }}
        onMouseUp={() => {
          DPadInput.isRightPressed = false;
          setDpadInput(DPadInput);
        }}
      >
        Right
      </button>
    </div>
  );
}
