type Endpoints<Context> = {
  [name: string]: (this: Context, ...args: any[]) => any;
};

class WildcardServer<Context extends object> {
  #endpointsProxy: Endpoints<Context> = this._getEndpointsProxy();

  get endpoints() {
    return this.#endpointsProxy;
  }

  _getEndpointsProxy(): Endpoints<Context> {
    return new Proxy({}, {});
  }
}

type UserDefinedContext = {
  isLoggedIn: boolean;
  userId: number;
};

const wilcardServer = new WildcardServer<UserDefinedContext>();

wilcardServer.endpoints.func = function () {
  // TS autocomplete works, uncomment following line
  // this.
};

type UserDefinedContext2 = {
  userName: string;
  isAdmin: boolean;
};

const wilcardServer2 = new WildcardServer<UserDefinedContext2>();

wilcardServer2.endpoints.func = function () {
  // TS autocomplete works, uncomment following line
  // this.
};
