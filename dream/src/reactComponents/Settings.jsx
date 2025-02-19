import { useState } from "react";
import initGame from "../initGame";
import dataManager from "../managers/DataManager";

export default function Settings() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div id="settings">
        <h1 className="title">What device type are you using?</h1>
        <button
          className="settings-btn"
          onClick={() => {
            dataManager.deviceType = "desktop";
            initGame(1920, 1080);
            setIsVisible(false);
          }}
        >
          Desktop
        </button>
        <button
          className="settings-btn"
          onClick={() => {
            dataManager.deviceType = "mobile";
            initGame(1080, 1920);
            setIsVisible(false);
          }}
        >
          Mobile (Vertical Orientation)
        </button>
        <button
          className="settings-btn"
          onClick={() => {
            dataManager.deviceType = "mobile-horizontal";
            initGame(1920, 1080);
            setIsVisible(false);
          }}
        >
          Mobile (Horizontal Orientation)
        </button>
      </div>
    )
  );
}
