
import './index.css';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import React from 'react';
import Kennel from "./components/kennel"

ReactDOM.render(<Kennel />, document.querySelector("#root"));

// ReactDOM.render(<App />, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();



