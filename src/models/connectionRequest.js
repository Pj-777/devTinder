const mongoose= require("mongoose");

const connectionRequestSchema= new mongoose.Schema({

    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["ignored","interested","accepted","rejected"],
            message: 'incorrect status type'
        },    
    },

},
    {
        timestamps: true,
    }
);

connectionRequestSchema.index({fromUserId:1, toUserId:1});

const ConnectionRequestModel= new mongoose.model("ConnectionRequest", connectionRequestSchema);
module.exports= ConnectionRequestModel;