import { setCart } from "../../../../features/reducers/cartslice";
import axios from "axios";

export const syncCartOnLogin = async (userId, dispatch) => {
  const guestCart = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("user:", userId);
  const token = localStorage.getItem("token"); 
  const headers = {
    Authorization: `Bearer ${token}`, // Assuming JWT Token (Modify if needed)
    "Content-Type": "application/json",
  };
  try {
    // If guest cart has items, sync them with the backend
    if (guestCart.length > 0) {
      const response = await axios.post(`http://127.0.0.1:8000/cart/sync/`, { userId, guestCart },{ headers });
      console.log("Cart Sync Response:", response.data);
    }

    // Fetch updated cart from database
    const cartResponse = await axios.get(`http://127.0.0.1:8000/cart/get/`,{ headers });
    if (cartResponse.data) {
      dispatch(setCart(cartResponse.data));
    }

    // Clear guest cart from local storage
    localStorage.removeItem("cart");
  } catch (error) {
    console.error("Error syncing cart:", error);
  }
};
