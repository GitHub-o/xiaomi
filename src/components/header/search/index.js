import './index.styl'
import tpl from './index.tpl'

import tools from '../../../utils/tools'

class Search {
  constructor () {
    this.name = 'search';
    this.tpl = tpl;
  }

  toList (e) {
    const $searchKw = $('.J_searchKw'),
          keywords = tools.trimSpace($searchKw.val());

    if (keywords.length > 0) {
      window.open(`/list.html?keywords=${keywords}`);
    }
  }
}

export { Search }