import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import $ from 'jquery';

//This is a component that has the list of contacts
// It has a constructor method which starts it up with several variables
// One of them is an array which has the contacts themselves
// Each contact is an object with a name, phone, email, and type
class ContactList extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      phone: '',
      email: '',
      type: '',
      viewMode: 'all',
      contacts: []
    };
  }

  //Loading initial list from DB
  componentDidMount() {
    $.get('http://localhost:3001/api/contacts')
      .then(contacts => {
        this.setState({
          contacts: contacts
        })
      });
  }

  changeState(stateName, event) {
    let textInput = event.target;
    this.setState({
      [stateName]: textInput.value
    });
  }
  submitForm(event) {
    event.preventDefault();
    let contact = {
      name: this.state.name,
      phone: this.state.phone,
      email: this.state.email,
      type: this.state.type
    };
    this.state.contacts.push(contact);
    this.setState({
      contacts: this.state.contacts,
      name: '',
      phone: '',
      email: '',
      type: ''
    });
  }
  deleteContact(idx) {
    this.state.contacts.splice(idx, 1);
    this.setState({
      contacts: this.state.contacts
    });
  }


  render() {
    return (
      <div className="contact-list">
        <form onSubmit={event => this.submitForm(event)}>
          <h3>Add Contact</h3>
          <TextInput
            label="Name" value={this.state.name}
            onChange={event =>
              this.changeState('name', event)}/>
          <TextInput
            label="Phone" value={this.state.phone}
            onChange={event =>
              this.changeState('phone', event)}/>
          <TextInput
            label="Email" value={this.state.email}
            onChange={event =>
              this.changeState('email', event)}/>
          <SelectInput
            label="Type" value={this.state.type}
            onChange={event =>
              this.changeState('type', event)}>
            <option value="">Select one</option>
            <option value="friend">Friend</option>
            <option value="family">Family</option>
            <option value="coworker">Coworker</option>
          </SelectInput>

          <button className="btn btn-primary">Add</button>
        </form>
        <h3>Contact List</h3>
        <ul>
          {this.state.contacts.map((contact, idx) =>
            <li key={idx}>
              <h3>{contact.name} - {contact.type}</h3>
              {contact.email}, {contact.phone}
              <input type="checkbox"
                checked={contact.favorite}
                onChange={event => this.changeFavorite(contact, event)}/>
              <button onClick={() =>
              this.deleteContact(contact)}>Delete</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

class TextInput extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <input className="form-control" type="text"
          value={this.props.value}
          onChange={this.props.onChange}/>
      </div>
    );
  }
}

class SelectInput extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label>{this.props.label}</label>
        <select className="form-control"
          value={this.props.value}
          onChange={this.props.onChange}>
          {this.props.children}
        </select>
      </div>
    );
  }
}

ReactDOM.render(
  <ContactList/>,
  document.getElementById('root')
);
