function generateConsp(subject) {
  return new Promise(resolve => {
    let generated = "Конспект по теме '" + subject + "': Основные понятия, формулы, примеры и выводы.";
    resolve(generated);
  });
}
