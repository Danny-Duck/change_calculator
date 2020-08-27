var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var cashRegisterDrawer = [
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
var getCurrencyCount = function (totalChange, currency, count) {
    if (count === void 0) { count = 0; }
    var value = currency.value, id = currency.id;
    var newCurrencyCount = { id: id, count: count };
    var newTotalChange = totalChange;
    if (totalChange < value) {
        return { newTotalChange: newTotalChange, newCurrencyCount: newCurrencyCount };
    }
    else {
        return getCurrencyCount(totalChange - value, currency, count + 1);
    }
};
var getTotalCurrencyCount = function (totalChange, totalCurrencyCount, cashDrawer) {
    if (totalCurrencyCount === void 0) { totalCurrencyCount = []; }
    if (cashDrawer === void 0) { cashDrawer = cashRegisterDrawer; }
    if (cashDrawer.length === 0) {
        return totalCurrencyCount;
    }
    else {
        var _a = getCurrencyCount(totalChange, cashDrawer[0]), newTotalChange = _a.newTotalChange, newCurrencyCount = _a.newCurrencyCount;
        var newTotalCurrencyCount = __spreadArrays(totalCurrencyCount, [newCurrencyCount]);
        return getTotalCurrencyCount(newTotalChange, newTotalCurrencyCount, cashDrawer.slice(1));
    }
};
var convertCurrencyToString = function (_a, cashDrawer) {
    var count = _a.count, id = _a.id;
    if (cashDrawer === void 0) { cashDrawer = cashRegisterDrawer; }
    var currencyData = cashDrawer.find(function (drawerCurrency) { return drawerCurrency.id === id; });
    var isPlural = count > 1 ? "s" : "";
    return count + " x " + currencyData.name + isPlural + "\n";
};
var calculateChangeValue = function (cashReceived, purchaseCost) {
    console.log((cashReceived / 1000).toFixed(2));
    return 0;
};
var getChange = function (totalChangeAsNumber, cashDrawer) {
    if (cashDrawer === void 0) { cashDrawer = cashRegisterDrawer; }
    var totalChangeAsCurrency = getTotalCurrencyCount(totalChangeAsNumber);
    var actualCurrencyCount = totalChangeAsCurrency.filter(function (currencyCount) { return currencyCount.count > 0; });
    var actualCurrencyCountAsString = actualCurrencyCount
        .map(function (currency) { return convertCurrencyToString(currency); })
        .join("");
    return "Your change is " + 0 + ": \n" + actualCurrencyCountAsString;
};
var cashRegister = function (purchaseCost, cashReceived) {
    if (cashReceived < purchaseCost)
        return "Didn't receive enough money";
    else if (cashReceived == purchaseCost)
        return "No change necessary";
    else if (cashReceived > purchaseCost)
        return getChange(calculateChangeValue(cashReceived, purchaseCost));
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
