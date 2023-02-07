export default class Section {
  constructor ({renderer}, container) {
    //this._items = items,
    this._renderer = renderer,
    this._container = container
  };

  rendererElement(items) {
    items.reverse().forEach(item => {this._renderer(item)});
  };

  addItem(element) {
    this._container.prepend(element);
  };

}