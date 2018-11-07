// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import LandingRoute from './Landing';
import EditorRoute from './Editor';
import PreviewRoute from './Preview';

const Routes = () => (
  <React.Fragment>
    <Route path="/" exact component={LandingRoute} />
    <Route path="/editor" component={EditorRoute} />
    <Route path="/preview" component={PreviewRoute} />
  </React.Fragment>
);

export default Routes;
