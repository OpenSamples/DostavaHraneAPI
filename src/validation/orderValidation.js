//Shopping cart items model
const Shopping_cart_items_model = require("../models/ShoppingCartItems");

// Function to validate order
async function validateOrder(orderData) {
    try {
        const { userId, phone, address } = orderData;
        const sci = await Shopping_cart_items_model.findOne({ userId: userId });
        const errors = [];
        const rePhone = /^\d{9}$/;
        if (phone.length < 1 || address.length < 1) {
            errors.push({ msg: "Must fill all fields." })
        }
        if (!rePhone.test(phone)) {
            errors.push({ msg: "Invalid phone format." });
        }
        if (!sci) {
            errors.push({ msg: "You must first fill Shopping Cart if you want to proceed with your order." });
        }

        return {
            error: errors.length,
            message: errors,
            status: 406
        }
    } catch(e) {
        return e
    }
}


//Same as userValidation,but here we are returning promise because we need to check if Shopping_cart_items with provided
//userId exists if not we are pushing new error to errors and resolving it further

// module.exports = (orderData) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const { userId, phone, address } = orderData;
//             const sci = await Shopping_cart_items_model.findOne({ userId: userId });
//             const errors = [];
//             const rePhone = /^\d{9}$/;
//             if (phone.length < 1 || address.length < 1) {
//                 errors.push({ msg: "Must fill all fields." })
//             }
//             if (!rePhone.test(phone)) {
//                 errors.push({ msg: "Invalid phone format." });
//             }
//             if (!sci) {
//                 errors.push({ msg: "You must first fill Shopping Cart if you want to proceed with your order." });
//             }
//             resolve(errors);
//         } catch (error) {
//             console.log(error);
//             reject(false);
//         }
//     });
// };


module.exports = validateOrder