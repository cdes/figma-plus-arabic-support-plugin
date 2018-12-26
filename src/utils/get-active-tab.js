export default function(getActiveTab) {
  const tab = document.querySelector(
    ".properties_panel--activeTab--eBYRG.properties_panel--tab--1g-EF"
  );
  return tab ? tab.textContent : false;
}
