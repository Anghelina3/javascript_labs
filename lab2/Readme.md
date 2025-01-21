# Получение данных с сервера

## Задание
Напишите функцию `getRandomActivity()`, которая будет делать запрос и получать данные со стороннего ресурса: [http://www.boredapi.com/api/activity/](http://www.boredapi.com/api/activity/).

Отобразите полученную активность (текст активности) на странице `index.html`.

Добавьте обработку ошибок в функцию getRandomActivity(). В случае ошибки добавьте следующий текст в файл index.html: "К сожалению, произошла ошибка".

### Код JavaScript

```javascript
/**
 * Функция получает случайную активность с API и отображает её на веб-странице.
 * В случае ошибки отображает сообщение об ошибке.
 * 
 * @function getRandomActivity
 * @returns {void} Эта функция не возвращает значения.
 */
function getRandomActivity() {
    const activityElement = document.getElementById('activity');

    fetch('https://www.boredapi.com/api/activity/')
        .then(response => response.json())  // Преобразуем ответ в формат JSON
        .then(data => {
            // Отображаем случайную активность на HTML странице
            activityElement.textContent = data.activity;  // Показать активность в элементе с id "activity"
        })
        .catch(error => {
            activityElement.textContent = "К сожалению, произошла ошибка"; 
        });
}

getRandomActivity();


```

### Что делает fetch()?
Функция **fetch()** используется для отправки запросов к серверу и получения ответов. Она возвращает объект Promise, который позволяет работать с асинхронным результатом. В случае успешного ответа, результат запроса обрабатывается в виде данных (например, в формате JSON). Если произошла ошибка, срабатывает метод catch().

### Что такое Promise?
**Promise** — это объект в JavaScript, который представляет собой результат асинхронной операции, которая может завершиться успешно или с ошибкой. Promise позволяет работать с результатами асинхронных операций (например, HTTP-запросов) с помощью методов .then() и .catch().

### Методы объекта Promise
**then(onFulfilled, onRejected):** Метод, который выполняется, когда промис успешно завершается или отклоняется.

- **onFulfilled**: функция, которая выполняется, если промис успешно завершен (результат асинхронной операции).
- **onRejected**: функция, которая выполняется, если промис отклонен (произошла ошибка).
- 
**catch(onRejected)**: Метод, который обрабатывает ошибки, если промис отклонен.

**finally(onFinally)**: Метод, который выполняется после завершения промиса, независимо от того, был ли он успешным или нет.


### Измените функцию getRandomActivity() так, чтобы она использовала ключевые слова async / await. 
```javascript
/**
 * Функция получает случайную активность с API и отображает её на веб-странице.
 * В случае ошибки отображает сообщение об ошибке.
 * 
 * @function getRandomActivity
 * @returns {void} Эта функция не возвращает значения.
 */
async function getRandomActivity() {
    const activityElement = document.getElementById('activity');


    try {
        const response = await fetch('https://www.boredapi.com/api/activity/');
        const data = await response.json() // Преобразуем ответ в формат JSON

        activityElement.textContent = data.activity;  // Показать активность в элементе с id "activity"
    }catch (error) {
        activityElement.textContent = "К сожалению, произошла ошибка";
    }
}

getRandomActivity();
```

### Каковы основные различия между использованием async / await и Promise?

- **Синтаксис**
**Promise**: Используется метод .then() для обработки результата успешного завершения и .catch() для обработки ошибок. Код может быть не таким читаемым, если у вас много вложенных асинхронных операций.
**async/await:** Это синтаксический сахар для работы с промисами. Он позволяет писать асинхронный код так, как если бы он был синхронным, что делает код более читаемым и понятным.

- **Читаемость** 
**Promise:** Использование **.then()** и **.catch()** может привести к **"callback hell"** (глубокая вложенность функций).
**async/await:** Код становится более линейным и легче читаемым, так как вы используете стандартный синтаксис управления потоком, который похож на синхронный код.
- **Ошибка**:

**Promise:** Ошибки обрабатываются с помощью **.catch()**, и в случае нескольких **.then()** блоков ошибка может быть перехвачена только в последнем .catch().
**async/await:** Ошибки обрабатываются с помощью try/catch, что позволяет обрабатывать ошибки в том же порядке, что и в синхронном коде.


### Добавьте функционал обновления данных каждую минуту. Используйте функцию setTimeout().
 
```javascript
.finally(() =>{
            setTimeout(getRandomActivity, 60000);
        })


```

### Дополнительное задание: измените функцию getRandomActivity() так, чтобы она возвращала данные, и добавьте функцию updateActivity(), которая будет отображать полученные данные.

```javascript

 /* Функция получает случайную активность с API и возвращает её.
 * 
 * @function getRandomActivity
 * @returns {Promise<string>} Возвращает Promise, который разрешается строкой (активность).
 */
export async function getRandomActivity() {
    try {
        const response = await fetch('httpss://v2.jokeapi.dev/joke/Any');
        const data = await response.json();
        return data.joke; // Возвращаем только текст активности
    } catch (error) {
        console.error("Ошибка при получении активности:", error);
        return "К сожалению, произошла ошибка"; // Возвращаем сообщение об ошибке
    }
}

import { getRandomActivity } from './activity.js';


/**
 * Функция отображает активность на странице, используя getRandomActivity().
 * 
 * @function updateActivity
 * @returns {void} Эта функция не возвращает значения.
 */


async function updateActivity() {
    const activityElement = document.getElementById('activity');

    // Получаем данные с API
    const activity = await getRandomActivity();

    // Обновляем содержимое элемента на нашей странице
    activityElement.textContent = activity;

    setTimeout(updateActivity, 60000);

}

updateActivity();

```
