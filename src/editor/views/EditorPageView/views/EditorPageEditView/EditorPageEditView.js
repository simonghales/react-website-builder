// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styles from './styles';
import SmallHeading from '../../../../../elements/SmallHeading';
import MediumLargeHeading from '../../../../../elements/MediumLargeHeading';
import type { ReduxState } from '../../../../../state/redux/store';
import { getSelectedPageSelector } from '../../../../../state/redux/editor/selector';
import type { PageDataModel } from '../../../../../data/pages/models';
import Button, { buttonTypes } from '../../../../../components/Button/Button';
import type { EditorRoutingMatch } from '../../../../routing';
import { goToPageModulesEditor } from '../../../../routing';

type Props = {
  page: PageDataModel,
  match: EditorRoutingMatch,
  history: any,
};

class EditorPageEditView extends Component<Props> {
  handleEditPage = () => {
    const { page, match, history } = this.props;
    goToPageModulesEditor(page, match, history);
  };

  render() {
    const { page } = this.props;
    return (
      <div className={styles.containerClass}>
        <header className={styles.headerClass}>
          <div className={styles.headerDetailsClass}>
            <SmallHeading>/{page.slug}</SmallHeading>
          </div>
          <div className={styles.headerTitleWrapperClass}>
            <MediumLargeHeading>{page.name}</MediumLargeHeading>
          </div>
        </header>
        <main className={styles.mainClass}>
          <div>
            <Button onClick={this.handleEditPage} buttonType={buttonTypes.slim}>
              Edit page
            </Button>
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  const page = getSelectedPageSelector(state);
  if (!page) {
    throw new Error(`No selected page.`);
  }
  return {
    page,
  };
};

export default withRouter(connect(mapStateToProps)(EditorPageEditView));
