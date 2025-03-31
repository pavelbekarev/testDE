function domReady() {
  return new Promise((res) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", res);
    } else {
      res();
    }
  });
}

Promise.all([domReady()]).then(() => {
  document.addEventListener("submit", (e) => {
    e.preventDefault();
  });

  window.App = {};
});
