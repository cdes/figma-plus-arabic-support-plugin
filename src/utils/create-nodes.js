export default (htmlString) => {
  return document.createRange().createContextualFragment(htmlString);
}
