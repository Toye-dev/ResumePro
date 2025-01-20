import React from 'react';

const SingleEntryForm = ({ entry, index, inputBoxes, handleChange }) => {
  return (
    <div key={index}>
      {inputBoxes.map((inputBox) => (
        <div className="label-layout" key={inputBox.id}>
          <label htmlFor={inputBox.name}>{inputBox.label}</label>
          {inputBox.type === 'textarea' ? (
            <textarea
              className="text-input"
              name={inputBox.name}
              value={entry[inputBox.name]}
              onChange={(e) => handleChange(e, index)} // pass the index to handleChange
            />
          ) : (
            <input
              className="text-input"
              type={inputBox.type}
              placeholder={inputBox.placeholder}
              name={inputBox.name}
              value={entry[inputBox.name]}
              onChange={(e) => handleChange(e, index)} // pass the index to handleChange
            />
          )}
        </div>
      ))}
      
    </div>
  );
};

export default SingleEntryForm;

// handleChange needs to know exactly which of the array items has had its inputs changed
//That’s why it collects the index. Also the default giving of the event by onChange is intercepted by the intermediary anonymous function which allows us take arguments without them firing right away.
