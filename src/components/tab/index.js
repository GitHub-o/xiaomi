import './index.styl'
import itemTpl from './tpl/item.tpl'
import tpl from './tpl/wrap.tpl'
import tools from '../../utils/tools'

import { ShowBoard } from '../show_board'
import { NoDataTip } from '../no_data_tip'

class Tab {
  constructor (el, opt) {
    this.name = 'tab';
    this.$el = el;
    this.fieldDatas = opt.fieldDatas;
    this.phoneDatas = opt.phoneDatas;
    this.fieldCache = {};

    this.showBoard = new ShowBoard();
    this.noDataTip = new NoDataTip();
  }

  async init () {
    await this.render(this.fieldDatas);
    this.bindEvent();
  }

  async render (data) {
    let list = '';
    data.forEach(val => {
      list += tools.tplReplace(itemTpl, {
        field: val.field,
        series_name: val.series_name
      })
    })

    await this.$el.append(tools.tplReplace(tpl, { list }));
  }

  bindEvent () {
    const $tabList = $('.J_tabList'),
          $board = $('.J_board'),
          $searchKw = $('#J_searchKw');

    $tabList.on('click', '.tab-item-lk', { $board }, $.proxy(this.tabClick, this));
    $searchKw.on('input', { $board, $searchKw }, tools._throttle($.proxy(this.searchInput, this), 300));
  }

  tabClick (ev) {
    const e = ev || window.event,
          $tar = $(e.target || e.srcElement),
          $board = e.data.$board;

    if ($tar.attr('data-field')) {
      const field = $tar.attr('data-field');

      this.tabChange($tar);
      this.appendList(field, '', $board);
    }
  }

  searchInput (ev) {
    const e = ev || window.event,
          $board = e.data.$board,
          kw = tools.trimSpace(e.data.$searchKw.val());

    this.appendList('all', kw.length > 0 ? kw : '', $board);
  }

  tabChange ($tar) {
      $tar.parent().addClass('active')
          .siblings().removeClass('active');
  }

  appendList (field, kw, $board) {
    if (kw) {
      const data = this.filterPhoneDatas('all', kw);
      
      $board.html(data.length > 0 ? this.showBoard.makeList(data) : this.noDataTip.tpl());
    } else {
      if (!this.fieldCache[field]) {
        this.fieldCache[field] = this.filterPhoneDatas(field, kw);
      }
      $board.html(this.showBoard.makeList(this.fieldCache[field]));
    }
  }

  filterPhoneDatas (field, kw) {
    return this.phoneDatas.filter(val => {
      if (kw) {
        const name = val.phone_name.toLowerCase(),
              slogan = val.slogan.toLowerCase();

        kw = kw.toLowerCase();

        return name.includes(kw) || slogan.includes(kw);
      } else {
        switch (field) {
          case 'all':
            return true;
            break;
          default:
            return val.field == field;
            break;
        }
      }
    });
  }
}

export { Tab }