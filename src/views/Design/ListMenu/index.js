/*eslint-disable*/
import React, { useState } from "react";
import DescriptionIcon from "@material-ui/icons/Description";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import { AccountCircle, Apps, HomeOutlined } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

import { GlobalConsumer } from "../../../context/store/store";

const useStyles = makeStyles(styles);

function HeaderLinks(props) {
  const [userName] = useState(props.currentUser);
  const classes = useStyles();
  return (
    <List className={classes.list}>
      <Link to="/home" className={classes.listItem}>
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink}>
            <HomeOutlined className={classes.icons} /> Home
          </Button>
        </ListItem>
      </Link>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Form Daily Check"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={DescriptionIcon}
          dropdownList={[
            <Link to="/production-form" className={classes.dropdownLink}>
              Dekidaka
            </Link>,
            <Link to="/quality-form" className={classes.dropdownLink}>
              Measuring Check
            </Link>,
            ,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          buttonText="Register"
          buttonProps={{
            className: classes.navLink,
            color: "transparent",
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/user-registration" className={classes.dropdownLink}>
              User Register
            </Link>,
            <Link to="/production-form" className={classes.dropdownLink}>
              Production Line Register
            </Link>,
            ,
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button color="transparent" className={classes.navLink}>
          <AccountCircle className={classes.icons} /> {userName}
        </Button>
      </ListItem>
    </List>
  );
}

export default GlobalConsumer(HeaderLinks);
