/*
    Напишите код приложения, интерфейс которого 
    представляет собой 2 input и кнопку submit. 
    В input можно ввести любое число.

    При клике на кнопку происходит следующее:

        Если оба числа не попадают в диапазон от 100 до 300 
        или введено не число — выводить ниже текст 
        «одно из чисел вне диапазона от 100 до 300»;
        Если числа попадают в диапазон от 100 до 300 — 
        сделать запрос c помощью fetch по URL 
        https://picsum.photos/200/300, 
        где первое число — ширина картинки, второе — высота.

    Пример. Если пользователь ввёл 150 и 200, 
    то запрос будет вида https://picsum.photos/150/200.

    После получения данных вывести ниже картинку на экран.
*/

const inputError = document.querySelector(".input_error");
const requestError = document.querySelector(".request_error");
const button = document.querySelector(".button_submit");
const inputWidth = document.querySelector(".input_width");
const inputHeight = document.querySelector(".input_height");
const resultContainer = document.querySelector(".result");

const linkPhotoSite = "https://picsum.photos/";

inputError.style.display = "none";
requestError.style.display = "none";

const showRequestError = result => {
  requestError.innerHTML = `Ошибка: ${result}`;
  requestError.style.display = "initial";
};

const checkInputValue = input => {
  const parsedValue = parseInt(input.value);
  if (isNaN(parsedValue) 
        || parsedValue < 100 
        || parsedValue > 300) {
    return undefined;
  }
  return parsedValue;
};

button.addEventListener('click', () => {
  const parsedWidth = checkInputValue(inputWidth);
  const parsedHeight = checkInputValue(inputHeight);

  if (parsedWidth === undefined 
      || parsedHeight === undefined) {
    inputError.style.display = "initial";
    return;
  }

  const link = linkPhotoSite + parsedWidth + '/' + parsedHeight;
  inputError.style.display = "none";
  resultContainer.innerHTML = "";

  fetch(link)
    .then(response => {
      if (response.status != 200) {
        showRequestError(response.statusText);
      } else {
        resultContainer.innerHTML = `<img src="${response.url}"/>`;
        requestError.style.display = "none";
      }
    })
    .catch(response => {
      showRequestError(response);
    });
});