const Form = (props) => {
  const { locations, inputNameHandler, setInputNameVisited, inputLocation, inputError } = props;

  // I organized form elements by groups as it's a common convention I'm seeing these days.
  // It's a nice way to break things up, and makes it easy to style.

  return (
    <form className="form">
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <div>
          <input
            type="text"
            id="name"
            className="name"
            onChange={(event) => inputNameHandler(event)}
            onBlur={() => setInputNameVisited(true)}
          ></input>
          {inputError && <p className="form-error">{inputError}</p>}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="location">Location</label>
        <select ref={inputLocation} className="location-dropdown">
          {locations.map((loc, index) => {
            return (
              <option key={index} value={loc}>
                {loc}
              </option>
            );
          })}
        </select>
      </div>
    </form>
  );
};

export default Form;
