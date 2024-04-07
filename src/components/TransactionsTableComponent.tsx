import React from "react";
import { Transaction } from "../interfaces/Transaction";
import { TransactionDescriptionComponent } from "./TransactionDescriptionComponent";
import { DefaultCategories } from "../config/DefaultCategories";
import { CategoryService } from "../services/CategoryService";

interface TransactionsTableComponentProps {
  list: Transaction[];
  deleteAction: (indexToRemove: number) => void
}

export const TransactionsTableComponent: React.FC<TransactionsTableComponentProps> = ({ list, deleteAction }) => {

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
                {transaction.amount.toFixed(2)} €
              </td>
              <td className="table-category">
                <div style={{
                  color: DefaultCategories.find(category => category.name === transaction.category)!.color,
                  backgroundColor: CategoryService.lightenColor(DefaultCategories.find(category => category.name === transaction.category)!.color),
                  paddingInline: 10,
                  borderRadius: 10,
                  fontWeight: 600,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
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