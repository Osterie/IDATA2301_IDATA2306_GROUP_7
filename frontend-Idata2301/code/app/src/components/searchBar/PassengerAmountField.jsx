import './passengerAmountField.css';

const PassengerAmountField = () => {

    return (
        <>
            <div className="dropdown-window">
                <select name="Classes" required>
                    <option value="0">Economy class</option>
                    <option value="1">Business class</option>
                    <option value="2">First class</option>
                </select>

                <label for="adults">Passengers 18+:</label>   
                <input id="adults" className="adult-input" type="number" placeholder="1" />

                <label for="children">Passengers under 18:</label> 
                <input id="children" className="child-input" type="number" placeholder="0" />
            </div>
        </>
    );
};

export default PassengerAmountField;
