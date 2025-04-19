import { useAtomValue } from "jotai";
import { areTouchControlsEnabledAtom } from "./store";
import CameraController from "./reactComponents/CameraController";

import Settings from "./reactComponents/Settings";
import SocialModal from "./reactComponents/SocialModal";
import EmailModal from "./reactComponents/EmailModal";
import ProjectModal from "./reactComponents/ProjectModal";

export default function ReactUI() {
  const areTouchControlsEnabled = useAtomValue(areTouchControlsEnabledAtom);

  return (
    <>
      <CameraController isVisible={areTouchControlsEnabled} />
      <SocialModal areTouchControlsEnabled={areTouchControlsEnabled} />
      <EmailModal areTouchControlsEnabled={areTouchControlsEnabled} />
      <ProjectModal areTouchControlsEnabled={areTouchControlsEnabled} />
      <Settings />
    </>
  );
}
