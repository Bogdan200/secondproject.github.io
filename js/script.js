class Modal {
    constructor() {
        this.modal = document.createElement('div');
        this.modalBody = document.createElement('div');
        this.modalContent = document.createElement('div');
        this.modalCloser = document.createElement('a');
    }

    insert(...elements) {
        return this.modalContent.append(...elements);
    }

    create() {
        this.modal.classList.add('modal', 'modal--open');
        this.modalBody.className = 'modal__body';
        this.modalContent.className = 'modal__content';
        this.modalCloser.className = 'modal__close';
        this.modalCloser.setAttribute('href', '#');
        this.modalCloser.textContent = String.fromCharCode(0x2716);
        this.modalCloser.addEventListener('click', (e) => {
            e.preventDefault();
            if(this.modal.classList.contains('modal--open')) {
                this.modal.classList.remove('modal--open');
                this.modal.remove();
            }
        })

        this.modalContent.append(this.modalCloser);
        this.modalBody.append(this.modalContent);
        this.modal.append(this.modalBody);
        document.body.append(this.modal);
        return this.modal;
    }


    close() {
        if(this.modal.classList.contains('modal--open')) {
            this.modal.classList.remove('modal--open');
            this.modal.remove();
        }
    }

    open() {
        if(!this.modal.classList.contains('modal--open')) {
            this.modal.classList.add('modal--open');
        }
    }

    remove() {
        this.modal.remove();
    }

    title(titleText = '', initClass = '') {
        const title = document.createElement('p');
        title.textContent = titleText;
        title.classList.add('modal-title', initClass);
        this.modalContent.prepend(title);
    }
}

class Form {
    constructor() {
        this.form = document.createElement('form');
    }

    insert(...elements) {
        this.form.append(...elements);
    }

    create() {
        this.form.classList.add('form');
        return this.form;
    }
}

class Input {
    constructor() {
        this.input = document.createElement('input');
    }

    create() {
        return this.input;
    }

    baseAttr(type = 'text', id = '', value = '', placeholder = '', required = '', name = '') {
        this.input.setAttribute('type', type);
        if(id) this.input.setAttribute('id', id);
        if(value) this.input.setAttribute('value', value);
        if(placeholder) this.input.setAttribute('placeholder', placeholder);
        if(required) this.input.setAttribute('required', required);
        if(name) this.input.setAttribute('name', name);
    }

    error() {
        const errorSpan = document.createElement("span");
        errorSpan.classList.add('errSpan');
        errorSpan.textContent = 'Неверно заполнено поле!';
        if(!this.input.value.trim()) {
            if(this.input.nextElementSibling.classList.contains('errSpan')) {
                this.input.classList.remove('errInput');
                this.input.nextElementSibling.remove();
            }
            this.input.classList.add('errInput');
            this.input.after(errorSpan);
        }
        this.input.addEventListener('blur', () => {
            if(this.input.value.trim()) {
                this.input.classList.remove('errInput');
                this.input.nextElementSibling.remove();
            }
        });
    }

    event(evt = '', fn) {
        this.input.addEventListener(evt, fn);
    }

    label(text = '', initClass = '') {
        const label = document.createElement('label');
        if(initClass) label.classList.add(initClass);
        label.setAttribute('for', this.input.id);
        label.textContent = text;
        this.input.parentElement.insertBefore(label, this.input);
    }

    get value() {
        return this.input.value;
    }

    set value(newValue) {
        this.input.value = newValue;
    }
}

class TextArea {
    constructor() {
        this.textarea = document.createElement('textarea');
    }

    create() {
        return this.textarea;
    }

    baseAttr(id = '', value = '', placeholder = '', required = '') {
        if(id) this.textarea.setAttribute('id', id);
        if(value) this.textarea.setAttribute('value', value);
        if(placeholder) this.textarea.setAttribute('placeholder', placeholder);
        if(required) this.textarea.setAttribute('required', required);
    }

    label(text = '', initClass = '') {
        const label = document.createElement('label');
        if(initClass) label.classList.add(initClass);
        label.setAttribute('for', this.textarea.id);
        label.textContent = text;
        this.textarea.parentElement.insertBefore(label, this.textarea);
    }

    get value() {
        return this.textarea.value;
    }

    set value(newValue) {
        this.textarea.value = newValue;
    }
}

class Select {
    constructor() {
        this.select = document.createElement('select');
    }

    create() {
        return this.select;
    }

    addOption(text = '', value = '') {
        const option = document.createElement('option');
        if(text) option.textContent = text;
        if(value) option.setAttribute('value', value);
        this.select.append(option);
        return option;
    }

    baseAttr(id = '', disabled = false) {
        if(id) this.select.setAttribute('id', id);
        if(disabled) this.select.setAttribute('disabled', disabled);
    }

    label(text = '') {
        const label = document.createElement('label');
        label.setAttribute('for', this.select.id);
        label.textContent = text;
        this.select.parentElement.insertBefore(label, this.select);
    }

    get value() {
        return this.select.value;
    }

    set value(newValue) {
        this.select.value = newValue;
    }
}


//Переменные

const loginButton = document.getElementById('loginButton');
const createVisitButton = document.getElementById('createVisitButton');
const defaultText = document.querySelector('.visit__field__default-text');
const visitField = document.querySelector('.visit__field__inner');
const loginURL = 'https://ajax.test-danit.com/api/cards/login';
const generalUrl = 'https://ajax.test-danit.com/api/cards';

//Авторизация
loginButton.addEventListener('click', logInModal);

//Открытие модального окна авторизации
function logInModal(e) {
    e.preventDefault();
    const loginModal = new Modal();
    const loginForm = new Form();
    const loginEmail = new Input();
    const loginPassword = new Input();
    const loginSubmit = new Input();

    loginEmail.baseAttr('email', 'loginEmail', '', 'Введите email', 'required');
    loginPassword.baseAttr('password', 'loginPassword', '', 'Введите пароль', 'required');
    loginSubmit.baseAttr('submit', 'loginSubmit', 'Войти', '');

    loginModal.create();
    loginModal.insert(loginForm.create());
    loginForm.insert(loginEmail.create(), loginPassword.create(), loginSubmit.create());

    loginModal.title('АВТОРИЗАЦІЯ', 'login-title');
    loginEmail.label('EMAIL', 'email-label');
    loginPassword.label('ПАРОЛЬ', 'password-label');

    loginSubmit.event('click', (e) => {
        e.preventDefault();
        if(!loginEmail.value.trim() || !loginPassword.value.trim()) {
            loginEmail.error();
            loginPassword.error();
            return;
        }
        getAuthorizationData(loginEmail, loginPassword, loginModal);
    })
}

//Получение данных для авторизации
function getAuthorizationData(email, password, ...optional) {
    const data = {
        email: email.value,
        password: password.value,
    };
    if(data.email && data.password) {
        authorization(data, ...optional);
    }
}

//Авторизация
function authorization(data, ...optional) {
    sendRequest(loginURL, method = 'POST', data)
        .then(response => {
            if(response.status >= 200 && response.status <= 399) {
                return response.text()
            }
            else {
                throw new Error('Помилка! Невірний email або пароль.')
            }
        })
        .then(data => {
            sessionStorage.setItem('token', data);
            optional[0].close();
            changeButton(loginButton, createVisitButton);
            createFilter();
        })
        .catch(error => console.log(error.message));
}

//Смена кнопок
function changeButton(show, hide) {
    if(hide.classList.contains('hide')) {
        hide.classList.remove('hide');
        show.classList.add('hide');
    }
}


//Отправка отредактированных данных на сервер
function editData(data, id) {
    sendRequest(generalUrl + `/${id}`, method = 'PUT', data)
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem(data.id, JSON.stringify(data.content));
            buildShowCard(data.content, data.id);
            const oldCard = document.getElementById(id);
            const newCard = visitField.lastElementChild;
            oldCard.replaceWith(newCard);
            oldCard.remove();
        })
        .catch(error => console.log(error.message));
}

//Получение данных и отправка на сервер
function getCardData(data) {
    sendRequest(generalUrl, method = 'POST', data)
        .then(response => response.json())
        .then(data => {
            sessionStorage.setItem(data.id, JSON.stringify(data.content))
            buildShowCard(data.content, data.id);
        })
        .catch(error => console.log(error.message));
}

function createFilter() {
    const searchField = document.querySelector('.search__field');
    const searchInput = new Input();
    const prioritySelect = new Select();
    const openDoneSelect = new Select();
    const searchButton = new Input();

    searchField.append(searchInput.create(), prioritySelect.create(), openDoneSelect.create(), searchButton.create());

    searchInput.baseAttr('text', 'search-input', '', 'Почніть пошук');
    prioritySelect.baseAttr('priority');
    prioritySelect.addOption('Терміновість візиту', 'Urgency');
    prioritySelect.addOption('Звичайна', 'Звичайна');
    prioritySelect.addOption('Приорітетна', 'Приорітетна');
    prioritySelect.addOption('Термінова', 'Термінова');
    prioritySelect.baseAttr('priority');
    openDoneSelect.addOption('Статус візиту', 'All');
    openDoneSelect.addOption('Запланований', 'Open');
    openDoneSelect.addOption('Відбувся', 'Done');
    openDoneSelect.baseAttr('open-done');
    searchButton.baseAttr('submit', 'search-btn', 'Шукати');

    visitFilter();
}



function sendRequest(url, method = 'GET', body) {
    return fetch(url, {
        method: method,
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
    })
}

document.addEventListener('DOMContentLoaded', () => {
    if(sessionStorage.getItem('token')) {
        changeButton(loginButton, createVisitButton);
        for (const key in sessionStorage) {
            if(!isNaN(Number(key))) {
                buildShowCard(JSON.parse(sessionStorage.getItem(key)), key);
            }
        }
        createFilter();
    }
});

