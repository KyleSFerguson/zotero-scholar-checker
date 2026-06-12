# Zotero Scholar Checker

A lightweight Chrome extension that integrates Google Scholar with your personal Zotero library. It scans search results in real time and inserts color-coded badges indicating whether a paper is already saved, its reading status, and if an associated PDF is attached.

This tool eliminates manual cross-referencing by providing library status data directly within your browser search view.

---

## Features

* **Library Matching:** Checks if a paper title matches an existing item in your Zotero database.
* **Status Badges:** Injects highly readable status markers directly into the Google Scholar search results interface.
* **Reading Progress Tracking:** Syncs with your Zotero item tags and metadata fields to display current status:
  * Need to Read
  * Reading
  * Read
* **PDF Attachment Verification:** Flags whether a matching record contains an associated PDF file attachment (Have PDF / No PDF Saved).
* **Client-Side Security:** Operates entirely client-side. Your Zotero UserID and Secret API Key are stored securely on your local device via chrome.storage.local and connect directly to the official Zotero API.

---

## Setup Instructions

### 1. Installation
Install the extension via the Chrome Web Store (or load it as an unpacked developer extension locally).

### 2. Configuration
Upon installation, the Options/Settings page will automatically open. To access it later, click the extension icon in your Chrome toolbar and select Extension options.

### 3. Retrieve Zotero API Credentials
To enable the extension to securely query your library:
1. Log into your account on Zotero.org.
2. Navigate to Settings -> Feeds/API.
3. Copy your personal UserID listed on that page.
4. Click Create new private key, provide a description (e.g., "Scholar Checker"), leave the default read-access permissions enabled, and click Save Key.
5. Copy the newly generated Secret API Key string.

### 4. Connect
Paste your UserID and API Key into the extension's options fields and click Save & Connect. 

Refresh or run a new search query on Google Scholar to view your status badges.

---

## Permissions & Security

This extension requests minimal permissions to ensure data privacy:
* storage: Used exclusively to save your Zotero authentication credentials locally on your machine.
* host_permissions (*://scholar.google.com/*): Required to parse search result text and insert status badges.
* host_permissions (https://api.zotero.org/*): Required to securely send title queries directly to the Zotero web servers.

---

## AI Usage Declaration

This project utilized Gemini in its development. 

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
