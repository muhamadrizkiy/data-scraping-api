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

  // recursively merge properties and return new object
  mergeData: function () {
    var dst = {},
      src,
      p,
      args = [].splice.call(arguments, 0); // accept all arguments parameters so that can receive and read multi params
    while (args.length > 0) {
      src = args.splice(0, 1)[0];

      // check for object types
      if (toString.call(src) == "[object Object]") {
        // loop every each object inside the object
        for (p in src) {
          // check for hasOwnProperty
          if (src.hasOwnProperty(p)) {
            // check for object types again
            if (toString.call(src[p]) == "[object Object]") {
              // call recursively merge function return as a new object
              dst[p] = this.mergeData(dst[p] || {}, src[p]);
            } else {
              dst[p] = src[p];
            }
          }
        }
      }
    }

    return dst;
  },
};
