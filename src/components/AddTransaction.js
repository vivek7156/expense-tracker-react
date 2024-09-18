import React, {useState,useContext,useEffect} from 'react'
import { GlobalContext } from './context/GlobalState';

export const AddTransaction = () => {   
    const [text, setText] = useState('');
    const [amount, setAmount] = useState('');
    const [isFormFilled, setIsFormFilled] = useState(false);

    const { addTransaction } = useContext(GlobalContext);
    useEffect(() => {
      setIsFormFilled(text !== '' && amount !== '');
  }, [text, amount]);

    const onSubmit = e => {
        e.preventDefault();
        const newTransaction = {
            id: Math.floor(Math.random() * 100000000),
            text,
            amount: +amount,
            timestamp: new Date().toISOString()
        };
        addTransaction(newTransaction);
        setText('');
        setAmount('');
    }

  return (
    <>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
            <label htmlFor="text">
                Text (max 30 characters)
            </label>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
                maxLength="30" // Set the character limit here
            />
        </div>
        <div className="form-control">
            <label htmlFor="amount">
                Amount <br />
                (negative - expense, positive - income)
            </label>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount..."
            />
        </div>
        <button type="submit" className={`btn ${isFormFilled ? 'btn-filled' : ''}`}>Add transaction</button>
    </form>

    </>
  );
};
