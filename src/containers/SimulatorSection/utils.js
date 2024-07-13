export const getComponentInfo = (id, nodes) => {
  return {
    height: document.getElementById(id)?.offsetHeight,
    width: document.getElementById(id)?.offsetWidth,
    position: nodes.find((node) => node.id === id).position,
  };
};
