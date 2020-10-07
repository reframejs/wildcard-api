const obj = {
  p: 42,
  func: function () {
    /*
    console.log(this);
    console.log(this.p);
    */
  },
};

obj.newFunc = function () {
  /*
  console.log(this);
  console.log(this.p);
  */
};

obj.func();
obj.newFunc();

