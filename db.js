const {MongoClient} = require("mongodb")

const client = new MongoClient("mongodb+srv://<username>:<password>@cluster0.azld7rd.mongodb.net/?retryWrites=true&w=majority&appName=IntercomApp")

async function start() {
    await client.connect()
    module.exports = client.db()
    const app = require("./app")
    app.listen(3000)
}

start()