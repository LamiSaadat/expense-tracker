import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { calculteTotalExpenses } from "../../features/expenses/expensesSlice";
import { addIncome, getIncome } from "../../features/income/incomeSlice";
import IncomeForm from "../IncomeForm/IncomeForm";
import "./Header.scss";

export default function Header() {
  const [input, setInput] = useState({ income: "" });
  const [showForm, setShowForm] = useState(false);
  const { income } = useSelector((store) => store.income);
  const { totalExpenses, expenseItems } = useSelector(
    (store) => store.expenses
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculteTotalExpenses());
  }, [expenseItems, dispatch]);

  let savings = String(income.income - totalExpenses);

  const handleChange = (e) =>
    setInput(() => {
      return { [e.target.name]: e.target.value };
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addIncome(input))
      .unwrap()
      .then(() => {
        dispatch(getIncome());
      })
      .catch((err) => {
        return err;
      });

    setShowForm(false);
  };

  const handleEditBtn = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="header-container">
      <h1 className="header-container__title">Expense Tracker</h1>
      <div className="tabs">
        <div className="tabs__tab">
          <h2 className="tabs__title">Income</h2>
          <div className="tabs__income">
            <h2 className="tabs__amount">{income.income}</h2>
            <button onClick={handleEditBtn} className="tabs__edit-btn">
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                <path
                  fillRule="evenodd"
                  d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        <div className="tabs__tab">
          <h2 className="tabs__title">Expenses</h2>
          <h2 className="tabs__amount">{totalExpenses}</h2>
        </div>
        <div className="tabs__tab">
          <h2 className="tabs__title">Savings</h2>
          <h2 className="tabs__amount">{savings}</h2>
        </div>
      </div>
      <IncomeForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        showForm={showForm}
        input={input}
      />
    </div>
  );
}
