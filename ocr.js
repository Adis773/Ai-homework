function recognizeHandwriting(imageURL) {
  fetch(CONFIG.OCR_API_URL, {
    method: "POST",
    headers: {
      "apikey": CONFIG.OCR_API_KEY,
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: "url=" + encodeURIComponent(imageURL)
  })
  .then(response => response.json())
  .then(data => {
    if (data.ParsedResults && data.ParsedResults.length > 0) {
      alert("Распознанный текст: " + data.ParsedResults[0].ParsedText);
    } else {
      alert("Ошибка распознавания");
    }
  })
  .catch(error => console.error(error));
}
