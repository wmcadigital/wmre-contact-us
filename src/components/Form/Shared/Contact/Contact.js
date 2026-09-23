import React, { useRef } from 'react';
import PropTypes from 'prop-types';
// Import components
import Input from 'components/shared/FormElements/Input/Input';
// import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';

const Contact = (props) => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit, showGenericError, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { section, header, summary } = props;

  // Labels used on inputs and for validation
  const emailLabel = 'Email address';
  // Logic used to validate the email field
  const emailRegex =
    /^[\w!#$%&amp;'*+\-/=?^_`{|}~]+(\.[\w!#$%&amp;'*+\-/=?^_`{|}~]+)*@((([-\w]+\.)+[a-zA-Z]{2,4})|(([0-9]{1,3}\.){3}[0-9]{1,3}))$/; // Matches email regex on server

  // email validation
  const emailValidation = register({
    required: `${emailLabel} is required`,
    pattern: {
      value: emailRegex,
      message: `Enter an ${emailLabel.toLowerCase()} in the correct format`,
    },
  });

  // email input src
  const emailInputSrc = (
    <Input
      className="wmre-col-1 wmre-col-lg-3-4"
      name="ContactEmail"
      label="Email address<br> For example, name@example.com"
      autocomplete="given-name"
      fieldValidation={emailValidation}
    />
  );

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
        <div className="wmre-fe-fieldset__legend">
          <h2 className="wmre-fe-question">What is your Email Address?</h2>
          <p>{summary}</p>
        </div>
        {emailInputSrc}
      </fieldset>

      {/* Continue button */}
      {continueButton()}
    </form>
  );
};

Contact.propTypes = {
  summary: PropTypes.string,
  section: PropTypes.string,
  header: PropTypes.string,
};

Contact.defaultProps = {
  summary: '',
  section: '',
  header: '',
};

export default Contact;
