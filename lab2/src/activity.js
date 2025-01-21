/**
 * Функция получает случайную активность с API и возвращает её.
 * 
 * @function getRandomActivity
 * @returns {Promise<string>} Возвращает Promise, который разрешается строкой (активность).
 */
export async function getRandomActivity() {
    try {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any');
        const data = await response.json();
        return data.joke; // Возвращаем только текст активности
    } catch (error) {
        console.error("Ошибка при получении активности:", error);
        return "К сожалению, произошла ошибка"; // Возвращаем сообщение об ошибке
    }
}

