import React from "react";

export const wrapWithProvider = (...components) => {
  return components.reduce((ParentComponent, WrappedComponent) => {
    const Provider = class extends React.Component {
      render() {
        return (
          <ParentComponent>
            {React.createElement(WrappedComponent, { ...this.props })}
          </ParentComponent>
        );
      }
    };
    Provider.displayName = `provider_${new Date().getTime()}`;
    return Provider;
  });
};

export const wrapWithConsumer = (key, ConsumerWrapper, component) => {
  const Consumer = class extends React.Component {
    render() {
      return (
        <ConsumerWrapper>
          {(context) => {
            const newProps = { ...this.props };
            newProps[key] = context;
            return React.createElement(component, newProps);
          }}
        </ConsumerWrapper>
      );
    }
  };
  Consumer.displayName = `consumer_${new Date().getTime()}`;
  return Consumer;
};

export const connectWithContext =
  (...providers) =>
  (consumers) =>
  (component) => {
    const ProviderWrapper = wrapWithProvider(...providers);
    const ConsumerWrapper = connectWithConsumer(consumers)(component);

    return class WrappedComponent extends React.Component {
      render() {
        return (
          <ProviderWrapper>
            {React.createElement(ConsumerWrapper, { ...this.props })}
          </ProviderWrapper>
        );
      }
    };
  };

export const connectWithConsumer = (consumers) => (component) => {
  let ConsumerWrapper = component;
  Object.keys(consumers).forEach((key) => {
    const Wrapper = consumers[key];
    ConsumerWrapper = wrapWithConsumer(key, Wrapper, ConsumerWrapper);
  });
  ConsumerWrapper.displayName = `consumer_${new Date().getTime()}`;
  return ConsumerWrapper;
};
