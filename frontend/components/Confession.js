class Confession {

    static allConfessions = [];

    constructor(data){
        this.data = data
        this.constructor.allConfessions.push(this)
    }

    renderCard = () => {
        const {id, title, body, created_at} = this.data;
        const confessionCard = document.createElement('div');
        const avatar = avatars[Math.floor(Math.random()*avatars.length)];
        confessionCard.innerHTML = `
            <img src=${avatar.src} alt=${avatar.name} class="avatar"/>
            <h2 class="confession-card-title">${title}</h2>
            <p>${body}</p>
            <legend>Confessed on ${dateFormat(created_at)}.</legend>
            `;
        confessionCard.classList.add('confession-card');
        confessionCard.dataset.id= id;
        confessionCard.addEventListener("click", () => {
            this.hideConfessionForm();
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
                if (document.querySelector('.active')) {
                    document.querySelector('.active .comments-wrapper').classList.add('hide');
                    document.querySelector('.active').classList.remove('active');
                }
                confessionCard.classList.add('active');
                commentsWrapper.classList.add('comments-wrapper');
                confessionCard.append(commentsWrapper);
                commentsTitle.textContent = "Comments:";
                commentsWrapper.append(commentsTitle);
                const commentsContainer = document.createElement('div');
                commentsContainer.classList.add('comments-container')
                commentsWrapper.append(commentsContainer);
                confessionCard.addEventListener("click", (event) => {
                    commentsWrapper.classList.toggle('hide')
                    if (document.querySelector('.active')) {
                        if (event.currentTarget.classList.contains('active')) {                            
                            this.hideCommentForm();
                            document.querySelector('.active .comments-wrapper').classList.add('hide');
                            document.querySelector('.active').classList.remove('active');
                        } else {
                            document.querySelector('.active .comments-wrapper').classList.add('hide');
                            document.querySelector('.active').classList.remove('active');
                            event.currentTarget.classList.add('active');
                        }
                    } else {
                        this.hideConfessionForm();
                        confessionCard.classList.toggle('active')
                    }
                    document.getElementById('confession_id').value = id;
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

    hideConfessionForm = () => {
        document.getElementById("confession-form").classList.add('hide');
        document.getElementById("comment-form").classList.remove('hide');
    }
    
    hideCommentForm = () => {
        document.getElementById("confession-form").classList.remove('hide');
        document.getElementById("comment-form").classList.add('hide');
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