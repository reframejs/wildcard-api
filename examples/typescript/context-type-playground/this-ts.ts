type SomeContext = {
  propi: number;
  func: () => void;
  newFunc?: (this: SomeContext) => void;
};

/* Successful attempt */

type ServerEndpoints = {
  [name: string]: (this: SomeContext, ...args: unknown[]) => unknown;
};

const endpoints: ServerEndpoints = {};

endpoints.hello = function (arg) {
  console.log(arg);
  console.log(this.propi);
};

/* Failed attempt */

const obj: SomeContext = {
  propi: 42,
  func: function () {
    console.log(this);
    console.log(this.propi);
  },
};

obj.newFunc = function () {
  console.log(this);
  console.log(this.propi);
};

obj.func();
obj.newFunc();
