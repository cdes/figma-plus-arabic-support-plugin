export default (nodeId) => {
  return window.App.sendMessage("inspectNodeForInteractionTests", {nodeId}).args.extractedText;
}