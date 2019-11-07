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

    for(let i = 0; i < items.children.length; i++) {
      items.children[i].children[0].addEventListener('click', finish);
      items.children[i].children[1].addEventListener('click', edit);
      items.children[i].children[1].addEventListener('keypress', commit);
      items.children[i].children[2].addEventListener('click', deleteItem);
    }
  }

  function formHandler(e) {
    e.preventDefault();
    add(e.target.children[0].value);
    e.target.children[0].value = '';
  }

  // event handler fyrir það að klára færslu
  function finish(e) {
    e.target.parentElement.classList.toggle('item--done');
  }

  // event handler fyrir það að breyta færslu 
  function edit(e) {
    let input = document.createElement('input');
    input.addEventListener('keypress', commit);
    input.classList.add('item__text');
    input.classList.add('item__edit');
    input.type = 'text';
    input.value = e.target.innerText;
    e.target.parentElement.insertBefore(input, e.target.nextSibling);
    input.focus();
    e.target.remove();
  }

  // event handler fyrir það að klára að breyta færslu
  function commit(e) {
    if(e.keyCode === ENTER_KEYCODE) {
      let text = el('span', 'item__text', edit);
      text.textContent = e.target.value;
      e.target.parentElement.insertBefore(text, e.target.nextSibling);
      e.target.remove();
    }
  }

  // fall sem sér um að bæta við nýju item
  function add(value) {
    if(/\S/.test(value)) {
      const listItem = document.createElement('li');
      listItem.classList.add('item');
      const checkBox = el('input', 'item__checkbox', finish);
      checkBox.type = 'checkbox';

      const span = el('span', 'item__text', edit);
      span.appendChild(document.createTextNode(value));

      const button = el('button', 'item__button', deleteItem);
      button.appendChild(document.createTextNode('Eyða'));

      listItem.appendChild(checkBox);
      listItem.appendChild(span);
      listItem.appendChild(button);

      items.appendChild(listItem);  
    }
  }

  // event handler til að eyða færslu
  function deleteItem(e) {
    e.target.parentElement.remove();
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
