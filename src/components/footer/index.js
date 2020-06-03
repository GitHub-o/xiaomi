import './index.styl'
import tpl from './index.tpl'

class Footer {
  constructor (el) {
    this.name = 'footer';
    this.$el = el;
  }

  init () {
    this.render();
  }

  render () {
    this.$el.append(tpl());
  }
}

export { Footer }