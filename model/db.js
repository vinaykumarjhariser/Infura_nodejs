const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/receipt', {

    useNewUrlParser: true,
    useUnifiedTopology:true,
}).then(function () {
    console.log("Connection connected Successfully");
}).catch(function () {
    console.log("Connection Fail");
})


//Schema
const ReceiptSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required:true,
        index:{
            unique:true
        }
        
    }
});
//Model
const receiptApi = mongoose.model('receiptApi', ReceiptSchema);
module.exports =receiptApi