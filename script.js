// Основной скрипт: обработка регистрации, формирование запроса, вызовы API и управление виджетами

// Обработка регистрации пользователя: сохраняем имя и класс
document.getElementById("userDetailsForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const name = document.getElementById("userName").value.trim();
  const userClass = document.getElementById("userClass").value;
  if (!name || !userClass) return;
  // Дополнительно можно добавить валидацию (например, проверку специальных символов)
  localStorage.setItem("userName", name);
  localStorage.setItem("userClass", userClass);
  document.getElementById("displayUserName").innerText = name;
  document.getElementById("initForm").style.display = "none";
  document.getElementById("mainInterface").style.display = "block";
});

// Обработка выбора фото
document.getElementById("photoInput").addEventListener("change", function(e) {
  console.log("Фото выбрано:", e.target.files[0]);
});

// Функция отправки запроса с учетом введенных данных
function sendRequest() {
  const query = document.getElementById("userQuery").value.trim();
  const style = document.getElementById("styleSelect").value;
  const photoInput = document.getElementById("photoInput");
  const userName = localStorage.getItem("userName") || "Ученик";
  const userClass = localStorage.getItem("userClass") || "";
  
  // Формируем базовый prompt с персонализацией
  let basePrompt = `Ты помощник для школьника. Ученик по имени ${userName} учится в ${userClass} классе. Помоги решить задание: `;
  if (query) basePrompt += "Вопрос: " + query;
  
  // Если есть фото, отправляем его для OCR, иначе сразу вызываем ChatGPT
  if (photoInput.files.length > 0) {
    let formData = new FormData();
    formData.append("photo", photoInput.files[0]);
    fetch("/photo", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      let combinedPrompt = basePrompt + "\nРаспознанный текст с фото: " + data.text;
      let modifiedPrompt = modifyPromptByStyle(combinedPrompt, style);
      callChatGPT(modifiedPrompt);
    })
    .catch(err => {
      console.error("Ошибка OCR:", err);
      callChatGPT(basePrompt);
    });
  } else {
    let modifiedPrompt = modifyPromptByStyle(basePrompt, style);
    callChatGPT(modifiedPrompt);
  }
}

// Функция вызова ChatGPT API (через модуль api/chatgpt.js)
function callChatGPT(promptText) {
  chatGPT(promptText)
    .then(responseText => {
      document.getElementById("responseContent").innerText = responseText;
    })
    .catch(err => {
      console.error("Ошибка ChatGPT:", err);
      document.getElementById("responseContent").innerText = "Ошибка получения ответа.";
    });
}

// Функция модификации запроса по выбранному стилю
function modifyPromptByStyle(promptText, style) {
  switch (style) {
    case "excellent":
      return "Отвечай подробно и правильно, как настоящий отличник. " + promptText;
    case "average":
      return "Дай понятный и точный ответ: " + promptText;
    case "lazy":
      return "Дай быстрый ответ, можно с незначительными ошибками: " + promptText;
    case "abstract":
      return "Сделай краткий конспект по теме: " + promptText;
    default:
      return promptText;
  }
}

// Функция для открытия настроек (смена языка, темы)
function openSettings() {
  let lang = prompt("Введите язык интерфейса (ru, en, kk и т.д.):", "ru");
  if (lang) {
    localStorage.setItem("appLang", lang);
    alert("Язык изменён на " + lang);
  }
  // Здесь можно добавить переключение темы (например, светлая/темная) с сохранением в localStorage
}

// Функция отображения информации о премиум-функциях
function showPremium() {
  alert("Премиум-функции:\n- Полный доступ к ГДЗ и конспектам\n- Авто-решения без ошибок\n- Режим 'с ошибками' с расчетом баллов\n- Выбор учебника\n- Дополнительные возможности оплаты");
}

// Виджет для быстрого списывания (копирование текста)
function quickCopy() {
  let text = document.getElementById("responseContent").innerText;
  copyToClipboard(text);
  alert("Текст ответа скопирован в буфер обмена!");
}

// Функция режима с ошибками (использует модуль widgets/mistakes.js)
function generateMistakes() {
  let text = document.getElementById("responseContent").innerText;
  let result = addMistakes(text);
  alert("Вариант с ошибками:\n" + result.modifiedText + "\nОценка: " + result.grade + " баллов");
}

// Функция генерации конспекта (использует модуль premium/books.js)
function showConsp() {
  let subject = prompt("Введите тему для конспекта:");
  if (!subject) return;
  generateConsp(subject).then(consp => {
    alert("Конспект:\n" + consp);
  });
}
