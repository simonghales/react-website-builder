// @flow
import React, { Component } from 'react';
import { cx } from 'emotion';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './styles';
import Button, { buttonTypes } from '../../../../../../../components/Button/Button';
import TextInput from '../../../../../../../components/TextInput/TextInput';
import { getNameSlug } from '../../../../../../../utils/slugs';
import type { ReduxState } from '../../../../../../../state/redux/store';
import { getAllPagePathsSelector } from '../../../../../../../state/redux/editor/selector';
import ErrorMessage from '../../../../../ErrorMessage/ErrorMessage';
import { dispatchCreateNewPage } from '../../../../../../../state/redux/shared/dispatch';
import type { PageDataModel } from '../../../../../../../data/pages/models';
import { goToPage } from '../../../../../../routing';
import type { EditorRoutingMatch } from '../../../../../../routing';

type Props = {
  history: {},
  match: EditorRoutingMatch,
  existingPagePaths: Array<string>,
  createPage: (name: string, slug: string) => PageDataModel,
};

type State = {
  name: string,
  path: string,
};

class CreatePageSlideout extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: '',
      path: '',
    };
  }

  handleNameChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      name: event.target.value.toString(),
    });
  };

  handlePathChange = (event: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({
      path: event.target.value.toString(),
    });
  };

  getPathValue() {
    const { name, path } = this.state;
    if (path) {
      return path;
    }
    return getNameSlug(name);
  }

  canSubmit() {
    const { name } = this.state;
    const path = this.getPathValue();
    return !!name && !!path && !this.isPathAlreadyTaken();
  }

  isPathAlreadyTaken() {
    const { existingPagePaths } = this.props;
    const path = this.getPathValue();
    return existingPagePaths.includes(path);
  }

  handleFormSubmit = (event: any) => {
    event.preventDefault();
    this.handleCreatePage();
    return false;
  };

  handleCreatePage() {
    const { createPage, history, match } = this.props;
    const { name } = this.state;
    const path = this.getPathValue();
    const newPage = createPage(name, path);
    this.clearInputs();
    goToPage(newPage.slug, match, history);
  }

  clearInputs() {
    this.setState({
      name: '',
      path: '',
    });
  }

  render() {
    const { name } = this.state;
    const path = this.getPathValue();
    const pathAlreadyTaken = path && this.isPathAlreadyTaken();
    return (
      <div className={styles.containerClass}>
        <header className={styles.headerClass}>New Page</header>
        <form className={styles.bodyClass} onSubmit={this.handleFormSubmit}>
          <section className={styles.formClass}>
            <div className={styles.formFieldClass}>
              <label>
                <div
                  className={cx(styles.fieldLabelClass, {
                    [styles.fieldLabelInactiveClass]: !name,
                  })}
                >
                  Name
                </div>
                <div>
                  <TextInput value={name} onChange={this.handleNameChange} />
                </div>
              </label>
            </div>
            <div className={styles.formFieldClass}>
              <label>
                <div
                  className={cx(styles.fieldLabelClass, {
                    [styles.fieldLabelInactiveClass]: !path,
                  })}
                >
                  Path
                </div>
                <div>
                  <TextInput value={this.getPathValue()} onChange={this.handlePathChange} />
                </div>
                {pathAlreadyTaken && (
                  <ErrorMessage className={styles.fieldErrorMessage}>
                    This path already exists.
                  </ErrorMessage>
                )}
              </label>
            </div>
          </section>
          <div>
            <Button buttonType={buttonTypes.solid} type="submit" disabled={!this.canSubmit()}>
              Create Page
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  existingPagePaths: getAllPagePathsSelector(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  createPage: (name: string, slug: string) => dispatchCreateNewPage(name, slug, dispatch),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CreatePageSlideout)
);
