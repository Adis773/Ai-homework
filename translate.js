function translate(text, targetLang) {
  return fetch(CONFIG.TRANSLATE_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, source: "ru", target: targetLang })
  })
  .then(response => response.json())
  .then(data => data.translatedText)
  .catch(error => {
    console.error(error);
    return "";
  });
}
