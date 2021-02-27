import React from "react";
import Header from "components/Header/Header.js";
import ListMenu from "views/Design/ListMenu";

function UserRegistration(props) {
  const { ...rest } = props;
  return (
    <div>
      <Header
        relative
        color="primary"
        brand="Production Monitoring System"
        rightLinks={<ListMenu />}
        {...rest}
      />
    </div>
  );
}

export default UserRegistration;
