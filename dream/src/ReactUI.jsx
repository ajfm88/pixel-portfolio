import Modal from "./reactComponents/Modal";
import Settings from "./reactComponents/Settings";
import { VirtualDPad } from "./reactComponents/VirtualDPad";

export default function ReactUI() {
  return (
    <>
      <VirtualDPad />
      <Settings />
      <Modal />
    </>
  );
}
