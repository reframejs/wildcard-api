declare module NodeJS {
  interface Global {
    spotConfig: any;
  }
}

console.log(this.spotConfig);
console.log(this.bla);

console.log(1, this);

(function () {
  console.log(2, this);
})();

function wrapper() {
  console.log(3, this);
}

wrapper.call({ oo: 21 });
