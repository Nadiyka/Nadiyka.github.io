<!-- Компонент для сортировки -->

<template>
    <section>
        <sort-tree v-show="elements.length"
                   :elements="elements"
                   :direction="direction">
        </sort-tree>
        <sort-set-parameters @set-parameters="setParameters"></sort-set-parameters>
    </section>
</template>

<script>
    import { sortDirections } from '../../scripts/constants';

    import SortSetParameters from './SortSetParameters.vue';
    import SortTree from './SortTree.vue';

    export default {
        name: 'sort-component',

        components: {
            SortSetParameters,
            SortTree
        },

        data() {
            return {
                elements: [],

                direction: sortDirections.asc
            }
        },

        methods: {
            /**
             * Функция устанавливает параметры сортировки
             */
            setParameters(elements, direction = sortDirections.asc) {
                this.elements = elements;

                this.direction = direction;
            }
        }
    }
</script>
