import { defer } from "react-router-dom";

function joinFIO(words) {
    return words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }).join('');
}

function validateFIO(fio) {
    const cyrillicRegex = /^[А-ЯЁа-яё]+$/;

    const words = fio.trim().split(/\s+/);

    // Проверяем каждое слово
    for (let i = 0; i < words.length; i++) {
        const word = words[i];

        // Пропускаем пустые строки
        if (!word) continue;

        // Проверяем первую букву
        if (!/[А-ЯЁ]/.test(word.charAt(0))) {

            return false;
        }

        // Проверяем остальные символы
        if (!cyrillicRegex.test(word.slice(1).toLowerCase())) {
            return false;
        }
    }

    return true;
}

function validateAndJoinFIO(fio) {
    if (!validateFIO(fio)) {
        console.log('не валидное фио')
        return null; // или выбросьте исключение

    }

    const words = fio.trim().split(/\s+/);
    return joinFIO(words);
}

export { validateAndJoinFIO };