/**
 * Validates a product object and returns an object containing validation error messages.
 *
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product.
 * @param {string} product.description - The description of the product.
 * @param {string} product.imagrURL - The image URL of the product.
 * @param {string} product.price - The price of the product.
 * @returns {Object} An object containing error messages for each invalid field.
 */
export const productValidation = (product: {title: string; description: string; imageURL: string; price: string} ) => {
    // returns an abj
    const errors: {title: string; description: string; imageURL: string; price: string} = {
        title: "",
        description: "",
        imageURL: "",
        price: "",
    };


    const validURL = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

    if(!product.title.trim() || product.title.length < 10 || product.title.length > 80) {
        errors.title = "Product title must be between 10 and 80 characters!"
    }

    if(!product.description.trim() || product.description.length < 10 || product.description.length > 900) {
        errors.description = "Product description must be between 10 and 900 characters!"
    }

    if(!product.imageURL.trim() || !validURL) {
        errors.imageURL = "Valid image URL is required"
    }

    if(!product.price.trim() || isNaN(Number(product.price))) {
        errors.price = "Valid price is required";
    }

    return errors;
}