const api = new Api("http://localhost:3000");
document.getElementById("confession-form").addEventListener("submit", handleConfessionSubmit);
document.getElementById("comment-form").addEventListener("submit", handleCommentSubmit);

function handleConfessionSubmit(event) {
    event.preventDefault();
    const confessionData = {
        title: event.target.title.value,
        body: event.target.body.value
    }
    api.createConfession(confessionData)
        .then(confession => {
            document.getElementById("confession-form").reset();
            const newConfession = new Confession(confession)
            newConfession.renderCard();
        })
        .catch(error => console.log(error))
}

function handleCommentSubmit(event) {
    event.preventDefault();
    const commentData = {
        confession_id: event.target.confession_id.value,
        body: event.target.body.value
    }
    api.createComment(commentData)
        .then(comment => {
            document.getElementById("comment-form").reset();
            const newComment = new Comment(comment)
            newComment.renderCommentCard();
            document.querySelector(`[data-id = '${comment.confession_id}'] .no-comment`).remove();
        })
        .catch(error => console.log(error))
}

const avatars = [
    {
        src: "./assets/images/aaron-avi.png",
        name: "Aaron"
    },
    {
        src: "./assets/images/cady-avi.png",
        name: "Cady"
    },
    {
        src: "./assets/images/damian-avi.png",
        name: "Damian"
    },
    {
        src: "./assets/images/gretchen-avi.png",
        name: "Gretchen"
    },
    {
        src: "./assets/images/janis-avi.png",
        name: "Janis"
    },
    {
        src: "./assets/images/karen-avi.png",
        name: "Karen"
    },
    {
        src: "./assets/images/jason-avi.png",
        name: "Jason"
    },
    {
        src: "./assets/images/kevin-avi.png",
        name: "Kevin"
    },
    {
        src: "./assets/images/lunchroom-avi.png",
        name: "New character pic"
    },
    {
        src: "./assets/images/regina-avi.png",
        name: "Regina"
    },

];

Confession.getAllConfessions();