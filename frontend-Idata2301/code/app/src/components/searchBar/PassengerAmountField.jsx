import CustomInputField from "./CustomInputField";
import "./passengerAmountField.css";

const PassengerAmountField = ({ passengers, setPassengers }) => {

  // Handler to update passenger amount by class name
  const handleAmountChange = (className, newAmount) => {
    const updatedPassengers = passengers.map((p) =>
      p.classType.name === className ? { ...p, amount: newAmount } : p
    );
    setPassengers(updatedPassengers);
  };

  return (
    <div className="dropdown-window">
      {passengers.map(({ classType, amount }) => (
        <div key={classType.name}>
          <label htmlFor={classType.name}>{classType.name}</label>
          <CustomInputField
            amount={amount}
            onAmountChange={(newAmount) => handleAmountChange(classType.name, newAmount)}
          />
        </div>
      ))}
    </div>
  );
};
export default PassengerAmountField;
