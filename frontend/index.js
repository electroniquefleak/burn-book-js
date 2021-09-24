const api = new Api("http://localhost:3000");

document.getElementById("confession-form").addEventListener("submit", handleSubmit);

function handleSubmit(event) {
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

Confession.getAllConfessions();