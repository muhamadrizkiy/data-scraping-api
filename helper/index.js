module.exports = {
  // mocking expected data from BCA.json data
  mockedData: {
    result: {
      accounts: [
        {
          accountNumber: "",
          accountType: "",
          currency: "",
          balance: "",
          transactions: [
            {
              id: "",
              date: "",
              desc: "",
              cab: "",
              amount: "",
              flow: "",
              balance: "",
            },
          ],
        },
      ],
      creditCards: {
        details: [
          {
            label: "",
            value: "",
          },
        ],
        billings: {
          previousBalance: "",
          payment: "",
          newBalance: "",
          outstandingBalance: "",
        },
        cards: [
          {
            type: "",
            cardNumber: "",
            name: "",
            newBalance: "",
            transactions: [
              {
                id: "",
                transactionDate: "",
                postingDate: "",
                description: "",
                amount: "",
                flow: "",
              },
            ],
          },
        ],
      },
    },
    errors: [],
  },

  numberFormatArray: ["balance", "amount"],

  numberFormatAccountNumber: ["accountNumber"],

  IDRFormatAccountNumber: ["previousBalance"],

  trim: function (string) {
    return string.replace(/^[. ]+|[. ]+$|[. ]+/g, "").trim();
  },

  currencyFormat: function (number) {
    return Intl.NumberFormat("id-ID", {
      currency: "IDR",
      unitDisplay: "short",
      minimumFractionDigits: 2,
    }).format(number);
  },

  // recursively merge properties and return new object
  merge: function (target, source) {
    // Iterate source properties 
    for (const key of Object.keys(source)) {
      // check an `Object` set property to merge of `target` and `source` properties
      if (source[key] instanceof Object && key in target) {
        Object.assign(source[key], this.merge(target[key], source[key]));
      }
      // finding the key contain number for currency formatting
      if (this.numberFormatArray.includes(key)) {
        const stringNumber = this.trim(source[key])
        var number = new Number(stringNumber);
        source[key] = this.currencyFormat(number)
      }
    }

    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
  },
};
