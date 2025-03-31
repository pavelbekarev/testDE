const priorityOrder = [
  "./app/vars.scss",
  "./app/global.scss",
  "./app/palette.scss",
  "./app/fonts.scss",
];

async function loadStyles() {
  const allFiles = [
    "./app/vars.scss",
    "./app/global.scss",
    "./app/palette.scss",
    "./app/fonts.scss",
  ];

  const prioritizedStyles = priorityOrder.filter((name) =>
    allFiles.includes(name)
  );
  const otherStyles = allFiles.filter(
    (path) => !prioritizedStyles.includes(path)
  );

  const orderedFiles = [...prioritizedStyles, ...otherStyles];

  return Promise.all(orderedFiles.map((path) => import(path)));
}

const styles = await loadStyles();

export { styles };
