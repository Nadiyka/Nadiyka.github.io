<template>
    <div>
        <div class="sort-tree">
            <div class="sort-tree_initial">
                Исходные элементы:
                <ul>
                    <li
                            v-for="element in initialElements"
                            :key="element.key"
                            :class="{ 'active': activeNode !== false && (activeNode  === element.key) }">{{element.value}}</li>
                </ul>
            </div>

            <div class="sort-tree_animation">
                Построенное дерево:
                <ul class="tree">
                    <li
                            v-for="node in nodeElements"
                            :key="node.key"
                            :ref="node.key"
                            :class="{ 'active': activeNode !== false && (activeNode === node.key) }">{{node.value}}</li>
                </ul>
            </div>


            <div class="sort-tree_results">
                Отсортированные элементы:
                <ul>
                    <li v-for="sortedElement in sortedElements"> {{sortedElement}} </li>
                </ul>
            </div>
        </div>
        <button
            type="button"
            @click="startSorting">
                Начать сортировку
        </button>
    </div>
</template>
<script>
    import {
        sortDirections,
        colors
    } from '../../scripts/constants';
    import {
        countDuplicates,
        getTransforms,
        getSortTransforms
    } from '../../scripts/common';

    import Node from '../../classes/Node';

    import anime from 'animejs';

    export default {
        name: 'sort-tree',

        props: {
            // элементы для сортировки
            elements: {
                type: Array,
                required: true,
                default: () => {
                    return []
                }
            },

            // направление сортировки
            direction: {
                type: String,
                required: true,
                default: sortDirections.asc
            }
        },

        data() {
            return {
                // дерево сортировки
                tree: null,

                // обрабтываемый лист дерева
                activeNode: false,

                // листы дерева для отображения исходного состояния массива
                initialElements: [],

                // листы дерева для анимирования
                nodeElements: [],

                // массив с отсортированными элементами
                sortedElements: [],

                // текущая анимация
                timeline: null
            }
        },

        watch: {
            elements: {
                handler() {
                    let arrayCounter = countDuplicates(this.elements);

                    this.clearCurrentSort();

                    // вычисление дубликатов
                    this.elements.forEach((el) => {
                        let keyValueEl;

                        if (arrayCounter[el] > 1) {
                            arrayCounter[el]--;
                            keyValueEl = {
                                value: el,
                                key: `${el}dupl${arrayCounter[el]}`
                            };
                        } else {
                            keyValueEl = {
                                value: el,
                                key: `${el}`
                            };
                        }

                        this.initialElements.push(keyValueEl);
                        this.nodeElements.push(keyValueEl);
                    });
                },
                deep: true
            }
        },

        methods: {
            /**
             * Создание бинарного дерева
             *
             * @returns {Promise}
             */
            createTree() {
                this.timeline = anime.timeline({
                    autoplay: false
                });

                // создание листа дерева и анимация нахождения его позиции
                this.initialElements.forEach((el) => {
                    let node = new Node(el.value, this.$refs[el.key]);

                    // добавление начальных значений анимации
                    this.timeline.add({
                        targets: this.$refs[el.key],
                        opacity: {
                            value: 1,
                            duration: 100,
                            delay: 0
                        },
                        backgroundColor: {
                            value: colors.base,
                            easing: 'easeInOutSine',
                            duration: 100,
                            delay: 0
                        }
                    });

                    if (!this.tree) {
                        // обработка корневого элемента дерева
                        this.tree = node;

                        // появление корневого элемента дерева
                        this.timeline.add({
                            targets: this.$refs[el.key],
                            translateX: {
                                value: 500,
                                duration: 200,
                                delay: 0
                            }
                        });
                    } else {
                        // обработка не корневых элементов дерева
                        this.tree.addNode(node);

                        // настраиваем анимацию
                        let transforms = getTransforms(node.getValue(), this.tree, this.$refs[el.key]),
                            lastState = null;

                        transforms.forEach( transform => {
                            this.timeline.add(transform);
                            lastState = transform;
                        });

                        node.setLastState(lastState);
                    }

                    this.timeline.add({
                        targets: this.$refs[el.key],
                        backgroundColor: {
                            value: '#DB7093',
                            easing: 'easeInOutSine',
                            duration: 100,
                            delay: 0
                        }
                    });
                });

                this.timeline.play();

                return this.timeline.finished;
            },

            /**
             * Вывод листа дерева
             *
             * @param {String} value - выводимый лист
             * @param {HTMLElement} el - узел dom
             * @param {Object} lastState - последнее состояние узла
             */
            printNode(value, el, lastState) {
                let transforms = getSortTransforms(el, lastState);

                // добаление анимаций в таймлайн
                transforms.forEach(transform => {
                    this.timeline.add(transform)
                });

                this.sortedElements.push(value);
            },

            /**
             * Старт сортировки
             */
            startSorting() {
                this.tree = null;
                this.sortedElements = [];

                // обход дерева, после его создания
                this.createTree().then(() => {
                    this.activeNode = false;
                    if (this.tree) {
                        this.timeline = anime.timeline({
                            autoplay: false
                        });

                        this.tree.visitNode(this.printNode);

                        this.timeline.play();
                    }
                });
            },

            /**
             * Очищение текущей сортировки
             */
            clearCurrentSort() {
                this.tree = null;
                this.activeNode = false;
                this.initialElements = [];
                this.nodeElements = [];
                this.sortedElements = [];
            }
        }
    }
</script>
<style>
    .tree {
        position: relative;
        width: 100%;
        height: 300px;
    }
    .tree li {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
    }


    .sort-tree {

    }
    ul {
        list-style: none;
    }
    ul li {
        display: inline-block;
        margin: 5px;
        padding: 5px;
        background-color: palevioletred;
        border: 1px solid indianred;
    }

    .active {
        background: chartreuse;
    }
</style>