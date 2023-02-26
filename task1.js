/*
    Вам дана заготовка и результат, который вы должны получить. 
    Ваша задача — написать код, который будет преобразовывать XML 
    в JS-объект и выводить его в консоль.
*/

const xmlString = `<list>
<student>
  <name lang="en">
    <first>Ivan</first>
    <second>Ivanov</second>
  </name>
  <age>35</age>
  <prof>teacher</prof>
</student>
<student>
  <name lang="ru">
    <first>Петр</first>
    <second>Петров</second>
  </name>
  <age>58</age>
  <prof>driver</prof>
</student>
</list>`;

const parser = new DOMParser();
const xmlObj = parser.parseFromString(xmlString, "text/xml");

const studentNodes = xmlObj.querySelectorAll("student");
const students = {list: []};
studentNodes.forEach(item => {
    const nameNode = item.querySelector("name");
    students.list.push({
        name: `${nameNode.querySelector("first").textContent} ${nameNode.querySelector("second").textContent}`,
        age: parseInt(item.querySelector("age").textContent),
        prof: item.querySelector("prof").textContent,
        lang: nameNode.getAttribute("lang")
    });
});

console.log(students);