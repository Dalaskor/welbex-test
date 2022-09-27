<template lang="pug">
.table-view
    .table
        .table__header
            .table__cell.table__cell_header
                | Дата
            div(
                class="table__cell table__cell_header",
                @click="sortByName()"
            )
                | Название
                .icon-sort
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                        <path d="m12 21-4.5-4.5 1.45-1.45L12 18.1l3.05-3.05 1.45 1.45ZM8.95 9.05 7.5 7.6 12 3.1l4.5 4.5-1.45 1.45L12 6Z"/>
                    </svg>
            div(
                class="table__cell table__cell_header",
                @click="sortByCount()"
            )
                | Количество, шт
                .icon-sort
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                        <path d="m12 21-4.5-4.5 1.45-1.45L12 18.1l3.05-3.05 1.45 1.45ZM8.95 9.05 7.5 7.6 12 3.1l4.5 4.5-1.45 1.45L12 6Z"/>
                    </svg>
            div(
                class="table__cell table__cell_header",
                @click="sortByDistance()"
            )
                | Расстояние, км
                .icon-sort
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                        <path d="m12 21-4.5-4.5 1.45-1.45L12 18.1l3.05-3.05 1.45 1.45ZM8.95 9.05 7.5 7.6 12 3.1l4.5 4.5-1.45 1.45L12 6Z"/>
                    </svg>
        .table__body
            TableRowView(
                v-for="row in paginatedPosts",
                :key="row.id",
                :row_data="row"
            )
    .pagination
        div(
            class="pagination__page",
            v-for="page in pages",
            :key="page",
            @click="pageClick(page)",
            :class="{'pagination__page_selected': page === pageNumber}"
        ) {{ page }}
</template>

<script>
import TableRowView from './TableRowView.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'TableView',
    components: {
        TableRowView,
    },
    data() {
        return {
            postsPerPage: 10,
            pageNumber: 1,
            isSortByName: false,
            isSortByNameDown: false,
            isSortByCount: false,
            isSortByCountDown: false,
            isSortByDistance: false,
            isSortByDistanceDown: false,
        };
    },
    computed: {
        ...mapGetters([
            'POSTS',
        ]),
        pages() {
            const COUNT = 10;

            return Math.ceil(this.POSTS.length / COUNT);
        },
        paginatedPosts() {
            const from = (this.pageNumber - 1) * this.postsPerPage;
            const to = from + this.postsPerPage;

            return this.POSTS.slice(from, to);
        },
    },
    methods: {
        ...mapActions([
            'GET_POSTS_FROM_API',
        ]),
        pageClick(page) {
            this.pageNumber = page;
        },
        clearSort() {
            this.isSortByName = false;
            this.isSortByNameDown = false;
            this.isSortByCount = false;
            this.isSortByCountDown = false;
            this.isSortByDistance = false;
            this.isSortByDistanceDown = false;
        },
        sortByName() {
            if(this.isSortByName === false) {
                this.POSTS.sort((a,b) => a.name.localeCompare(b.name));
                this.clearSort();
                this.isSortByName = true;
            } else if(this.isSortByNameDown === false) {
                this.POSTS.sort((a,b) => b.name.localeCompare(a.name));
                this.isSortByNameDown = true;
            } else if(this.isSortByNameDown === true) {
                this.POSTS.sort((a,b) => a.name.localeCompare(b.name));
                this.isSortByNameDown = false;
            }
        },
        sortByCount() {
            if(this.isSortByCount === false) {
                this.POSTS.sort((a,b) => a.count - b.count);
                this.clearSort();
                this.isSortByCount = true;
            } else if(this.isSortByCountDown === false) {
                this.POSTS.sort((a,b) => b.count - a.count);
                this.isSortByCountDown = true;
            } else if(this.isSortByCountDown === true) {
                this.POSTS.sort((a,b) => a.count - b.count);
                this.isSortByCountDown = false;
            }
        },
        sortByDistance() {
            if(this.isSortByDistance === false) {
                this.POSTS.sort((a,b) => a.distance - b.distance);
                this.clearSort();
                this.isSortByDistance = true;
            } else if(this.isSortByDistanceDown === false) {
                this.POSTS.sort((a,b) => b.distance - a.distance);
                this.isSortByDistanceDown = true;
            } else if(this.isSortByDistanceDown === true) {
                this.POSTS.sort((a,b) => a.distance - b.distance);
                this.isSortByDistanceDown = false;
            }
        },
    },
    mounted() {
        this.GET_POSTS_FROM_API();
    },
}
</script>

<style scoped lang="scss">
.table {
    max-width: 76.8rem;
    border: 0.3rem solid #999999;
    border-radius: 2rem;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    margin-top: 3rem;
    background-color: #444444;

    &__header {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 1fr;
        border-bottom: 0.3rem solid #999999;
    }

    &__body {
        display: flex;
        flex-direction: column;
        justify-content: start;
    }

    &__row {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr 1fr;
        border-bottom: 0.1rem solid #999999;

        &:last-child {
            border-bottom: none;
        }
    }

    &__cell {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: #FFFFFF;
        padding: 1rem 0.5rem;
        text-align: center;
        background-color: #444444;
        border-right: 0.1rem solid #999999;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        &:last-child {
            border-right: none;
        }

        &_header {
            font-weight: 700;
            user-select: none;  

            &:hover {
                cursor: pointer;
            }
        }
    }
}

.icon-sort {
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
        path {
            fill: #fff;
        }
    }
}

.pagination {
    max-width: 76.8rem;
    margin: 0 auto;
    margin-top: 1rem;
    margin-bottom: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.5rem;

    &__page {
        padding: 0.8rem;
        border: solid 0.1rem #999999;
        background-color: #444444;
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 400;
        font-size: 1.2rem;
        line-height: 1.6rem;
        color: #FFFFFF;
        transition: all 0.3s;

        &:hover {
            cursor: pointer;
            background-color: #5e5e5e;
        }

        &_selected {
            background-color: #f5f5f5;
            color: #000000;
        }
    }
}
</style>
