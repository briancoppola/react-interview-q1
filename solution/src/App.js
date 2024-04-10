import { useState, useEffect, useRef, useCallback } from 'react';
import Container from './components/layout/Container';
import Header from './components/sections/Header';
import Main from './components/sections/Main';
import FormContainer from './features/FormContainer';
import Form from './features/Form';
import UserList from './features/UserList';
import { validateForm } from './utilities/validateForm';
import { isNameValid, getLocations } from './mock-api/apis';
import './App.css';

function App() {
  // STATE VARIABLES:
  // userList to hold the list of added names/locations
  // locations to hold the list of locations retrieved from the API call
  // inputName to hold the value of the name in the input box and make that box a controlled component so the value can be validated as the user types
  // inputNameVisited to check if the user has visited the name input box yet. This way the user doesn't get an error message for an empty name input box right when the page loads.
  // inputError to hold the error message, if any

  const [userList, setUserList] = useState([]);
  const [locations, setLocations] = useState([]);
  const [inputName, setInputName] = useState('');
  const [inputNameVisited, setInputNameVisited] = useState(false);
  const [inputError, setInputError] = useState('');

  // I used a ref for the inputLocation field instead of creating a state variable as this field don't need to initiate a component refresh every time the value is changed. We only need to grab this value when clicking 'Add.'
  const inputLocation = useRef();

  // This uses the more modern async/await syntax for the API calls. It's a little cleaner than a chain of .then() methods.
  const getLocationsFromAPI = async () => {
    try {
      const res = await getLocations();

      setLocations(res);
    } catch (err) {
      console.error(err);
    }
  };

  // This ensures that the API call to get locations will only happen when the component first mounts.
  useEffect(() => {
    getLocationsFromAPI();
  }, []);

  // This uses the more modern async/await syntax for the API calls. It's clean and avoids .then chaining.
  const validateNameAPI = useCallback(async () => {
    try {
      const res = await isNameValid(inputName);

      // The line of code below would normally handle the name validation, but since there's no validation logic in the API provided, I have done the validation locally in the checkName function below to show how it could work.

      // !res ? setInputError(ERROR_MESSAGE) : setInputError(null);
    } catch (err) {
      console.error(err);
    }
  }, [inputName]);

  // This will run the API for name validation as the user types in the Name box.
  useEffect(() => {
    validateNameAPI(inputName);
  }, [validateNameAPI, inputName]);

  // This checks for any errors in the input name and displays errors if necessary.
  const checkName = (newInputName) => {
    const names = userList.map((user) => user.name);

    const errors = validateForm(newInputName, names);
    setInputError(errors);
  };

  // Event handlers for name input and adding a user are below.

  const inputNameHandler = (event) => {
    const newInputName = event.target.value;
    setInputName(newInputName);
    checkName(newInputName);
  };

  // I used some defensive coding with the conditional here to make sure there isn't an error when user is added.
  const addUserHandler = () => {
    console.log(inputError);
    if (Object.keys(inputError).length === 0) {
      console.log(inputError);
      setUserList((prevUserList) => {
        const newUser = {
          id: prevUserList.length,
          name: inputName,
          location: inputLocation.current.value,
        };

        return [...prevUserList, newUser];
      });
    }
  };

  const clearUsersHandler = () => {
    setUserList([]);
    setInputError(null);
  };

  // I nested all the components here partly to keep the component tree simple and partly to avoid prop drilling.

  return (
    <Container>
      <Header />
      <Main>
        <FormContainer>
          <Form
            locations={locations}
            inputNameHandler={inputNameHandler}
            setInputNameVisited={setInputNameVisited}
            inputLocation={inputLocation}
            inputError={inputError}
          />
          <UserList
            userList={userList}
            addUserHandler={addUserHandler}
            clearUsersHandler={clearUsersHandler}
            inputName={inputName}
            inputNameVisited={inputNameVisited}
            inputError={inputError}
          />
        </FormContainer>
      </Main>
    </Container>
  );
}

export default App;
