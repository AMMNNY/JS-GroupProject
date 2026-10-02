//Display a success or error feedback message to the user

export function renderFeedbackMessage( elementId, textMessage,isErrorType = false) {

   // Get the feedback element from the HTML
  const feedbackElement = document.getElementById(elementId);
// Stop if the element does not exist
  if (!feedbackElement) return;

  // Display the feedback message
  feedbackElement.textContent = textMessage;
// Apply the appropriate success or error CSS class
  feedbackElement.className =`feedback-message ${isErrorType ? 'error' : 'success'}`;
}




