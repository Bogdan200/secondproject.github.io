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
                const visitField = document.getElementById('visit__field');
                if (visitField !== null) {
                    visitField.remove();
                }
                cards.forEach(card => {
                    console.log(card);
                    createCard(card)
                })
            }
        })
}
getAllCards()

// let id = 188677;

// fetch(`https://ajax.test-danit.com/api/v2/cards/${id}`, {
//     method: 'DELETE',
//     headers: {
//         'Authorization': `Bearer ${token}`
//     },
// })

const doctorSelect = document.createElement("select");
doctorSelect.classList.add("doctors")
doctorSelect.innerHTML = `
    <option value="Кардіолог">Кардіолог</option>
    <option value="Стоматолог">Стоматолог</option>
    <option value="Терапевт">Терапевт</option>
`;

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

const createBtn = document.createElement("button");
createBtn.classList.add("create-btn")
createBtn.textContent = "Створити";
const closeBtn = document.createElement("button");
closeBtn.classList.add("close-btn")
closeBtn.textContent = "Закрити";

const modalEditBtn = document.createElement('button')
modalEditBtn.classList.add("edit-modal-btn")
modalEditBtn.classList.add("create-btn")
modalEditBtn.textContent = "Змінити";

const closeBtnCopy = document.createElement("button");
closeBtnCopy.classList.add("close-btn")
closeBtnCopy.textContent = "Закрити";

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

function showModal() {
    modal.style.display = "flex";
    modal.style.flexWrap = "wrap";
}

function closeModal() {
    modal.style.display = "none";
}

function handleDoctorSelect() {
    const selectedDoctor = doctorSelect.value;

    pressureInput.style.display = "none";
    bmiInput.style.display = "none";
    heartDiseasesInput.style.display = "none";
    ageInput.style.display = "none";
    lastVisitDateInput.style.display = "none";

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

const openModalBtn = document.getElementById("createVisitButton");

openModalBtn.addEventListener("click", () => {
    modalEditBtn.style.display = 'none'
    closeBtnCopy.style.display = 'none'
    createBtn.style.display = 'block'
    closeBtn.style.display = 'block'

    showModal()
});
closeBtn.addEventListener("click", closeModal);
doctorSelect.addEventListener("change", handleDoctorSelect);
createBtn.addEventListener("click", () => {

    const contentText = document.querySelector('.visit__field__inner')
    contentText.style.display = 'none'

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

document.body.appendChild(modal);

function createCard(visitData) {
    const cardContainer = document.querySelector('.card-container')
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <h3 class="visit-name"><strong>Пацієнт:</strong> ${visitData.name}</h3>
        <p class="visit-doctor">Лікар: ${visitData.doctor}</p>
        <button class='more-info'>Більше</button>
        <div class='hidden-div' style='display='none''>
        <p class="visit-purpose"><strong class="visit-purpose">Мета візиту:</strong> ${visitData.purpose}</p>
        <p class="visit-description"><strong class="visit-description">Короткий опис візиту:</strong> ${visitData.description}</p>
        <p class="visit-urgency"><strong class="visit-urgency">Терміновість:</strong> ${visitData.urgency}</p>
        <p class="visit-info"><strong class="visit-info">Інформація для лікаря:</strong></p>
        ${visitData.doctor === "Кардіолог" ? `<p class="visit-pressure"><strong class="visit-pressure">Звичайний тиск:</strong> ${visitData.pressure}</p>` : ""}
        ${visitData.doctor === "Кардіолог" ? `<p class="visit-bmi"><strong class="visit-bmi">Індекс маси тіла:</strong> ${visitData.bmi}</p>` : ""}
        ${visitData.doctor === "Кардіолог" ? `<p class="visit-heartdiseases"><strong class="visit-heartdiseases">Перенесені захворювання серцево-судинної системи:</strong> ${visitData.heartDiseases}</p>` : ""}
        ${visitData.doctor === "Кардіолог" || visitData.doctor === "Терапевт" ? `<p class="visit-age"><strong class="visit-age">Вік:</strong> ${visitData.age}</p>` : ""}
        ${visitData.doctor === "Стоматолог" ? `<p class="visit-last"><strong class="visit-last">Дата останнього відвідування:</strong> ${visitData.lastVisitDate}</p>` : ""}
        <div class='hidden-buttons'>
        <button class='del-btn'>Видалити</button>
        <button class='edit-btn'>Змінити</button>
        </div>
        </div>
    `;
    
    cardContainer.appendChild(card);
    

    function moreInfo() {
        const moreInfoButtons = card.querySelectorAll('.more-info');
        moreInfoButtons.forEach((button) => {
            const hiddenDiv = card.querySelector('.hidden-div');
            button.addEventListener('click', function () {

                if (hiddenDiv.style.display === 'block') {
                    hiddenDiv.style.display = 'none';
                } else {
                    hiddenDiv.style.display = 'block';
                }
            });
        })


    }
    moreInfo()

    function deleteCard() {
        const deleteBtns = document.querySelectorAll('.del-btn');

        deleteBtns.forEach(deleteBtn => {
            deleteBtn.addEventListener('click', () => {
                const closestDeleteCard = deleteBtn.closest('.card');
                closestDeleteCard.remove();
            });
        });
    }
    deleteCard()

    function editCard() {
        const editBtns = document.querySelectorAll('.edit-btn')
        editBtns.forEach((editBtn) => {
            editBtn.addEventListener('click', () => {
                createBtn.style.display = 'none'
                closeBtn.style.display = 'none'
                modal.appendChild(modalEditBtn)
                modal.appendChild(closeBtnCopy)
                modalEditBtn.style.display = 'block'
                closeBtnCopy.style.display = 'block'
                showModal()


                modalEditBtn.addEventListener('click', () => {
                    let visitData = {

                    };
                    if (doctorSelect.value === "Кардіолог") {
                        visitData = new VisitCardiologist(doctorSelect.value, purposeInput.value, descriptionInput.value, urgencySelect.value, nameInput.value, pressureInput.value, bmiInput.value, heartDiseasesInput.value, ageInput.value)

                    } else if (doctorSelect.value === "Стоматолог") {
                        visitData = new VisitDentist(doctorSelect.value, purposeInput.value, descriptionInput.value, urgencySelect.value, nameInput.value, lastVisitDateInput.value)
                    } else if (doctorSelect.value === "Терапевт") {
                        visitData = new VisitTherapist(doctorSelect.value, purposeInput.value, descriptionInput.value, urgencySelect.value, nameInput.value, ageInput.value);
                    }
                    const closestEditCard = editBtn.closest('.card')
                    console.log(closestEditCard)
                    closestEditCard.innerHTML = `
        <h3 class="visit-name"><strong>Пацієнт:</strong> ${visitData.name}</h3>
        <p class="visit-doctor">Лікар: ${visitData.doctor}</p>
        <button class='more-info'>Більше</button>
        <div class='hidden-div'>
        <p class="visit-purpose"><strong class="visit-purpose">Мета візиту:</strong> ${visitData.purpose}</p>
        <p class="visit-description"><strong class="visit-description">Короткий опис візиту:</strong> ${visitData.description}</p>
        <p class="visit-urgency"><strong class="visit-urgency">Терміновість:</strong> ${visitData.urgency}</p>
        <p class="visit-info"><strong class="visit-info">Інформація для лікаря:</strong></p>
        ${visitData.doctor === "Кардіолог" ? `<p class="visit-pressure"><strong class="visit-pressure">Звичайний тиск:</strong> ${visitData.pressure}</p>` : ""}
        ${visitData.doctor === "Кардіолог" ? `<p class="visit-bmi"><strong class="visit-bmi">Індекс маси тіла:</strong> ${visitData.bmi}</p>` : ""}
        ${visitData.doctor === "Кардіолог" ? `<p class="visit-heartdiseases"><strong class="visit-heartdiseases">Перенесені захворювання серцево-судинної системи:</strong> ${visitData.heartDiseases}</p>` : ""}
        ${visitData.doctor === "Кардіолог" || visitData.doctor === "Терапевт" ? `<p class="visit-age"><strong class="visit-age">Вік:</strong> ${visitData.age}</p>` : ""}
        ${visitData.doctor === "Стоматолог" ? `<p class="visit-last"><strong class="visit-last">Дата останнього відвідування:</strong> ${visitData.lastVisitDate}</p>` : ""}
        <div class='hidden-buttons'>
        <button class='del-btn'>Видалити</button>
        <button class='edit-btn'>Змінити</button>
        </div>
        </div>
        `;
                    closeModal()
                    moreInfo()
                    deleteCard()
                    editCard()
                });
            });
        });

    }
    editCard()
}

createBtn.addEventListener("click", () => {
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

    fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(visitData),
    })
        .then((response) => response.text())
        .then((data) => {
            try {
                const parsedData = JSON.parse(data);
                createCard(parsedData);

                closeModal();
            } catch (error) {
                console.error("Error creating visit: Invalid JSON response", error);
            }
        })
        .catch((error) => console.error("Error creating visit:", error));
});

