import React, { Component } from 'react'
import { RouterStore, syncHistoryWithStore } from "mobx-react-router";
import { observer, inject } from "mobx-react";
import { Provider } from "mobx-react";
import { Router, Route, Redirect, Switch } from "react-router-dom";

// import history from "./utils/history";
import store from "./stores/index";
import Home from './pages/home/index'

const routerStore = new RouterStore();

store.router = routerStore;


class App extends Component {
    render() {
        return (
            <Provider {...store}>
               <Home />
            </Provider>
        )
    }
}

export default App
