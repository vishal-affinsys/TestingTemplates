export const generateImages = (numberOfImages: number): string[] => {
  let data: string[] = [];
  for (let i = 0; i < numberOfImages; i++) {
    const image = Math.floor(Math.random() * numberOfImages - 1);
    const url = `https://xsgames.co/randomusers/assets/avatars/pixel/${image}.jpg`;
    data.push(url);
  }

  return data;
};

export const getRandomColor = (): string => {
  const letters: string = '0123456789ABCDEF';
  let color: string = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const generateRandom = (min = 1, max = 3): number => {
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
};

export const randomChoice = <T>(values: T[]): T => {
  return values[Math.floor(values.length * Math.random())];
};
