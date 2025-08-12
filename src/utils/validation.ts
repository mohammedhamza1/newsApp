export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return 'Email is required';
  }
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  return null;
};

export const validatePhoneNumber = (phoneNumber: string): string | null => {
  const phoneRegex = /^[+]?[1-9]?[0-9]{7,15}$/;
  if (!phoneNumber.trim()) {
    return 'Phone number is required';
  }
  if (!phoneRegex.test(phoneNumber.replace(/[\s-()]/g, ''))) {
    return 'Please enter a valid phone number';
  }
  return null;
};

export const validateDateOfBirth = (dateOfBirth: string): string | null => {
  if (!dateOfBirth.trim()) {
    return 'Date of birth is required';
  }
  
  const date = new Date(dateOfBirth);
  const today = new Date();
  const age = today.getFullYear() - date.getFullYear();
  
  if (isNaN(date.getTime())) {
    return 'Please enter a valid date';
  }
  
  if (date > today) {
    return 'Date of birth cannot be in the future';
  }
  
  if (age < 13) {
    return 'You must be at least 13 years old';
  }
  
  return null;
};

export const validateForm = (email: string, phoneNumber: string, dateOfBirth: string) => {
  const errors = {
    email: validateEmail(email),
    phoneNumber: validatePhoneNumber(phoneNumber),
    dateOfBirth: validateDateOfBirth(dateOfBirth),
  };
  
  const hasErrors = Object.values(errors).some(error => error !== null);
  
  return { errors, hasErrors };
};