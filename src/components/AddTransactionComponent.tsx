import React, { useState } from "react";
import { Transaction } from "../interfaces/Transaction";
import { DefaultCategories } from "../config/DefaultCategories";
import { LanguageService } from "../services/LanguageService";

interface AddTransactionComponentProps {
    setTransactionArray: (transactions: Transaction[]) => void;
}

export const AddTransactionComponent: React.FC<AddTransactionComponentProps> = ({ setTransactionArray }) => {

    const [description, setDescription] = useState<string>('');
    const [amount, setAmount] = useState<number>();
    const [category, setCategory] = useState<string>();
    const [date, setDate] = useState(new Date());

    const createNewTransaction = (): void => {

        if (!description || !amount || !category || !date) {
            alert("Missing datas")
            return;
        }

        const parsedDate = new Date(date);

        const newTransaction: Transaction = {
            description: description,
            amount: category === 'Income' ? amount : -amount,
            category: category,
            date: parsedDate
        };

        const storedTransactions = localStorage.getItem('transactionArray');
        let updatedTransactions: Transaction[] = [];

        if (storedTransactions) {
            const parsedTransactions: Transaction[] = JSON.parse(storedTransactions).map((transaction: { date: string | number | Date; }) => ({
                ...transaction,
                date: new Date(transaction.date)
            }));
            updatedTransactions = [...parsedTransactions, newTransaction];
        } else {
            updatedTransactions = [newTransaction];
        }

        const sortedTransactions = updatedTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());
        setTransactionArray(sortedTransactions);

        localStorage.setItem('transactionArray', JSON.stringify(sortedTransactions));
    };

    const reset = (): void => {
        setDescription('');
        setAmount(undefined);
        setCategory('');
        setDate(new Date())
    }

    return (
        <div className='setter-container'>

            <p>Add Transaction</p>

            <div className="form-group">
                <span>Description</span>
                <input className="form-field" type="text"
                    value={description}
                    onChange={e => setDescription(e.target.value)} />
            </div>

            <div className="form-group">
                <span>€</span>
                <input className="form-field" type="number"
                    value={amount !== undefined ? amount : ''}
                    onChange={e => setAmount(parseFloat(e.target.value))} />
            </div>

            <div className="form-group">
                <span>Category</span>
                <select className="form-field" value={category !== undefined ? category : ''} onChange={e => setCategory(e.target.value as string)}>
                    <option value="">---</option>
                    {DefaultCategories.map((category, index) => (
                        <option key={index} value={category.name}>{LanguageService.categoryNameToItalian(category.name)}</option>
                    ))}
                </select>
            </div>


            <div className="form-group">
                <span>Date</span>
                <input className="form-field" type="date"
                    value={date.toISOString().split('T')[0]}
                    onChange={e => setDate(new Date(e.target.value))} />
            </div>

            <div className="buttons-container">
                <button className="button" onClick={createNewTransaction}>Add</button>
                <button className="button" onClick={reset}>Reset</button>

            </div>
        </div>

    )
}
