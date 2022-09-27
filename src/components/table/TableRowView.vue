<template lang="pug">
.table__row
    .table__cell
        | {{ row_data.date }}
    .table__cell
        | {{ row_data.name }}
    .table__cell
        | {{ row_data.count }}
    .table__cell
        | {{ row_data.distance }}
</template>

<script>
export default {
    name: 'TableRowView',
    props: {
        row_data: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
}
</script>

<style scoped lang="scss">
.table {
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

        &:last-child {
            border-right: none;
        }

        &_header {
            font-weight: 700;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>