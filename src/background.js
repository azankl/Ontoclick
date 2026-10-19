'use strict';

// Add listener to create ontoclick context menu items when the extension is installed.
// Context menus persist across browser restarts, so there is no need to recreate them on startup.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: 'ontoclick-en',
    title: 'OntoClick',
    type: 'normal',
    contexts: ['all']
  });
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {
  var target = { tabId: tab.id };
  chrome.scripting.insertCSS({
    target: target,
    files: ['static/css/loader.css']
  });
  chrome.scripting.executeScript({
    target: target,
    files: ['static/js/loader.js']
  });
});
