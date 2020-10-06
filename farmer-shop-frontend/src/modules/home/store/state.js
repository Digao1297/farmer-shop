export default {
  lexer: [
    {
      tokenType: "SELECT",
      tokenValue: "",
      column: 0,
      row: 2
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "employee",
      column: 7,
      row: 2
    },
    {
      tokenType: ".",
      tokenValue: "",
      column: 15,
      row: 2
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "lname",
      column: 16,
      row: 2
    },
    {
      tokenType: "FROM",
      tokenValue: "",
      column: 0,
      row: 3
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "employee",
      column: 5,
      row: 3
    },
    {
      tokenType: ",",
      tokenValue: "",
      column: 13,
      row: 3
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "works_on",
      column: 15,
      row: 3
    },
    {
      tokenType: ",",
      tokenValue: "",
      column: 23,
      row: 3
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "project",
      column: 25,
      row: 3
    },
    {
      tokenType: "WHERE",
      tokenValue: "",
      column: 0,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "employee",
      column: 6,
      row: 4
    },
    {
      tokenType: ".",
      tokenValue: "",
      column: 14,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "pname",
      column: 15,
      row: 4
    },
    {
      tokenType: "=",
      tokenValue: "",
      column: 21,
      row: 4
    },
    {
      tokenType: "TEXT_LITERAL",
      tokenValue: "Aquarius",
      column: 25,
      row: 4
    },
    {
      tokenType: "AND",
      tokenValue: "",
      column: 34,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "project",
      column: 38,
      row: 4
    },
    {
      tokenType: ".",
      tokenValue: "",
      column: 45,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "pnumber",
      column: 46,
      row: 4
    },
    {
      tokenType: "=",
      tokenValue: "",
      column: 54,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "works_on",
      column: 56,
      row: 4
    },
    {
      tokenType: ".",
      tokenValue: "",
      column: 64,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "pno",
      column: 65,
      row: 4
    },
    {
      tokenType: "AND",
      tokenValue: "",
      column: 69,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "employee",
      column: 73,
      row: 4
    },
    {
      tokenType: ".",
      tokenValue: "",
      column: 81,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "ssn",
      column: 82,
      row: 4
    },
    {
      tokenType: "=",
      tokenValue: "",
      column: 86,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "works_on",
      column: 88,
      row: 4
    },
    {
      tokenType: ".",
      tokenValue: "",
      column: 96,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "ssn",
      column: 97,
      row: 4
    },
    {
      tokenType: "AND",
      tokenValue: "",
      column: 101,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "project",
      column: 105,
      row: 4
    },
    {
      tokenType: ".",
      tokenValue: "",
      column: 112,
      row: 4
    },
    {
      tokenType: "IDENTIFIER",
      tokenValue: "pdate",
      column: 113,
      row: 4
    },
    {
      tokenType: ">",
      tokenValue: "",
      column: 119,
      row: 4
    },
    {
      tokenType: "DATE_LITERAL",
      tokenValue: "2020-10-03",
      column: 123,
      row: 4
    },
    {
      tokenType: ";",
      tokenValue: "",
      column: 133,
      row: 4
    }
  ],
  optimizer: {
    type: "projection",
    variant: "array",
    statement: ["employee.lname"],
    child: [
      {
        type: "join",
        variant: "array",
        statement: [
          [
            {
              type: "IDENTIFIER",
              value: 8
            },
            "=",
            {
              type: "IDENTIFIER",
              value: 9
            }
          ]
        ],
        child: [
          {
            type: "selection",
            variant: "array",
            statement: [
              [
                {
                  type: "IDENTIFIER",
                  value: 5
                },
                "=",
                {
                  type: "TEXT_LITERAL",
                  value: "Aquarius"
                }
              ]
            ],
            child: [
              {
                type: "projection",
                variant: "set",
                statement: ["lname", "pname", "ssn"],
                child: [
                  {
                    type: "table",
                    variant: "string",
                    statement: "employee"
                  }
                ]
              }
            ]
          },
          {
            type: "join",
            variant: "array",
            statement: [
              [
                {
                  type: "IDENTIFIER",
                  value: 6
                },
                "=",
                {
                  type: "IDENTIFIER",
                  value: 7
                }
              ]
            ],
            child: [
              {
                type: "projection",
                variant: "set",
                statement: ["pno", "ssn"],
                child: [
                  {
                    type: "table",
                    variant: "string",
                    statement: "works_on"
                  }
                ]
              },
              {
                type: "selection",
                variant: "array",
                statement: [
                  [
                    {
                      type: "IDENTIFIER",
                      value: 10
                    },
                    ">",
                    {
                      type: "DATE_LITERAL",
                      value: "2020-10-03"
                    }
                  ]
                ],
                child: [
                  {
                    type: "projection",
                    variant: "set",
                    statement: ["pnumber", "pdate"],
                    child: [
                      {
                        type: "table",
                        variant: "string",
                        statement: "project"
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
