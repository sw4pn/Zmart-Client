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
  return data.sort((a, b) => {
    const dateA = new Date(a[prop] as any);
    const dateB = new Date(b[prop] as any);

    return dateA.getTime() - dateB.getTime();
  });
};

// sort date z to a

const dateZ = <T extends Record<string, any>>(
  data: T[],
  prop: keyof T
): T[] => {
  return data.sort((a, b) => {
    const dateA = new Date(b[prop] as any);
    const dateB = new Date(a[prop] as any);

    return dateB.getTime() - dateA.getTime();
  });
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
