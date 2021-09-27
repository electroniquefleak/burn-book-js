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
        confessionCard.addEventListener("click", () => {
            document.getElementById("confession-form").classList.add('hide');
            document.getElementById("comment-form").classList.remove('hide');
            document.getElementById('confession_id').value = id;
            this.fetchShow(id)
        }, {once: true});
        document.querySelector(".all-confessions-container").prepend(confessionCard);
    }

    renderComments = comments => {
        comments.forEach(comment => {
            const newComment = new Comment(comment);
            newComment.renderCommentCard();
        })
    }

    fetchShow = id => {
        api.getConfessionComments(id)
            .then(confession => {
                //renderForm pass in the id
                const confessionCard = document.querySelector(`[data-id = '${id}']`);
                const commentsTitle = document.createElement('h3');
                commentsTitle.textContent = "Comments:";
                confessionCard.append(commentsTitle);
                const commentsContainer = document.createElement('div');
                commentsContainer.classList.add('comments-container')
                confessionCard.append(commentsContainer);
                if (confession.comments.length > 0) {
                    this.renderComments(confession.comments);
                } else {
                    const noComment = document.createElement('h3');
                    noComment.id = "no-comment";
                    noComment.textContent = "No comments, yet.";
                    commentsContainer.append(noComment);
                }
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