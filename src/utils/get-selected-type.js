export default () => {
  const nodeIds = Object.keys(App._state.mirror.sceneGraphSelection);

  if (nodeIds.length === 1 && nodeIds[0]) {
    return window.figmaPlugin.getNodeType(nodeIds[0]);
  }

  return false;
}
