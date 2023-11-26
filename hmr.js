chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
  if (request.action !== "helpMeRead") return;

  makeSelectedTextBold();
  sendResponse({ success: true });
});

function makeSelectedTextBold() {
  let selection = window.getSelection();
  if (!selection.rangeCount) return;

  let range = selection.getRangeAt(0);
  let fragment = document.createDocumentFragment();
  let clonedRange = range.cloneContents();

  processNodes(clonedRange, fragment);

  // Replace the original range content with the processed fragment
  range.deleteContents();
  range.insertNode(fragment);

  // Clear the current selection
  window.getSelection().removeAllRanges();
}

function processNodes(node, fragment) {
  if (!node) return;

  node.childNodes.forEach((child) => {
    if (child.nodeType === 3) {
      // Text node
      let span = document.createElement("span");
      span.innerHTML = makeHalfBold(child.textContent);
      fragment.appendChild(span);
    } else if (child.nodeType === 1) {
      // Element node
      let clonedChild = child.cloneNode();
      processNodes(child, clonedChild);
      fragment.appendChild(clonedChild);
    }
  });
}

function makeHalfBold(text) {
  return text
    .split(/\s+/)
    .map((word) => {
      let mid = Math.floor(word.length / 2);
      return "<strong>" + word.substr(0, mid) + "</strong>" + word.substr(mid);
    })
    .join(" ");
}
