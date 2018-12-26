// @flow
import React, { Component } from 'react';
import styles from './styles';
import { updateFirestoreSiteData } from '../../../../../firebase/data/site';

type State = {
  saving: boolean,
};

class EditorSidebarSave extends Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      saving: false,
    };
  }

  handleSaveChanges = () => {
    return;
    const { saving } = this.state;
    if (saving) return;
    this.setState({
      saving: true,
    });
    updateFirestoreSiteData()
      .then(() => {
        this.setState({
          saving: false,
        });
      })
      .catch(() => {
        this.setState({
          saving: false,
        });
      });
  };

  render() {
    const { saving } = this.state;
    return (
      <div className={styles.buttonClass} onClick={this.handleSaveChanges}>
        {saving ? 'Saving...' : 'Save Changes'}
      </div>
    );
  }
}

export default EditorSidebarSave;
