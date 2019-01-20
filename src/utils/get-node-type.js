export default (nodeId) => {
  return window.App._state.mirror.sceneGraph.get(nodeId).type;
}
