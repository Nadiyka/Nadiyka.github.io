<template>
    <div id="app" class="sort-page">
        <header class="sort-page_header">
            <h1>Сортировка с помощью дерева</h1>
        </header>
        <section class="sort-page_description">
            <p>На данной странице можно наглядно увидеть сортировку при помощи бинарного дерева:
             построение дерева и его обход.</p>
            <p> Для запуска сртировки необходимо: </p>
            <ol>
                <li>
                    Создать массив для сортировки: ввести значение в текстовое поле "Список элементов" или сгенерировать массив.
                </li>
                <li>Для создания массива вручную качестве разделителей можно использовать ',', '.', и ';'. Например:  '1 4, 3. 6; 0'.</li>
                <li>Для генерации массива нужно задать минимальное(от 0) и максимальное(до 999) значения в соответствующих полях, затем ввести количество
                     сортируемых элементов (до 10) и нажать "Сгенерировать".- элементы появятся в текстовом поле "Список элементов".</li>
                <li>После создания списка сортируемых элементов необходимо нажать "Применть". Появится блок для управления сортировкой.</li>
                <li>
                    Для начала сортировки нажмите на кноку "Начать сортировку", для паузы сортировки, нажмте на кнопку с символом "&#10073;&#10073;", для ее
                    продолжения - на кнопку с символом "&#x25BA;".
                </li>
            </ol>
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
