import pkg from 'twig';
const { cache, extend, twig: _twig } = pkg;

import hashGenerator from "hasha";
import mapcache from "./mapcache.js";
import { resolve, basename, join } from 'path';
import compiler from './compiler.js';
import compilerInline from './compiler-inline.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFileSync } from 'fs';

const twigInJs = (pathToTwig) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  cache(false);

  extend((Twig) => {
      const twigCompiler = Twig.compiler;
      twigCompiler.module['webpack'] = compiler;
      twigCompiler.module['webpackInline'] = compilerInline;
  });

  const pathTwig = resolve(process.cwd(), pathToTwig);
  const path = resolve(pathTwig);
  const id = hashGenerator(path);
  let tpl;

  const rootPath = basename(pathTwig);
  mapcache.set('root', rootPath);

  const source = readFileSync(path);

  tpl = _twig({
      id: id,
      path: path,
      data: source.toString(),
      allowInlineIncludes: true
  });

  let template = tpl.compile({
      module: 'webpack',
      twig: 'twig'
  });

  const regex = /require\(\"(.*)\"\);/gm;

  let m;

  const  projectPath = resolve(__dirname,'./../../');

  const nameSpaces= {
      'view-root': join(projectPath, 'src/views/partials'),
      'root': join(projectPath, 'src/views'),
  }

  let output = template;
  let count = 0;
  do {
      count = 0;
      while ((m = regex.exec(template)) !== null) {
          // The result can be accessed through the `m`-variable.
          let fPath = m[1];
          if (fPath === 'twig') {
            continue;
          }
          count++;
          let path = null;
          Object.keys(nameSpaces).forEach(($key) => {
              if (fPath.indexOf($key) == 1) {
                path = fPath.replace($key, nameSpaces[$key]).substr(1);
              }
          });

          if (!path) {
            continue;
          }

          let tpl;
          let id = mapcache.get(fPath);
          if (!id) {
              id = hashGenerator(`${fPath}${rootPath}`);
              mapcache.set(fPath, id);
          }

          const source = readFileSync(path);

          tpl = _twig({
              id: id,
              path: path,
              data: source.toString(),
              allowInlineIncludes: true
          });

          let templateSub = tpl.compile({
              module: 'webpackInline',
              twig: 'twig'
          });

          output = output.replace(m[0], '');
          output += templateSub;
      }
      template = output;
      regex.lastIndex = 0;
  } while (count > 0);

  return template.replace(/\n/gm, '');
}

export default twigInJs;
