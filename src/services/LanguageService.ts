export class LanguageService {

    static categoryNameToItalian = (string: string): string => {

        switch (string) {
            case 'Income':
                return 'Entrate';
            case 'Subscriptions':
                return 'Abbonamenti';
            case 'Food':
                return 'Cibo';
            case 'Savings':
                return 'Risparmi';
            case 'Entertainment':
                return 'Intrattenimento';
            case 'Transportation':
                return 'Trasporti';
            case 'Shopping':
                return 'Acquisti';
            case 'Healthcare':
                return 'Assistenza sanitaria';
            case 'Dining Out':
                return 'Cene fuori';
            case 'Travel':
                return 'Viaggi';
            case 'Rent':
                return 'Affitto';
            case 'Insurance':
                return 'Assicurazione';
            default:
                return string;
        }
    }
}
