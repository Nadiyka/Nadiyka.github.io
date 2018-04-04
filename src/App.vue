<template>
    <div id="app" class="sort-page">
        <header class="sort-page_header">
            <h1>Сортировка с помощью дерева</h1>
        </header>
        <section class="sort-page_description">
            <p>На данной странице можно наглядно увидеть сортировку при помощи бинарного дерева:
             построение дерева и его обход.</p>
            <p> Вы можете ввести данные для сортировки вручную, или автоматичестки их сгенерировать. После чего, нажать "применить" -
            тогда эти данные уйдут на обработку. Нажав "начать сортировку" запустится процесс создания,а а после процесс обхода бинарного дерева </p>
        </section>
        <sort-component></sort-component>
        <footer class="sort-page_footer">
            <a class="link" href="https://github.com/Nadiyka/Nadiyka.github.io" target="_blank">GitHub репозиторий</a>
            <a class="link link--info" href="https://vuejs.org/" target="_blank">&#x2692;&amp;&#x2620;</a>
        </footer>
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
