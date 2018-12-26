// @flow
import { firebaseDatabase } from '../config';
import store from '../../state/redux/store';
import type { ReduxState } from '../../state/redux/store';
import type { EditorReduxState } from '../../state/redux/editor/reducer';

const sitesCollection = firebaseDatabase.collection('sites');

const demoSiteDocRef = sitesCollection.doc('T2qOXp3GnRRlqy5e6ZSN');

export function fetchFirestoreSiteData() {
  return demoSiteDocRef
    .get()
    .then(doc => {
      if (doc.exists) {
        const data = doc.data();
        console.log('site exists', data);
        return data;
      }
      console.warn('site doesnt exist');
      return null;
    })
    .catch(error => {
      console.error('Error getting document:', error);
      return null;
    });
}

export function updateFirestoreSiteData() {
  const state: ReduxState = store.getState();
  const editorState: EditorReduxState = state.editor;
  const { pages, modules, mixinStyles: mixins } = editorState;
  return demoSiteDocRef.update({
    'data.pages': pages,
    'data.modules': modules,
    'data.mixins': mixins,
  });
}
