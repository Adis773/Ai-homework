function copyToClipboard(text) {
  navigator.clipboard.writeText(text)
    .then(() => console.log("Текст скопирован: " + text))
    .catch(err => console.error("Ошибка копирования", err));
}
