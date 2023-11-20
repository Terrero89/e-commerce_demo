import { uiActions } from "../store/ui-slice";
import { cartActions } from "../store/cart-slice";

//?THUNK to retrieve the data
export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const response = await fetch(
        "https://reduxcart-project-6b2ff-default-rtdb.firebaseio.com/cart.json"
      );

      //error handling
      //to avoid getting tothe fetching iferror occurs
      if (!response.ok) {
        throw new Error("couldnt fetch data");
      }
      const data = await response.json();

      return data;
    };
    //handles any error while receiving the fetched data
    try {
      const cartData = await fetchData(); //awaits forthe fetched data to be returned
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      ); //sending the payload with data to component
    } catch (e) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error while sending data...",
          message: "Error,fetching not possible...",
        })
      );
    }
  };
};

//?THUNK DATA CREATOR to manage side effects (https req,, watchEffect etc.)
//function that returns a function for  htttp request.
export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending Cart Data...",
      })
    );

    //httprequest to be sent
    //function dedicated to send the request within the thunk
    const sendRequest = async () => {
      const response = await fetch(
        "https://reduxcart-project-6b2ff-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,}),
        }
      );
      //error handling
      if (!response.ok) {
        throw new Error("sending cart data failed");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success...",
          message: "Sending Cart Data...",
        })
      );
    } catch (e) {
      sendCartData().catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: "error",
            title: "Error while sending data...",
            message: "Error, not possible to send data...",
          })
        );
      });
    }
  };
};
