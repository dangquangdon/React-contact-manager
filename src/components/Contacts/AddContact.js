import React from "react";
import { Consumer } from "../../context";
// import uuid from "uuid";
import TextInputGroup from "../Layout/TextInputGroup";
import axios from "axios";

class AddContact extends React.Component {
  state = {
    name: "",
    email: "",
    phone: "",
    error: {}
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = async (dispatch, e) => {
    e.preventDefault();
    const { name, email, phone } = this.state;
    if (name === "") {
      this.setState({ error: { name: "Name is required" } });
      return;
    }
    if (email === "") {
      this.setState({ error: { email: "Email is required" } });
      return;
    }
    if (phone === "") {
      this.setState({ error: { phone: "Phone is required" } });
      return;
    }
    const newContact = {
      // id: uuid(),
      name: name,
      email: email,
      phone: phone
    };
    const res = await axios.post(
      "https://jsonplaceholder.typicode.com/users",
      newContact
    );
    // .then(res => dispatch({ type: "ADD_CONTACT", payload: res.data }));
    dispatch({ type: "ADD_CONTACT", payload: res.data });
    // Clear the form
    this.setState({
      name: "",
      email: "",
      phone: ""
    });

    this.props.history.push("/");
  };
  render() {
    const { name, email, phone, error } = this.state;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">Add Contact</div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter Name"
                    value={name}
                    onChange={this.onChange}
                    error={error.name}
                  />

                  <TextInputGroup
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={this.onChange}
                    error={error.email}
                  />

                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter Phone Number"
                    value={phone}
                    onChange={this.onChange}
                    error={error.phone}
                  />

                  <input
                    type="submit"
                    value="Add Contact"
                    className="btn btn-light btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
