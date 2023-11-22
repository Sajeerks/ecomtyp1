import express from "express";
import {
  changeToNewPassword,
  createNewUser,
  deleteUserByAdmin,
  forgotPassword,
  getAllUsers,
  getLoggedInUserrDetails,
  getUserDetailsForAdmin,
  loginUser,
  logout,
  resetPassword,
  updateUserProfile,
  updateUserRoleByAdmin,
} from "../controllers/userController";
import { authorizedRoles, isAuthenticatedUser } from "../middleware/auth";

export const userRouter = express.Router();

userRouter.route("/register").post(createNewUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/logout").get(logout);
userRouter.route("/forgotPassword").put(forgotPassword);
userRouter
  .route("/password/reset/:resetPasswordTokenFromUrl")
  .put(resetPassword);

userRouter.route("/me").get(isAuthenticatedUser, getLoggedInUserrDetails);
userRouter
  .route("/changepassword")
  .put(isAuthenticatedUser, changeToNewPassword);
userRouter
  .route("/updateUserprofile")
  .put(isAuthenticatedUser, updateUserProfile);

//admin
userRouter
  .route("/allusers")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);

userRouter
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, authorizedRoles("admin"), getUserDetailsForAdmin)
  .delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUserByAdmin);

userRouter
  .route("/admin/roleChange/:id")
  .put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRoleByAdmin);
