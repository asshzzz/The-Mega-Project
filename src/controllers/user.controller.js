import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import {ApiResponse} from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req, res) => {
  /* Steps->

        1) Get user details from frontend
        2) Validation -> any field empty
        3) Check if user already exist : username, email
        4) Upload them to cloudinary , avatar
        5) Create user object  - create entry in db
        6) Remove password and refresh token field from response
        7) Check for user creation
        8) return res 
     
     */
  const { fullname, email, username, password } = req.body;
  console.log("username : ", username);
  console.log("Full Name : ", fullname);
  console.log("email : ", email);
  console.log("password : ", password);

  if (
    //validation (some method use krke sabko ek saath chekc kr rhe hai)
    [fullname, email, username, password].some(
      // .some ye karta hai ki agr daali hui fields mein se koi ek bhi true hui to overall result true (and gate ka ulta smjh le)
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All field are are required");
  }

  if (!email.includes("@")) {
    throw new ApiError(400, "Email must contain @");
  }

  const existedUser = User.findOne({
    //User directly connected hai database se
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path; //req.files ka access multer deta hai , or ye abhi server par hai cloudinary pe nhi gya
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400 , "Avatar file is required")
  }
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  if(!avatar){
    throw new ApiError(400 , "Avatar file is required")
  }
  // ab ham database mein entry krenge
  const user = await User.create({
    fullname,
    avatar: avatar.url,
    coverImage: coverImage?.url || "", // agr cover image hai ye url dedo vrna empty rehnedo
    email,
    password,
    username: username.toLowerCase()
  })

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken" 
  )

  if(!createdUser) {
    throw new ApiError(500 , "SomeTHIng went wrong while registring the user")
  }

  return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered succesfully")
  )

});

export { 
    registerUser,
}