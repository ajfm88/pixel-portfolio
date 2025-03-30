import { atom, createStore } from "jotai";

export const isModalVisibleAtom = atom(false);
export const selectedLinkAtom = atom(null);
export const selectedLinkDescriptionAtom = atom("");

export const DPadInputAtom = atom({
  isLeftPressed: false,
  isRightPressed: false,
  isUpPressed: false,
  isDownPressed: false,
});

export const areTouchControlsEnabledAtom = atom(false);

export const store = createStore();
