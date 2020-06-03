import './index.styl'
import itemTpl from './tpl/item.tpl'
import tpl from './tpl/board.tpl'
import tools from '../../utils/tools'

class ShowBoard {
  constructor (el, data) {
    this.name = 'showBoard';
    this.$el = el;
    this.data = data;
  }

  init () {
    this.render(this.data);
  }

  render (data) {
    this.$el.append(tools.tplReplace(tpl, {
      list: this.makeList(data)
    }))
  }

  makeList (data) {
    let list = '';

    data.forEach(val => {
      list += tools.tplReplace(itemTpl, {
        id: val.id,
        price: val.default_price,
        pic: JSON.parse(val.pics)[0][0][0],
        slogan: val.slogan.substr(0, 10),
        title: val.phone_name
      })
    })
    return list;
  }
}

export { ShowBoard }