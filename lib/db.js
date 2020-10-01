const mongoose = require('mongoose')
async function connect() {
    await mongoose
        .connect(process.env.MONGO_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        })
        .catch((error) => console.log(error))
}
connect()

const jobSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        skillset: Array,
        channel: Object
    },
    { timestamps: true }
)
exports.Job = mongoose.model('Job', jobSchema)
