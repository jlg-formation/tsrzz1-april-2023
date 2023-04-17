export const querySelector = (cssSelector: string): Element => {
  const elt = document.querySelector(cssSelector);
  if (elt === null) {
    throw new Error("Cannot find Element with selector = " + cssSelector);
  }
  return elt;
};
