import React from "react";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import Phonebook from "./PhoneBook";
import ContactsList from "./ContactsList/ContactsListContainer";
import ContactFilter from "./ContactFilter";
import Section from "./Section";
import Notification from "./Notification";
import contactsSelectors from "../redux/contacts/contactsSelectors";
import withTheme from "./hoc/withTheme";
import PropTypes from "prop-types";

const PhoneBookPage = ({ items, error, theme }) => (
  <div className={`phoneBook ${theme.config.bodyBg}`}>
    <Section title="Phonebook">
      <Phonebook />
    </Section>
    <Section title="Contacts">
      {error && <Notification message={error.message} />}
      <CSSTransition
        in={items.length > 1}
        classNames="visible"
        timeout={250}
        appear={true}
        unmountOnExit
      >
        <ContactFilter />
      </CSSTransition>
      {!error && items.length < 1 && <p>There is no contact yet...</p>}
      <CSSTransition
        in={items.length >= 1}
        classNames="visible"
        timeout={250}
        appear={true}
        unmountOnExit
      >
        <ContactsList />
      </CSSTransition>
    </Section>
  </div>
);

PhoneBookPage.propTypes = {
  items: PropTypes.array.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
  }),
  theme: PropTypes.shape({
    config: PropTypes.shape({
      bodyBg: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  items: contactsSelectors.getContactsItems(state),
  error: contactsSelectors.getError(state),
});

export default connect(mapStateToProps)(withTheme(PhoneBookPage));
