export const userNameHandler = (name) => {
  if (typeof name !== 'string') return '';

  const tempUsernameArr = name
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .toLowerCase()
    .replace(/[^-a-z]/g, ' ')
    .split(' ');

  // "Jimi__ hendrix" => ["jimi", "", "", "hendrix"]

  const resultArr = [];

  for (const item of tempUsernameArr) {
    if (item) resultArr.push(item.charAt(0).toUpperCase() + item.slice(1));
  }

  return resultArr.join(' ');
};
