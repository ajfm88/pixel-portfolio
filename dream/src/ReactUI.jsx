import { useAtomValue } from "jotai";
import { areTouchControlsEnabledAtom } from "./store";
import { CameraController } from "./reactComponents/CameraController";
import Modal from "./reactComponents/Modal";
import Settings from "./reactComponents/Settings";
import { VirtualDPad } from "./reactComponents/VirtualDPad";

export default function ReactUI() {
  const areTouchControlsEnabled = useAtomValue(areTouchControlsEnabledAtom);

  return (
    <>
      <CameraController isVisible={areTouchControlsEnabled} />
      <VirtualDPad isVisible={areTouchControlsEnabled} />
      <Settings />
      <Modal />
    </>
  );
}
