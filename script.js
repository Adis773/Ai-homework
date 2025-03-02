document.addEventListener("DOMContentLoaded", () => {
  // Регистрация пользователя
  const initModal = document.getElementById("initModal");
  const startBtn = document.getElementById("startBtn");
  const userNameInput = document.getElementById("userName");
  const userClassInput = document.getElementById("userClass");
  const userCountryInput = document.getElementById("userCountry");

  // Если данные уже сохранены – пропускаем регистрацию
  if (localStorage.getItem("userName") && localStorage.getItem("userClass") && localStorage.getItem("userCountry")) {
    initModal.style.display = "none";
    document.getElementById("mainInterface").style.display = "block";
    document.getElementById("userDisplayName").textContent = localStorage.getItem("userName");
  }

  startBtn.addEventListener("click", () => {
    const name = userNameInput.value.trim();
    const userClass = userClassInput.value;
    const country = userCountryInput.value;
    if (!name || !userClass || !country) {
      alert("Заполните все поля!");
      return;
    }
    localStorage.setItem("userName", name);
    localStorage.setItem("userClass", userClass);
    localStorage.setItem("userCountry", country);
    document.getElementById("userDisplayName").textContent = name;
    initModal.style.display = "none";
    document.getElementById("mainInterface").style.display = "block";
  });

  // Обработка кнопки "Отправить"
  const sendBtn = document.getElementById("sendBtn");
  sendBtn.addEventListener("click", () => {
    const taskInput = document.getElementById("taskInput").value.trim();
    if (!taskInput) {
      alert("Введите задание!");
      return;
    }
    const responseSection = document.getElementById("responseSection");
    const responseText = document.getElementById("responseText");
    responseSection.style.display = "block";
    responseText.textContent = "Обработка...";
    // Здесь можно вставить вызов реального API (например, ChatGPT)
    setTimeout(() => {
      responseText.textContent = "Ответ: " + taskInput.split("").reverse().join("");
    }, 1000);
  });

  // Обработка кнопки "Камера" (запускает файловый ввод)
  const cameraBtn = document.querySelector(".camera-btn");
  cameraBtn.addEventListener("click", () => {
    document.getElementById("photoInput").click();
  });

  // Обработка загрузки фото
  document.getElementById("photoInput").addEventListener("change", () => {
    const responseSection = document.getElementById("responseSection");
    const responseText = document.getElementById("responseText");
    if (document.getElementById("photoInput").files.length > 0) {
      responseSection.style.display = "block";
      responseText.textContent = "Фото загружено, обработка...";
      // Здесь можно вызвать OCR API – для демо используем задержку
      setTimeout(() => {
        responseText.textContent = "Ответ: (ИИ анализирует фото и формирует ответ)";
      }, 2000);
    }
  });

  // Функции футера
  document.getElementById("copyBtn").addEventListener("click", () => {
    const text = document.getElementById("responseText").textContent;
    navigator.clipboard.writeText(text)
      .then(() => alert("Ответ скопирован!"))
      .catch(err => console.error("Ошибка копирования", err));
  });

  document.getElementById("mistakeBtn").addEventListener("click", () => {
    const text = document.getElementById("responseText").textContent;
    const index = Math.floor(Math.random() * text.length);
    const wrongChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    const modifiedText = text.substring(0, index) + wrongChar + text.substring(index + 1);
    alert("Вариант с ошибками:\n" + modifiedText + "\nОценка: 80 баллов");
  });

  document.getElementById("summaryBtn").addEventListener("click", () => {
document.getElementById("photoInput").addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const responseSection = document.getElementById("responseSection");
        const responseText = document.getElementById("responseText");
        responseSection.style.display = "block";
        responseText.innerHTML = `<p>Фото загружено, анализируем...</p><img src="${e.target.result}" alt="Загруженное изображение" style="max-width: 100%;">`;
        setTimeout(() => {
          responseText.innerHTML += `<p>Мы пока не умеем распознавать текст с фото, но скоро добавим эту функцию!</p>`;
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  });

  // Кнопка "Быстро списать"
  document.getElementById("copyBtn").addEventListener("click", () => {
    const responseText = document.getElementById("responseText").textContent;
    if (!responseText || responseText === "Обработка...") {
      alert("Нет ответа для копирования!");
      return;
    }
    navigator.clipboard.writeText(responseText).then(() => {
      alert("Ответ скопирован!");
    });
  });

  // Кнопка "Режим с ошибками"
  document.getElementById("mistakeBtn").addEventListener("click", () => {
    const responseText = document.getElementById("responseText");
    if (!responseText.textContent || responseText.textContent === "Обработка...") {
      alert("Нет ответа для изменения!");
      return;
    }
    responseText.textContent = responseText.textContent.replace(/[аеёиоуыэюя]/gi, (match) => Math.random() > 0.5 ? "*" : match);
  });

  // Кнопка "Конспект" (создаёт короткое описание ответа)
  document.getElementById("summaryBtn").addEventListener("click", () => {
    const responseText = document.getElementById("responseText").textContent;
    if (!responseText || responseText === "Обработка...") {
      alert("Нет ответа для конспекта!");
      return;
    }
    alert("Краткий конспект: " + responseText.slice(0, 50) + "...");
  });

  // Настройки (будет позже)
  document.getElementById("settingsBtn").addEventListener("click", () => {
    alert("Скоро здесь появятся настройки!");
  });

  // Премиум (заглушка)
  document.getElementById("premiumBtn").addEventListener("click", () => {
    alert("Премиум-версия пока не доступна.");
  });
});
