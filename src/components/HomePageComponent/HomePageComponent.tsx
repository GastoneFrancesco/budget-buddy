import React, { useEffect, useState } from "react";
import './style.css'
import { GraphComponent } from "../GraphComponent/GraphComponent";
import { TransactionsTableComponent } from "../TransactionsTableComponent/TransactionsTableComponent";
import { Transaction } from "../../interfaces/Transaction";
import { AddTransactionComponent } from "../AddTransactionComponent/AddTransactionComponent";

export const HomePageComponent: React.FC = () => {

    const [transactionArray, setTransactionArray] = useState<Transaction[]>([]);

    useEffect(() => {
        const storedTransactions = localStorage.getItem('transactionArray');
    
        if (storedTransactions) {
            const parsedTransactions: Transaction[] = JSON.parse(storedTransactions).map((transaction: { date: string | number | Date; }) => ({
                ...transaction,
                date: new Date(transaction.date) // Parse date string into a Date object
            }));
    
            const sortedTransactions = parsedTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());
            setTransactionArray(sortedTransactions);
        }
    }, []);

    const populateMainBalanceGraph = (): number[] => {
        const values: number[] = Array(12).fill(0);
        transactionArray.forEach(transaction => {
            const month = transaction.date.getMonth();
            values[month] += transaction.amount;
        });
        return values;
    }

    const populateSavingsGraph = (): number[] => {
        const values: number[] = Array(12).fill(0);
        transactionArray.forEach(transaction => {
            if (transaction.category === 'Savings') {
                const month = transaction.date.getMonth();
                values[month] -= transaction.amount;
            }
        });
        return values;
    }

    const dataValue = new Map<string, number[]>();
    dataValue.set('main-balance', populateMainBalanceGraph())
    dataValue.set('savings', populateSavingsGraph())

    const getActualBalance = (): string => {
        let value = 0;
        transactionArray.forEach(element => {
            value += element.amount;
        });
        return value.toFixed(2)
    }

    const deleteFromTransactions = (indexToRemove: number) => {
        setTransactionArray(currentTransaction => {
            const updatedTransactions = currentTransaction.filter((_, index) => index !== indexToRemove);
            localStorage.setItem('transactionArray', JSON.stringify(updatedTransactions));
            return updatedTransactions;
        });
    };

    return (

        <div className="container">

            <div className="container-left">

                <div className="container-left-top">

                    <p>Your balance</p>
                    <h1>$ {getActualBalance()}</h1>

                </div>

                <div className="container-left-graph">

                    <GraphComponent dataValue={dataValue}></GraphComponent>

                </div>

                <div className="container-left-history">

                    <p>Transaction history</p>

                    <TransactionsTableComponent
                        list={transactionArray}
                        deleteAction={deleteFromTransactions} />

                </div>

            </div>

            <div className="container-right">

                <AddTransactionComponent setTransactionArray={setTransactionArray} />

            </div>

        </div>
    )
}