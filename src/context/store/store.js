import React, { Component, createContext } from "react";
import { SAVE, CREATENEW, DELETE } from "../const";
import { data } from "./data";

const Context = createContext();
const Provider = Context.Provider;

export const GlobalProvider = (Children) => {
  return class ParentComp extends Component {
    state = data;

    dispatch = (action) => {
      if (action.type === SAVE) {
        this.setState({
          quantity: [...this.state.quantity, action.payload],
        });
      }

      if (action.type === CREATENEW) {
        this.setState(action.payload);
      }

      if (action.type === DELETE) {
        console.log("OK");
        this.setState({
          quantity: action.payload,
        });
      }
    };
    render() {
      return (
        <Provider
          value={{
            stateData: this.state,
            dispatch: this.dispatch,
          }}
        >
          <Children {...this.props} />
        </Provider>
      );
    }
  };
};

const Consumer = Context.Consumer;
export const GlobalConsumer = (Children) => {
  return class ParentComp extends Component {
    render() {
      return (
        <Consumer>
          {(value) => {
            return <Children {...this.props} {...value} />;
          }}
        </Consumer>
      );
    }
  };
};
