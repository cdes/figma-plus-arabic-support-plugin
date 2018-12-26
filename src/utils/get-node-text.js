export default function (nodeId) {
  return window.App.sendMessage("inspectNodeForInteractionTests", {nodeId}).args.extractedText;
}