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
            document.getElementById('no-comment').remove();
        })
        .catch(error => console.log(error))
}

Confession.getAllConfessions();