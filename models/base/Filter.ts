export class Filter {
    static getFilterBy(columns: string[]) {
        const translatedColumns = {
            "id": "ID",
            "token": "Токен",
            "balance": "Баланс",
            "points": "Очки",
            "opened": "Открыт",
            "opened_at": "Открыт (дата)",
            "mode": "Режим",
            "created_at": "Создан",
            "updated_at": "Обновлен",
        };
        const filterBy = columns.map((column) => ({
            name: translatedColumns[column as keyof typeof translatedColumns] || column,
            value: column,
        }));

        return filterBy;
    }

    static getOrder() {
        return [{
            name: 'По возрастанию',
            value: 'ASC',
        }, {
            name: 'По убыванию',
            value: 'DESC',
        }]
    }
}