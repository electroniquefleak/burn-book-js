class Api {
    constructor(api){
        this.api = api
    }
    getAllConfessions = () => {
    
    }
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
}