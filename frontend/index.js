const api = new Api("http://localhost:3000");

document.getElementById("confession-form").addEventListener("submit", handleSubmit);

const handleSubmit = event => {
    event.preventDefault();
    const newConfession = {
        title: event.target.title.value,
        body: event.target.body.value
    }
    api.createConfession(newConfession).then(confession => {
        console.log("new confession in the DB:", confession);
    })
}