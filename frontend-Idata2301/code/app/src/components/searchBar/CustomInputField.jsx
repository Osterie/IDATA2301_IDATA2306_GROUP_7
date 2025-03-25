import { useState } from "react";
import "./customInputField.css";

const CustomInputField = () => {
    const [amount, setAmount] = useState(1);

    const addValue = () => {
        setAmount((prev) => prev + 1);
    };

    const subtractValue = () => {
        setAmount((prev) => prev - 1);
    };

    return (

        <div className="input-number">
            <input type="number" value={amount} readOnly />
            <div className="input-number-actions">
                <button onClick={addValue}>+</button>
                <button onClick={subtractValue}>−</button>
            </div>
        </div>
    );
};

export default CustomInputField;
