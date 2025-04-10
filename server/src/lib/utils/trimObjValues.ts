export function trimObjValues(obj: { [key: string]: any }): { [key: string]: any } {
    const trimmedObj: { [key: string]: any } = {};

    Object.keys(obj).forEach(key => {
        const value = obj[key];

        if (typeof value === 'string') {
            trimmedObj[key] = value.trim(); // Обрезаем пробелы для строк
        } else if (Array.isArray(value)) {
            // Если значение — массив, рекурсивно обрабатываем каждый элемент
            trimmedObj[key] = value.map(item => (typeof item === 'string' ? item.trim() : item));
        } else if (value !== null && typeof value === 'object') {
            // Если значение — объект, рекурсивно обрабатываем его
            trimmedObj[key] = trimObjValues(value);
        } else {
            // Для всех остальных типов оставляем значение как есть
            trimmedObj[key] = value;
        }
    });

    return trimmedObj;
}
