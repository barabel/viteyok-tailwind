import hashGenerator from 'hasha';
import _ from 'lodash';
import mapcache from "./mapcache.js";

const func = (id, tokens) => {
    const includes = [];
    const rootPath = mapcache.get('root');
    const processDependency = (token) => {
        includes.push(token.value);
        const path = token.value;
        const tokenId = hashGenerator(`${path}${rootPath}`);
        const saveId = mapcache.get(path);
        if (saveId) {
            token.value = saveId;
        } else {
            mapcache.set(path, tokenId)
            token.value = tokenId;
        }
    };

    const processToken = (token) => {
        if (token.type == "logic" && token.token.type) {
            switch (token.token.type) {
                case 'Twig.logic.type.block':
                case 'Twig.logic.type.if':
                case 'Twig.logic.type.elseif':
                case 'Twig.logic.type.else':
                case 'Twig.logic.type.for':
                case 'Twig.logic.type.spaceless':
                case 'Twig.logic.type.macro':
                    _.each(token.token.output, processToken);
                    break;
                case 'Twig.logic.type.extends':
                case 'Twig.logic.type.include':
                    _.each(token.token.stack, processDependency);
                    break;
                case 'Twig.logic.type.embed':
                    _.each(token.token.output, processToken);
                    _.each(token.token.stack, processDependency);
                    break;
                case 'Twig.logic.type.import':
                case 'Twig.logic.type.from':
                    if (token.token.expression != '_self') {
                        _.each(token.token.stack, processDependency);
                    }
                    break;
            }
        }
    };

    const parsedTokens = JSON.parse(tokens);

    _.each(parsedTokens, processToken);

    let output = [];

    if (!mapcache.get('component_'+id)) {
        mapcache.set('component_'+id, true);
        output.push(`Twig.twig({id: ${JSON.stringify(id)}, data: ${JSON.stringify(parsedTokens)}, precompiled: true, allowInlineIncludes: true, rethrow: true, });\n`,);
    }

    if (includes.length > 0) {
        _.each(_.uniq(includes), (file) => {
            output.unshift(`require(${JSON.stringify(file)});\n`);
        });
    }

    return output.join('\n');
};

export default func;
