import React from 'react';
import ReactDOM from 'react-dom/client';
import Exportar from './Exportar';

var functions = require("./functions");

document.addEventListener("DOMContentLoaded", function(event) {
  functions.csList();
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(Exportar));