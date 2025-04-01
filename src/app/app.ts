import "./style.js";

function domReady() {
  return new Promise((res: any) => {
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
});
