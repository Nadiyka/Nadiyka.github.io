import anime from 'animejs';

const Node =  class {
    /**
     * Создет объект узла дерева
     *
     * @param {Number} value - вес узла
     * @param {HTMLElement} el - элемент
     */
    constructor(value, el) {
        // вес узла
        this.value = value;

        // dom - узел
        this.el = el;

        // поледнее состояние элемента: позиция, цвет
        this.lastState = {
            translateX: 500,
            translateY: 0
        };

        // анимации элемента
        this.animations = [];

        // левая ветка
        this.leftNode = null;

        // правая ветка
        this.rightNode = null;

        // анимация сортировки элемента в дереве
        this.animateSort = anime({
            targets: el,
            scale: 1.5,
            delay: 300,
            direction: 'alternate',
            easing: 'easeInOutSine',
            loop: false,
            autoplay: false
        });
    }

    /**
     * Добавление дочернего узла
     *
     * @param {Node} node
     */
    addNode(node) {
        if (node.getValue() < this.value) {
            if (this.leftNode !== null) {
                this.leftNode.addNode(node)
            } else {
                this.leftNode = node;
                return this;
            }
        } else {
            if (this.rightNode !== null) {
                this.rightNode.addNode(node)
            } else {
                this.rightNode = node;
                return this;
            }
        }
    }

    /**
     * Получение значения узла
     */
    getValue() {
        return this.value;
    }

    /**
     * Обход узла
     *
     * @param {Function} visit - callback
     */
    visitNode(visit) {
        if (this.leftNode !== null) {
            this.leftNode.visitNode(visit)
        }

        visit(this.value, this.el, this.lastState);

        if (this.rightNode !== null) {
            this.rightNode.visitNode(visit)
        }
    }

    /**
     * Установка состояния узла
     *
     * @param {Object} state
     */
    setLastState(state) {
        this.lastState = state;
    }
};

export default Node;