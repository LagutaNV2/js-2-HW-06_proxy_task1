// TODO: write your code here
// реализовать функцию, которая для переданного объекта возвращает массив его свойств со значениями,
// отсортированный по свойствам (порядок сортировки свойств - второй аргумент).
// Т.е. сначала идёт сортировка по тому, как указано в массиве сортировки, для тех ключей,
// для которых в массиве сортировки нет записи, сортировка идёт в алфавитном порядке.

// например: const obj = {name: 'мечник', health: 10, level: 2, attack: 80, defence: 40}
// порядок сортировки свойств: ["name", "level"]

// Пример вызова функции: orderByProps(obj, ["name", "level"])

// После обработки вашей функцией:
// [
//   {key: "name", value: "мечник"}, // порядок взят из массива с ключами
//   {key: "level", value: 2}, // порядок взят из массива с ключами
//   {key: "attack", value: 80}, // порядок по алфавиту (т.к. в массиве с ключами нет значения "attack")
//   {key: "defence", value: 40}, // порядок по алфавиту (т.к. в массиве с ключами нет значения "defence")
//   {key: "health", value: 10} // порядок по алфавиту (т.к. в массиве с ключами нет значения "health")
// ]

export default function orderByProps(obj, sortOrder = []) {
  const sortedProps = [];
  const remainingProps = [];

  for (const key in obj) {

    // Object.prototype.hasOwnProperty.call, тк у объекта м.б. собств-е св-во с именем hasOwnProperty,
    // которое переопределяет метод, унаследованный из Object.prototype.
    // В этом случае прямой вызов obj.hasOwnProperty(key) может вызвать ошибку или работать неправильно!
    // => используется вызов оригинального метода hasOwnProperty через прототип:
    // Вызов Object.prototype.hasOwnProperty.call(obj, key):
    //       - Берёт оригинальный метод hasOwnProperty из Object.prototype.
    //       - С помощью call() вызывает этот метод на объекте obj, передавая ему ключ key.
    if (Object.prototype.hasOwnProperty.call(obj, key)) {

      if (sortOrder.includes(key)) {
        sortedProps.push({ key, value: obj[key] });
      } else {
        remainingProps.push({ key, value: obj[key] });
      }
    }
  }

  // Сортировка оставшихся свойств в алфавитном порядке
  remainingProps.sort((a, b) => (a.key > b.key ? 1 : -1));

  // Объединяем свойства в правильном порядке
  //  Для каждого ключа в sortOrder выполняется поиск соответствующего объекта в sortedProps:
  //     sortOrder.map((key) => sortedProps.find((item) => item.key === key
  //  Метод .filter(Boolean) удаляет возможные undefined, если какой-то ключ отсутствует.
  //  Используется оператор расширения ... для объединения массивов sortedProps и
  //  отсортированных remainingProps в один массив

  return [
    ...sortOrder.map((key) => sortedProps.find((item) => item.key === key)).filter(Boolean),
    ...remainingProps,
  ];
}
