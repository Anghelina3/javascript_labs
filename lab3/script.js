// Массив для хранения транзакций
const transactions = [];

/**
 * Добавляет новую транзакцию из таблицы в массив transactions.
 */
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