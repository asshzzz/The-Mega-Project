class ApiError extends Error {
    constructor(
        statusCode,   // HTTP status code (e.g. 400, 401, 500)
        message =  "Something went WrOng",  // Default error message
        errors = [],  // Extra error details (array form)
        stack = ''    // Error ka stack trace (debugging ke liye)
    ){
        super(message)  // Parent class (Error) ka constructor call
        
        this.statusCode = statusCode     // Response mein bhejne ke liye
        this.data = null                 // Data nahi hoga kyunki ye error hai
        this.message = message           // Error ka message
        this.success = false             // Error hai to success = false
        this.errors = errors             // Validation ya multiple error ka details

        if (stack) {
            this.stack = stack           // Agar custom stack pass kiya hai to use karo
        }
    }
}

export { ApiError }
