/*
 Show feedback message
 */
export function renderFeedbackMessage(
  elementId,
  textMessage,
  isErrorType = false
) {
  const feedbackElement = document.getElementById(elementId);

  if (!feedbackElement) return;

  feedbackElement.textContent = textMessage;

  feedbackElement.className =
    `feedback-message ${isErrorType ? 'error' : 'success'}`;
}




