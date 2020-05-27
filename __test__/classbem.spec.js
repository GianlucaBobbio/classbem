/* eslint-disable no-undef */
const classbem = require("../src/classbem");

describe("classbem", () => {
  describe("block", () => {
    it("should return base block", () => {
      const expected = 'button';

      const [b] = classbem('button');

      expect(b().get).toBe(expected);
    });

    it("should return base and custom block ", () => {
      const expected = 'button catalog-button';

      const [b] = classbem('button');

      expect(b('catalog-button').get).toBe(expected);
    });

    it("should return base, custom block and a modifier ", () => {
      const expected = "button catalog-button button--dark";

      const [b] = classbem("button");

      expect(b("catalog-button").m('dark').get).toBe(expected);
    });

    it("should return block and element with modifier", () => {
      const expected = "button--warning__text";

      const [b, e] = classbem("button");

      expect(b().m("warning").e("text").get).toBe(expected);
    });

  });

  describe("Element", () => {
    it("should return block with one element", () => {
      const expected = "button__text";

      const [b, e] = classbem('button');

      expect(e('text').get).toBe(expected);
    });

  });

  describe("Modifier", () => {
    it("should return element with a modifier", () => {
      const expected = 'button__text button__text--warning';

      const [b, e] = classbem('button');

      expect(e('text').m('warning').get).toBe(expected);
    });

    it("should return element without modifier", () => {
      const expected = 'button__text';

      const [b, e] = classbem('button');

      expect(e('text').m('warning', false).get).toBe(expected);
    });

    it("should return element and two modifiers", () => {
      const expected = 'button__text button__text--warning button__text--big';

      const [b, e] = classbem('button');

      expect(e('text').m('warning').m('big').get).toBe(expected);
    });
  });
});
