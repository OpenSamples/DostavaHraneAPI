const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shoppingCartItemsSchema = new Schema({
    /*totalAmount: {
        type: Number,
        required: true
    },*/
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Products',
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        qty: {
            type: Number,
            required: true
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
}, { timestamps: true });

shoppingCartItemsSchema.virtual("totalAmount")
    .get(function () {
        let totalAmount = 0;
        this.products.map(product => {
            totalAmount += (product.price * product.qty);
        });
        return totalAmount;
    });

const Shopping_cart_items = mongoose.model("Shopping_cart_items", shoppingCartItemsSchema);

module.exports = Shopping_cart_items;