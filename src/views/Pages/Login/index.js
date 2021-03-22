import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
// core components
import Footer from "views/Design/Footer";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/productionImg/image4.jpg";

import { GlobalConsumer } from "context/store/store";
import Home from "../HomePage";
import { element } from "prop-types";

import { SETUSER } from "../../../context/const";

const useStyles = makeStyles(styles);

function Login(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { stateUser, stateData, dispatch } = props;
  const [hidden, setHidden] = useState({});
  const [visible, setVisible] = useState({ display: "none" });
  const [userNameLogin, setUserNameLogin] = useState("");

  const login = () => {
    let email = document.getElementById("email").value;
    let password = document.getElementById("pass").value;
    let checkEmailLogin = stateUser.find((value) => value.email === email);
    if (checkEmailLogin) {
      if (checkEmailLogin.password === password) {
        setUserNameLogin(checkEmailLogin.name);
        setHidden({ display: "none" });
        setVisible({});
        dispatch({ type: SETUSER, userName: checkEmailLogin.name });
      } else {
        alert("Password Salah");
      }
    } else {
      alert("Email tidak terdaftar!!!");
    }
  };

  return (
    <>
      <div style={hidden}>
        <div
          className={classes.pageHeader}
          style={{
            backgroundImage: "url(" + image + ")",
            backgroundSize: "cover",
            backgroundPosition: "top center",
          }}
        >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>Login</h4>
                      <div className={classes.socialLine}>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className={"fab fa-twitter"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className={"fab fa-facebook"} />
                        </Button>
                        <Button
                          justIcon
                          href="#pablo"
                          target="_blank"
                          color="transparent"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className={"fab fa-google-plus-g"} />
                        </Button>
                      </div>
                    </CardHeader>
                    <p className={classes.divider}>Or Be Classical</p>
                    <CardBody>
                      <CustomInput
                        labelText="Email..."
                        id="email"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "email",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          ),
                        }}
                      />
                      <CustomInput
                        labelText="Password"
                        id="pass"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          type: "password",
                          endAdornment: (
                            <InputAdornment position="end">
                              <Icon className={classes.inputIconsColor}>
                                lock_outline
                              </Icon>
                            </InputAdornment>
                          ),
                          autoComplete: "off",
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button color="primary" size="lg" onClick={login}>
                        Login
                      </Button>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer />
        </div>
      </div>
      <div style={visible}>
        <Home />
      </div>
    </>
  );
}

export default GlobalConsumer(Login);
