// import Mock from 'mockjs'

// mock方法,详细的可以看官方文 档
// const Random = Mock.Random
let rows = [
  {
    key: "001",
    name: "CupcakeTest",
    age: 11,
    sex: "male1",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "002",
    name: "Donut",
    age: 22,
    sex: "male2",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "003",
    name: "Eclair",
    age: 33,
    sex: "male3",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "004",
    name: "Frozen",
    age: 14,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "005",
    name: "Gingerbread",
    age: 15,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "006",
    name: "Honeycomb",
    age: 17,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "007",
    name: "Ice",
    age: 16,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "008",
    name: "Jelly",
    age: 18,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "009",
    name: "KitKat",
    age: 19,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "0010",
    name: "Lollipop",
    age: 43,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "0011",
    name: "Marshma",
    age: 83,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "0012",
    name: "Nougat",
    age: 19,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
  {
    key: "0013",
    name: "Oreo",
    age: 133,
    sex: "male",
    height: "100cm",
    birth: "2021-08-08",
  },
];
const list = [
  {
    url: "/list/getlist",
    type: "post",
    response: () => {
      return {
        code: 200,
        data: [...rows],
      };
    },
  },
  {
    url: "/list/deleteData",
    type: "post",
    response: (config) => {
      const paramsData = JSON.parse(config.body);
      const returnData = rows.filter(
        (item) => paramsData.indexOf(item.name) === -1
      );
      return {
        code: 200,
        data: [...returnData],
      };
    },
  },
];

export default list;
