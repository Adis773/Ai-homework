document.addEventListener("DOMContentLoaded", () => {
    const registerModal = document.getElementById("register-modal");
    const startBtn = document.getElementById("start-btn");
    const nameInput = document.getElementById("name");
    const classInput = document.getElementById("class");
    const countryInput = document.getElementById("country");
    const taskInput = document.getElementById("task-input");
    const sendBtn = document.getElementById("send-btn");
    const answerContainer = document.getElementById("answer-container");

    if (!localStorage.getItem("userName")) {
        registerModal.style.display = "block";
    }

    startBtn.addEventListener("click", () => {
        if (nameInput.value && classInput.value && countryInput.value) {
            localStorage.setItem("userName", nameInput.value);
            localStorage.setItem("userClass", classInput.value);
            localStorage.setItem("userCountry", countryInput.value);
            registerModal.style.display = "none";
        } else {
            alert("Заполните все поля!");
        }
    });

    sendBtn.addEventListener("click", () => {
        if (taskInput.value.trim() === "") {
            alert("Введите задание!");
            return;
        }

        answerContainer.classList.remove("hidden");
        answerContainer.innerHTML = `<p><strong>Ответ:</strong> ${taskInput.value} (примерный ответ)</p>`;
    });

    document.getElementById("copy-btn").addEventListener("click", () => {
        navigator.clipboard.writeText(answerContainer.innerText).then(() => {
            alert("Ответ скопирован!");
        });
    });

    document.getElementById("mistake-btn").addEventListener("click", () => {
        if (!answerContainer.classList.contains("hidden")) {
            answerContainer.innerHTML += `<p><strong>Версия с ошибками:</strong> ${taskInput.value.split("").reverse().join("")}</p>`;
        }
    });

    document.getElementById("summary-btn").addEventListener("click", () => {
        if (!answerContainer.classList.contains("hidden")) {
            answerContainer.innerHTML += `<p><strong>Краткий конспект:</strong> Основная идея задания - ...</p>`;
        }
    });
});
