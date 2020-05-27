/**
 * CSS className builder based on BEM convention
 * @param {string} baseBlock
 * @returns {Object} return object with 2 functions and get property for build className
 */

function classbem(baseBlock) {
  let blocks = [baseBlock],
    element = "",
    elementOfModifier = "",
    modifiers = [];

  function buildClassName() {
    let classNames = [];

    function buildModifiers(base) {
      if (modifiers) {
        modifiers.map((m) => {
          classNames.push(`${base}--${m}`);
        });
      }
    }

    if (element) {
      const baseAndElement = `${baseBlock}__${element}`;

      classNames.push(baseAndElement);

      // Agregamos los modificadores del elemento
      buildModifiers(baseAndElement);
    } else {
      if (elementOfModifier) {
        // Si tenemos un elemento de un modificador e.g: --warning__close-button
        // Lo creamos y sumamos sus modificadores

        classNames.push(`${baseBlock}--${modifiers[0]}__${elementOfModifier}`);
      } else {
        classNames = blocks;

        // Agregamos los modificadores del block
        buildModifiers(baseBlock);
      }
    }

    return classNames.join(" ");
  }

  function addBlock(b) {
    if (b) {
      blocks.push(b);
    }

    return {
      get: buildClassName(),
      m: addModifier,
      e: addElement,
    };
  }

  /**
   * Allow us to add element to className
   * @param {string} modifier
   * @param {bool} forModifier - this param allow us to add element in a modifier
   * @returns {Object} return object with 2 functions and get property for build className
   */
  function addElement(e, forModifier) {
    if (forModifier) {
      elementOfModifier = e;
    } else {
      element = e;
    }

    return {
      get: buildClassName(),
      m: addModifier,
    };
  }

  /**
   * Allow us to add modifier to className
   * @param {string} modifier
   * @param {string} condition - this param allow us to add or not the modifier
   * @returns {Object} object with 2 functions and get property for build className
   */
  function addModifier(m, condition = true) {
    if (condition) {
      modifiers.push(m);
    }

    return {
      get: buildClassName(),
      m: addModifier,
      e: (e) => addElement(e, true),
    };
  }

  return [addBlock, addElement];
}

module.exports = classbem;
