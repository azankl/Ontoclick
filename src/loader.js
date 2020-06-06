import style from './css/loader.css'
import Popper from 'popper.js'

var selection = window.getSelection();
var range = selection.getRangeAt(0);
var popperDiv = document.createElement('div');
popperDiv.id = 'popper-container';
popperDiv.className = 'popper'

var arrowElement = document.createElement('div');
arrowElement.className = 'popper__arrow';
popperDiv.appendChild(arrowElement)

var frame = document.createElement('iframe');
frame.id = 'popper-inner';
frame.setAttribute('width', '100%');
frame.setAttribute('height', '100%');
frame.setAttribute('frameborder', '0');
frame.setAttribute('src', chrome.extension.getURL("index.html") + '?query=' + escape(selection) + '&ontology=HP');

popperDiv.appendChild(frame)

document.body.appendChild(popperDiv)

let popper = new Popper(range, popperDiv, {
  placement: 'right',
  removeOnDestroy: true,
  arrowElement: arrowElement,
  onCreate: (data) => {
  },
  onUpdate: (data) => {
  }
});

let tearDown = function() {
  popper.destroy()
  document.removeEventListener("selectionchange", onSelectionChange);
}

let onSelectionChange = function() {
  tearDown()
}

let onMessage = function(message) {
  let messageData = message.data
  if (messageData) {
    switch(messageData.type) {
      case 'copied':
      tearDown()
      break;
      case 'copied-paste':
      selection.focusNode.focus()
      document.execCommand('Paste');
      tearDown()
      break;
    }
  }
}

document.addEventListener("selectionchange", onSelectionChange);
window.addEventListener('message', onMessage, false)
