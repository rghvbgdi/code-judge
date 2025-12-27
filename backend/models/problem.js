const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema(
    {
        problemNumber : {
            type : Number,
            unqiue : true,
            required : true
        },
        title :{
type: string ,
required: true,
trim: true
        },
        testcases: {
type: [
    {intput: {type : string , required : true},
    output: {type : string , required : true},
}
],

        }
    }
)

module.export = mongoose.model("Problem", problemSchema);