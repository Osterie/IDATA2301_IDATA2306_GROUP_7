
function APIs() {

    const testApi = () => {
  
        fetch('http://localhost:3000/hello')
            .then(response => response.json())
            .then(data => console.log(data));
  
    };
  
  
    return <button onClick={testApi}>Click me</button>;
  
  }
  
  export default APIs;