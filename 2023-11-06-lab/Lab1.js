const util = require('util');

const emailRegex = /^[\w.-]+@[a-zA-Z]+\.(com|org)$/;
const phoneRegex = /(\d{3}-\d{3}-\d{4}|\(\d{3}\)\s?\d{3}-\d{4}|\+\d{1,3}\s?\(\d{1,4}\)\s?\d{1,4}-\d{4})/;
const urlRegex = /^https?:\/\/(?:www\.)?[a-zA-Z0-9.-]+\.[a-z]{2,}(?:\/[a-zA-Z0-9.-]+)*$/;

const inputData = [
  'elimate@email.com',
  'jhonson@email.org',
  '123-456-7890',
  '(987) 674-3210',
  '+1 (1234) 5678-9012',
  '+332 (20) 1234-5678',
  'http://www.example.com',
  'https://www.example.com/path',
  'eshwar-email@example',
  'akhila-phone-number',
  'sravani-url://example.com',
];

inputData.forEach((input) => {
  const emailMatch = emailRegex.test(input);
  const phoneMatch = phoneRegex.test(input);
  const urlMatch = urlRegex.test(input);
  const result = util.format(
    '%s: Email: %s, Phone: %s, URL: %s',
    input,
    emailMatch ? 'Valid' : 'Invalid',
    phoneMatch ? 'Valid' : 'Invalid',
    urlMatch ? 'Valid' : 'Invalid'
  );
  console.log(result);
});