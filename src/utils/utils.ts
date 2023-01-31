export const removeAccents = (str: any) => {
  let replacements = [
    [/[ÀÁÂÃÄÅ]/g, "A"],
    [/[àáâãäå]/g, "a"],
    [/[ÈÉÊË]/g, "E"],
    [/[èéêë]/g, "e"],
    [/[ÌÍÎÏ]/g, "I"],
    [/[ìíîï]/g, "i"],
    [/[ÒÓÔÕÖØ]/g, "O"],
    [/[òóôõöø]/g, "o"],
    [/[ÙÚÛÜ]/g, "U"],
    [/[ùúûü]/g, "u"],
    [/[Ç]/g, "C"],
    [/[ç]/g, "c"],
  ];

  for (let i = 0; i < replacements.length; i++) {
    str = str.replace(replacements[i][0], replacements[i][1]);
  }

  return str;
};
