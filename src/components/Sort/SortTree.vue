<template>
    <div class="sort-block">
        <div class="sort-block_list">
            <h3 class="sort-block_header">Исходные элементы:</h3>
            <ul class="sort-block_elements">
                <li v-for="element in initialElements"
                    :key="element.key"
                    :class="{ 'active': activeNode !== false && (activeNode  === element.key) }"
                    :style="{ 'background-color': colors.base }">{{element.value}}</li>
            </ul>
            <button class="btn btn--medium btn--sort"
                    type="button"
                    @click="startSorting">
                Начать сортировку
            </button>
            <div class="sort-parameters_group sort-parameters_group--speed">
                <label for="speedRate">Скорость сортировки</label>
                <input id="speedRate"
                       type="range"
                       min="0.1"
                       max="2"
                       step="0.1"
                       v-model="speedRate">
            </div>
            <div v-show="this.timeline !== null"
                 class="sort-block_controls">
                <button class="btn btn--small btn--pause"
                        type="button"
                        :disabled="this.timeline === null"
                        @click="pauseSorting">
                    &#10073;&#10073;
                </button>
                <button class="btn btn--small btn--resume"
                        type="button"
                        :disabled="this.timeline === null"
                        @click="resumeSorting">
                    &#x25BA;
                </button>
            </div>
        </div>

        <div v-show="currentSortStep" class="sort-block_steps">
            <h3 class="sort-block_header"> Шаг сортировки:</h3>
            <ol>
                <li :class="{ 'active': currentSortStep === sortSteps.build,
                              'done': ( currentSortStep === sortSteps.finished || currentSortStep === sortSteps.sort ) }">Построение бинарного дерева</li>
                <li :class="{ 'active': currentSortStep === sortSteps.sort,
                              'done': ( currentSortStep === sortSteps.finished ) }">Обход дерева</li>
            </ol>
        </div>

        <div v-show="tree"
             class="sort-block_list">
            <h3 class="sort-block_header">Построенное дерево:</h3>
            <ul class="tree"
                :style="{ 'height': `${height}px` }">
                <li v-for="node in nodeElements"
                    :ref="node.key"
                    :style="{ 'background-color': colors.base }">
                        {{node.value}}
                        <span class="tree-line"></span>
                </li>
            </ul>
        </div>

        <div v-if="sortedElements.length"
             class="sort-block_list">
            <h3 class="sort-block_header">Отсортированные элементы:</h3>
            <ul class="sort-block_elements">
                <li v-for="sortedElement in sortedElements"
                    :style="{ 'background-color': colors.sorted }"> {{sortedElement}} </li>
            </ul>
        </div>
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
                timeline: null,

                // цвета для элементов
                colors: colors,

                // высота блока с деревом
                height: 0,

                // шаги сортировки
                sortSteps: {
                    build: 'build',
                    sort: 'sort',
                    finished: 'finished'
                },

                // текущий шаг сортировки
                currentSortStep: '',

                // скорость сортировки
                speedRate: 1
            }
        },

        watch: {
            elements: {
                handler() {
                    let arrayCounter = countDuplicates(this.elements);

                    this.clearCurrentSort();
                    this.currentSortStep = '';

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
            },

            speedRate() {
                if (typeof this.speedRate !== 'number') {
                    this.speedRate = parseFloat(this.speedRate);
                }
            }
        },

        methods: {
            /**
             * Создание бинарного дерева
             *
             * @returns {Promise}
             */
            createTree() {
                let baseHeightAddition = 10,
                    height = baseHeightAddition;

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
                            duration: 100 / this.speedRate,
                            delay: 0
                        },
                        backgroundColor: {
                            value: colors.base,
                            easing: 'easeInOutSine',
                            duration: 100 / this.speedRate,
                            delay: 0
                        }
                    });

                    if (!this.tree) {
                        // обработка корневого элемента дерева
                        this.tree = node;

                        // появление корневого элемента дерева
                        this.timeline.add({
                            targets: this.$refs[el.key],
                            duration: 100 / this.speedRate,
                            left: 500
                        });

                        node.setLastState({
                            left: 500
                        });
                    } else {
                        this.tree.addNode(node);

                        // настраиваем анимацию
                        let transforms = getTransforms(node.getValue(), this.tree, this.$refs[el.key], this.speedRate),
                            lastState = null;

                        transforms.forEach( transform => {
                            this.timeline.add(transform);
                            lastState = transform;
                        });

                        baseHeightAddition += 10;
                        height = lastState.top + baseHeightAddition;

                        node.setLastState(lastState);
                    }
                });

                this.timeline.play();

                this.height = height;

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
                let transforms = getSortTransforms(el, lastState, this.speedRate);

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

                // сокрытие элементов
                this.initialElements.forEach((el) => {
                    if (this.$refs[el.key]) {
                        this.$refs[el.key][0].style.opacity = 0;
                        this.$refs[el.key][0].style.top = 0;
                        this.$refs[el.key][0].style.left = 0;
                    }
                });

                this.currentSortStep = this.sortSteps.build;
                // обход дерева, после его создания
                this.createTree().then(() => {
                    this.activeNode = false;
                    if (this.tree) {
                        this.currentSortStep = this.sortSteps.sort;
                        this.timeline = anime.timeline({
                            autoplay: false
                        });

                        this.tree.visitNode(this.printNode);

                        this.timeline.play();
                        this.timeline.finished.then(() => {
                            this.currentSortStep = this.sortSteps.finished;
                            this.timeline = null;
                        })
                    }
                });
            },

            /**
             * Очищение текущей сортировки
             */
            clearCurrentSort() {
                this.tree = null;
                this.activeNode = false;
                this.timeline = null;
                this.initialElements = [];
                this.nodeElements = [];
                this.sortedElements = [];
                this.currentSortStep = '';
            },

            /**
             * Функция приостанавливавет сортировку
             */
            pauseSorting() {
                if (this.timeline) {
                    this.timeline.pause();
                }
            },

            /**
             * Функция запускает продолжение сортировки
             */
            resumeSorting() {
                if (this.timeline) {
                    this.timeline.play();
                }
            }
        }
    }
</script>