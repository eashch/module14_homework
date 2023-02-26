/*
    Напишите код приложения, интерфейс которого представляет собой input и кнопку. 
    В input можно ввести любое число. При клике на кнопку происходит следующее:

        Если число не попадает в диапазон от 1 до 10 — выводить ниже 
        текст «число вне диапазона от 1 до 10».
        Если число попадает в диапазон от 1 до 10 — сделать запрос 
        c помощью XHR по URL https://picsum.photos/v2/list?limit=10, 
        где get-параметр limit — это введённое число.

  Пример. Если пользователь ввёл 5, то запрос будет вида: 
    https://picsum.photos/v2/list?limit=5.

  После получения данных вывести ниже картинки на экран.
*/

const inputError = document.querySelector(".input_error");
const requestError = document.querySelector(".request_error");
const button = document.querySelector(".button_submit");
const input = document.querySelector(".input");
const resultContainer = document.querySelector(".result");

const urlPhotoSite = new URL("https://picsum.photos/v2/list");

inputError.style.display = "none";
requestError.style.display = "none";

button.addEventListener('click', () => {
  const parsedValue = parseInt(input.value);
  if (isNaN(parsedValue) 
        || parsedValue < 1 
        || parsedValue > 10) {
    inputError.style.display = "initial";
    return;
  }
  inputError.style.display = "none";
  
  urlPhotoSite.searchParams.set('limit', parsedValue);

  const xhr = new XMLHttpRequest();
  xhr.open('GET', urlPhotoSite, true);

  xhr.onload = () => {
    if (xhr.status != 200) {
      xhr.onerror();
    } else {
      let cards = '';
      const photosResponce = JSON.parse(xhr.response);
      photosResponce.forEach(item => {
        const cardBlock = `
          <img
            src="${item.download_url}"
            class="result__item"
          />
        `;
        cards += cardBlock;
      });  
      resultContainer.innerHTML = cards;
      requestError.style.display = "none";
    }
  };

  xhr.onerror = () => {
    requestError.innerHTML = `Ошибка ${xhr.status}`;
    requestError.style.display = "initial";
  };

  xhr.send();
});