import Button from '../components/ui/Button';

const UserList = (props) => {
  const { userList, addUserHandler, clearUsersHandler, inputName, inputNameVisited, inputError } = props;

  const addButtonDisable = (!inputNameVisited && !inputName) || (inputNameVisited && inputError);

  // I added the disabled attribute to the button to disable it when there's an error and on initial page load (when the name input box is empty).
  // It's one extra level of validation that prevents erroneous submission as well as being a clear and visible indicator.

  return (
    <div className="user-list-container">
      <div className="user-list-buttons">
        <Button type="button" onClick={() => clearUsersHandler()}>
          Clear
        </Button>
        <Button type="button" disabled={addButtonDisable} onClick={() => addUserHandler()}>
          Add
        </Button>
      </div>

      <ul className="user-list">
        <li className="user-list-header">
          <div>Name</div>
          <div>Location</div>
        </li>
        {userList.map((user) => {
          return (
            <li key={user.id} className="user">
              <div>{user.name}</div>
              <div>{user.location}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
