export default function() {
  const nodeId = Object.keys(App._state.mirror.sceneGraphSelection)[0];

  if (nodeId) {
    return window.figmaPlugin.getNodeType(nodeId);
  }

  return false;
}
