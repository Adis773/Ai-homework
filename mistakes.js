function addMistakes(text) {
  let index = Math.floor(Math.random() * text.length);
  let wrongChar = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  let modifiedText = text.substring(0, index) + wrongChar + text.substring(index + 1);
  let grade = 100 - 20;
  return { modifiedText, grade };
}
