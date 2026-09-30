/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/Input';
// import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';

const Name = (props) => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit, showGenericError, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { section, header, summary } = props;

  // Labels used on inputs and for validation
  const fNameLabel = 'First name';
  const lNameLabel = 'Last name';

  // Logic used to validate fields
  const fieldValidation = (name) => {
    return register({ required: `${name} is required` });
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} autoComplete="on">
      {/* Subsection */}
      <div className="wmre-progress-indicator">
        {section}
        <h4>{header}</h4>
      </div>

      {/* Show generic error message */}
      {showGenericError}

      <fieldset className="wmre-fe-fieldset wmre-col-1">
        <legend className="wmre-fe-fieldset__legend">
          <h2 className="wmre-fe-question">What is your name?</h2>
          <p>{summary}</p>
        </legend>

        <Input
          className="wmre-col-1 wmre-col-lg-3-4"
          name="Firstname"
          label={fNameLabel}
          autocomplete="given-name"
          fieldValidation={fieldValidation(fNameLabel)}
        />
        <Input
          className="wmre-col-1 wmre-col-lg-3-4"
          name="LastName"
          label={lNameLabel}
          autocomplete="family-name"
          fieldValidation={fieldValidation(lNameLabel)}
        />
      </fieldset>

      {/* Continue button */}
      {continueButton()}
    </form>
  );
};

Name.propTypes = {
  summary: PropTypes.string,
  section: PropTypes.string,
  header: PropTypes.string,
};

Name.defaultProps = {
  summary: '',
  section: '',
  header: '',
};

export default Name;
