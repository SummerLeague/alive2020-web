import ReactMounter from "Utils/react_mounter";
import ComponentManifest from "Utils/component_manifest";

const nodeList = document.querySelectorAll("[data-react-class]");
const elements = Array.prototype.slice.call(nodeList);

elements.forEach(el => {
  const className = el.getAttribute("data-react-class");

  new ReactMounter(ComponentManifest[className], className);
});
