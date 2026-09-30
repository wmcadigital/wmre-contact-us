import React, { useState } from 'react';
import HeaderAndBreadcrumb from './components/HeaderAndBreadCrumb';
import Intro from './components/Introduction/Introduction';
import Form from './components/Form/Form';
// Import contexts
import { FormDataProvider } from './globalState/FormDataContext';

import SubmitSuccess from './components/Form/SubmitConfirmation/Success';
import SubmitError from './components/Form/SubmitConfirmation/Error';

function App() {
  const [isFormStarted, setIsFormStarted] = useState(true);
  const [isRecoverLinkPressed, setIsRecoverLinkPressed] = useState(false);
  const [formSubmitStatus, setFormSubmitStatus] = useState(null);

  return (
    <>
      <HeaderAndBreadcrumb />
      <main className="wmre-container wmre-container--main wmre-p-b-lg wmre-m-t-lg wmre-grid">
        {!isFormStarted ? (
          <Intro setIsFormStarted={setIsFormStarted} />
        ) : (
          <FormDataProvider>
            {isFormStarted && formSubmitStatus === null && (
              <Form
                setFormSubmitStatus={setFormSubmitStatus}
                formSubmitStatus={formSubmitStatus}
                isRecoverLinkPressed={isRecoverLinkPressed}
                setIsRecoverLinkPressed={setIsRecoverLinkPressed}
                setIsFormStarted={setIsFormStarted}
              />
            )}

            {formSubmitStatus && <SubmitSuccess />}

            {formSubmitStatus === false && (
              <SubmitError isRecoverLinkPressed={isRecoverLinkPressed} />
            )}
          </FormDataProvider>
        )}
      </main>
    </>
  );
}

export default App;
