import { Fragment, useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "./store/cart-actions";

let isInitial = true; //variable to check at the initilization of the app useEffect does not run

function App() {
  const dispatch = useDispatch();

  const toggleUi = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart); //select and retrieve the entire cart from cart-slice store.
  const notification = useSelector((state) => state.ui.notification); //retrieving notification object to display properties
  //useEffect to check for changes in the dependencies OF THE CART
  
    //Use effect to retrieve data from cart

    useEffect(() => {
      dispatch(fetchCartData());
    }, [dispatch]);
  
    useEffect(() => {
      if (isInitial) {
        isInitial = false;
        return;
      }
  
      if (cart.changed) {
        dispatch(sendCartData(cart));
      }
    }, [cart, dispatch]);



  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {toggleUi && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
