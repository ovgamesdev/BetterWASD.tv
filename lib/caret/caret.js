
function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined" && typeof document.createRange != "undefined") {
    var range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  } else if (typeof document.body.createTextRange != "undefined") {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(el);
    textRange.collapse(false);
    textRange.select();
  }
}

function getCaretPosition(editableDiv) {
  var caretPos = 0,
    sel,
    range;
  if (window.getSelection) {
    sel = window.getSelection();
    if (sel.rangeCount) {
      range = sel.getRangeAt(0);
      if (range.commonAncestorContainer.parentNode == editableDiv) {
        caretPos = range.endOffset;
      }
    }
  } else if (document.selection && document.selection.createRange) {
    range = document.selection.createRange();
    if (range.parentElement() == editableDiv) {
      var tempEl = document.createElement("span");
      editableDiv.insertBefore(tempEl, editableDiv.firstChild);
      var tempRange = range.duplicate();
      tempRange.moveToElementText(tempEl);
      tempRange.setEndPoint("EndToEnd", range);
      caretPos = tempRange.text.length;
    }
  }
  return caretPos;
}

function isCaretOnFirstLine(element) {
  if (element.ownerDocument.activeElement !== element) return false;

  // Get the client rect of the current selection
  let window = element.ownerDocument.defaultView;
  let selection = window.getSelection();
  if (selection.rangeCount === 0) return false;

  let originalCaretRange = selection.getRangeAt(0);

  // Bail if there is text selected
  if (originalCaretRange.toString().length > 0) return false;

  let originalCaretRect = originalCaretRange.getBoundingClientRect();

  // Create a range at the end of the last text node
  let startOfElementRange = element.ownerDocument.createRange();
  startOfElementRange.selectNodeContents(element);

  // The endContainer might not be an actual text node,
  // try to find the last text node inside
  let startContainer = startOfElementRange.endContainer;
  let startOffset = 0;
  while (startContainer.hasChildNodes() && !(startContainer instanceof Text)) {
    startContainer = startContainer.firstChild;
  }

  startOfElementRange.setStart(startContainer, startOffset);
  startOfElementRange.setEnd(startContainer, startOffset);
  let endOfElementRect = startOfElementRange.getBoundingClientRect();

  return originalCaretRect.top === endOfElementRect.top;
}

function isCaretOnLastLine(element) {
  if (element.ownerDocument.activeElement !== element) return false;

  // Get the client rect of the current selection
  let window = element.ownerDocument.defaultView;
  let selection = window.getSelection();
  if (selection.rangeCount === 0) return false;

  let originalCaretRange = selection.getRangeAt(0);

  // Bail if there is a selection
  if (originalCaretRange.toString().length > 0) return false;

  let originalCaretRect = originalCaretRange.getBoundingClientRect();

  // Create a range at the end of the last text node
  let endOfElementRange = document.createRange();
  endOfElementRange.selectNodeContents(element);

  // The endContainer might not be an actual text node,
  // try to find the last text node inside
  let endContainer = endOfElementRange.endContainer;
  let endOffset = 0;
  while (endContainer.hasChildNodes() && !(endContainer instanceof Text)) {
    endContainer = endContainer.lastChild;
    endOffset = endContainer.length ?? 0;
  }

  endOfElementRange.setEnd(endContainer, endOffset);
  endOfElementRange.setStart(endContainer, endOffset);
  let endOfElementRect = endOfElementRange.getBoundingClientRect();

  return originalCaretRect.bottom === endOfElementRect.bottom;
}