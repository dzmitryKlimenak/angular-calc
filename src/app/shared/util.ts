export function checkEmailValidityFn(emailAddress: string): boolean {
  // Maximum length for the domain part of the email
  const MAX_DOMAIN_PART_LENGTH: number = 255;
  // Maximum length for the local part of the email
  const MAX_LOCAL_PART_LENGTH: number = 64;

  // Convert the email address to a string (redundant in TypeScript context)
  const stringValue: string = emailAddress.toString();
  // Find the last occurrence of '@' to split local and domain parts
  const splitPosition: number = stringValue.lastIndexOf('@');
  // If '@' is not found, return false as it's not a valid email
  if (splitPosition < 0) {
    return false;
  }

  // Extract the local part of the email
  const localPart: string = stringValue.substring(0, splitPosition);
  // Extract the domain part of the email
  const domainPart: string = stringValue.substring(splitPosition + 1);

  // Check if the local part exceeds the maximum allowed length
  if (localPart.length > MAX_LOCAL_PART_LENGTH) {
    return false;
  }
  // Check if the domain part exceeds the maximum allowed length
  if (domainPart.length > MAX_DOMAIN_PART_LENGTH) {
    return false;
  }

  // Regular expression components for validating the local part
  const sQtext = '[^\\x0d\\x22\\x5c\\x80-\\xff]';
  const sDtext = '[^\\x0d\\x5b-\\x5d\\x80-\\xff]';
  const sAtom =
    '[^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+';
  const sQuotedPair = '\\x5c[\\x00-\\x7f]';
  const sDomainLiteral = '\\x5b(' + sDtext + '|' + sQuotedPair + ')*\\x5d';
  const sQuotedString = '\\x22(' + sQtext + '|' + sQuotedPair + ')*\\x22';
  const sDomainRef = sAtom;
  const sSubDomain = '(' + sDomainRef + '|' + sDomainLiteral + ')';
  const sWord = '(' + sAtom + '|' + sQuotedString + ')';
  // Construct the domain part pattern
  const sDomain = sSubDomain + '(\\x2e' + sSubDomain + ')*';
  // Construct the local part pattern
  const sLocalPart = sWord + '(\\x2e' + sWord + ')*';
  // Complete RFC822 email address specification pattern
  const sAddrSpec = sLocalPart + '\\x40' + sDomain;
  // Compile the complete email validation pattern
  const sValidEmail = '^' + sAddrSpec + '$';
  // Regular expression for validating the complete email format
  const reValidEmail = new RegExp(sValidEmail);
  // Additional pattern to ensure the email has a domain suffix (like .com, .net)
  const sDotComValidEmail = '^\\S+@\\S+[\\.][0-9a-z]+$';
  // Regular expression for the additional domain suffix check
  const dotComValidEmail = new RegExp(sDotComValidEmail);

  // Return true if the email matches both the complete email format and the domain suffix pattern
  return reValidEmail.test(emailAddress) && dotComValidEmail.test(emailAddress);
}
