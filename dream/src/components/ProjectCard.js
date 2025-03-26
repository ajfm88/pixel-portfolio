export default function ProjectCard(k, parent) {
  const card = parent.add([k.rect(800, 250), { radius: 8 }]);

  return card;
}
