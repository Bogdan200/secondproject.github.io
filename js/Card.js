import { API_ENDPOINT } from "./Visit.js"
const token = "Your token is: ae5a679d-9651-4426-93a4-29dc9de9d0e4"


// Створюємо випадаючий список з опціями лікарів
const doctorSelect = document.createElement("select");
doctorSelect.innerHTML = `
    <option value="Кардіолог">Кардіолог</option>
    <option value="Стоматолог">Стоматолог</option>
    <option value="Терапевт">Терапевт</option>
`;

// Створюємо поля для введення даних
const purposeInput = document.createElement("input");
purposeInput.type = "text";
purposeInput.placeholder = "Мета візиту";
const descriptionInput = document.createElement("input");
descriptionInput.type = "text";
descriptionInput.placeholder = "Короткий опис візиту";
const urgencySelect = document.createElement("select");
urgencySelect.innerHTML = `
    <option value="Звичайна">Звичайна</option>
    <option value="Пріоритетна">Пріоритетна</option>
    <option value="Невідкладна">Невідкладна</option>
`;
const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.placeholder = "ПІБ";

// Створюємо поля для введення даних, що відповідають кожному лікарю
const pressureInput = document.createElement("input");
pressureInput.type = "number";
pressureInput.placeholder = "Звичайний тиск";
const bmiInput = document.createElement("input");
bmiInput.type = "number";
bmiInput.placeholder = "Індекс маси тіла";
const heartDiseasesInput = document.createElement("input");
heartDiseasesInput.type = "text";
heartDiseasesInput.placeholder = "Перенесені захворювання серцево-судинної системи";
const ageInput = document.createElement("input");
ageInput.type = "number";
ageInput.placeholder = "Вік";
const lastVisitDateInput = document.createElement("input");
lastVisitDateInput.type = "date";
lastVisitDateInput.placeholder = "Дата останнього відвідування";

// Створюємо кнопки
const createBtn = document.createElement("button");
createBtn.textContent = "Створити";
const closeBtn = document.createElement("button");
closeBtn.textContent = "Закрити";

// Створюємо модальне вікно та додаємо всі елементи до нього
const modal = document.createElement("div");
modal.style.display = "none";
modal.appendChild(doctorSelect);
modal.appendChild(purposeInput);
modal.appendChild(descriptionInput);
modal.appendChild(urgencySelect);
modal.appendChild(nameInput);
modal.appendChild(pressureInput);
modal.appendChild(bmiInput);
modal.appendChild(heartDiseasesInput);
modal.appendChild(ageInput);
modal.appendChild(lastVisitDateInput);
modal.appendChild(createBtn);
modal.appendChild(closeBtn);

// Функція, що показує модальне вікно
function showModal() {
    modal.style.display = "block";
}

// Функція, що закриває модальне вікно
function closeModal() {
    modal.style.display = "none";
}

// Функція, що обробляє вибір лікаря
function handleDoctorSelect() {
    const selectedDoctor = doctorSelect.value;

    // Приховуємо всі унікальні поля
    pressureInput.style.display = "none";
    bmiInput.style.display = "none";
    heartDiseasesInput.style.display = "none";
    ageInput.style.display = "none";
    lastVisitDateInput.style.display = "none";

    // Показуємо відповідні поля для кожного лікаря
    if (selectedDoctor === "Кардіолог") {
        pressureInput.style.display = "block";
        bmiInput.style.display = "block";
        heartDiseasesInput.style.display = "block";
        ageInput.style.display = "block";
    } else if (selectedDoctor === "Стоматолог") {
        lastVisitDateInput.style.display = "block";
    } else if (selectedDoctor === "Терапевт") {
        ageInput.style.display = "block";
    }
}


// Створюємо кнопку «Відкрити модальний».
const openModalBtn = document.createElement("button");
openModalBtn.textContent = "Створити візит";
document.body.appendChild(openModalBtn);

// Додаємо обробники подій до кнопок та випадаючого списку
openModalBtn.addEventListener("click", showModal);
closeBtn.addEventListener("click", closeModal);
doctorSelect.addEventListener("change", handleDoctorSelect);
createBtn.addEventListener("click", () => {

    // Виконуємо необхідні дії для створення візиту
    console.log("Вибраний лікар:", doctorSelect.value);
    console.log("Мета візиту:", purposeInput.value);
    console.log("Короткий опис візиту:", descriptionInput.value);
    console.log("Терміновість:", urgencySelect.value);
    console.log("ПІБ:", nameInput.value);

    if (doctorSelect.value === "Кардіолог") {
        console.log("Звичайний тиск:", pressureInput.value);
        console.log("Індекс маси тіла:", bmiInput.value);
        console.log("Перенесені захворювання серцево-судинної системи:", heartDiseasesInput.value);
        console.log("Вік:", ageInput.value);
    } else if (doctorSelect.value === "Стоматолог") {
        console.log("Дата останнього відвідування:", lastVisitDateInput.value);
    } else if (doctorSelect.value === "Терапевт") {
        console.log("Вік:", ageInput.value);
    }

    closeModal();
});

// Додаємо модальне вікно до body
document.body.appendChild(modal);

// Функція для створення карточки на екрані
function createCard(visitData) {
    const card = document.createElement("div");
    card.classList.add("card");
        card.innerHTML = `
        <h3>${visitData.doctor} Visit</h3>
        <p><strong>Мета візиту:</strong> ${visitData.purpose}</p>
        <p><strong>Короткий опис візиту:</strong> ${visitData.description}</p>
        <p><strong>Терміновість:</strong> ${visitData.urgency}</p>
        <p><strong>ПІБ:</strong> ${visitData.name}</p>
        <p><strong>Інформація для лікаря:</strong></p>
        ${visitData.doctor === "Кардіолог" ? `<p><strong>Звичайний тиск:</strong> ${visitData.pressure}</p>` : ""}
        ${visitData.doctor === "Кардіолог" ? `<p><strong>Індекс маси тіла:</strong> ${visitData.bmi}</p>` : ""}
        ${visitData.doctor === "Кардіолог" ? `<p><strong>Перенесені захворювання серцево-судинної системи:</strong> ${visitData.heartDiseases}</p>` : ""}
        ${visitData.doctor === "Кардіолог" || visitData.doctor === "Терапевт" ? `<p><strong>Вік:</strong> ${visitData.age}</p>` : ""}
        ${visitData.doctor === "Стоматолог" ? `<p><strong>Дата останнього відвідування:</strong> ${visitData.lastVisitDate}</p>` : ""}
    `;
    document.body.appendChild(card);
}

// Функція, що обробляє подію натискання на кнопку "Створити"
createBtn.addEventListener("click", () => {
    // Виконуємо необхідні дії для створення візиту
    const visitData = {
        doctor: doctorSelect.value,
        purpose: purposeInput.value,
        description: descriptionInput.value,
        urgency: urgencySelect.value,
        name: nameInput.value,
    };

    if (doctorSelect.value === "Кардіолог") {
        visitData.pressure = pressureInput.value;
        visitData.bmi = bmiInput.value;
        visitData.heartDiseases = heartDiseasesInput.value;
        visitData.age = ageInput.value;
    } else if (doctorSelect.value === "Стоматолог") {
        visitData.lastVisitDate = lastVisitDateInput.value;
    } else if (doctorSelect.value === "Терапевт") {
        visitData.age = ageInput.value;
    }

    // Отримуємо відповідь від сервера (постимо visitData як JSON)
    fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(visitData),
    })
        .then((response) => response.text()) //  .text() вместо .json()
        .then((data) => {
            try {
                const parsedData = JSON.parse(data); // разобрать текст как JSON
                createCard(parsedData);

                // Закриваємо модальне вікно
                closeModal();
            } catch (error) {
                console.error("Error creating visit: Invalid JSON response", error);
            }
        })
        .catch((error) => console.error("Error creating visit:", error));
});
