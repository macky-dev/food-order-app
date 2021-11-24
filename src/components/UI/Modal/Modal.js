import { Fragment } from "react";
import ReactDOM from "react-dom";
import Card from "../Card/Card";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose} />;
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onClose={props.onClose} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <Card className={classes.modal}>{props.children}</Card>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
