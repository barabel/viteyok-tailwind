import twigInJs from '../commands/twigtojs/twigInJs';

const fileRegex = /\.(twig)$/;

/**
 * Плагин для импорта твиг шаблона в ts.
 */
export default function twiToJS() {
  return {
    name: 'twig-to-js',
    transform(twigFileContent, path) {
      if (fileRegex.test(path)) {
        const code = twigInJs(path);

        return {
          code,
          map: null,
        }
      }

      return null;
    },
  }
}
