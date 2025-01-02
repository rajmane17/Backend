/* Hum bs ek method bana rhe hai yaha aur use export kar denge */

// promises vala async handler use karnge hum yaha
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(
            requestHandler(req, res, next)
        ).catch(
            (error) => next(error)
        )
    }
}



export {asyncHandler}

/*

// try catch vala async handler use karnge hum yaha
// Majorly hum promise vala hi use krte hai but for our knowledge hum dono tarike se banaenge
async function asyncHandler(func) {
    // It is a higher order function, means it can return functions or take func as arguments

    //the below line means, hume jo func mila hai use hum ek aur function me pass krte hai
    // hume jo function mila hai us me se hum req, res aur next ko extract krte hai
    async (req, res, next) => {
        try {
            await func(req, res, next)
        } catch (error) {
            res.status(error.statusCode || 500).json(
                { 
                    success: false,
                    message: error.message
                }
            );
        }
    }
}

*/