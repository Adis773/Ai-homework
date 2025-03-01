// Автосохранение регистрационных данных и переключение интерфейса
document.getElementById("userDetailsForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("userName").value.trim();
  const userClass = document.getElementById("userClass").value;
  if (!name || !userClass) return;
  localStorage.setItem("userName", name);
  localStorage.setItem("userClass", userClass);
  document.getElementById("displayUserName").innerText = name;
  document.getElementById("initForm").style.display = "none";
  document.getElementById("mainInterface").style.display = "block";
});

// Автоматическая генерация ответа при вводе текста
function generateAnswer() {
  let input = document.getElementById("userInput").value;
  let answerText = document.getElementById("answerText");

  if (input.trim() !== "") {
    answerText.innerHTML = "Обработка...";
    // Имитация быстрого ответа через задержку (в реале вызов API)
    setTimeout(() => {
      // Пример: ответ генерируется на основе введенного текста (можно заменить на вызов ChatGPT)
      answerText.innerHTML = "Ответ: " + input.split("").reverse().join("");
    }, 1000);
  } else {
    answerText.innerHTML = "Введите задание или загрузите фото";
  }
}

// Обработка загрузки фото (загрузка с камеры или галереи)
function uploadPhoto() {
  let fileInput = document.getElementById("fileUpload");
  let answerText = document.getElementById("answerText");

  if (fileInput.files.length > 0) {
    answerText.innerHTML = "Фото загружено, обработка...";
    // Здесь можно вызвать OCR API. Для демонстрации используем задержку.
    setTimeout(() => {
      answerText.innerHTML = "Ответ: (ИИ анализирует фото и формирует ответ)";
    }, 2000);
  }
}

// Настройки и премиум
function openSettings() {
  alert("Открываются настройки (смена языка, темы и т.д.)");
}

function openPremium() {
  alert("Премиум-функции: полный доступ к конспектам, ГДЗ и улучшенным ответам.");
}

// Виджет для быстрого списывания (копирование текста)
function quickCopy() {
  let text = document.getElementById("answerText").innerText;
  navigator.clipboard.writeText(text)
    .then(() => alert("Ответ скопирован в буфер обмена!"))
    .catch(err => console.error("Ошибка копирования", err));
}

// Виджет: режим с ошибками
function generateMistakes() {
  let text = document.getElementById("answerText").innerText;
  let result = addMistakes(text);
  alert("Вариант с ошибками:\n" + result.modifiedText + "\nОценка: " + result.grade + " баллов");
}

// Виджет: генерация конспекта
function openConsp() {
  let subject = prompt("Введите тему для конспекта:");
  if (!subject) return;
  generateConsp(subject).then(consp => {
    alert("Конспект:\n" + consp);
  });
}
