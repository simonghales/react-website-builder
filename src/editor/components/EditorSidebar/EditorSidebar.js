// @flow
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import EditorSidebarModule from './components/EditorSidebarModule/EditorSidebarModule';
import styles from './styles';
import EditorSidebarPage from './components/EditorSidebarPage/EditorSidebarPage';
import EditorSidebarSave from './components/EditorSidebarSave/EditorSidebarSave';

class EditorSidebar extends Component<{}> {
  render() {
    return (
      <div className={styles.containerClass}>
        <div className={styles.contentClass}>
          <Route exact path="/test/:pageKey?" component={EditorSidebarPage} />
          <Route exact path="/test/:pageKey/:moduleKey" component={EditorSidebarModule} />
        </div>
        <div className={styles.actionClass}>
          <EditorSidebarSave />
        </div>
      </div>
    );
  }
}

export default EditorSidebar;
