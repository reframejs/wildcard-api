// Static objects

const serverEndpoints = {
  michieEndpoint,
};

function michieEndpoint(greeting = "Hello"): string {
  return greeting + this.user;
}

serverEndpoints.newEndpoint = function () {};
