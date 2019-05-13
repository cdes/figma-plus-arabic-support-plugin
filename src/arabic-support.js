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
<div id="arabic-support" style="display: block;border-bottom: 1px solid #e5e5e5;padding: 6px 0;">
  <style>
    #arabic-support input[type="checkbox"]:after {
      content: '';
      display: inline-flex;
      width: 12px;
      height: 12px;
      background-color: #fff;
      border: 1px solid rgba(0,0,0,.8);
      border-radius: 2px;
      box-sizing: border-box;
      background-color: #fff;
    }

    #arabic-support input[type="checkbox"]:checked:after {
      background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOCIgaGVpZ2h0PSI4IiB2aWV3Qm94PSIwIDAgOCA4IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMS4xNzY0NyAyLjgyMzc3TDMuMDU4ODIgNC43MDYxM0w2LjgyMzUzIDAuOTQxNDA2TDggMi4xMTc4OEwzLjA1ODgyIDcuMDU5MDhMMCA0LjAwMDI0TDEuMTc2NDcgMi44MjM3N1oiIGZpbGw9IndoaXRlIi8+PC9zdmc+);
      border: 1px solid #18a0fb;
      background-color: #18a0fb;
      background-position: 50%;
      background-repeat: no-repeat;
    }

    #arabic-support textarea {
      background: #fcfcfc;width: 100%;
      height: 24px;
      padding: 4px;
      box-sizing: border-box;
      border: 1px solid transparent;
      border-radius: 2px;
      height: 80px;
      margin-bottom: 8px;
      resize: vertical;
    }

    #arabic-support textarea:hover {
      border: 1px solid rgba(0,0,0,.1);
    }

    #arabic-support textarea:focus {
      border: 1px solid #18a0fb;
      outline: 1px solid #18a0fb;
      outline-offset: -2px;
    }
  </style>
  <div>
    <div style="position: relative;display: flex;justify-content: space-between;height: 36px;padding: 0 12px;align-items: center;box-sizing: border-box;font-size: 11px;cursor: default;font-weight: 600;">
        <div style="flex-grow: 1;height: 100%;display: flex;align-items: center;">Arabic Support</div>
    </div>
    <span></span>
    <div>
      <div style="height: auto;padding: 0 12px;display: flex;align-items: center;box-sizing: border-box;"><label class="" style="display: flex;flex-direction: column;align-items: flex-start;justify-content: stretch;width: 100%;"><textarea dir="rtl" id="arabic-support-textarea" type="text" spellcheck="false" value="0"></textarea></label></div>
    </div>
    <div style="height: 36px;padding: 0 12px;display: flex;align-items: center;box-sizing: border-box;"><input type="checkbox" id="enable-ligatures" style="margin-right: 6px!important;-webkit-appearance: none;appearance: none;-moz-appearance: checkbox;width: 14px;height: 14px;margin-right: 12px;display: inline-flex;"><label for="enable-ligatures" style="-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;font-size: 11px;color: #444;fill: #444;cursor: default;">Enable Ligatures</label>
    <div style="flex-grow: 1;"></div>
      <span tabindex="0" class="raw_components--iconButton--1XZ77">
        <span class="gc358a75c" data-tooltip-text="Some fonts pack great ligatures, some don't"></span>
      </span>
    </div>
    <div style="height: 36px;padding: 0 12px;display: flex;align-items: center;box-sizing: border-box;"><input type="checkbox" id="ignore-isolates" style="margin-right: 6px!important;-webkit-appearance: none;appearance: none;-moz-appearance: checkbox;width: 14px;height: 14px;margin-right: 12px;display: inline-flex;" checked="checked"><label for="ignore-isolates" style="-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;font-size: 11px;color: #444;fill: #444;cursor: default;">Ignore Isolates</label>
      <div style="flex-grow: 1;"></div>
      <span tabindex="0" class="raw_components--iconButton--1XZ77">
        <span class="gc358a75c" data-tooltip-text="Some fonts don't have proper isolates glyphs. You'll notice this when some glyphs disappear from your text."></span>
      </span>
    </div>
    <div style="height: 36px;padding: 0 12px;display: flex;align-items: center;box-sizing: border-box;"><input type="checkbox" id="spacer-hack" style="margin-right: 6px!important;-webkit-appearance: none;appearance: none;-moz-appearance: checkbox;width: 14px;height: 14px;margin-right: 12px;display: inline-flex;"><label for="spacer-hack" style="-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;font-size: 11px;color: #444;fill: #444;cursor: default;">Enable Spacer Hack</label>
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
      this.onLayersSelected
    );
    window.App.fromFullscreen.on(
      "selection:addSelectors",
      this.onLayersSelected
    );

    // window.App.fromFullscreen.on(
    //   "selectionPropertiesUpdate",
    //   this.onLayersResize
    // );

    setInterval(this.inject, 100);
  }

  getPanel = () => {
    return document.getElementById("arabic-support");
  };

  getTextarea = () => {
    return document.getElementById("arabic-support-textarea");
  };

  getLigaturesCheckbox = () => {
    return document.getElementById("enable-ligatures");
  };

  getIsolatesCheckbox = () => {
    return document.getElementById("ignore-isolates");
  };

  getSpacerHackCheckbox = () => {
    return document.getElementById("spacer-hack");
  };

  inject = async () => {
    await until(
      () => getActiveTab() === "design" && getSelectedType() === "TEXT"
    );

    if (this.getPanel() === null) {
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

      textarea.addEventListener("input", debounce(this.handleInput, 50));

      ligaturesCheckbox.addEventListener(
        "change",
        debounce(this.handleCheckbox, 50)
      );

      isolatesCheckbox.addEventListener(
        "change",
        debounce(this.handleCheckbox, 50)
      );

      spacerHackCheckbox.addEventListener(
        "change",
        debounce(this.handleCheckbox, 50)
      );
    }
  };

  onLayersSelected = event => {
    const ui = this.getPanel();
    const selections = Array.from(event.buffer);
    const sceneGraphSelection = Object.keys(
      window.App._state.mirror.sceneGraphSelection
    );

    if (
      ui === null ||
      selections.length !== 8 ||
      sceneGraphSelection.length > 1
    ) {
      return;
    }
    const selectedNodeId = selectionToNodeId(selections);
    this.selectedNodeId = selectedNodeId;

    const node = App._state.mirror.sceneGraph.get(selectedNodeId);

    if (typeof node === "undefined" || node.type === "TEXT") {
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
  };

  getOriginalData = () => {
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
  };

  saveOriginalData = (text, settings) => {
    const textWithSettings = `<!--ARS[${settings.ligatures},${
      settings.ignoreIsolates
    },${settings.spaceHack}]-->${text}`;

    App.sendMessage("setNodeProperty", {
      nodeId: this.selectedNodeId,
      property: "name",
      value: textWithSettings
    });
  };

  handleInput = event => {
    this.transformText(event.target.value);
  };

  handleCheckbox = () => {
    const text = this.getTextarea().value;
    this.transformText(text);
  };

  transformText = text => {
    const settings = {
      ligatures: this.getLigaturesCheckbox().checked,
      ignoreIsolates: this.getIsolatesCheckbox().checked,
      spaceHack: this.getSpacerHackCheckbox().checked
    };

    const selectedNodes = window.figma.currentPage.selection;

    this.saveOriginalData(text, settings);
    const transformedText = transform(text, settings);
    selectedNodes.forEach(node => {
      node.characters = transformedText;
    });
    const textarea = this.getTextarea();
    textarea.focus();
  };
}
