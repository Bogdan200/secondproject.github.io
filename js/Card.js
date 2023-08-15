import { API_ENDPOINT, VisitCardiologist, VisitDentist, VisitTherapist } from "./Visit.js"

const token = "ae5a679d-9651-4426-93a4-29dc9de9d0e4"

let cards = [];


async function getAllCards() {
    await fetch("https://ajax.test-danit.com/api/v2/cards", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    })
        .then(response => response.json())
        .then(data => {
            cards = data;
            console.log(data);
            if (cards.length > 0) {
                document.getElementById('visit__field').remove()
                cards.forEach(card => {
                    console.log(card);
                    createCard(card)
                })
            }
        })
}
getAllCards()

// let id = 188674;

// fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
//     method: 'DELETE',
//     headers: {
//         'Authorization': `Bearer ${token}`
//     },
// })

// Створюємо випадаючий список з опціями лікарів
const doctorSelect = document.createElement("select");
doctorSelect.classList.add("doctors")
doctorSelect.innerHTML = `
    <option value="Кардіолог">Кардіолог</option>
    <option value="Стоматолог">Стоматолог</option>
    <option value="Терапевт">Терапевт</option>
`;

// Створюємо поля для введення даних
const purposeInput = document.createElement("input");
purposeInput.type = "text";
purposeInput.classList.add("purpose")
purposeInput.placeholder = "Мета візиту";
const descriptionInput = document.createElement("input");
descriptionInput.type = "text";
descriptionInput.classList.add("description")
descriptionInput.placeholder = "Короткий опис візиту";
const urgencySelect = document.createElement("select");
urgencySelect.classList.add("urgency")
urgencySelect.innerHTML = `
    <option value="Звичайна">Звичайна</option>
    <option value="Пріоритетна">Пріоритетна</option>
    <option value="Невідкладна">Невідкладна</option>
`;
const nameInput = document.createElement("input");
nameInput.type = "text";
nameInput.classList.add("name-input")
nameInput.placeholder = "ПІБ";

// Створюємо поля для введення даних, що відповідають кожному лікарю
const pressureInput = document.createElement("input");
pressureInput.type = "number";
pressureInput.classList.add("pressure")
pressureInput.placeholder = "Звичайний тиск";
const bmiInput = document.createElement("input");
bmiInput.type = "number";
bmiInput.classList.add("bmi")
bmiInput.placeholder = "Індекс маси тіла";
const heartDiseasesInput = document.createElement("input");
heartDiseasesInput.type = "text";
heartDiseasesInput.classList.add("heart-diseases")
heartDiseasesInput.placeholder = "Перенесені захворювання серцево-судинної системи";
const ageInput = document.createElement("input");
ageInput.type = "number";
ageInput.classList.add("age-input")
ageInput.placeholder = "Вік";
const lastVisitDateInput = document.createElement("input");
lastVisitDateInput.type = "date";
lastVisitDateInput.classList.add("last-visit")
lastVisitDateInput.placeholder = "Дата останнього відвідування";

// Створюємо кнопки
const createBtn = document.createElement("button");
createBtn.classList.add("create-btn")
createBtn.textContent = "Створити";
const closeBtn = document.createElement("button");
closeBtn.classList.add("close-btn")
closeBtn.textContent = "Закрити";

// Створюємо модальне вікно та додаємо всі елементи до нього
const modal = document.createElement("div");
modal.classList.add("modal-container")
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
    modal.style.display = "flex";
    modal.style.flexWrap = "wrap";

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

const openModalBtn = document.getElementById("createVisitButton");

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
        <h3 class="visit-name"><strong>Пацієнт:</strong> ${visitData.name}</h3>
        <p class="visit-doctor">Лікар: ${visitData.doctor}</p>
        <p class="visit-purpose"><strong class="visit-purpose">Мета візиту:</strong> ${visitData.purpose}</p>
        <p class="visit-description"><strong class="visit-description">Короткий опис візиту:</strong> ${visitData.description}</p>
        <p class="visit-urgency"><strong class="visit-urgency">Терміновість:</strong> ${visitData.urgency}</p>
        <p class="visit-info"><strong class="visit-info">Інформація для лікаря:</strong></p>
        ${visitData.doctor === "Кардіолог" ? `<p class="visit-pressure"><strong class="visit-pressure">Звичайний тиск:</strong> ${visitData.pressure}</p>` : ""}
        ${visitData.doctor === "Кардіолог" ? `<p class="visit-bmi"><strong class="visit-bmi">Індекс маси тіла:</strong> ${visitData.bmi}</p>` : ""}
        ${visitData.doctor === "Кардіолог" ? `<p class="visit-heartdiseases"><strong class="visit-heartdiseases">Перенесені захворювання серцево-судинної системи:</strong> ${visitData.heartDiseases}</p>` : ""}
        ${visitData.doctor === "Кардіолог" || visitData.doctor === "Терапевт" ? `<p class="visit-age"><strong class="visit-age">Вік:</strong> ${visitData.age}</p>` : ""}
        ${visitData.doctor === "Стоматолог" ? `<p class="visit-last"><strong class="visit-last">Дата останнього відвідування:</strong> ${visitData.lastVisitDate}</p>` : ""}
    `;
    document.body.appendChild(card);
}

// Функція, що обробляє подію натискання на кнопку "Створити"
createBtn.addEventListener("click", () => {
    // Виконуємо необхідні дії для створення візиту
    let visitData = {

    };


    if (doctorSelect.value === "Кардіолог") {
        visitData = new VisitCardiologist(doctorSelect.value, purposeInput.value, descriptionInput.value, urgencySelect.value, nameInput.value, pressureInput.value, bmiInput.value, heartDiseasesInput.value, ageInput.value)

    } else if (doctorSelect.value === "Стоматолог") {
        visitData = new VisitDentist(doctorSelect.value, purposeInput.value, descriptionInput.value, urgencySelect.value, nameInput.value, lastVisitDateInput.value)
    } else if (doctorSelect.value === "Терапевт") {
        visitData = new VisitTherapist(doctorSelect.value, purposeInput.value, descriptionInput.value, urgencySelect.value, nameInput.value, ageInput.value);
    }
    console.log(visitData)

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

