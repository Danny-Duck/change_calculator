type Currency = {
  id: string;
  name: string;
  value: number;
};

const cashRegisterDrawer: Currency[] = [
  { id: "100", name: "One Hundred Bill", value: 10000 },
  { id: "50", name: "Fifty Dollar Bill", value: 5000 },
  { id: "20", name: "Twenty Dollar Bill", value: 2000 },
  { id: "10", name: "Ten Dollar Bill", value: 1000 },
  { id: "5", name: "Five Dollar Bill", value: 500 },
  { id: "1", name: "One Dollar Coin", value: 100 },
  { id: "0.50", name: "Fifty Cent Coin", value: 50 },
  { id: "0.20", name: "Twenty Cent Coin", value: 20 },
  { id: "0.10", name: "Ten Cent Coin", value: 10 },
  { id: "0.05", name: "Five Cent Coin", value: 5 },
];

type CurrencyCount = {
  id: Currency["id"];
  count: number;
};

const getCurrencyCount = (totalChange: number, currency: Currency, count: number = 0) => {
  const { value, id } = currency;
  const newCurrencyCount: CurrencyCount = { id: id, count: count };
  const newTotalChange: number = totalChange;
  if (totalChange < value) {
    return { newTotalChange, newCurrencyCount };
  } else {
    return getCurrencyCount(totalChange - value, currency, count + 1);
  }
};

const getTotalCurrencyCount = (
  totalChange: number,
  totalCurrencyCount: CurrencyCount[] = [],
  cashDrawer: Currency[] = cashRegisterDrawer
): CurrencyCount[] => {
  if (cashDrawer.length === 0) {
    return totalCurrencyCount;
  } else {
    const { newTotalChange, newCurrencyCount } = getCurrencyCount(totalChange, cashDrawer[0]);
    const newTotalCurrencyCount = [...totalCurrencyCount, newCurrencyCount];
    return getTotalCurrencyCount(newTotalChange, newTotalCurrencyCount, cashDrawer.slice(1));
  }
};

const convertCurrencyToString = (
  { count, id }: CurrencyCount,
  cashDrawer: Currency[] = cashRegisterDrawer
): string => {
  const currencyData = cashDrawer.find((drawerCurrency) => drawerCurrency.id === id);
  const isPlural = count > 1 ? "s" : "";
  return `${count} x ${currencyData.name}${isPlural}\n`;
};

const calculateChangeValue = (cashReceived, purchaseCost): Currency["value"] => {
  console.log((cashReceived / 1000).toFixed(2));
  return 0;
};

const getChange = (totalChangeAsNumber: number, cashDrawer = cashRegisterDrawer): string => {
  const totalChangeAsCurrency: CurrencyCount[] = getTotalCurrencyCount(totalChangeAsNumber);
  const actualCurrencyCount = totalChangeAsCurrency.filter((currencyCount) => currencyCount.count > 0);
  const actualCurrencyCountAsString = actualCurrencyCount
    .map((currency) => convertCurrencyToString(currency))
    .join("");
  return `Your change is ${0}: \n${actualCurrencyCountAsString}`;
};

const cashRegister = (purchaseCost: number, cashReceived: number): string => {
  if (cashReceived < purchaseCost) return "Didn't receive enough money";
  else if (cashReceived == purchaseCost) return "No change necessary";
  else if (cashReceived > purchaseCost) return getChange(calculateChangeValue(cashReceived, purchaseCost));
};

console.log("Cost: $10, Received: $3\n", cashRegister(1000, 300));
console.log("\n");
console.log("Cost: $10, Received: $10\n", cashRegister(1000, 1000));
console.log("\n");
console.log("Cost: $7.65, Received: $10\n", cashRegister(765, 1000));
console.log("\n");
console.log("Cost: $0.29, Received: $110\n", cashRegister(29, 11000));
console.log("\n");
console.log("Cost: $0.05, Received: $1000\n", cashRegister(5, 100000));
