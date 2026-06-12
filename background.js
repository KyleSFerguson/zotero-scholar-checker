// Open options page on first install
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === "install") {
    chrome.runtime.openOptionsPage();
  }
});

// Separate async function to keep Chrome's message port perfectly stable
async function handlePaperCheck(request, sendResponse) {
  try {
    const settings = await chrome.storage.local.get(['userId', 'apiKey']);
    if (!settings.userId || !settings.apiKey) {
      sendResponse({ status: "unconfigured" });
      return;
    }

    const encodedTitle = encodeURIComponent(request.title);
    const url = `https://api.zotero.org/users/${settings.userId}/items?q=${encodedTitle}&itemType=-attachment`;

    const response = await fetch(url, {
      headers: {
        'Zotero-API-Key': settings.apiKey,
        'Zotero-API-Version': '3'
      }
    });

    if (!response.ok) throw new Error("API error");
    const data = await response.json();

    if (data.length > 0) {
      const match = data.find(item => 
        item.data.title && item.data.title.toLowerCase().includes(request.title.toLowerCase().substring(0, 30))
      );

      if (match) {
        // 1. Determine Read Status (Defaulting to Need to Read)
        let readStatus = "Need to Read"; 
        const tags = match.data.tags ? match.data.tags.map(t => t.tag.toLowerCase()) : [];
        const extraField = match.data.extra ? match.data.extra.toLowerCase() : "";

        // Catch both "unread" and "need to read" and standardize them
        if (tags.some(t => t.includes('need to read') || t.includes('unread')) || 
            extraField.includes('need to read') || extraField.includes('unread')) {
            readStatus = "Need to Read";
        } else if (tags.some(t => t.includes('reading')) || extraField.includes('reading')) {
            readStatus = "Reading";
        } else if (tags.some(t => t === 'read') || extraField.includes('status: read')) {
            readStatus = "Read";
        }

        // 2. Determine if PDF/Children exist
        const hasPDF = (match.meta && match.meta.numChildren > 0);

        sendResponse({
          status: "found",
          readStatus: readStatus,
          hasPDF: hasPDF
        });
        return;
      }
    }
    sendResponse({ status: "not_found" });
  } catch (error) {
    console.error(error);
    sendResponse({ status: "error" });
  }
}

// Clean, synchronous message listener channel
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "checkPaper") {
    handlePaperCheck(request, sendResponse);
    return true; // Tells Chrome to keep the response line open asynchronously
  }
});