export const fetchUsetInfo = (name: string) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: name,
        desc: `hi, ${name}`,
      });
    }, 1000);
  });
};
