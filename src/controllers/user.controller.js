import {asyncHandler} from '../utils/asyncHandler.js'

const registerUser = asyncHandler( async (req , res) => {
     res.status(200).json({ //status(200) → matlab HTTP status code 200 (OK)
        message: "ha bhai shi chal rha hai sab"
    })
})

export  {
    registerUser,
}