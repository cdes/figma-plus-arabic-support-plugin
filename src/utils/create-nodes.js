export default function(htmlString) {
  return document.createRange().createContextualFragment(htmlString);
}
