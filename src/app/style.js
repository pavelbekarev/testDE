const requireStyles = require.context("../", true, /\.scss$/);

// Определите массив с приоритетами
const priorityOrder = [
  "./app/styles/vars.scss",
  "./app/styles/palette.scss",
  "./app/styles/fonts.scss",
  "./app/styles/global.scss",
];

// Получите все файлы
const allFiles = requireStyles.keys();

// Фильтруем файлы с учетом приоритета
const prioritizedStyles = priorityOrder.filter((name) =>
  allFiles.includes(name)
);

const otherStyles = allFiles.filter(
  (path) => !prioritizedStyles.includes(path)
);

// Объединяем массивы
const orderedFiles = [...prioritizedStyles, ...otherStyles];

// Импортируем файлы
orderedFiles.forEach((path) => requireStyles(path));
