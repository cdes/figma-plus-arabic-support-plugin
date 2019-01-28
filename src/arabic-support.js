import debounce from "lodash.debounce";

import {
  selectionToNodeId,
  createNodes,
  until,
  getActiveTab,
  getNodeType,
  transform,
  getSelectedType,
  getSelectedNodesIds
} from "./utils";

const nodesText = `
<div id="arabic-support" class="raw_components--panel--3IcXg " style="display: block;">
    <div>
        <div class="raw_components--panelTitle--7MaOu raw_components--base--3TpZG raw_components--row--3dLxJ collapsible_property_panel--panelTitle--1cZql">
            <div class="collapsible_property_panel--panelTitleText--3GA0U">Arabic Support</div>
        </div>
        <span></span>
        <div>
            <div class="raw_components--row--3dLxJ type_panel--twoCol--Fj7rw" style="height: auto;"><label class="" style="display: flex;flex-direction: column;align-items: flex-start;justify-content: stretch;width: 100%;"><textarea dir="rtl" id="arabic-support-textarea" type="text" spellcheck="false" value="0" style="background: #fcfcfc;width: 100%;height: 24px;padding: 4px;box-sizing: border-box;border: 1px solid #d4d4d4;border-radius: 3px;height: 80px;margin-bottom: 8px;"></textarea></label></div>
        </div>
        <div class="raw_components--row--3dLxJ "><input type="checkbox" id="enable-ligatures" class=" checkbox--checkbox--2ubjb basic_form--checkbox--3eCIg"><label for="enable-ligatures" class="raw_components--label--34YmO raw_components--base--3TpZG ">Enable Ligatures</label>
        <div style="flex-grow: 1;"></div>
            <span tabindex="0" class="raw_components--iconButton--1XZ77">
              <span class="gc358a75c" data-tooltip-text="Some fonts pack great ligatures, some don't"></span>
            </span>
        </div>
        <div class="raw_components--row--3dLxJ "><input type="checkbox" id="ignore-isolates" class=" checkbox--checkbox--2ubjb basic_form--checkbox--3eCIg" checked="checked"><label for="ignore-isolates" class="raw_components--label--34YmO raw_components--base--3TpZG ">Ignore Isolates</label>
            <div style="flex-grow: 1;"></div>
            <span tabindex="0" class="raw_components--iconButton--1XZ77">
              <span class="gc358a75c" data-tooltip-text="Some fonts don't have proper isolates glyphs. You'll notice this when some glyphs disappear from your text."></span>
            </span>
        </div>
        <div class="raw_components--row--3dLxJ "><input type="checkbox" id="spacer-hack" class=" checkbox--checkbox--2ubjb basic_form--checkbox--3eCIg"><label for="spacer-hack" class="raw_components--label--34YmO raw_components--base--3TpZG ">Enable Spacer Hack</label>
            <div style="flex-grow: 1;"></div>
            <span tabindex="0" class="raw_components--iconButton--1XZ77">
              <span class="gc358a75c" data-tooltip-text="Figma partially reshapes Arabic glyphs with an unexpected behavior.  This hack will add a tiny space between all characters to prevent Figma from reshaping, you need to decrease character spacing by about %2 to counter this increase."></span>
            </span>
        </div>
    </div>
</div>
`;

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

    setInterval(this.inject.bind(this), 100);
  }

  getPanel() {
    return document.getElementById("arabic-support");
  }

  getTextarea() {
    return document.getElementById("arabic-support-textarea");
  }

  getLigaturesCheckbox() {
    return document.getElementById("enable-ligatures");
  }

  getIsolatesCheckbox() {
    return document.getElementById("ignore-isolates");
  }

  getSpacerHackCheckbox() {
    return document.getElementById("spacer-hack");
  }

  async inject() {
    await until(
      () => getActiveTab() === "design" && getSelectedType() === "TEXT"
    );

    if (!this.getPanel()) {
      const nodes = createNodes(nodesText);
      const textPanel = [].slice
        .call(
          document.querySelectorAll(
            ".properties_panel--propertiesPanel--3PCth span span .cachedSubtree"
          )
        )
        .filter(panel => panel.textContent.indexOf("Text") !== -1)[0];

      textPanel.appendChild(nodes);

      const textarea = this.getTextarea();
      const ligaturesCheckbox = this.getLigaturesCheckbox();
      const isolatesCheckbox = this.getIsolatesCheckbox();
      const spacerHackCheckbox = this.getSpacerHackCheckbox();
      const selectedNodeId = getSelectedNodesIds()[0];
      this.selectedNodeId = selectedNodeId;

      await until(() => typeof selectedNodeId !== "undefined");

      const selectedNodeData = this.getOriginalData();
      textarea.value = selectedNodeData.text;

      if (selectedNodeData.settings) {
        ligaturesCheckbox.checked = selectedNodeData.settings[0];
        isolatesCheckbox.checked = selectedNodeData.settings[1];
        spacerHackCheckbox.checked = selectedNodeData.settings[2];
      }

      textarea.addEventListener(
        "input",
        debounce(this.handleInput.bind(this), 150)
      );

      ligaturesCheckbox.addEventListener(
        "change",
        debounce(this.handleCheckbox.bind(this), 150)
      );

      isolatesCheckbox.addEventListener(
        "change",
        debounce(this.handleCheckbox.bind(this), 150)
      );

      spacerHackCheckbox.addEventListener(
        "change",
        debounce(this.handleCheckbox.bind(this), 150)
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
    this.selectedNodeId = selectedNodeId;
    const nodeType = getNodeType(selectedNodeId);

    if (nodeType === "TEXT") {
      ui.style.display = "block";
      const textarea = this.getTextarea();
      const ligaturesCheckbox = this.getLigaturesCheckbox();
      const isolatesCheckbox = this.getIsolatesCheckbox();
      const spacerHackCheckbox = this.getSpacerHackCheckbox();
      const selectedNodeData = this.getOriginalData();
      textarea.value = selectedNodeData.text;

      if (selectedNodeData.settings) {
        ligaturesCheckbox.checked = selectedNodeData.settings[0];
        isolatesCheckbox.checked = selectedNodeData.settings[1];
        spacerHackCheckbox.checked = selectedNodeData.settings[2];
      }
    } else {
      ui.style.display = "none";
      const textarea = this.getTextarea();
      const ligaturesCheckbox = this.getLigaturesCheckbox();
      const isolatesCheckbox = this.getIsolatesCheckbox();
      const spacerHackCheckbox = this.getSpacerHackCheckbox();
      textarea.value = "";
      this.selectedNodeId = null;
      ligaturesCheckbox.checked = false;
      isolatesCheckbox.checked = true;
      spacerHackCheckbox.checked = false;
    }
  }

  getOriginalData() {
    const layerName = App._state.mirror.sceneGraph.get(this.selectedNodeId)
      .name;

    if (layerName.indexOf("<!--ARS[") !== -1) {
      const settings = JSON.parse(layerName.match(/\[([\s\S]*?)\]/)[0]);
      const text = layerName.replace(/<!--([\s\S]*?)-->/, "");
      return {
        text,
        settings
      };
    } else {
      return {
        text: ""
      };
    }
  }

  saveOriginalData(text, settings) {
    const textWithSettings = `<!--ARS[${settings.ligatures},${
      settings.ignoreIsolates
    },${settings.spaceHack}]-->${text}`;

    App.sendMessage("setNodeProperty", {
      nodeId: this.selectedNodeId,
      property: "name",
      value: textWithSettings
    });
  }

  handleInput(event) {
    this.transformText(event.target.value);
  }

  handleCheckbox() {
    const text = this.getTextarea().value;
    this.transformText(text);
  }

  transformText(text) {
    const settings = {
      ligatures: this.getLigaturesCheckbox().checked,
      ignoreIsolates: this.getIsolatesCheckbox().checked,
      spaceHack: this.getSpacerHackCheckbox().checked
    };

    const selectedNode = window.figmaPlus.scene.selection[0];

    this.saveOriginalData(text, settings);
    const transformedText = transform(text, settings);
    selectedNode.characters = transformedText;
    const textarea = this.getTextarea();
    textarea.focus();
  }
}
