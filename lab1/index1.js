const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "transaction.json");

let transactions;

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  transactions = JSON.parse(data);

  /**
   * Класс для представления отдельной транзакции.
   */
  class Transaction {
    /**
     * Конструктор класса Transaction.
     * @param {string} transaction_id - Уникальный идентификатор транзакции.
     * @param {string} transaction_date - Дата транзакции в формате "YYYY-MM-DD".
     * @param {string} transaction_amount - Сумма транзакции.
     * @param {string} transaction_type - Тип транзакции ("debit" или "credit").
     * @param {string} transaction_description - Описание транзакции.
     * @param {string} merchant_name - Название торговца.
     * @param {string} card_type - Тип карты ("Visa", "MasterCard").
     */
    constructor(transaction_id, transaction_date, transaction_amount, transaction_type, transaction_description, merchant_name, card_type) {
      this.transaction_id = transaction_id;
      this.transaction_date = transaction_date;
      this.transaction_amount = transaction_amount;
      this.transaction_type = transaction_type;
      this.transaction_description = transaction_description;
      this.merchant_name = merchant_name;
      this.card_type = card_type;
    }

    /**
     * Возвращает строковое представление транзакции в формате JSON.
     * @returns {string} Строковое представление транзакции.
     */
    string() {
      return JSON.stringify(this);
    }
  }

  /**
   * Класс для анализа транзакций.
   */
  class TransactionAnalyzer {
    /**
     * Конструктор класса TransactionAnalyzer.
     * @param {Array<Object>} data - Массив объектов транзакций.
     */
    constructor(data) {
      this.data = data.map(t => new Transaction(
        t.transaction_id,
        t.transaction_date,
        t.transaction_amount,
        t.transaction_type,
        t.transaction_description,
        t.merchant_name,
        t.card_type
      ));
    }

    /**
     * Добавляет новую транзакцию в массив данных.
     * @param {Transaction} transaction - Транзакция, которую нужно добавить.
     */
    addTransaction(transaction) {
      this.data.push(transaction);
    }

    /**
     * Возвращает все транзакции.
     * @returns {Transaction[]} Массив всех транзакций.
     */
    getAllTransaction() {
      return this.data;
    }

    /**
     * Возвращает уникальные типы транзакций.
     * @returns {string[]} Массив уникальных типов транзакций.
     */
    getUniqueTransactionType() {
      const types = new Set();
      this.data.forEach(transaction => {
        types.add(transaction.transaction_type);
      });
      return Array.from(types);
    }

    /**
     * Вычисляет общую сумму всех транзакций.
     * @returns {number} Общая сумма транзакций.
     */
    calculateTotalAmount() {
      return this.data.reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
    }

    /**
     * Вычисляет общую сумму транзакций за указанный год, месяц и день.
     * @param {number} [year] - Год.
     * @param {number} [month] - Месяц (1-12).
     * @param {number} [day] - День.
     * @returns {number} Общая сумма транзакций за указанный период.
     */
    calculateTotalAmountByDate(year, month, day) {
      return this.data
        .filter(transaction => {
          const transactionDate = new Date(transaction.transaction_date);
          const yearMatch = year ? transactionDate.getFullYear() === year : true;
          const monthMatch = month ? transactionDate.getMonth() === month - 1 : true;
          const dayMatch = day ? transactionDate.getDate() === day : true;
          return yearMatch && monthMatch && dayMatch;
        })
        .reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
    }

    /**
     * Возвращает транзакции указанного типа.
     * @param {string} type - Тип транзакции ("debit" или "credit").
     * @returns {Transaction[]} Массив транзакций указанного типа.
     */
    getTransactionByType(type) {
      return this.data.filter(transaction => transaction.transaction_type === type);
    }

    /**
     * Возвращает транзакции в указанном диапазоне дат.
     * @param {string} startDate - Начальная дата в формате "YYYY-MM-DD".
     * @param {string} endDate - Конечная дата в формате "YYYY-MM-DD".
     * @returns {Transaction[]} Массив транзакций в указанном диапазоне.
     */
    getTransactionsInDateRange(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      return this.data.filter(transaction => {
        const date = new Date(transaction.transaction_date);
        return date >= start && date <= end;
      });
    }

    /**
     * Возвращает транзакции по указанному торговцу.
     * @param {string} merchantName - Имя торговца.
     * @returns {Transaction[]} Массив транзакций торговца.
     */
    getTransactionsByMerchant(merchantName) {
      return this.data.filter(transaction => transaction.merchant_name === merchantName);
    }

    /**
     * Вычисляет среднюю сумму транзакций.
     * @returns {number} Средняя сумма транзакций.
     */
    calculateAverageTransactionAmount() {
      const total = this.calculateTotalAmount();
      return parseFloat(total / this.data.length).toFixed(2);
    }

    /**
     * Возвращает транзакции в заданном диапазоне суммы.
     * @param {number} minAmount - Минимальная сумма.
     * @param {number} maxAmount - Максимальная сумма.
     * @returns {Transaction[]} Массив транзакций в указанном диапазоне.
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
      return this.data.filter(transaction => {
        const amount = parseFloat(transaction.transaction_amount);
        return amount >= minAmount && amount <= maxAmount;
      });
    }

    /**
     * Вычисляет общую сумму дебетовых транзакций.
     * @returns {number} Общая сумма дебетовых транзакций.
     */
    calculateTotalDebitAmount() {
      return this.data
        .filter(transaction => transaction.transaction_type === "debit")
        .reduce((total, transaction) => total + parseFloat(transaction.transaction_amount), 0);
    }

    /**
     * Определяет месяц с наибольшим количеством транзакций.
     * @returns {number} Номер месяца (1-12).
     */
    findMostTransactionsMonth() {
      const months = {};
      this.data.forEach(transaction => {
        const month = new Date(transaction.transaction_date).getMonth();
        months[month] = (months[month] || 0) + 1;
      });
      const mostTransactionsMonth = Object.keys(months).reduce((a, b) => months[a] > months[b] ? a : b);
      return parseInt(mostTransactionsMonth) + 1;
    }

    /**
     * Определяет месяц с наибольшим количеством дебетовых транзакций.
     * @returns {number} Номер месяца (1-12).
     */
    findMostDebitTransactionMonth() {
      const debitTransactions = this.data.filter(transaction => transaction.transaction_type === 'debit');
      const months = {};
      debitTransactions.forEach(transaction => {
        const month = new Date(transaction.transaction_date).getMonth();
        months[month] = (months[month] || 0) + 1;
      });
      const mostDebitTransactionMonth = Object.keys(months).reduce((a, b) => months[a] > months[b] ? a : b);
      return parseInt(mostDebitTransactionMonth) + 1;
    }
     /**
     * Определяет тип транзакций с наибольшим количеством транзакций.
     * @returns {string} "creditCount", если кредитных транзакций больше; "debitCount", если дебетовых больше; "equal", если их количество одинаково.
     */
    mostTransactionTypes(){
       const creditCount = this.data.filter(transaction => transaction.transaction_type === "credit");
       const debitCount = this.data.filter(transaction => transaction.transaction_type === "debit");
       if (creditCount > debitCount){
        return "creditCount";
       } else if (debitCount > creditCount){
        return "debitCount";
       } else {
        return "equal"
       }
    }


     /**
     * Возвращает транзакции, совершенные до указанной даты.
     * @param {Date|string}  date - Дата, до которой необходимо найти транзакции (может быть объектом Date или строкой, представляющей дату).
     * @returns {Object[]} Массив транзакций, совершенных до указанной даты.
     */
    getTransactionsBeforeDate(date){
         const dateLimit = new Date(date);
         return this.data.filter(transaction => new Date(transaction.transaction_date) < dateLimit);
    }

     /**
     * Возвращает транзакцию, по ее id.
     * @param {number} id - id транзакции.
     * @returns {Object|undefined} Возращает транзакцию с задданным id или undefined - если транзакция не была найдена.
     */
    findTransactionById(id){
      return this.data.find(transaction => transaction.transaction_id === id);
    }

     /**
     * Возвращает новый массив, содержащий только описания транзакций.
     * @returns {string[]} Массив строк, каждая из которых представляет описание транзакции.
     */
    mapTransactionDescriptions(){
      return this.data.map(transaction => transaction.transaction_description)
    }
  }

  let newTr = {
    transaction_id: "10",
    transaction_date: "2019-01-01",
    transaction_amount: "100.00",
    transaction_type: "debit",
    transaction_description: "Payment for groceries",
    merchant_name: "Smash",
    card_type: "Visa"
  };

  let object1 = new TransactionAnalyzer(transactions);
  object1.addTransaction(newTr);

 
  console.log(object1.getAllTransaction());


});
