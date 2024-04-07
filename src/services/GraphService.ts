import { Transaction } from "../interfaces/Transaction";

export class GraphService {

    static generateLabels(): string[] {

        //TODO: make this updatable
        const startDay = 10;

        // Define a dictionary to map month numbers to month names
        const monthNames: string[] = ['Gen', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Define an array to store the labels
        const labels: string[] = [];

        // Loop through each month and generate labels
        for (let i = 0; i < 12; i++) {
            // Calculate start and end days based on input
            const startMonthIndex = i;
            const startMonthName = monthNames[startMonthIndex];
            const endMonthIndex = (startMonthIndex + 1) % 12;
            const endMonthName = monthNames[endMonthIndex];

            const endDay = startDay - 1; // End day of the label
            const endDayFormatted = endDay < 10 ? '0' + endDay : String(endDay); // Formatting end day

            // Add label to the array
            labels.push(`${startDay} ${startMonthName} - ${endDayFormatted} ${endMonthName}`);
        }

        return labels;
    }

    static populateMainBalanceGraph = (transactionArray: Transaction[]): number[] => {
        const values: number[] = Array(12).fill(0);
        const labels = GraphService.generateLabels();
        transactionArray.forEach(transaction => {
            labels.forEach((label, index) => {
                if (GraphService.isDateBetween(transaction.date, GraphService.getDateFromLabel(label, index)[0], GraphService.getDateFromLabel(label, index)[1])) {
                    const month = GraphService.getDateFromLabel(label, index)[0].getMonth();
                    values[month] += transaction.amount;
                }
            });

        });

        return values;
    }

    static populateSavingsGraph = (transactionArray: Transaction[]): number[] => {
        const values: number[] = Array(12).fill(0);
        transactionArray.forEach(transaction => {
            if (transaction.category === 'Savings') {
                const month = transaction.date.getMonth();
                values[month] -= transaction.amount;
            }
        });
        return values;
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