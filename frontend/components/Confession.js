class Confession {

    static allConfessions = [];

    constructor(data){
        this.data = data
        this.constructor.allConfessions.push(this)
    }

    renderCard = () => {
        const {id, title, body, created_at} = this.data;
        const confessionCard = document.createElement('div');
        confessionCard.innerHTML = `
            <h2>${title}</h2>
            <p>${body}</p>
            <legend>Confessed on ${created_at}.</legend>
        `;
        confessionCard.classList.add('confession-card');
        confessionCard.dataset.id= id;
        confessionCard.addEventListener("click", () => this.fetchShow(id))
        document.querySelector(".all-confessions-container").prepend(confessionCard);
    }

    fetchShow = id => {
        api.getConfessionComments(id)
            .then(confession => {
                const comments = confession.comments;
            })
            .catch(error => console.log(error));
    }

    static getAllConfessions = () => {
        api.getAllConfessions()
            .then(confessions => {
                Confession.allConfessions = [];
                confessions.forEach(confession => new Confession(confession));
                this.renderConfessions();
            })
            .catch(error => console.log(error))
    }

    static renderConfessions = () => {
        document.querySelector(".all-confessions-container").innerHTML = "";
        this.allConfessions.forEach(confession => confession.renderCard());
    }
}