import React from "react";
import Header from "components/Header/Header.js";
import ListMenu from "views/Design/ListMenu";

function QualityForm(props) {
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="primary"
        brand="Production Monitoring System"
        rightLinks={<ListMenu />}
        {...rest}
      />
    </div>
  );
}

export default QualityForm;
