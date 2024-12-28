import { readFileSync } from 'fs';

const filters = {
  locale: (key, args) => {
    const lang = args[0];
    let locale = {};
    if (typeof window !== 'undefined') {
      if (!window.localeDictionary) {
        const text = document.querySelector('#locale').textContent;
        if (text) {
          window.localeDictionary = JSON.parse(text);
        }
      }
      locale = window.localeDictionary;
    } else {
      locale = JSON.parse(readFileSync(`./src/locale/${lang}.json`));
    }

    if (locale?.[key]) {
      return locale[key];
    } else {
      return key
    }
  },
}

export default filters;
