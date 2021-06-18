//algo:
//1. застосовуємо делегування подій (вішаємо обробник на батьківський елемент)
//2. робимо перевірку чи клацнули саме на кнопку
//3. ідентифікуємо на яку кнопку клацнули (через data атрибут)
//4. якщо кланцули на -, то мінусуємо на 1, якщо на +, то плюсуємо на 1
//5. тоді записуємо це нове значення в counter__value
//6. записуємо це нове значення в localStorage
//7. синхронізуємо значення між двома вкладками (тобто якщо міняється значення на одній, то має і мінятись на другій)
    //вішаємо обробник на глобальний обєкт (window)
    //призначаємо для значення counter__value нове значення event (це можливо, бо event для декількох вкладок з одного джерела буде однаковий)
//8. робимо так, щоб при перезагрузці однієї вкладки данні зберігались на цій вкладці і на всіх інших
    //вішаємо бробник подій на весь документ documnet
    //призначаємо для значення counter__value значення з localStorage

const counterElem = document.querySelector('.counter');
const counterValueElem = document.querySelector('.counter__value');

const onCountChange = event => {
  const isButton = event.target.classList.contains('counter__button');
  
  if(!isButton) {
    return
  }

  const action = event.target.dataset.action;

  const oldValue = Number(counterValueElem.textContent);
  
  const newValue = action === 'decrease'
    ? oldValue - 1
    : oldValue + 1

  localStorage.setItem('counterValue', newValue);
  counterValueElem.textContent = newValue;
};

counterElem.addEventListener('click', onCountChange)

const onStorageChange = (event) => {
  counterValueElem.textContent = event.newValue;
}

window.addEventListener('storage', onStorageChange)

const onDocumentLoaded = () => {
  counterValueElem.textContent = localStorage.getItem('counterValue');
}

document.addEventListener('DOMContentLoaded', onDocumentLoaded)
