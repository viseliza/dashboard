export class DateConvert {
    private dateStart: Date;
    private dateEnd: Date;
    private currentDate: Date;
    
    constructor() {
        this.dateStart   = new Date();
        this.dateEnd     = new Date();
        this.currentDate = new Date;
    }

    /** Конвертация выбранного промежутка времени из Date в Timestamp
     * 
     * @param {string} period - Промежуток времени 
     */
    public convert(period: string) {
        const dateInPeriods: any = {
            'day': this.setDatesOfDay,
            'weak': this.setDatesOfWeak,
            'month': this.setDatesOfMonth,
            'year': this.setDatesOfYear,
        }

        this.dateStart   = new Date();
        this.dateEnd     = new Date();
        this.currentDate = new Date;
        dateInPeriods[period].apply(this);

        return {
            from_timestamp: Math.round(this.dateStart.getTime() / 1000),
            to_timestamp: Math.round(this.dateEnd.getTime() / 1000)
        }
    }

    /** Уставнока даты начала и конца дня
     * 
     */
    private setDatesOfDay(): void {
        this.dateStart = new Date(new Date().setHours(0,0,0,0));
        this.dateEnd = new Date(new Date().setHours(23,59,59,999));
    }

    /** Уставнока даты начала и конца недели
     * 
     */
    private setDatesOfWeak(): void {
        this.dateStart = new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay() + 1));
        this.dateEnd = new Date(this.currentDate.setDate(this.currentDate.getDate() - this.currentDate.getDay()+7));
    }

    /** Уставнока даты начала и конца месяца
     * 
     */
    private setDatesOfMonth(): void { 
        const y = this.currentDate.getFullYear(); 
        const m = this.currentDate.getMonth();
        this.dateStart = new Date(y, m, 1);
        this.dateEnd = new Date(y, m + 1, 0);
    }

    /** Уставнока даты начала и конца года
     * 
     */
    private setDatesOfYear(): void {
        this.dateStart = new Date(this.currentDate.getFullYear(), 0, 1);
        this.dateEnd = new Date(this.currentDate.getFullYear(), 11, 31);
    }
}