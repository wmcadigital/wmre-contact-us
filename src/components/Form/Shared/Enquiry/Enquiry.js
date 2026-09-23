import React, { useRef } from 'react';
import PropTypes from 'prop-types';
// Import custom hooks
import useStepLogic from 'components/Form/useStepLogic';
// Import components
import Input from 'components/shared/FormElements/Input/textarea';
// import SectionStepInfo from 'components/shared/SectionStepInfo/SectionStepInfo';
// import useFormData from '../../useFormData';

const Enquiry = (props) => {
  const formRef = useRef(); // Used so we can keep track of the form DOM element
  const { register, handleSubmit, showGenericError, continueButton } = useStepLogic(formRef); // Custom hook for handling continue button (validation, errors etc)
  const { section, header, summary, legend } = props;

  // Check it we are facing an existing user
  // const { ExistingUser } = useFormData();

  // Labels used on inputs and for validation
  const label = 'Your enquiry';

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
          <h2 className="wmre-fe-question">{legend}</h2>
          <p>{summary}</p>
        </legend>

        <Input
          className="wmre-col-1 wmre-col-lg-3-4"
          name="Enquiry"
          label={`${label}`}
          fieldValidation={fieldValidation(label)}
        />
      </fieldset>
      {/* Continue button */}
      {continueButton()}
    </form>
  );
};

Enquiry.propTypes = {
  summary: PropTypes.string,
  section: PropTypes.string,
  header: PropTypes.string,
  legend: PropTypes.string,
};

Enquiry.defaultProps = {
  summary: '',
  section: '',
  header: '',
  legend: '',
};

export default Enquiry;
