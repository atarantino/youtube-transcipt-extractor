document.addEventListener('DOMContentLoaded', function () {
  const extractButton = document.getElementById('extractButton');
  const copyButton = document.getElementById('copyButton');
  const transcriptText = document.getElementById('transcriptText');

  extractButton.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    transcriptText.value = "Opening transcript and extracting text...";

    chrome.tabs.sendMessage(tab.id, { action: "extract_transcript" }, (response) => {
      if (response && response.transcript) {
        transcriptText.value = response.transcript;
        copyButton.disabled = false;
      } else {
        transcriptText.value = "Error: Couldn't extract transcript. Make sure you're on a YouTube video page.";
      }
    });
  });

  copyButton.addEventListener('click', () => {
    transcriptText.select();
    document.execCommand('copy');
    copyButton.textContent = "Copied!";
    setTimeout(() => {
      copyButton.textContent = "Copy to Clipboard";
    }, 2000);
  });
});


