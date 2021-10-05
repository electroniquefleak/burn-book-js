class Comment {
    
    constructor(data){
        this.data = data;
    }

    renderCommentCard = () => {
        const {body, confession_id, created_at} = this.data;
        const commentCard = document.createElement('div');
        commentCard.innerHTML = `
        <p>${body}</p>
        <legend>Commented on ${dateFormat(created_at)}.</legend>
    `;
    commentCard.classList.add('comment-card');
    document.querySelector(`[data-id = '${confession_id}'] div.comments-container`).prepend(commentCard);
    }

}