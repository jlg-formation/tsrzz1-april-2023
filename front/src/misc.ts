export const querySelector = <T extends Element>(
  cssSelector: string,
  type?: new () => T
): T => {
  const elt = document.querySelector(cssSelector);
  if (elt === null) {
    throw new Error("Cannot find Element with selector = " + cssSelector);
  }
  if (type && !(elt instanceof type)) {
    throw new Error(`Found selector ${cssSelector} but not of type ${type}`);
  }
  return elt as T;
};

export const setAttributeNbr = (
  elt: SVGElement,
  key: string,
  value: number
) => {
  elt.setAttributeNS(null, key, value + "");
};

export const getKeys = <T extends object>(o: T): (keyof T)[] => {
  return Object.keys(o) as (keyof T)[];
};
