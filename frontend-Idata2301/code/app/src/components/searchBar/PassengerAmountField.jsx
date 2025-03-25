import CustomInputField from "./CustomInputField";
import "./passengerAmountField.css";

const PassengerAmountField = () => {
    return (
        <div className="dropdown-window">
            <select name="Classes" required>
                <option value="0">Economy class</option>
                <option value="1">Business class</option>
                <option value="2">First class</option>
            </select>

            <label htmlFor="adults">Passengers 18+:</label>
            <CustomInputField />

            <label htmlFor="children">Passengers under 18:</label>
            <CustomInputField />
        </div>
    );
};

export default PassengerAmountField;
