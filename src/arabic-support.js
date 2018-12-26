import debounce from "lodash.debounce";

import {
  selectionToNodeId,
  createNodes,
  until,
  getActiveTab,
  getNodeType,
  transform,
  getNodeText,
  getSelectedType,
  getSelectedNodesIds
} from "./utils";

const nodesText = `<div id="arabic-support" class="raw_components--panel--3IcXg "><div><div class="raw_components--panelTitle--7MaOu raw_components--base--3TpZG raw_components--row--3dLxJ collapsible_property_panel--panelTitle--1cZql"><div class="collapsible_property_panel--panelTitleText--3GA0U">Arabic</div></div><span></span><div><div class="raw_components--row--3dLxJ type_panel--twoCol--Fj7rw" style="height: auto;"><label class="" style="display: flex;flex-direction: column;align-items: flex-start;justify-content: stretch;width: 100%;"><textarea dir="rtl" id="arabic-support-textarea" type="text" spellcheck="false" value="0" style="background: #fcfcfc;width: 100%;height: 24px;padding: 4px;box-sizing: border-box;border: 1px solid #d4d4d4;border-radius: 3px;height: 80px;margin-bottom: 8px;"></textarea></label></div></div></div></div>`;

export default class ArabicSupport {
  constructor() {
    this.inject();
    window.App.fromFullscreen.on(
      "selection:replaceSelectors",
      this.onLayersSelected.bind(this)
    );
    window.App.fromFullscreen.on(
      "selection:addSelectors",
      this.onLayersSelected.bind(this)
    );

    setInterval(this.inject.bind(this), 500);
  }

  getPanel() {
    return document.getElementById("arabic-support");
  }

  getTextarea() {
    return document.getElementById("arabic-support-textarea");
  }

  async inject() {
    await until(
      () => getActiveTab() === "DESIGN" && getSelectedType() === "TEXT"
    );

    if (!this.getPanel()) {
      const nodes = createNodes(nodesText);
      const textPanel = [].slice
        .call(
          document
            .getElementsByClassName(
              "properties_panel--propertiesPanel--3PCth"
            )[0]
            .getElementsByClassName("cachedSubtree")
        )
        .filter(panel => panel.textContent.indexOf("Text") !== -1)[0];
      textPanel.appendChild(nodes);

      const textarea = this.getTextarea();
      const selectedNodeId = getSelectedNodesIds()[0];

      await until(() => typeof selectedNodeId !== "undefined");

      const selectedNodeText = getNodeText(selectedNodeId);
      textarea.value = transform(selectedNodeText);
      textarea.addEventListener(
        "input",
        debounce(this.handleInput.bind(this), 150)
      );
    }
  }

  onLayersSelected(event) {
    const ui = this.getPanel();
    const selections = Array.from(event.buffer);
    const sceneGraphSelection = Object.keys(
      window.App._state.mirror.sceneGraphSelection
    );

    if (
      ui === null ||
      selections.length !== 8 ||
      sceneGraphSelection.length > 1
    )
      return;

    const selectedNodeId = selectionToNodeId(selections);
    const nodeType = getNodeType(selectedNodeId);

    if (nodeType === "TEXT") {
      ui.style.display = "block";
      const textarea = this.getTextarea();
      const selectedNodeText = getNodeText(selectedNodeId);
      textarea.value = transform(selectedNodeText);
    } else {
      ui.style.display = "none";
      const textarea = this.getTextarea();
      textarea.value = "";
    }
  }

  handleInput(event) {
    const transformedText = transform(event.target.value);
    window.figmaPlugin.replaceText(transformedText);
    const textarea = this.getTextarea();
    textarea.focus();
  }
}
