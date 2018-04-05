/**
 *
 * ОБЩИЕ ФУНКЦИИ
 *
 */

import { colors } from './constants';

/**
 * Функция подсчитывает количество дубликатов в массиве,
 * и возвращает их в виде [ {значение: количество элементов} ]
 *
 *  @param {Array} array - массив элементов
 *
 *  @returns {Object}
 */
const countDuplicates = array => array.reduce((accumulator, current) =>
    Object.assign(accumulator, {[current]: (accumulator[current] || 0) + 1}), {});

/**
 * Функция возвращает массив с анимациями
 *
 * @param {Number} value - эначение
 * @param {Node} tree - ветка дерева
 * @param {Object} [params] - параметры анимации
 *
 * @returns {Object[]}
 */
const createAnimation = (value, tree, params = { x: 500, y: 0, step: 200}) => {
    let animations = [], // анимации
        activeNode = null, // активная ветка анимаций
        smallStep = 15, // шаг для сравнения
        minStep = 50, // минимальный шаг сдвига в сторону
        downStep = 50, // сдвиг вниз
        backgroundColor = colors.positioning; // цвет активной ноды

    // если нет ветки, нечего анимировать
    if (!tree || (!tree.leftNode && !tree.rightNode)) {
        return animations;
    }

    // анимация "сравнения"
    animations.push({
        backgroundColor,
        top: params.y,
        left: params.x + smallStep
    });
    animations.push({
        backgroundColor,
        top: params.y,
        left: params.x - smallStep
    });
    animations.push({
        backgroundColor,
        top: params.y,
        left: params.x
    });

    // рассчет сдвига вниз
    params.y += downStep;

    // рассчет сдвига в сторону
    if (value < tree.getValue()) {
        activeNode = tree.leftNode;
        params.x -= params.step;
    } else {
        params.x += params.step;
        activeNode = tree.rightNode;
    }

    // умешьшениешага для сдвига в сторону
    if (params.step > minStep) {
        params.step /= 2;
    }

    // окончательная анимация текущего шага% сдвиг вниз и в сторону
    animations.push({
        backgroundColor,
        top: params.y,
        left: params.x
    });

    // получение следующих анимаций
    let newAnimationsActive = createAnimation(value, activeNode, params);

    animations = animations.concat(newAnimationsActive);

    return animations;
};

/**
 * Функция возвращает массив с трансформациями для animejs
 *
 * @param {Number} value - эначение
 * @param {Node} tree - ветка дерева
 * @param {HTMLElement} el - анимируеный элемент в DOM
 * @param {Number} speedRate - модификатор скорости
 *
 * @returns {Object[]}
 */
const getTransforms = (value, tree, el, speedRate = 1) => {
    let transformParams = createAnimation(value, tree),
        transforms = [];

    transformParams.forEach(param => {
        let animationObject = {
            targets: el,
            duration: 150 / speedRate,
            delay: 0
        };

        if (!param) {
            return;
        }

        // выставляем измение положения по оси x
        if (param.left) {
            animationObject.left = param.left;
        }

        // выставляем измение положения по оси y
        if (param.top) {
            animationObject.top = param.top;
        }

        // выставляем цвет
        if (param.backgroundColor) {
            animationObject.backgroundColor = param.backgroundColor;
        }

        if (animationObject.left || animationObject.top) {
            transforms.push(animationObject)
        }
    });

    // возвращение к базовому цвету
    let lastAnimation = transforms[transforms.length - 1];

    lastAnimation.backgroundColor = colors.base;
    transforms.push(lastAnimation);

    return transforms;
};

/**
 * Функция возвращает массив с трансформациями для animejs
 *
 * @param {HTMLElement} el - анимируеный элемент в DOM
 * @param {Object} lastState - последнее состояние узла
 * @param {Number} speedRate - модификатор скорости
 *
 * @returns {Object[]}
 */
const getSortTransforms = (el, lastState, speedRate = 1) => {
    let transforms = [],
        step = 2;

    // анимации изменения цвета и дрожания
    transforms.push({
        targets: el,
        duration: 50 / speedRate,
        delay: 100,
        backgroundColor: colors.sorting,
        left: lastState.left - step,
        top: lastState.top
    });
    transforms.push({
        targets: el,
        duration: 75 / speedRate,
        delay: 100,
        backgroundColor: colors.sorting,
        left: lastState.left + step,
        top: lastState.top
    });
    transforms.push({
        targets: el,
        duration: 50 / speedRate,
        delay: 100,
        backgroundColor: colors.sorting,
        left: lastState.left - step,
        top: lastState.top
    });
    transforms.push({
        targets: el,
        duration: 75 / speedRate,
        delay: 100,
        backgroundColor: colors.sorting,
        left: lastState.left + step,
        top: lastState.top
    });

    // окончание обработки
    transforms.push({
        targets: el,
        duration: 100 / speedRate,
        delay: 100,
        backgroundColor: colors.sorted,
        left: lastState.left,
        top: lastState.top
    });

    return transforms;
};

export {
    countDuplicates,
    createAnimation,
    getTransforms,
    getSortTransforms
}