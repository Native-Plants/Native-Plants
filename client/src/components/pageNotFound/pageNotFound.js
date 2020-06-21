import React, {Fragment} from 'react';
import './pageNotFound.css';

function PageNotFound() {
  return (
    <Fragment>
        <h1>{"404"} </h1>
        <h4>{"The URL you typed is invalid."}</h4>
    </Fragment>
  );
}

export default PageNotFound;