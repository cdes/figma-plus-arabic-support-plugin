export default () => {

  const selection = window.figmaPlugin.scene.selection;

  if (selection.length === 1) {
    return window.figmaPlugin.scene.selection[0].type;
  }

  return false;
}
