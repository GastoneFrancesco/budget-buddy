import React, { useState } from "react";
import { Transaction } from "../../interfaces/Transaction";
import './style.css'
import { DefaultCategories } from "../../config/DefaultCategories";

interface AddTransactionComponentProps {
    setTransactionArray: (transactions: Transaction[]) => void;
}

export const AddTransactionComponent: React.FC<AddTransactionComponentProps> = ({ setTransactionArray }) => {

    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState(new Date());

    const createNewTransaction = (): void => {

        if(!description || !amount || !category || !date) {
            alert("Missing datas")
            return;
        }

        const parsedDate = new Date(date);

        const newTransaction: Transaction = {
            description: description,
            amount: amount,
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

        setTransactionArray(updatedTransactions);

        localStorage.setItem('transactionArray', JSON.stringify(updatedTransactions));
    };

    return (
        <div className='setter-container'>

            <p>Description</p>
            <input
                type="text"
                onChange={e => setDescription(e.target.value)}
                placeholder="Enter data" />

            <p>Amount</p>
            <input
                type="text"
                onChange={e => setAmount(parseFloat(e.target.value))}
                placeholder="Enter data" />

            <p>Category</p>
            <select onChange={e => setCategory(e.target.value as string)}>
                <option value="">Select category</option>
                {Array.from(DefaultCategories.keys()).map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>

            <p>Date</p>
            <input
                type="date"
                value={date.toISOString().split('T')[0]}
                onChange={e => setDate(new Date(e.target.value))}
                placeholder="Enter data" />

            <div className="buttons-container">
                <button className="button" onClick={createNewTransaction}>Aggiungi</button>
            </div>
        </div>

    )
}
