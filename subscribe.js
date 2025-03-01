function buyPremium(days) {
  let price = 0;
  switch(days) {
    case 1: price = 100; break;
    case 30: price = 1500; break;
    case 90: price = 3000; break;
    case 180: price = 6000; break;
    case 365: price = 11000; break;
    default: price = 0;
  }
  if (price === 0) return;
  window.location.href = "https://payment.example.com/?amount=" + price + "&currency=KZT&days=" + days;
}
