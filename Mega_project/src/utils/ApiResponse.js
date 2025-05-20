// Try making this on your own
// yaha koi class extend nhi hogi kyuki hum response express ke through bhejte hai
// aur express hume aise koi class provide nhi krta

class ApiResponse{
    constructor(statusCode, data, message = "success") {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export {ApiResponse}