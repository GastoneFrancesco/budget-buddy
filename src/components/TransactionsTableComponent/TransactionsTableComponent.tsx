import React from "react";
import './style.css';
import { Transaction } from "../../interfaces/Transaction";
import { TransactionDescriptionComponent } from "../TransactionDescriptionComponent/TransactionDescriptionComponent";
import { DefaultCategories } from "../../config/DefaultCategories";

interface TransactionsTableComponentProps {
  list: Transaction[];
  deleteAction: (indexToRemove: number) => void
}

export const TransactionsTableComponent: React.FC<TransactionsTableComponentProps> = ({ list, deleteAction }) => {

  function lightenColor(color: string): string {
    // Convert HEX to RGB
    const hexToRgb = (hex: string) =>
      hex.match(/[A-Za-z0-9]{2}/g)!.map(v => parseInt(v, 16));

    const rgbColor = hexToRgb(color);

    // Calculate lighter shade (increase brightness)
    const lighten = (value: number) => Math.min(255, value + 50);

    // Apply lightening to each RGB component
    const lighterRgb = rgbColor.map(lighten);

    // Convert RGB back to HEX
    const lighterHex = lighterRgb.map(v => v.toString(16).padStart(2, '0')).join('');

    return '#' + lighterHex; // Return the lighter color in HEX format
  }

  return (
    <div>
      <table className="table-component">
        {/* Doing it Fixed because i don't need to change this*/}
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          {list.map((transaction, index) => (
            <tr key={index}>
              <td><TransactionDescriptionComponent description={transaction.description} /></td>
              <td className={transaction.amount >= 0 ? "positive-amount" : "negative-amount"}>
                {transaction.amount.toFixed(2)} $
              </td>
              <td className="table-category">
                <div style={{
                  color: DefaultCategories.get(transaction.category)!,
                  backgroundColor: lightenColor(DefaultCategories.get(transaction.category)!),
                  paddingInline: 10,
                  borderRadius: 10,
                  fontWeight: 600
                }}> {transaction.category} </div>
              </td>
              <td>{transaction.date.toDateString()}</td>
              <td><button className="button-elimina" onClick={e => deleteAction(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}