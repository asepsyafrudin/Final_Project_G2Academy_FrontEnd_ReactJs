import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";

import { cardTitle } from "assets/jss/material-kit-react.js";
import { Link } from "react-router-dom";

const styles = {
  cardTitle,
  textCenter: {
    textAlign: "center",
  },
  textMuted: {
    color: "#6c757d",
  },
};

const useStyles = makeStyles(styles);

export default function Cards({ title, link, description, urlImage }) {
  const classes = useStyles();
  return (
    <div style={{ minWidth: 250, maxWidth: 600 }}>
      <Card className={classes.textCenter}>
        <CardHeader color="danger">{title}</CardHeader>
        <CardBody>
          <img
            style={{ width: "100%", display: "block", maxHeight: "200px" }}
            src={urlImage}
            alt="Card-img-cap"
          />
          <h4 className={classes.cardTitle}>Description</h4>
          <p>{description}.</p>
          <Link to={link}>
            <Button color="primary">Enter</Button>
          </Link>
        </CardBody>
        {/* <CardFooter className={classes.textMuted}>2 days ago</CardFooter> */}
      </Card>
    </div>
  );
}
