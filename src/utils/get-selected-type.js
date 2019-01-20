export default () => {

  const selection = Object.keys(window.App._state.mirror.sceneGraphSelection);

  if (selection.length === 1) {
    return window.App._state.mirror.sceneGraph.get(selection[0]).type;
  }

  return false;
}
