const postsCollection = require("../db").db().collection("posts")
const ObjectId = require("mongodb").ObjectId

let Post = function(data, userid) {
    this.data = data
    this.userId = userid
    this.errors = []
}

Post.prototype.cleanUp = function(){
    if(typeof(this.data.title) != "string"){
        this.data.title = ""
    }

    if(typeof(this.data.body) != "string"){
        this.data.body = ""
    }

    this.data = {
        title: this.data.title.trim(),
        body: this.data.body.trim(),
        createdDate: new Date(),
        author: new ObjectId(this.userId)
    }
}

Post.prototype.validate = function(){
    if(this.data.title == ""){
        this.errors.push("You must provide a title")
    }

    if(this.data.body == ""){
        this.errors.push("You must provide a post content")
    }
}

Post.prototype.create = function(){
    return new Promise((resolve, reject) =>  {
        this.cleanUp()
        this.validate()
        console.log("Before create")
        if(!this.errors.length){
            console.log(this.data)
            postsCollection.insertOne(this.data).then(() => {
                console.log("Done!!!")
                resolve()
            }).catch(() => {
                this.errors.push("Please try again later")
                reject(this.errors)
            })
        } else {
            reject(this.errors)
        }
    })
}


module.exports = Post