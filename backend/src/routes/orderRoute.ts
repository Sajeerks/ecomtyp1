import express from "express";
import { authorizedRoles, isAuthenticatedUser } from "../middleware/auth";
import { createNewOrder, deleteOrder, getAllOrdersForAdmin, getMyOrders, getSingleOrder, updateOrderStatus } from "../controllers/orderController";


export const orderRouter = express.Router();


orderRouter.route("/order/createNewOrder").post(isAuthenticatedUser, createNewOrder);
orderRouter.route("/order/myorders").get(isAuthenticatedUser, getMyOrders);
orderRouter.route("/order/allordres").get(isAuthenticatedUser,authorizedRoles("admin"), getAllOrdersForAdmin);

orderRouter.route("/order/:orderId").get(isAuthenticatedUser, getSingleOrder).
put(isAuthenticatedUser,authorizedRoles("admin"),updateOrderStatus)
.delete(isAuthenticatedUser,authorizedRoles("admin"),deleteOrder)





