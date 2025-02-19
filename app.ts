import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import filters from './commands/twigtojs/filter.js';

// Тип из библиотеки ролапа
interface PreRenderedAsset {
  /** @deprecated Use "names" instead. */
  name: string | undefined;
  names: string[];
  /** @deprecated Use "originalFileNames" instead. */
  originalFileName: string | null;
  originalFileNames: string[];
  source: string | Uint8Array;
  type: 'asset';
}

/** Функция создает папки в билде, чтобы отдельно положить файлы (css, js, fonts, images) */
function getFileName(assetInfo: PreRenderedAsset) {
  const assetName = assetInfo.names?.[0] ?? '';

  let extType = assetName.split(".").pop() ?? '';

  if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
    extType = "img";
  }

  if (/ttf|eot|woff2?/i.test(extType)) {
    extType = "fonts";
  }

  if (assetName === 'sprite.svg') {
    extType = "svg"
  }

  return `assets/${extType}/[name]-[hash][extname]`;
}

/**
 * Функция вовзращает список файлов в папке с определенным разрешением
 */
function getFilesWithExtension(dir: string, extension: string) {
  const results: string[] = [];
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);

    if (path.extname(file) === extension) {
      results.push(filePath);
    }
  }

  return results;
}

/**
 * Фунцкия вовзращает массив объектов с данными по страницам (кроме страницы __index)
 */
function getTwigFiles(directory: string) {
  const twigFiles = getFilesWithExtension(directory, '.twig');

  return twigFiles
    .filter(file => path.basename(file) !== '__index.twig')
    .map(file => {
      return {
        file: path.relative(directory, file).replace('.twig', '.html'),
      };
    });
}

const listHtml = getTwigFiles(path.join(process.cwd(), 'src', 'views'));

const twigJSParams = {
  namespaces: {
    'view-root': path.resolve(process.cwd(), 'src/views/partials'),
    'root': path.join(process.cwd(), 'src/views'),
  },
  filters,
  functions: {
    listHtml: () => listHtml,
  },
}

const transformTwigJSParamsForTwigToJs = (twigJSParams: Record<string, any>) => {
  const filtersInc: Record<string, () => any> | undefined = twigJSParams.filters;
  const functionsInc: Record<string, () => any> | undefined = twigJSParams.functions;

  const filters = {};
  if (filtersInc) {
    Object.entries(filtersInc).forEach(([key, value]) => {
      filters[key] = `(twigInstance) => twigInstance.extendFilter("${key}", ${value})`;
    });
  }

  const functions = {};
  if (functionsInc) {
    Object.entries(functionsInc).forEach(([key, value]) => {
      functions[key] = `(twigInstance) => twigInstance.extendFunction("${key}", ${value})`;
    });
  }

  return {
    ...twigJSParams,
    functions: {
      ...filters,
      ...functions,
    },
  }
}


const twigJSParamsForTwigToJS = transformTwigJSParamsForTwigToJs(twigJSParams);

export { getFileName, twigJSParams, twigJSParamsForTwigToJS };
