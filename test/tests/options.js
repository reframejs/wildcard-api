module.exports = [
  option_argumentsAlwaysInHttpBody_1,
  option_argumentsAlwaysInHttpBody_2,
  option_serverUrl,
  option_baseUrl,
];

async function option_argumentsAlwaysInHttpBody_1({
  server,
  browserEval,
  httpPort,
}) {
  let execCount = 0;

  server.testEndpoint__argumentsAlwaysInHttpBody = async function (arg) {
    assert(arg === "just some args");
    execCount++;
  };

  await browserEval(
    async () => {
      await server.testEndpoint__argumentsAlwaysInHttpBody("just some args");
    },
    { onHttpRequest }
  );

  assert(execCount === 2, { execCount });

  function onHttpRequest(request) {
    const { _url, _postData } = request;
    assert(
      _url ===
        "http://localhost:" +
          httpPort +
          "/_wildcard_api/testEndpoint__argumentsAlwaysInHttpBody/%5B%22just%20some%20args%22%5D",
      { _url }
    );
    assert(_postData === undefined, { _postData });

    execCount++;
  }
}

async function option_argumentsAlwaysInHttpBody_2({
  server,
  browserEval,
  httpPort,
}) {
  let endpointCalled = false;
  let onHttpRequestCalled = false;

  server.testEndpoint__argumentsAlwaysInHttpBody = async function (arg) {
    assert(arg === "just some args");
    endpointCalled = true;
  };

  await browserEval(
    async () => {
      const { config } = window;
      assert(config.argumentsAlwaysInHttpBody === false);
      config.argumentsAlwaysInHttpBody = true;
      await window.server.testEndpoint__argumentsAlwaysInHttpBody(
        "just some args"
      );
      config.argumentsAlwaysInHttpBody = false;
    },
    { onHttpRequest }
  );

  assert(endpointCalled && onHttpRequestCalled);

  function onHttpRequest(request) {
    const { _url, _postData } = request;
    assert(
      _url ===
        "http://localhost:" +
          httpPort +
          "/_wildcard_api/testEndpoint__argumentsAlwaysInHttpBody/args-in-body",
      { _url }
    );
    assert(_postData === '["just some args"]', { _postData });

    onHttpRequestCalled = true;
  }
}

async function option_serverUrl({ server, browserEval, httpPort }) {
  let endpointCalled = false;
  let onHttpRequestCalled = false;

  server.test_serverUrl = async function () {
    endpointCalled = true;
  };

  const wrongHttpPort = 3449;
  assert(httpPort.constructor === Number && httpPort !== wrongHttpPort);
  await browserEval(
    async ({ wrongHttpPort }) => {
      const { WildcardClient } = window;
      const wildcardClient = new WildcardClient();
      wildcardClient.config.serverUrl = "http://localhost:" + wrongHttpPort;
      const server = wildcardClient.endpoints;
      let failed = false;
      try {
        await server.test_serverUrl();
      } catch (err) {
        failed = true;
      }
      assert(failed === true, { failed });
    },
    { onHttpRequest, browserArgs: { wrongHttpPort } }
  );

  assert(endpointCalled === false && onHttpRequestCalled === true, {
    endpointCalled,
    onHttpRequestCalled,
  });

  function onHttpRequest(request) {
    assert(
      request._url.startsWith("http://localhost:" + wrongHttpPort),
      request._url
    );
    onHttpRequestCalled = true;
  }
}

async function option_baseUrl({ server, config, browserEval, httpPort }) {
  let endpointCalled = false;
  let onHttpRequestCalled = false;

  const baseUrl = (config.baseUrl = "/_api/my_custom_base/");
  server.test_baseUrl = async function () {
    endpointCalled = true;
  };

  await browserEval(
    async ({ baseUrl }) => {
      const { WildcardClient } = window;
      const wildcardClient = new WildcardClient();
      wildcardClient.config.baseUrl = baseUrl;
      const server = wildcardClient.endpoints;
      await server.test_baseUrl();
    },
    { onHttpRequest, browserArgs: { baseUrl } }
  );

  assert(endpointCalled === true && onHttpRequestCalled === true, {
    endpointCalled,
    onHttpRequestCalled,
  });

  function onHttpRequest(request) {
    const correctUrlBeginning = "http://localhost:" + httpPort + baseUrl;
    const actualUrl = request._url;
    assert(actualUrl.startsWith(correctUrlBeginning), {
      actualUrl,
      correctUrlBeginning,
    });
    onHttpRequestCalled = true;
  }
}
