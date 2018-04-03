<!-- Компонент для выставления параметров сортировки -->

<template>
    <div>
        <div>
            <h3> Ввести элементы вручную</h3>
            <textarea
                    v-model="parametersInput"
                    @blur="setElements"></textarea>
        </div>
        <div>
            <h3>Сгенерировать элементы случайным образом</h3>

            <label for="randomMin"> Минимальное случайное значение </label>
            <input
                    id="randomMin"
                    type="number"
                    :min="0"
                    v-model="elementsRange.min">

            <label for="randomMax"> Максимальное случайное значение </label>
            <input
                    id="randomMax"
                    type="number"
                    :min="elementsRange.min"
                    v-model="elementsRange.max">

            <label for="randomQuantity"> Количество элементов </label>
            <input
                    id="randomQuantity"
                    type="number"
                    :min="1"
                    v-model="elementsQuantity">

            <button
                    type="button"
                    @click="generateRandomElements">
                Сгенерировать случайно
            </button>
        </div>
        {{elements}}
        <button
                type="button"
                @click="returnParameters">
            Применить
        </button>
    </div>
</template>

<script>
    export default {
        name: 'sort-set-parameters',

        data() {
            return {
                // todo: максмальное количество сортируемых элементов
                maxElementsQuantity: 20,

                // количество сортируемых элементов
                elementsQuantity: 10,

                // диапазон возможных значений случайных элементов
                elementsRange: {
                    min: 0,
                    max: 100
                },

                // сортируемые элменты
                elements: [],

                // пользовательский ввод
                parametersInput: '',

                // todo: направление сортировки
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

                if (this.elementsRange.max < 0) {
                    this.elementsRange.max = Math.abs(this.elementsRange.max);
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

                if (this.elementsRange.min < 0) {
                    this.elementsRange.min = Math.abs(this.elementsRange.min);
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
                    elementsToGenerate = this.elementsQuantity,
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
                let splitters = [',', ' ', '.', ';'],
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
                        return 0;
                    }

                    return Math.abs(element)
                });

                this.elements = splittedElements;
            }
        }
    }
</script>