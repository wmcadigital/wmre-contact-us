import { useState, useContext } from 'react';
import axios from 'axios';
import { useFormContext } from 'react-hook-form';
// Import contexts
import { FormDataContext } from 'globalState/FormDataContext';

const useSubmitForm = (setFormSubmitStatus) => {
  const [formDataState] = useContext(FormDataContext); // Get the state/dispatch of form data from FormDataContext
  const { trigger } = useFormContext(); // Get useForm methods
  const [isFetching, setIsFetching] = useState(false);
  const [APIErrorMessage, setAPIErrorMessage] = useState(null);

  // Destructure values from our formDataState (get all users values)
  const { ContactEmail, Firstname, LastName, Enquiry } = formDataState.formData;

  // Map all destructured vals above to an object we will send to API
  let dataToSend = {};
  const file = [];

  dataToSend = {
    'First Name': Firstname,
    'Last Name': LastName,
    Email: ContactEmail,
    Enquiry,
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission method
    // Validation
    const result = await trigger();
    // if no errors
    if (result) {
      // Start submitting API
      setIsFetching(true); // Set this so we can put loading state on button

      // Go hit the API with the data
      axios({
        method: 'post',
        url: `${process.env.REACT_APP_API_HOST}`,
        data: JSON.stringify({
          to: 3,
          body: JSON.stringify(dataToSend),
          from: `donotreply@tfwm.org.uk`,
          subject: `WMRE Contact Form`,
          files: file,
          displayName: `${Firstname} ${LastName}`,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          // If the response is successful(200: OK) or error with validation message(400)
          if (response.status === 200 || response.status === 400) {
            const payload = response.config.data;

            // Log event to analytics/tag manager
            window.dataLayer.push({
              event: 'formAbandonment',
              eventCategory: 'wmre-contact-us',
              eventAction: 'form submitted: success',
              eventLabel: 'success',
            });
            setIsFetching(false); // set to false as we are done fetching now
            if (payload.Message) {
              setAPIErrorMessage(payload.Message);
            } else {
              setFormSubmitStatus(true); // Set form status to success
              window.scrollTo(0, 0); // Scroll to top of page
              // set success page
            }
            return true;
          }
          throw new Error(response.statusText, response.Message); // Else throw error and go to our catch below
        })

        // If formsubmission errors
        .catch((error) => {
          // eslint-disable-next-line no-console
          console.error({ error });
          let errMsg;

          if (error.text) {
            error.text().then((errorMessage) => {
              errMsg = errorMessage;
            });
          } else {
            errMsg = error;
          }

          // Log event to analytics/tag manager
          window.dataLayer.push({
            event: 'formAbandonment',
            eventCategory: 'wmre-contact-us',
            eventAction: 'form submitted: error',
            eventLabel: errMsg,
          });
          setIsFetching(false); // set to false as we are done fetching now
          setFormSubmitStatus(false); // Set form status to error
          window.scrollTo(0, 0); // Scroll to top of page
          // set error message
        });
    }
  };

  // Return handleSubmit and isFetching so it can be used by form
  return {
    handleSubmit,
    isFetching,
    APIErrorMessage,
  };
};

export default useSubmitForm;
