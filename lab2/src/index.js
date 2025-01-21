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