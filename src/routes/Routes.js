// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import LandingRoute from './Landing';
import EditorRoute from './Editor';
import PreviewRoute from './Preview';
import EditorTestRoute from '../editor/routes/route';

const Routes = () => (
  <React.Fragment>
    <Route path="/" exact component={LandingRoute} />
    <Route path="/test" component={EditorTestRoute} />
    <Route path="/editor/:moduleKey?/:previousModuleKey?" component={EditorRoute} />
    <Route path="/preview" component={PreviewRoute} />
  </React.Fragment>
);

export default Routes;
