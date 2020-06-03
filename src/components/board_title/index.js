import './index.styl'
import tpl from './index.tpl'
import tools from '../../utils/tools'

class BoardTitle {
  constructor (el, title) {
    this.name = 'boardTitle';
    this.$el = el;
    this.title = title;
  }

  init () {
    this.render(this.title);
  }

  render (title) {
    this.$el.append(tools.tplReplace(tpl, { title }))
  }
}

export { BoardTitle }