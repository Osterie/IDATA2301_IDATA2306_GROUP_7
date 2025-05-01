import React, {useState} from 'react';
import { sendApiRequest } from '../library/requests'; // Adjust the import path as needed
import { sendAuthenticationRequest } from '../library/Identity/authentication'; // Adjust the import path as needed


const CreateAccount = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault(); // prevent default HTML form submission behavior
      setMessage('');

        const signupData = {
        "username": username,
        "password": password,
        "email": email,
      };
  
    // Send the API request and handle success or failure
    await sendApiRequest(
      "POST",
      "/signup",
      async ()  => {
        // Success callback
        console.log("succesfully created account")
          await sendAuthenticationRequest(username, password,
            () => {
              console.log("succesfully logged in account")
              // Redirect to the main page or perform any other action
              window.location.href = '/index.html'; // Adjust the URL as needed
            },
            (error) => {
              setMessage(`Login failed: ${error}`);
            }
          );
      },
      signupData,
      (error) => {
        setMessage(`Error: ${error}`) // Error callback, displaying the error message
        console.log("Error creating account: ", error)
       }
    );
  };

  return (
    <section>
      <div>
        <h1>Welcome!</h1>
        <p>Please Create Your Account</p>

        <form onSubmit={handleSubmit}>

          <div className="form-group">

            <label className="sr-only" htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="sr-only" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="sr-only" htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>

        {message && <p style={{ color: 'red' }}>{message}</p>} {/* Display error message here */}

      </div>
    </section>
  );
};

// // This function is called when signup has been successful
// function onSignupSuccess() {
//   redirectTo("/index.html");
// }

// /**
//  * This function is called when signup failed
//  * @param error Error message received from the backend API
//  */
// function onSignupError(error) {
//   showFormError(error);
// }

export default CreateAccount;