import React, { useState } from "react";
import { DefaultCategories } from "../config/DefaultCategories";
import { Transaction } from "../interfaces/Transaction";
import { DateComponent } from "./DateComponent";
import { DropDownComponent } from "./DropDownComponent";
import { InputTextComponent } from "./InputTextComponent";

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

            <InputTextComponent title="Description" value={description} onChange={setDescription} />

            <InputTextComponent title="€" value={amount} onChange={setAmount} />

            <DropDownComponent title="Category" value={category}
            setValue={setCategory} options={DefaultCategories}
            optionLabel="name"/>

            <DateComponent title="Date" date={date} setDate={setDate} />

            <div className="buttons-container">
                <button className="button" onClick={createNewTransaction}>Add</button>
                <button className="button" onClick={reset}>Reset</button>

            </div>
        </div>

    )
}
