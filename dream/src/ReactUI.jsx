import { useEffect } from "react";
import Modal from "./reactComponents/Modal";
import Settings from "./reactComponents/Settings";
import { isVisibleAtom } from "./state";
import { useAtomValue } from "jotai";
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
