import { atom, createStore } from "jotai";

export const isSocialModalVisibleAtom = atom(false);
export const selectedLinkAtom = atom(null);
export const selectedLinkDescriptionAtom = atom("");

export const isEmailModalVisibleAtom = atom(false);
export const emailAtom = atom("");

export const DPadInputAtom = atom({
  isLeftPressed: false,
  isRightPressed: false,
  isUpPressed: false,
  isDownPressed: false,
});

export const keyboardInputAtom = atom({
  isLeftPressed: false,
  isRightPressed: false,
  isUpPressed: false,
  isDownPressed: false,
});

export const areTouchControlsEnabledAtom = atom(false);

export const cameraZoomValueAtom = atom({ value: 1 });

export const store = createStore();
