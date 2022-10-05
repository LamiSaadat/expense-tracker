import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  editExpenseItem,
  getExpenseItems,
} from "../../features/expenses/expensesSlice";

function EditExpenseModal({ id, itemRef, amountRef }) {
  const [input, setInput] = useState({
    id: id,
    item: itemRef,
    amount: amountRef,
  });
  console.log(input);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput(() => {
      return {
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(editExpenseItem(input))
      .unwrap()
      .then(() => {
        dispatch(getExpenseItems());
      })
      .catch((err) => console.log(err));
  };
  return (
    <form className="editModal" onSubmit={handleSubmit}>
      <div className="editModal__form">
        <div className="editModal__label">
          Item
          <input
            name="item"
            type="text"
            className="editModal__input"
            onChange={handleChange}
            value={input.item}
          ></input>
        </div>
        <div className="editModal__label">
          Amount
          <input
            name="amount"
            type="number"
            className="editModal__input"
            onChange={handleChange}
            value={input.amount}
          ></input>
        </div>
      </div>
      <button className="editModal__btn">Update Expense</button>
    </form>
  );
}

export default EditExpenseModal;
