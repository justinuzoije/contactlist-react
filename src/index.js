import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class MyForm extends React.Component {
  constructor() {
    super();
    this.state = {
      yourName: ''
    };
  }
  render() {
    return (
      <form>
        <label>Your name?</label>
        <input type="text"
          value={this.state.yourName}/>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

class ContactApp extends React.Component {
  constructor() {
    super();
    this.state = {
      contacts : [
        {id: 1, name: 'Bob', phone: '555-555-5555', email: 'bob@yahoo.com', type: 'friend'},
        {id: 2, name: 'Sue', phone: '111-222-3333', email: 'sue@yahoo.com', type: 'friend'}
      ],
      newName : 'Empty Name',
      newPhone: '000-000-000',
      newEmail: 'empty@empty.com',
      newType: 'nostatus'
    };
  }
  render() {
    let theContacts = this.state.contacts;
    let showthis = theContacts.map(
      theContacts => <div>
                      <li>{theContacts.name} - {theContacts.type}</li>
                      <li>{theContacts.phone}</li>
                      <li>{theContacts.email}</li>
                      <button>Delete</button>
                      <hr/>
                    </div>
    );
    return (
      <div>
        <div className="form-group">
          <h2>Add Contact</h2>
          <hr/>
          <label>Name</label>
          <input type="text"
            className="form-control"
            value={this.state.name}
            onChange={event => this.changeYourName(event)}/>
        </div>
        <div>
          <h2>Contact List</h2>
          <ul>
            {showthis}
          </ul>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <ContactApp/>,
  document.getElementById('root')
);
