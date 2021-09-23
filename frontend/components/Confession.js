class Confession {

    static allConfessions;

    constructor(data){
        this.data = data
        this.comments = this.data.comments.map(comment => new Comment(comment, this))
        this.constructor.allConfessions.push(this)
    }
}