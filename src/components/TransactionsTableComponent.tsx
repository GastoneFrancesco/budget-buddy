import React, { useEffect, useState } from "react";
import { Transaction } from "../interfaces/Transaction";
import { TransactionDescriptionComponent } from "./TransactionDescriptionComponent";
import { DefaultCategories } from "../config/DefaultCategories";
import { CategoryService } from "../services/CategoryService";
import { LanguageService } from "../services/LanguageService";
import { log } from "console";

interface TransactionsTableComponentProps {
  list: Transaction[];
  deleteAction: (indexToRemove: number) => void;
}

export const TransactionsTableComponent: React.FC<TransactionsTableComponentProps> = ({
  list,
  deleteAction,
}) => {
  const [pageContent, setPageContent] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const recordsForPage = 6;
  const maxPages = Math.ceil(list.length / recordsForPage);

  useEffect(() => {
    const start = (currentPage - 1) * recordsForPage;
    const end = start + recordsForPage;
    setPageContent(list.slice(start, end));
  }, [list, currentPage]);

  const nextPage = (): void => {
    if (currentPage * recordsForPage < list.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const previousPage = (): void => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

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
          {pageContent.map((transaction, index) => (
            <tr key={index}>
              <td>
                <TransactionDescriptionComponent
                  description={transaction.description}
                />
              </td>
              <td
                className={
                  transaction.amount >= 0
                    ? "positive-amount"
                    : "negative-amount"
                }
              >
                {transaction.amount.toFixed(2)} €
              </td>
              <td className="table-category">
                <div
                  style={{
                    color: DefaultCategories.find(
                      (category) => category.name === transaction.category
                    )!.color,
                    backgroundColor: CategoryService.lightenColor(
                      DefaultCategories.find(
                        (category) => category.name === transaction.category
                      )!.color
                    ),
                    borderRadius: 5,
                    fontWeight: 600,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    height: 30,
                  }}
                >
                  {" "}
                  {LanguageService.categoryNameToItalian(
                    transaction.category
                  )}{" "}
                </div>
              </td>
              <td>
                {transaction.date.toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>
                <button
                  className="button-elimina"
                  onClick={(e) => deleteAction(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="footer-row">
            <button className="button" onClick={previousPage}>
              {"<"}
            </button>
            <button className="button" onClick={nextPage}>
              {">"}
            </button>
            <p>
              Pagina {currentPage} di {maxPages}
            </p>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
