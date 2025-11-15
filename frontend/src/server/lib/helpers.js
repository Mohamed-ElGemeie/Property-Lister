export function parseFormErrors(error) {
  if (error) {
    const errors = {};
    error.details.forEach(detail => {
      const key = detail.path[0];
      errors[key] = detail.message;
    });
    return errors;
  }
}
