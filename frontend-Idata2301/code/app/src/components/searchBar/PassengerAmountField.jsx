import { useState } from "react";
import "./passengerAmountField.css";

const PassengerAmountField = () => {
    const [amount, setAmount] = useState(1400);

    const addValue = () => {
        setAmount((prev) => prev + 1);
    };

    const subtractValue = () => {
        setAmount((prev) => prev - 1);
    };

    return (
        <div className="dropdown-window">
            <select name="Classes" required>
                <option value="0">Economy class</option>
                <option value="1">Business class</option>
                <option value="2">First class</option>
            </select>

            <label htmlFor="adults">Passengers 18+:</label>
            <input id="adults" className="adult-input" type="number" placeholder="1" />

            <label htmlFor="children">Passengers under 18:</label>
            <input id="children" className="child-input" type="number" placeholder="0" />

            <div className="input-number">
                <input type="number" value={amount} readOnly />
                <div className="input-number-actions">
                    <button onClick={addValue}>+</button>
                    <button onClick={subtractValue}>−</button>
                </div>
            </div>


        </div>
    );
};

export default PassengerAmountField;
