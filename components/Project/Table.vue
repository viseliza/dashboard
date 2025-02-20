<template>
    <table class="table-data">
        <thead>
            <slot name="header">
            <tr class="header">
                    
                </tr>
            </slot>
        </thead>

        <tbody>
            <slot name="content"></slot>
        </tbody>
    </table>
</template>


<style>
    .table-data {
        border: 1px solid var(--secondary-color);
        border-collapse: separate !important;
        border-spacing: 0;
        border-radius: 0 0 10px 10px;
        table-layout:fixed;
        overflow: hidden;
        width:100%;
        vertical-align: middle;
    }
    .table-data td {
        padding: 10px;
    }
    .table-data tbody td {
        border: 1px solid var(--secondary-color);
        color: #636363;
    }
    .table-data tbody tr:last-child td:first-child {
        border-collapse: collapse !important;
        border-bottom-left-radius: 10px;
    }
    .table-data tbody tr:last-child td:last-child {
        border-collapse: collapse !important;
        border-bottom-right-radius: 10px;
    }

    td.id, td.token {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>