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
            <legend>Confessed on ${dateFormat(created_at)}.</legend>
        `;
        confessionCard.classList.add('confession-card');
        confessionCard.dataset.id= id;
        confessionCard.addEventListener("click", () => {
            if (document.getElementById("comment-form").classList.contains("hide")) {
                this.switchForms();
            }
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
                const confessionCard = document.querySelector(`[data-id = '${id}']`);
                const commentsTitle = document.createElement('h3');
                const commentsWrapper = document.createElement('div');
                confessionCard.classList.add('active');
                commentsWrapper.classList.add('comments-wrapper');
                confessionCard.append(commentsWrapper);
                commentsTitle.textContent = "Comments:";
                commentsWrapper.append(commentsTitle);
                const commentsContainer = document.createElement('div');
                commentsContainer.classList.add('comments-container')
                commentsWrapper.append(commentsContainer);
                confessionCard.addEventListener("click", () => {
                    commentsWrapper.classList.toggle('hide')
                    this.switchForms();
                    document.getElementById('confession_id').value = id;
                    confessionCard.classList.toggle('active')
                });
                window.addEventListener("click", (e) => {
                    if (e.target !== confessionCard) {
                        confessionCard.classList.remove('active');
                        commentsWrapper.classList.add('hide');
                        this.switchForms();
                    }
                });
                if (confession.comments.length > 0) {
                    this.renderComments(confession.comments);
                } else {
                    const noComment = document.createElement('h3');
                    noComment.classList.add('no-comment');
                    noComment.textContent = "No comments, yet.";
                    commentsContainer.append(noComment);
                }
            })
            .catch(error => console.log(error));
    }

    switchForms = () => {
        document.getElementById("confession-form").classList.toggle('hide');
        document.getElementById("comment-form").classList.toggle('hide');
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