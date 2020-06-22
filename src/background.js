'use strict';

// Add listener to create ontoclick context menu items at runtime.onInstalled
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id: 'ontoclick-en',
    title: 'OntoClick',
    type: 'normal',
    contexts: ['selection']
  });
});

chrome.contextMenus.onClicked.addListener(function(item, tab) {
  chrome.tabs.executeScript({
    file: 'static/js/loader.js'
  });
});
