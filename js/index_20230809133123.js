const posts = [
    {
        id: 1,
        title: "Сергей",
        body: "Стоматолог"
    },
    {
        id: 2,
        title: "Андрей",
        body: "Стоматолог"
    },
    {
        id: 3,
        title: "Max",
        body: "Кардіолог"
    },
    {
        id: 4,
        title: "Богдан",
        body: "Терапевт"
    },
    {
        id: 5,
        title: "Максим",
        body: "Терапевт"
    },
    {
        id: 6,
        title: "Федор",
        body: "Кардіолог"
    },
    {
        id: 7,
        title: "Григорий",
        body: "Терапевт"
    },
    {
        id: 8,
        title: "Игорь",
        body: "Кардіолог"
    },
    {
        id: 9,
        title: "Иван",
        body: "Терапевт"
    },
    {
        id: 10,
        title: "Дима",
        body: "Кардіолог"
    }
];



const cardContainer = document.querySelector('.container')

function deleteContent() {
    console.log("delete action", this);
    const submitHandler = ()=>{
        this.divCard.remove()
    } 
    new DeleteModal(this.title, submitHandler).render()
    
}

function editContent() {
    console.log("edit action", this);
}

class Card {
    constructor(deleteF, editF) {
        this.cardContainer = document.createElement('div')
        this.divCard = document.createElement('div');
        this.btnEdit = document.createElement('button');
        this.btnDel = document.createElement('button');
        this.btnMore = document.createElement('button')
        this.divContent = document.createElement('div');
        this.hiddenContent = document.createElement('div')
        this.deleteAction = deleteF;
        this.editAction = editF;
    }

    createEl() {
    
        this.divCard.classList.add('card');
        this.btnEdit.classList.add('card__btn', 'card__edit');
        this.btnDel.classList.add('card__btn', 'card__delete');
        this.divContent.classList.add('card__content-container');
        this.divCard.append(this.btnEdit, this.btnDel, this.divContent);
        this.btnDel.addEventListener('click', this.deleteAction.bind(this));
        this.btnEdit.addEventListener('click', this.editAction.bind(this));
    }

    render() {
        this.createEl();
        cardContainer.append(this.divCard)
    
    }
}

class ArticleCard extends Card {
    constructor(title, text, deleteF, editF, more) {
        super(deleteF, editF); 
        this.title = title; 
        this.text = text;
        this.titleContainer = document.createElement('h3');
        this.textContainer = document.createElement('p');
        this.moreContainer = document.createElement('button')
    }

    createEl() {
        super.createEl()
        this.moreContainer.innerText = 'Більше інформації'
        this.titleContainer.innerText = `Пацієнт: ${this.title}`;
        this.textContainer.innerText = `Лікар: ${this.text}`;
        this.moreContainer.classList.add('more-text')
        this.moreContainer.addEventListener('click', () => {
            if (this.hiddenContent.style.display == 'block') {
                this.hiddenContent.style.display = 'none';
            } else {
                this.hiddenContent.style.display = 'block';
            }
        });
        this.hiddenContent.classList.add('hidden')
        this.divContent.append(this.titleContainer, this.textContainer, this.moreContainer, this.hiddenContent);
    }

}



class Modal {
    constructor() {
        this.divModal = document.createElement('div')
        this.divModalBg = document.createElement('div')
        this.divMainCont = document.createElement('div')
        this.btnModalClose = document.createElement('button')
        this.divModalContWrap = document.createElement('div')
        this.divModalBtnWrap = document.createElement('div')
    }

    createEl() {
        this.divModal.classList.add('modal')
        this.divModalBg.classList.add('modal__background')
        this.divMainCont.classList.add('modal__main-container')
        this.btnModalClose.classList.add('modal__close')
        this.divModalContWrap.classList.add('modal__content-wrapper')
        this.divModalBtnWrap.classList.add('modal__button-wrapper')
        this.divMainCont.append(this.btnModalClose, this.divModalContWrap, this.divModalBtnWrap)
        this.divModal.append(this.divModalBg, this.divMainCont)
        this.btnModalClose.addEventListener('click', this.closeModal.bind(this))
        this.divModalBg.addEventListener('click', this.closeModal.bind(this))
    }

    closeModal() {
        this.divModal.remove()
        console.log(this)
    }

    render(container = document.body) {
        this.createEl();
        container.append(this.divModal);
    }
}

class DeleteModal extends Modal {
    constructor(title, submitAction) {
        super()
        this.title = title
        this.submitAction = submitAction;
        this.btnSubmit = document.createElement('button')
        this.btnCancel = document.createElement('button')
        this.submitTitle = document.createElement('h3')

    }

    createEl() {
        super.createEl()
        this.btnSubmit.innerText = 'Confirm'
        this.btnCancel.innerText = 'Cancel'
        this.btnSubmit.classList.add('modal__confirm-btn')
        this.btnCancel.classList.add('modal__cancel-btn')
        this.submitTitle.innerText = `Ви бажаєте видалити запис "${this.title}"?`
        this.divModalContWrap.append(this.submitTitle)
        this.divModalBtnWrap.append(this.btnSubmit, this.btnCancel)
        this.btnCancel.addEventListener('click', this.closeModal.bind(this))
        this.btnSubmit.addEventListener('click', () => {
            this.submitAction()
            this.closeModal()
        })
    }

}



const container = document.querySelector('.container')
// const testModal = new Modal()
// testModal.render(container)

const textCard = new Card(deleteContent, editContent);
// console.log(textCard);
// textCard.render(container);
// const testArticle = new ArticleCard(posts[0].title, posts[0].body, deleteContent, editContent);

posts.forEach((item) => {
    new ArticleCard(item.title, item.body, deleteContent, editContent).render();
})

