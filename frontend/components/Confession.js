class Confession {

    static allConfessions = [];

    constructor(data){
        this.data = data
        this.comments = this.data.comments.map(comment => new Comment(comment, this))
        this.constructor.allConfessions.push(this)
    }

    static getAllConfessions = () => {
        api.getAllConfessions()
            .then(confessions => {
                Confession.allConfessions = [];
                confessions.array.forEach(confession => new Confession(confession));
                this.renderConfessions();
            })
            .catch(error => console.error(error))
    }
}