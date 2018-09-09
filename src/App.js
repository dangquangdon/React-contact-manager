import React, { Component } from "react";
import "./App.css";
import AllContacts from "./components/Contacts/AllContacts";
import Header from "./components/Layout/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "./context";
import AddContact from "./components/Contacts/AddContact";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import About from "./components/Pages/About";
import notFound from "./components/Pages/404";
import EditContact from "./components/Contacts/EditContact";

class App extends Component {
  render() {
    return (
      <Provider>
        <Router>
          <div className="App">
            <Header brand="Contact Manager 2018" />
            <div className="container">
              <Switch>
                <Route exact path="/" component={AllContacts} />
                <Route exact path="/contact/add" component={AddContact} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact/edit/:id" component={EditContact} />
                <Route component={notFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
