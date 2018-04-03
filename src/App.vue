<template>
    <div id="app">
        <header>
            <h1>Сортировка с помощью дерева</h1>
        </header>
        <sort-component></sort-component>
    </div>
</template>

<script>
    import SortComponent from './components/Sort/SortComponent.vue'

    export default {
        name: 'app',
        components: {
            SortComponent
        }
    }
</script>

<style></style>
