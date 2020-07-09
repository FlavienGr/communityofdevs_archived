exports.sanitizedData = ({ data }) => {
  return data
    .map(({ name, department_code: code, zip_code: zipcode, slug }) => ({
      name,
      code,
      zipcode,
      slug
    }))
    .filter(item => {
      return (
        item.zipcode.length !== 0 &&
        item.code.length !== 0 &&
        item.slug.length !== 0 &&
        item.name.length !== 0
      );
    });
};
