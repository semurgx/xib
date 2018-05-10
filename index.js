const empty = arrayOrSet => arrayOrSet instanceof Array ? arrayOrSet.length === 0 : arrayOrSet.size === 0;
const first = array => array[0];
const second = array => array[1];
const modifiers = new Map([
    ['reset', [0, 0]],
    ['bold', [1, 22]],
    ['dim', [2, 22]],
    ['italic', [3, 23]],
    ['underline', [4, 24]],
    ['blink', [5, 25]],
    ['inverse', [7, 27]],
    ['hidden', [8, 28]],
    ['strikethrough', [9, 29]]
]);
const colors = new Map([
    ['black', [30, 39]],
    ['red', [31, 39]],
    ['green', [32, 39]],
    ['yellow', [33, 39]],
    ['blue', [34, 39]],
    ['magenta', [35, 39]],
    ['cyan', [36, 39]],
    ['white', [37, 39]],
    ['gray', [90, 39]],
    ['grey', [90, 39]],
    ['brightBlack', [90, 39]],
    ['brightRed', [91, 39]],
    ['brightGreen', [92, 39]],
    ['brightYellow', [93, 39]],
    ['brightBlue', [94, 39]],
    ['brightMagenta', [95, 39]],
    ['brightCyan', [96, 39]],
    ['brightWhite', [97, 39]]
]);
const backgroundColors = new Map([
    ['blackBackground', [40, 49]],
    ['redBackground', [41, 49]],
    ['greenBackground', [42, 49]],
    ['yellowBackground', [43, 49]],
    ['blueBackground', [44, 49]],
    ['magentaBackground', [45, 49]],
    ['cyanBackground', [46, 49]],
    ['whiteBackground', [47, 49]],
    ['grayBackground', [100, 49]],
    ['greyBackground', [100, 49]],
    ['brightBlackBackground', [100, 49]],
    ['brightRedBackground', [101, 49]],
    ['brightGreenbackground', [102, 49]],
    ['brightYellowBackground', [103, 49]],
    ['brightBlueBackground', [104, 49]],
    ['brightMagentaBackground', [105, 49]],
    ['brightCyanBackground', [106, 49]],
    ['brightWhiteBackground', [107, 49]]
]);
const build = style => {
    let prefixStyles = new Set();
    let postfixStyles = new Set();
    let prefix = '';
    let postfix = '';

    for(const [key, value] of modifiers) {
        if(!style[key]) {
            continue;
        }

        prefixStyles.add(first(value));
        postfixStyles.add(second(value));
    }

   if(!empty(style.color)) {
        prefixStyles.add(first(style.color));
        postfixStyles.add(second(style.color));
    }

    if(!empty(style.backgroundColor)) {
        prefixStyles.add(first(style.backgroundColor));
        postfixStyles.add(second(style.backgroundColor));
    }

    if(!empty(prefixStyles)) {
        prefix = `\x1b[${[...prefixStyles].map(String).join(';')}m`;
    }

    postfixStyles.delete(0);
    if(!empty(postfixStyles)) {
        postfix = `\x1b[${[...postfixStyles].map(String).join(';')}m`;
    }

    return {prefix, postfix};
};

const create = (style = {
    reset: false,
    bold: false,
    dim: false,
    italic: false,
    underline: false,
    blink: false,
    inverse: false,
    hidden: false,
    strikethrough: false,
    color: [],
    backgroundColor: []
}) => {
    const cache = new WeakMap();
    const {prefix, postfix} = build(style);

    const xib = new Proxy(String.raw, {
        apply(target, thisArgument, argumentsList) {
            if(empty(argumentsList)) {
                return prefix;
            }

            return `${prefix}${target.apply(thisArgument, argumentsList)}${postfix}`;
        },
        get(target, property) {
            if(![
                ...modifiers.keys(),
                ...colors.keys(),
                ...backgroundColors.keys()
            ].includes(property)) {
                return target[property];
            }

            if(cache.get(xib).has(property)) {
                return cache.get(xib).get(property);
            }

            let newStyle = style;
            if(modifiers.has(property) && !newStyle[property]) {
                newStyle = {...style, [property]: true};
            } else if(colors.has(property)) {
                let newColor = colors.get(property);
                if(newStyle.color !== newColor) {
                    newStyle = {...style, color: newColor};
                }
            } else if(backgroundColors.has(property)) {
                let newBackgroundColor = backgroundColors.get(property);
                if(newStyle.backgroundColor !== newBackgroundColor) {
                    newStyle = {...style, backgroundColor: newBackgroundColor};
                }
            }
            if(newStyle === style) {
                return xib;
            }

            const newXib = create(newStyle);
            cache.get(xib).set(property, newXib);

            return newXib;
        }
    });
    cache.set(xib, new Map());

    return xib;
};

module.exports = create();
