// sort alphabetically a to z

const alphaA = (data: Array<any>, prop: string) => {
  return data.sort((a, b) => {
    const titleA = a[prop].toUpperCase();
    const titleB = b[prop].toUpperCase();

    if (titleA < titleB) {
      return -1;
    }
    if (titleA > titleB) {
      return 1;
    }

    return 0;
  });
};

// sort alphabetically z to a

const alphaZ = (data: Array<any>, prop: string) => {
  return data.sort((a, b) => {
    const titleA = a[prop].toUpperCase();
    const titleB = b[prop].toUpperCase();

    if (titleA > titleB) {
      return -1;
    }
    if (titleA < titleB) {
      return 1;
    }

    return 0;
  });
};

// sort num a to z

const numA = (data: Array<any>, prop: string) => {
  return data.sort((a, b) => a[prop] - b[prop]);
};

// sort num z to a

const numZ = (data: Array<any>, prop: string) => {
  return data.sort((a, b) => b[prop] - a[prop]);
};

// sort date a to z

const dateA = (data: Array<any>, prop: string) => {
  return data.sort((a, b) => new Date(a[prop]) - new Date(b[prop]));
};

// sort date z to a

const dateZ = (data: Array<any>, prop: string) => {
  return data.sort((a, b) => new Date(b[prop]) - new Date(a[prop]));
};

const sorter = {
  alphaA,
  alphaZ,
  numA,
  numZ,
  dateA,
  dateZ,
};

export default sorter;
