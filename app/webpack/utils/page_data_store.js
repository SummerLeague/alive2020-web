const PageDataStore = function () {
  this.data = new Promise((resolve, reject) => {
    document.addEventListener("DOMContentLoaded", () => {
      resolve(
        JSON.parse(
          document.querySelector("#page-data-store").getAttribute("data-store")
        )
      );
    });
  });
};

export default new PageDataStore();
