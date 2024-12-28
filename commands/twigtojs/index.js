#!/usr/bin/env node
import { resolve } from 'path';
import { writeFile } from 'fs';

import twigInJs from './twigInJs.js';

const pathTwig = resolve(process.cwd(), process.argv[2]);

writeFile(`${pathTwig}.js`, twigInJs(pathTwig), (err) => {
    if (err)
        console.log(err);
    else {
        console.log("File written successfully\n");
    }
});
