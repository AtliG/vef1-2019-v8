const ENTER_KEYCODE = 13;

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  const items = document.querySelector('.items');

  text.init(form, items);
});

const text = (() => {
  let items;

  function init(_form, _items) {
    items = _items;
    _form.addEventListener('submit', formHandler);

    inputArea = _form.querySelector('.form__input');

    const tasksArray = items.getElementsByTagName("li");
    
    for(let i = 0; i < tasksArray.length; i++) {
      const item = tasksArray[i].children[2].parentNode;
      tasksArray[i].children[0].addEventListener('click', () => {
        finish(tasksArray[i]);
      });
      tasksArray[i].children[1].addEventListener('click', () => {
        edit(tasksArray[i].children[1]);
      });
      tasksArray[i].children[2].addEventListener('click', () => {
        deleteItem(item);
      });
    }
    // TODO láta hluti í _items virka
  }

  function formHandler(e) {
    e.preventDefault();
    console.log('jello');
    add(inputArea.value);
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu 
  function edit(e) {
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    if(inputArea !== null) {
      const listItem = el('li','item', null);
      const checkBox = el('input', 'item__checkbox', () => {
        finish(listItem);
      });
      checkBox.setAttribute('type', 'checkbox');
      const span = el('span', 'item__text', () => {
        edit(listItem);
      });
      span.appendChild(document.createTextNode(value));
      const button = el('button', 'item__button', () => {
        deleteItem(listItem);
      });
      button.appendChild(document.createTextNode('Eyða'));
      listItem.appendChild(checkBox);
      listItem.appendChild(span);
      listItem.appendChild(button);

      items.appendChild(listItem);

      input.value('');
    }
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.remove();
  }

  // hjálparfall til að útbúa element
  function el(type, className, clickHandler) {
    const elem = document.createElement(type);
    elem.classList.add(className);
    elem.addEventListener('click', clickHandler);
    return elem;
  }

  return {
    init: init
  }
})();
