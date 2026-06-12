function processScholarResults() {
  const results = document.querySelectorAll('.gs_r.gs_or.gs_scl');

  results.forEach(result => {
    const titleElement = result.querySelector('.gs_rt a');
    if (!titleElement || result.dataset.zoteroChecked) return;

    result.dataset.zoteroChecked = "true";
    const paperTitle = titleElement.textContent.trim();

    chrome.runtime.sendMessage({ action: "checkPaper", title: paperTitle }, (response) => {
      if (!response) return;

      const badge = document.createElement('div');
      badge.className = 'zotero-badge';

      if (response.status === "found") {
        badge.classList.add('zotero-found');
        
        // 1. Format the PDF text (Make it red if missing)
        const pdfText = response.hasPDF 
            ? "Have PDF" 
            : "<span style='color: #c5221f; font-weight: bold;'>No PDF Saved</span>";
            
        // 2. Format the Read Status (Make it red if it is "Need to Read")
        const readText = response.readStatus === "Need to Read" 
            ? "<span style='color: #c5221f; font-weight: bold;'>Need to Read</span>" 
            : response.readStatus;
        
        // 3. Assemble the badge (Order swapped: PDF first, then Read Status)
        badge.innerHTML = `✓ In Zotero | ${pdfText} | ${readText}`;
        
      } else if (response.status === "not_found") {
        badge.classList.add('zotero-missing');
        badge.textContent = `✗ Not in Zotero`;
      } else if (response.status === "unconfigured") {
        badge.classList.add('zotero-warn');
        badge.textContent = `⚙ Set up Zotero API in extension options`;
      }

      const titleContainer = result.querySelector('.gs_ri');
      if (titleContainer) {
        titleContainer.insertBefore(badge, titleContainer.firstChild);
      }
    });
  });
}

setTimeout(processScholarResults, 1000);