import orderByProps from '../app';

test('сортировка по заданным свойствам и алфавиту', () => {
  const obj = { name: 'мечник', health: 10, level: 2, attack: 80, defence: 40 };
  const sortOrder = ['name', 'level'];

  const result = orderByProps(obj, sortOrder);

  expect(result).toEqual([
    { key: 'name', value: 'мечник' },
    { key: 'level', value: 2 },
    { key: 'attack', value: 80 },
    { key: 'defence', value: 40 },
    { key: 'health', value: 10 },
  ]);
});

test('сортировка без указания порядка', () => {
  const obj = { name: 'мечник', health: 10, level: 2, attack: 80, defence: 40 };

  const result = orderByProps(obj);

  expect(result).toEqual([
    { key: 'attack', value: 80 },
    { key: 'defence', value: 40 },
    { key: 'health', value: 10 },
    { key: 'level', value: 2 },
    { key: 'name', value: 'мечник' },
  ]);
});


// Создаём объект proto с унаследованным свойством inheritedProp.
// Используем Object.create(proto) для создания объекта obj, у которого proto выступает как прототип.
// Добавляем собственное свойство name в объект obj.
// Унаследованное свойство inheritedProp не должно попасть в итоговый результат,
// так как оно не является собственным.
// Проверяем, что унаследованное свойство игнорируется, и тест проходит.

test('проверка унаследованного свойства', () => {
  const proto = { inheritedProp: 'значение' }; // Прототип с унаследованным свойством
  const obj = Object.create(proto); // Создаём объект с этим прототипом
  obj.name = 'мечник'; // Собственное свойство

  const sortOrder = ['name'];

  const result = orderByProps(obj, sortOrder);

  expect(result).toEqual([
    { key: 'name', value: 'мечник' }, // Собственное свойство
  ]);
});
