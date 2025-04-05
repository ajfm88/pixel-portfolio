import { useState } from "react";
import initGame from "../initGame";
import { useSetAtom } from "jotai";
import { areTouchControlsEnabledAtom } from "../store";

export default function Settings() {
  const [isVisible, setIsVisible] = useState(true);
  const setAreTouchControlsEnabled = useSetAtom(areTouchControlsEnabledAtom);

  return (
    isVisible && (
      <div id="settings">
        <h1 className="title">Which control scheme do you prefer?</h1>
        <button
          className="settings-btn"
          onClick={() => {
            initGame();
            setAreTouchControlsEnabled(true);
            setIsVisible(false);
          }}
        >
          Touch Controls
        </button>
        <button
          className="settings-btn"
          onClick={() => {
            initGame();
            setIsVisible(false);
          }}
        >
          Keyboard Controls
        </button>
      </div>
    )
  );
}
