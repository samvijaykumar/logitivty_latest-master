// // CartContext.js
// import React, { Component, createContext } from 'react';

// import React from "react";

// export const CartContext = createContext();

// export class CartProvider extends Component {
    
//   constructor(props) {
//     super(props);
//     this.state = {
//       cartItems: [],
//       cartCount: 0,
//     };
//   }

//   addToCart = (item) => {
//     this.setState((prevState) => ({
//       cartItems: [...prevState.cartItems, item],
//       cartCount: prevState.cartCount + 1,
//     }));
//   };

//   render() {
//     const { cartItems, cartCount } = this.state;
    
//     return (
//       <CartContext.Provider value={{ cartItems, cartCount, addToCart: this.addToCart }}>
//         {this.props.children}
//       </CartContext.Provider>
//     );
    
//   }
  
// }
// CartContext.js
// Assuming you are using CartContext in a higher component, wrap HomeStack with CartContext.Provider

import CartContext from '../context/CartContext';
import HomeStack from '../NewModule/Stacks/HomeStack';

export default function App() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider value={{ cartCount, setCartCount }}>
      <HomeStack />
    </CartContext.Provider>
  );
}



