import React, { Component, createContext } from "react";
import { SAVE, CREATENEW, DELETE, SETUSER } from "../const";
import { data, user } from "./data";

const Context = createContext();
const Provider = Context.Provider;

export const GlobalProvider = (Children) => {
  return class ParentComp extends Component {
    state = {
      data: data,
      user: user,
      currentUser: "",
    };

    dispatch = (action) => {
      if (action.type === SAVE) {
        this.setState(
          {
            data: [...this.state.data, action.payload],
          },
          () => console.log(this.state.data)
        );
      }

      if (action.type === CREATENEW) {
        this.setState(action.payload);
      }

      if (action.type === DELETE) {
        this.setState({
          quantity: action.payload,
        });
      }
      if (action.type === SETUSER) {
        console.log(action.userName);
        this.setState({
          currentUser: action.userName,
        });
      }
    };
    render() {
      return (
        <Provider
          value={{
            stateData: this.state.data,
            stateUser: this.state.user,
            currentUser: this.state.currentUser,
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
