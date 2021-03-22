import React from "react";
import Header from "components/Header/Header.js";
import ListMenu from "views/Design/ListMenu";
import FormDekidaka from "views/Design/FormDekidaka";
import Footer from "views/Design/Footer";

function ProductionForm(props) {
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
      <FormDekidaka />
      <Footer />
    </div>
  );
}

export default ProductionForm;
