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

  debitAmount: ["amountRight", "DB"],

  creditAmount: ["amountLeft", "CR"],

  desciption: ["desc"],

  accountNumber: ["accountNumber"],

  // recursively merge properties and return new object
  merge: function (target, source) {
    String.prototype.replaceAt = function (index, replacement) {
      return (
        this.substr(0, index) +
        replacement +
        this.substr(index + replacement.length)
      );
    };
    // Iterate source properties
    for (const key of Object.keys(source)) {
      // check an `Object` set property to merge of `target` and `source` properties
      if (source[key] instanceof Object && key in target)
        Object.assign(source[key], this.merge(target[key], source[key]));

      // set desc as a description value from source
      if (this.desciption.includes(key)) source.desc = source[key];

      // remove any information in the Mandiri scraper that is not in the BCA scraper
      if (target[key] == undefined) delete source[key];

      // set if transaction is debit flow
      if (source[this.creditAmount[0]] === "-") {
        source.amount = source[this.debitAmount[0]];
        source.flow = this.debitAmount[1];
      }

      // set if transaction is cedit flow
      if (source[this.debitAmount[0]] === "-") {
        source.amount = source[this.creditAmount[0]];
        source.flow = this.creditAmount[1];
      }

      // hide account number
      if (this.accountNumber.includes(key))
        source[key] = source[key].replaceAt(0, "*******");
    }

    // Join `target` and modified `source`
    Object.assign(target || {}, source);
    return target;
  },
};
