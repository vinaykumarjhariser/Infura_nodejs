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
    // _id:mongoose.Schema.Types.ObjectId,
    transaction_from: {
        type: String,
        required:true   
    },
    transaction_to:{
        type:String,
        required:true   

    },
    value:{
        type:String,
        required:true   

    }


});
//Model
const receiptApi = mongoose.model('receiptApi', ReceiptSchema);
module.exports =receiptApi