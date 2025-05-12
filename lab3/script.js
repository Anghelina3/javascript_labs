// Массив для хранения транзакций
const transactions = [];

/**
 * Добавляет новую транзакцию в массив transactions и обновляет таблицу.
 * @param {Event} event - Событие отправки формы.
 */
function addTransaction(event) {
    event.preventDefault(); // Останавливает перезагрузку страницы

    // Получение данных из формы
    const date = document.getElementById('date').value;
    const category = document.getElementById('category').value;
    const amount = parseInt(document.getElementById('amount').value); // Преобразуем в число
    const description = document.getElementById('description').value;

    // Проверка корректности даты
    const isValidDate = !isNaN(new Date(date).getTime());
    if (!isValidDate) {
        alert('Введите корректную дату!');
        return;
    }

    // Создание объекта транзакции
    const transaction = {
        id: Date.now(), // Используем уникальный id на основе времени
        date: new Date(date).toLocaleString(),
        amount: amount,
        category: category,
        description: description
    };

    transactions.push(transaction); // Добавляем в массив

    updateTable(); // Перестраиваем таблицу
    calculateTotal(); // Пересчитываем сумму
    document.getElementById('transaction-form').reset(); // Очищаем форму
}

/**
 * Обновляет таблицу на основе массива transactions.
 */
function updateTable() {
    const transactionTable = document.getElementById('table');
    transactionTable.innerHTML = ''; // Очищаем таблицу

    // Пересчитываем ID и создаем строки заново
    transactions.forEach((transaction) => {
        const row = document.createElement('tr');
        row.style.backgroundColor = transaction.amount > 0 ? "green" : "red";

        row.innerHTML = `
            <td>${transaction.id}</td>
            <td>${transaction.date}</td>
            <td>${transaction.category}</td>
            <td>${transaction.description.split(' ').slice(0, 4).join(' ')}</td>
            <td><button class="buttonDelete">Удалить</button></td>`;

        transactionTable.appendChild(row); // Добавляем строку
    });
}

/**
 * Удаляет транзакцию по id, обновляет таблицу и пересчитывает сумму.
 * @param {number} id - ID удаляемой транзакции.
 */
function deleteTransaction(id) {
    // Удаляем транзакцию с нужным ID
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
        transactions.splice(index, 1); // Удаляем из массива
        calculateTotal(); // Пересчитываем сумму
        updateTable(); // Перестраиваем таблицу
    }
}

/**
 * Пересчитывает общую сумму всех транзакций и отображает её.
 */
function calculateTotal() {
    const total = document.getElementById('total-sum');

    const totalSum = transactions.reduce((sum, transaction) => sum + transaction.amount, 0); // Суммируем
    total.textContent = `Общая сумма: ${totalSum} лей`; // Отображаем
    total.style.display = "block";
}

// Добавляем слушатель для формы
document.getElementById('transaction-form').addEventListener('submit', addTransaction);

/**
 * Слушатель для кнопок удаления транзакций.
 */
document.getElementById('table').addEventListener('click', function (event) {
    const row = event.target.closest('tr'); // Находим ближайшую строку

    if (row && event.target.classList.contains('buttonDelete')) {
        const transactionId = parseInt(row.cells[0].textContent); // Получаем ID транзакции
        deleteTransaction(transactionId); // Удаляем транзакцию
    } else if (row) {
        const transactionId = parseInt(row.cells[0].textContent); // Получаем ID транзакции
        const transaction = transactions.find(t => t.id === transactionId); // Находим транзакцию по ID
        if (transaction) {
            const blockDescription = document.getElementById('full-description');
            const blockDescription1 = document.getElementById('description-text');

            blockDescription1.textContent = transaction.description;  // Вставляем описание транзакции
            blockDescription.style.display = "block"; // Отображаем блок с описанием
            blockDescription1.style.display = "block"; // Отображаем блок с описанием
        }
    }
});
