export const querySelector = (cssSelector: string): Element => {
  const elt = document.querySelector(cssSelector);
  if (elt === null) {
    throw new Error("Cannot find Element with selector = " + cssSelector);
  }
  return elt;
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
