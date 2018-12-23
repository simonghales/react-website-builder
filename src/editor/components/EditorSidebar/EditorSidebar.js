// @flow
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import EditorSidebarModule from './components/EditorSidebarModule/EditorSidebarModule';
import styles from './styles';
import EditorSidebarPage from './components/EditorSidebarPage/EditorSidebarPage';
import EditorSidebarSave from './components/EditorSidebarSave/EditorSidebarSave';
import { editorRoutes } from '../../routing';
import EditorModuleHandler from '../EditorModuleHandler/EditorModuleHandler';

const EditorSidebarModuleHandler = () => (
  <EditorModuleHandler>
    <EditorSidebarModule />
  </EditorModuleHandler>
);

class EditorSidebar extends Component<{}> {
  render() {
    return (
      <div className={styles.containerClass}>
        <div className={styles.contentClass}>
          <Route exact path={editorRoutes.page} component={EditorSidebarPage} />
          <Route exact path={editorRoutes.pageWithModule} component={EditorSidebarModuleHandler} />
        </div>
        <div className={styles.actionClass}>
          <EditorSidebarSave />
        </div>
      </div>
    );
  }
}

export default EditorSidebar;
