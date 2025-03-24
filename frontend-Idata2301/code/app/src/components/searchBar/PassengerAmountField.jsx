import './passengerAmountField.css';

const PassengerAmountField = () => {

    return (
        <>
            <div className="dropdown-window">
                <select name="Classes" required>
                    <option value="0">First class</option>
                    <option value="1">Business class</option>
                    <option value="2">Economy class</option>
                </select>
                    
                <input className="adult-input" type="number" />
            </div>
        </>
    );
};

export default PassengerAmountField;
