import './index.styl'
import tpl from './index.tpl'
import carItemTpl from './tpl/item.tpl'
import carIndicatorItemTpl from './tpl/indicator_item.tpl'

export default () => {
  return {
    name: 'carousel',
    tpl (data = []) {
      const reg = /{{(.*?)}}/g;
      let carItemHtml = '',
          carIndicatorItemHtml = '';
      data.forEach((val, idx) => {
        carItemHtml += carItemTpl().replace(reg, (node, key) => {
          return {
            id: val.phone_id,
            img_url: val.pic,
            title: val.title || '',
            alt: val.alt || val.alt || '',
            is_active: idx === 0 ? 'active' : ''
          }[key];
        });
        carIndicatorItemHtml += carIndicatorItemTpl().replace(reg, (node, key) => {
          return {
            is_cur: idx === 0 ? 'cur' : ''
          }[key];
        });
      });

      const oDiv = document.createElement('div');
      oDiv.className = 'my-carousel J_myCarousel container';
      oDiv.innerHTML = tpl().replace(reg, (node, key) => {
        return {
          car_item: carItemHtml,
          car_indicator_item: carIndicatorItemHtml
        }[key];
      })
      return oDiv;
    }
  }
}