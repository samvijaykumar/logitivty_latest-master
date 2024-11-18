import React from 'react';
import {
  wrapWithProvider,
  wrapWithConsumer,
  connectWithConsumer,
  connectWithContext,
} from '.';
import DoctorContextProvider from '../context/DoctorContext';
import GlobalContextProvider from '../context/GlobalContext';
import MamographyContextProvider from '../context/MamographyContext';
import PaymentContextProvider from '../context/PaymentContext';
import { CartProvider } from '../context/CartContext';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';

const getProviders = () => {
  return wrapWithProvider(
    GlobalContextProvider,
    MamographyContextProvider,
    PaymentContextProvider,
    DoctorContextProvider,
    CartProvider  
  );
};

class App extends React.Component {
  render() {
    const {children} = this.props;
    const ProviderElement = getProviders();
    // return <ProviderElement>{children}</ProviderElement>;
    return (
      <CartProvider>
      <NavigationContainer>
        <HomeStack />
      </NavigationContainer>
    </CartProvider>
    );
    
  }
}

export const withAppContainer = component => {
  let provider = props => {
    return <App>{React.createElement(component, props)}</App>;
  };
  provider.displayName = 'app container';
  return provider;
 
};

export {
  wrapWithProvider,
  wrapWithConsumer,
  connectWithConsumer,
  connectWithContext,
};
