// here we are creating a wrapper function that will help us in not writng try catch again and again

// Method - 1 ->
const asyncHandler = (requestHandler) => {
    return (req, res , next) => {
        Promise.resolve(requestHandler(req , res , next)).catch((err) => 
        next(err))
    }
}



export {asyncHandler}


// const asyncHandler = () => {}
// const asyncHandler = (func) => () => {}
// const asyncHandler = (func) => async () => {}
    
//Method-2 ->


// const asyncHandler = (fn) => async (req , res , next) => {
//     try {
//          await fn(req,res,next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success:false,
//             message: err.message
//         })
//     }
// }