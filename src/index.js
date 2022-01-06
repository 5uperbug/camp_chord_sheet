import React from "react";
import ReactDom from "react-dom";

import SongIndex from "./SongIndex";
import list from "./SongList.json";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return <SongIndex list={list} />
};

ReactDom.render(
    <App />,
    document.querySelector('#root')
);