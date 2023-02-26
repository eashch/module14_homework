/*
    Написать код приложения, интерфейс которого состоит из двух input и кнопки. 
    В input можно ввести любое число.

        Заголовок первого input — «номер страницы».
        Заголовок второго input — «лимит».
        Заголовок кнопки — «запрос».

    При клике на кнопку происходит следующее:

      Если число в первом input не попадает в диапазон 
        от 1 до 10 или не является числом 
        — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
      Если число во втором input не попадает в диапазон 
        от 1 до 10 или не является числом 
        — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
      Если и первый, и второй input не в диапазонах или не являются числами 
        — выводить ниже текст 
        «Номер страницы и лимит вне диапазона от 1 до 10»;
      Если числа попадают в диапазон от 1 до 10 
        — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, 
        где GET-параметр page — это число из первого input, а GET-параметр limit 
        — это введённое число второго input.

    Пример. Если пользователь ввёл 5 и 7, то запрос будет вида 
    https://picsum.photos/v2/list?page=5&limit=7.

    После получения данных вывести список картинок на экран.

    Если пользователь перезагрузил страницу, то ему должны показываться картинки 
    из последнего успешно выполненного запроса (использовать localStorage).                  
*/

const inputError = document.querySelector(".input_error");
const requestError = document.querySelector(".request_error");
const button = document.querySelector(".button_submit");
const inputPage = document.querySelector(".input_page");
const inputLimit = document.querySelector(".input_limit");
const resultContainer = document.querySelector(".result");

const urlPhotoSite = new URL("https://picsum.photos/v2/list");

requestError.style.display = "none";

const showRequestError = result => {
  requestError.innerHTML = `Ошибка: ${result}`;
  requestError.style.display = "initial";
};

const checkInputValue = input => {
  const parsedValue = parseInt(input.value);
  if (isNaN(parsedValue) 
        || parsedValue < 1 
        || parsedValue > 10) {
    return undefined;
  }
  return parsedValue;
};

const checkPageAndLimit = (parsedPage, parsedLimit) => {
  if (parsedPage !== undefined && parsedLimit !== undefined) {
    inputError.innerHTML = '';
    return true;
  } else if (parsedPage === undefined && parsedLimit === undefined) {
    inputError.innerHTML = "Номер страницы и лимит вне диапазона от 1 до 10";
  } else if (parsedPage === undefined) {
    inputError.innerHTML = "Номер страницы вне диапазона от 1 до 10";
  } else if (parsedLimit === undefined) {
    inputError.innerHTML = "Лимит вне диапазона от 1 до 10";
  }
  return false;
};

const setFromLocalStarage = () => {
  const page = localStorage.getItem("page");
  const limit = localStorage.getItem("limit");
  if (page === null 
      || limit === null)
    return;
  inputPage.value = page;
  inputLimit.value = limit;
  processInput();
};
setFromLocalStarage();

function processInput () {
  const parsedPage = checkInputValue(inputPage);
  const parsedLimit = checkInputValue(inputLimit);
  
  if (!checkPageAndLimit(parsedPage, parsedLimit)) {
    return;
  }

  localStorage.setItem('page', parsedPage);
  localStorage.setItem('limit', parsedLimit);
  urlPhotoSite.searchParams.set('page', parsedPage);
  urlPhotoSite.searchParams.set('limit', parsedLimit);

  fetch(urlPhotoSite.toString())
    .then(response => response.json())
    .then(photosResponce => {
      let cards = '';
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
    })
    .catch(response => {
      showRequestError(response);
    });
}

button.addEventListener('click', processInput);