


## Отображение транзакций
### Создайте пустую таблицу, куда в дальнейшем Вы будете добавлять транзакции.
Таблица должна содержать следующие столбцы:
- ID
- Дата и Время
- Категория транзакции
- Краткое описание транзакции
- Действие (кнопка удаления транзакции)


``` html
 <table id="table">
        <thead>
            <th> ID </th>
            <th> Дата и Время </th>
            <th> Категория транзакции </th>
            <th> Краткое описание транзакции </th>
            <th> Действие </th>
        </thead>

    </table>

```

### Добавление транзакций
1. Создайте функцию addTransaction(),
2. В функции addTransaction():
- Создайте объект транзакции с данными из формы.
- Добавьте созданный объект в массив transactions.
- Создайте новую строку таблицы с данными из объекта транзакции и добавьте её в таблицу.
- Если транзакция совершена на положительную сумму, то строка таблицы должна быть зеленым цветом, иначе красным.
- В колонке description отображайте краткое описание транзакции (первые 4 слова).
``` javascript
function addTransaction(event) {
    event.preventDefault(); // Останавливает перезагрузку страницы

    // Получение данных из таблицы
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;


    // Создание объекта транзакции
    const transaction = {
        id: transactions.length + 1,
        date: new Date(date).toLocaleString(),
        amount: amount,
        category: category,
        description: description
    };

    transactions.push(transaction);

    // Отображаем новую транзакцию в таблице
    const transactionTable = document.getElementById('table');

    //Для каждой таблицы добавляем строку и данные что получили из формы
    const row = document.createElement('tr');

    if (transaction.amount > 0) {
        row.style.backgroundColor = "green";
    } else {
        row.style.backgroundColor = "red";
    }
    row.innerHTML = `
        <td>${transaction.id}</td>
        <td>${transaction.date}</td>
        <td>${transaction.category}</td>
        <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>  <!-- Показать первые 4 слова -->
        <td><button class="buttonDelete">Удалить</button></td> `;
    transactionTable.appendChild(row);


    // Очищаем форму
    document.getElementById('transaction-form').reset();
}

document.getElementById('transaction-form').addEventListener('submit', addTransaction);

```

### Управление транзакциями
- В каждой строке таблицы добавьте кнопку удаления.
- При клике на кнопку удаления получите идентификатор транзакции и удалите соответствующую строку таблицы и удалите данную транзакцию из массива.
- Обработчик событий на клик на кнопку определите для элемента `<table>`

``` javascript 
document.getElementById('table').addEventListener('click', function(event) {
    if (event.target && event.target.classList.contains('buttonDelete')) {

    const row = event.target.closest('tr'); // Находим ближайшую строку таблицы
    const rowIndex = Array.from(row.parentNode.children).indexOf(row); // Получаем индекс строки
    deleteTransaction(Number(rowIndex)); // Удаляем транзакцию
    }
})

function deleteTransaction(index) {
    const rows = document.getElementById('table').getElementsByTagName('tr');
    rows[index].remove(); // Удаляем строку из таблицы

    // Удаляем транзакцию из массива
    transactions.splice(index, 1);
}

```