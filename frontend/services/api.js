class Api {
    constructor(api){
        this.api = api
    }
    getAllConfessions = () => fetch(this.api + "/confessions")
        .then(res => res.json())
        .catch(error => console.log(error));
    
    createConfession = (confession) => {
        return fetch(this.api + "/confessions", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(confession),
        })
        .then(res => res.json())
        .catch(error => console.log(error))
    }
    getConfessionComments = id => fetch(this.api + "/confessions/" + id)
        .then(res => res.json())
        .catch(error => console.log(error));
}