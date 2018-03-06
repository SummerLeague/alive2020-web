import { createElement } from "react";
import { render } from "react-dom";
import PageDataStore from "./page_data_store";

let ReactMounter = function (component, name) {
  this.init.apply(this, arguments);
};

ReactMounter.prototype = (function () {

  return {
    init : function (component, name) {
      this.component = component;
      this.name = name;

      PageDataStore.data.then(data => {
        const nodeList = document.querySelectorAll(
          `[data-react-class=${ this.name }]`
        );
        const elements = Array.prototype.slice.call(nodeList);

        elements.map(el => {
          const className = el.getAttribute("data-react-class");

          // Add properties specific to component
          let props = Object.assign({}, data[className]);

          render(createElement(this.component, props), el);
        });
      });
    }
  }
})();

export default ReactMounter;
