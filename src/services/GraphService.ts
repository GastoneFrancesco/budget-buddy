import { Transaction } from "../interfaces/Transaction";

export class GraphService {

    private static isLeapYear = (year: number): boolean => {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    static generateLabels = (): string[] => {

        //TODO: make this updatable
        const storedStartDay = localStorage.getItem('monthStartDay');
        const startDay: number = storedStartDay === null ? 1 : parseInt(storedStartDay);
        const year: number = new Date().getFullYear(); // Get the current year

        // Define a dictionary to map month numbers to month names
        const monthNames: string[] = ['Gen', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const months30: string[] = ['Nov', 'Apr', 'Jun', 'Sep'];

        // Define an array to store the labels
        const labels: string[] = [];

        // Loop through each month and generate labels
        for (let i = 0; i < 12; i++) {
            // Calculate start and end days based on input
            const startMonthIndex = i;
            const startMonthName = monthNames[startMonthIndex];
            const endMonthIndex = startDay === 1 ? startMonthIndex : (startMonthIndex + 1) % 12;
            const endMonthName = monthNames[endMonthIndex];

            const endDay = startDay === 1
                ? startMonthName === 'Feb'
                    ? GraphService.isLeapYear(year) === true
                        ? 29
                        : 28
                    : months30.includes(startMonthName)
                        ? 30
                        : 31
                : startDay - 1; // End day of the label

            const startDayFormatted = startDay < 10 ? '0' + startDay : String(startDay); // Formatting end day
            const endDayFormatted = endDay < 10 ? '0' + endDay : String(endDay); // Formatting end day

            // Add label to the array
            if (i === 11 && startDay !== 1) {
                labels.push(`${startDayFormatted} ${startMonthName} - ${endDayFormatted} ${endMonthName} ${year + 1}`);
            } else {
                labels.push(`${startDayFormatted} ${startMonthName} - ${endDayFormatted} ${endMonthName}`);
            }
        }

        return labels;
    }

    static labels = GraphService.generateLabels();

    static populateMainBalanceGraph = (transactionArray: Transaction[]): number[] => {
        const values: number[] = Array(12).fill(0);
        transactionArray.forEach(transaction => {
            GraphService.labels.forEach((label, index) => {
                const [startDate, endDate] = GraphService.getDateFromLabel(label, index);
                if (GraphService.isDateBetween(transaction.date, startDate, endDate)) {
                    values[startDate.getMonth()] += transaction.amount;
                }
            });

        });

        return values;
    }

    static populateSavingsGraph = (transactionArray: Transaction[]): number[] => {
        const values: number[] = Array(12).fill(0);
        transactionArray.forEach(transaction => {
            if (transaction.category === 'Savings') {
                GraphService.labels.forEach((label, index) => {
                    const [startDate, endDate] = GraphService.getDateFromLabel(label, index);
                    if (GraphService.isDateBetween(transaction.date, startDate, endDate)) {
                        values[startDate.getMonth()] -= transaction.amount;
                    }
                });
            }
        });
        return values;
    }

    static getCurrentCategoryBalance = (transactionArray: Transaction[], categoryName: string): number => {
        let value = 0;
        const currentDate = new Date();
        GraphService.labels.forEach((label, index) => {
            const [startDate, endDate] = GraphService.getDateFromLabel(label, index);
            if (GraphService.isDateBetween(currentDate, startDate, endDate)) {
                transactionArray.forEach(element => {
                    if (GraphService.isDateBetween(element.date, startDate, endDate) && element.category === categoryName) {
                        value += element.amount;
                    }
                });
                return value;
            }
        });
        return value;
    }

    private static getDateFromLabel(inputString: string, index: number): [Date, Date] {
        // Split the string by ' - ' to separate the dates
        const dates: string[] = inputString.split(' - ');

        // Define a dictionary to map month abbreviations to month numbers
        const monthMapping: { [key: string]: number } = {
            'Gen': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
            'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
        };

        // Extract day and month from each part of the string
        const [day1, month1]: string[] = dates[0].split(' ');
        const [day2, month2]: string[] = dates[1].split(' ');

        // Assign year 2024 as default
        const year: number = 2024;

        // Create Date objects
        const date1: Date = new Date(year, monthMapping[month1], parseInt(day1));
        const date2: Date = new Date(index === 11 ? year + 1 : year, monthMapping[month2], parseInt(day2));

        return [date1, date2];
    }

    // Function to check if a date falls between two other dates
    private static isDateBetween = (dateToCheck: Date, startDate: Date, endDate: Date): boolean => {
        return dateToCheck >= startDate && dateToCheck < endDate;
    }

}