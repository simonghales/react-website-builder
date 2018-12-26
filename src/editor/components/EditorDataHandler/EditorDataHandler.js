// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchFirestoreSiteData } from '../../../firebase/data/site';
import type { EditorReduxState } from '../../../state/redux/editor/reducer';
import { setEditorReduxStateRedux } from '../../../state/redux/editor/reducer';

type Props = {
  children: any,
  setEditorReduxState: (state: EditorReduxState) => void,
};

type State = {
  loadedData: boolean,
};

class EditorDataHandler extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loadedData: false,
    };
  }

  componentDidMount(): void {
    this.handleFetchData();
  }

  handleFetchData = () => {
    const { setEditorReduxState } = this.props;
    fetchFirestoreSiteData()
      .then(site => {
        if (site) {
          const { data = {} } = site;
          setEditorReduxState({
            pages: data.pages,
            modules: data.modules,
            mixinStyles: data.mixins,
          });
        }
        this.setState({
          loadedData: true,
        });
      })
      .catch(() => {
        this.setState({
          loadedData: true,
        });
      });
  };

  render() {
    const { children } = this.props;
    const { loadedData } = this.state;
    if (!loadedData) {
      return <div>LOADING DATA...</div>;
    }
    return children;
  }
}

const mapDispatchToProps = {
  setEditorReduxState: (state: EditorReduxState) => setEditorReduxStateRedux(state),
};

export default connect(
  null,
  mapDispatchToProps
)(EditorDataHandler);
