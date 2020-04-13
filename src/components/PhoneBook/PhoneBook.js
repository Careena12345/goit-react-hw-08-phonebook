import React, { Component } from "react";
import shortid from "shortid";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import withTheme from "../hoc/withTheme";
import contactsOperations from "../../redux/contacts/contactsOperations";
import contactsSelectors from "../../redux/contacts/contactsSelectors";
import Notification from "../../components/Notification";
import PropTypes from "prop-types";
import styles from "./PhoneBook.module.css";

const { form, inputLabel, input, formButton } = styles;

class PhoneBook extends Component {
  static propTypes = {
    onAddContact: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    theme: PropTypes.shape({
      config: PropTypes.shape({
        btnBgColor: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  state = {
    name: "",
    number: "",
    alertMessage: "",
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  setAlertMessage = (message) => {
    this.setState({ alertMessage: message });
    setTimeout(() => this.setState({ alertMessage: "" }), 3000);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { name, number } = this.state;
    const contacts = this.props.items;

    if (!isNaN(+name)) {
      this.setAlertMessage("Enter valid Name");
      return;
    }

    if (isNaN(+number)) {
      this.setAlertMessage("Enter valid Number");
      return;
    }

    if (
      contacts.some(
        (contacts) =>
          contacts.name.toLowerCase() === this.state.name.toLowerCase()
      )
    ) {
      this.setAlertMessage(`${name} is already in contacts`);
      return;
    }

    this.props.onAddContact(name, number);

    this.setState({ name: "", number: "" });
  };

  idName = shortid.generate();
  idNumber = shortid.generate();

  render() {
    const { name, number, alertMessage } = this.state;
    const { theme } = this.props;

    return (
      <>
        <CSSTransition
          in={alertMessage !== ""}
          classNames={styles}
          timeout={250}
          unmountOnExit
        >
          <Notification message={alertMessage} />
        </CSSTransition>
        <form className={form} onSubmit={this.handleSubmit}>
          <label className={inputLabel} htmlFor={this.idName}>
            Name
          </label>
          <input
            className={input}
            type="text"
            placeholder="Enter user name*"
            value={name}
            onChange={this.handleInputChange}
            name="name"
            id={this.idName}
            required
          />
          <label className={inputLabel} htmlFor={this.idNumber}>
            Number
          </label>
          <input
            className={input}
            type="text"
            placeholder="Enter user phone number*"
            value={number}
            onChange={this.handleInputChange}
            name="number"
            id={this.idNumber}
            required
          />
          <button
            type="submit"
            className={`${formButton} ${theme.config.btnBgColor}`}
          >
            Add contact
          </button>
        </form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  items: contactsSelectors.getContactsItems(state),
});

const mapDispatchToProps = {
  onAddContact: contactsOperations.addContact,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(PhoneBook));
