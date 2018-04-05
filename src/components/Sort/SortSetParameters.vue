<!-- Компонент для выставления параметров сортировки -->

<template>
    <div class="sort-page_parameters">
        <div class="sort-parameters">
            <h3 class="sort-parameters_header"> Ввести элементы вручную</h3>
            <div class="sort-parameters_block">
                <div class="sort-parameters_group">
                    <label for="sortElements">Список элементов</label>
                    <textarea
                            id="sortElements"
                            v-model="parametersInput"
                            @blur="setElements"></textarea>
                </div>
            </div>
        </div>
        <div class="sort-parameters sort-parameters--generate">
            <h3>Сгенерировать элементы случайным образом</h3>
            <div class="sort-parameters_block">
                <div class="sort-parameters_group">
                    <label for="randomMin"> Минимальное случайное значение </label>
                    <input
                            id="randomMin"
                            type="number"
                            :min="elementsRangeLimits.min"
                            :max="elementsRange.max"
                            v-model="elementsRange.min">
                </div>
                <div class="sort-parameters_group">
                    <label for="randomMax"> Максимальное случайное значение </label>
                    <input
                            id="randomMax"
                            type="number"
                            :min="elementsRange.min"
                            :max="elementsRangeLimits.max"
                            v-model="elementsRange.max">
                </div>
                <div class="sort-parameters_group">
                    <label for="randomQuantity"> Количество элементов </label>
                    <input
                            id="randomQuantity"
                            type="number"
                            :min="1"
                            :max="maxElementsQuantity"
                            v-model="elementsQuantity">
                </div>
            </div>

            <button
                    class="btn btn--medium btn--generate"
                    type="button"
                    @click="generateRandomElements">
                Сгенерировать
            </button>
        </div>
        <div class="sort-parameters sort-parameters--controls">
            <button
                    class="btn btn--big btn--set"
                    type="button"
                    @click="returnParameters">
                Применить
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'sort-set-parameters',

        data() {
            return {
                // максимальное количество элементов
                maxElementsQuantity: 10,

                // количество сортируемых элементов
                elementsQuantity: 10,

                // диапазон возможных значений случайных элементов
                elementsRange: {
                    min: 0,
                    max: 100
                },

                // диапазон возможных значений элементов
                elementsRangeLimits: {
                    min: 0,
                    max: 999
                },

                // сортируемые элменты
                elements: [],

                // пользовательский ввод
                parametersInput: '',

                // навравление сортировки (позже)
                direction: ''
            }
        },

        watch: {
            'elementsRange.max'(value) {
                if (typeof value !== 'number') {
                    let newMax = parseInt(value, 10);

                    if (!isNaN(newMax)) {
                        this.elementsRange.max = newMax;
                    } else {
                        this.elementsRange.max = this.elementsRange.min + 1;
                    }
                }

                if (this.elementsRange.max < this.elementsRangeLimits.min) {
                    this.elementsRange.max = Math.abs(this.elementsRange.max);
                }

                if (this.elementsRange.max > this.elementsRangeLimits.max) {
                    this.elementsRange.max = this.elementsRangeLimits.max;
                }
            },

            'elementsRange.min'(value) {
                if (typeof value !== 'number') {
                    let newMin = parseInt(value, 10);

                    if (!isNaN(newMin)) {
                        this.elementsRange.min = newMin;
                    } else {
                        this.elementsRange.min = 0;
                    }
                }

                if (this.elementsRange.min < this.elementsRangeLimits.min) {
                    this.elementsRange.min = this.elementsRangeLimits.min;
                }

                if (this.elementsRange.min < this.elementsRangeLimits.max) {
                    this.elementsRange.min = this.elementsRange.max;
                }
            },

            elementsQuantity(value) {
                if (typeof value !== 'number') {
                    let newQuantity = parseInt(value, 10);

                    if (!isNaN(newQuantity)) {
                        this.elementsQuantity = newQuantity;
                    }
                }

                if (this.elementsQuantity <= 0) {
                    this.elementsQuantity = Math.abs(this.elementsQuantity) || 1;
                }
            }
        },

        methods: {
            /**
             * Функция генерирует elementsQuantity элементов
             * в диапазоне от elementsRange.min
             * до elementsRange.max
             */
            generateRandomElements() {
                // проверка minMax
                if (this.elementsRange.max < this.elementsRange.min) {
                    let swap = this.elementsRange.max;
                    this.elementsRange.max = this.elementsRange.min;
                    this.elementsRange.min = swap;
                }

                let generatedElements = [],
                    elementsToGenerate = this.elementsQuantity > this.maxElementsQuantity ? this.maxElementsQuantity : this.elementsQuantity,
                    multiplier = this.elementsRange.max + 1 - this.elementsRange.min;

                while (elementsToGenerate--) {
                    let number = Math.floor(Math.random() * multiplier) + this.elementsRange.min;
                    generatedElements.push(number);
                }

                this.parametersInput = generatedElements.join();

                this.elements = generatedElements;
            },

            /**
             * Функция азначает параметры сортировки
             */
            returnParameters() {
                this.$emit('set-parameters', this.elements)
            },

            /**
             * Функция устанавливает элементы для сортировки
             */
            setElements() {
                let splitters = [',', '.', ';'],
                    splittedElements = [ this.parametersInput.trim() ];

                // выделяем элементы, очищая ввод от разделителей
                splitters.forEach((splitter) => {
                    let newSplittedElements = [];

                    splittedElements.forEach((element) => {
                        newSplittedElements = newSplittedElements.concat(element.split(splitter))
                    });

                    splittedElements = newSplittedElements;
                });

                // преобразуем элементы к числам
                splittedElements = splittedElements.map((element) => {
                    element = parseInt(element);

                    if (isNaN(element)) {
                        return this.elementsRangeLimits.min;
                    }

                    if (element > this.elementsRangeLimits.max) {
                        return this.elementsRangeLimits.max;
                    }

                    return Math.abs(element)
                });

                if (splittedElements.length > this.maxElementsQuantity) {
                    splittedElements = splittedElements.slice(0, this.maxElementsQuantity);
                }

                this.elements = splittedElements;
            }
        }
    }
</script>