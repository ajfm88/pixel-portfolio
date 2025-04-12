import { useAtomValue } from "jotai";
import { areTouchControlsEnabledAtom } from "./store";
import CameraController from "./reactComponents/CameraController";

import Settings from "./reactComponents/Settings";
import VirtualDPad from "./reactComponents/VirtualDPad";
import SocialModal from "./reactComponents/SocialModal";
import EmailModal from "./reactComponents/EmailModal";

export default function ReactUI() {
  const areTouchControlsEnabled = useAtomValue(areTouchControlsEnabledAtom);

  return (
    <>
      <CameraController isVisible={areTouchControlsEnabled} />
      <VirtualDPad isVisible={areTouchControlsEnabled} />
      <Settings />
      <SocialModal />
      <EmailModal />
    </>
  );
}
