import React from "react";
import styles from "./Notification.module.css";
import PropTypes from "prop-types";

const { notification } = styles;

const Notification = ({ message }) => (
  <div className={notification}>
    <span>{message}</span>
  </div>
);

Notification.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Notification;
