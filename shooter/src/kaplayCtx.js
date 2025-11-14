import kaplay from "kaplay";

const k = kaplay({
  width: 256,
  height: 224,
  letterbox: true,
  touchToMouse: true,
  scale: 4,
});

export default k;
