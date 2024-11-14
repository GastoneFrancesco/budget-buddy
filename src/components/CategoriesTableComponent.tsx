import React, { useEffect, useState } from "react";
import { DefaultCategories } from "../config/DefaultCategories";
import { Transaction } from "../interfaces/Transaction";
import { GraphService } from "../services/GraphService";
import { CategoryService } from "../services/CategoryService";
import { LanguageService } from "../services/LanguageService";

interface CategoriesTableComponentProps {
  transactions: Transaction[];
}

export const CategoriesTableComponent: React.FC<CategoriesTableComponentProps> = ({ transactions }) => {

  const [categories, setCategories] = useState(DefaultCategories);
  const [balances, setBalances] = useState<number[]>([]);

  //Get stored amount when Component Mount
  useEffect(() => {
    // Retrieve initial budget amounts from local storage
    const storedBudgetAmounts = JSON.parse(localStorage.getItem('budgetsAmount') || '{}') as { [key: string]: number };

    // Initialize categories with the retrieved budget amounts
    const initializedCategories = DefaultCategories.map(category => ({
      ...category,
      budgetAmount: storedBudgetAmounts[category.name] || category.budgetAmount // Use the stored value if available, otherwise use the default value
    }));

    setCategories(initializedCategories);

  }, []);

  // Update balances when transactions change
  useEffect(() => {

    const updatedBalances = categories.map(category =>
      GraphService.getCurrentCategoryBalance(transactions, category.name)
    );

    setBalances(updatedBalances);

  }, [transactions, categories]);

  const handleAmountChange = (categoryName: string, value: number) => {
    const updatedCategories = [...categories];
    const index = updatedCategories.findIndex(category => category.name === categoryName);
    if (index !== -1) {
      updatedCategories[index] = { ...updatedCategories[index], budgetAmount: value };
      setCategories(updatedCategories);

      // Update local storage with the new budget amount
      const storedBudgetAmounts = { ...JSON.parse(localStorage.getItem('budgetsAmount') || '{}') };
      storedBudgetAmounts[categoryName] = value;
      localStorage.setItem('budgetsAmount', JSON.stringify(storedBudgetAmounts));
    }
  };

  return (
    <div>
      <table className="table-component">
        <thead>
          <tr>
            <th>Name</th>
            <th>Left</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => {
            // Check if the category is not income
            if (category.name !== 'Income') {
              return (
                <tr key={index}>
                  <td className="table-category">
                    <div style={{
                      color: category.color,
                      backgroundColor: CategoryService.lightenColor(category.color),
                      borderRadius: 5,
                      fontWeight: 600,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      textAlign: 'center',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      height: 30
                    }}> {LanguageService.categoryNameToItalian(category.name)} </div>
                  </td>
                  <td>{category.budgetAmount + balances[index]} €</td>
                  <td>
                    <div className="form-group">
                      <span>€</span>
                      <input
                        className="form-field"
                        type="number"
                        value={category.budgetAmount !== undefined ? category.budgetAmount : ''}
                        onChange={e => handleAmountChange(category.name, parseFloat(e.target.value))}
                      ></input>
                    </div>
                  </td>
                </tr>
              );
            } else {
              return null; // Skip rendering for income category
            }
          })}
        </tbody>
      </table>
    </div>
  )
}
