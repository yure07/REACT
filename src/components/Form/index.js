import React from 'react';
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa';
import './Form.css';

export default function Form({ handleSubmit, handleChange, NovaTarefa }) {
  return (
    <form onSubmit={handleSubmit} action="#" className="form">
      <input onChange={handleChange} type="text" value={NovaTarefa} />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
}
Form.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  NovaTarefa: PropTypes.string.isRequired,
};
