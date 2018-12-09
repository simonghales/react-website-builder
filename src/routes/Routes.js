// @flow
import React from 'react';
import { Route } from 'react-router-dom';
import LandingRoute from './Landing';
import PreviewRoute from './Preview';
import EditorRoute from './Editor';
import { editorRoutes } from '../editor/routing';

const Routes = () => (
  <React.Fragment>
    <Route path="/" exact component={LandingRoute} />
    <Route path={editorRoutes.optionalPage} component={EditorRoute} />
    <Route path="/preview" component={PreviewRoute} />
  </React.Fragment>
);

export default Routes;
