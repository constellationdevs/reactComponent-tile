// ====FOR LOCAL DEVELOPMENT ONLY, DO NOT UPLOAD THIS FILE====

// toggle this variable to true to call a connector project locally (requires proper config in mocks/mock_connectorConfig.json)
// toggle to false to use mock file (required to fit naming convention mocks/[connectorName]_[connectorVersion]_[connectorMethod].json)
const useLocalConnector = false;

container.tile.data.getOpenData = function (callbackFunc) {
  const response = {
    success: false,
    data: {},
  };
  callbackFunc(response);
};

container.connectors.sendRequest = (
  connectorName,
  connectorVersion,
  connectorMethod,
  params,
  callbackFunc
) => {
  const response = {
    success: true,
    data: {},
  };
  if (useLocalConnector) {
    console.log("CALL LOCAL CONNECTOR")
    callLocalConnector(connectorName, connectorMethod, connectorVersion, params, callbackFunc)
  } else {
    const source = "mock/" + connectorName + "_" + connectorVersion + "_" + connectorMethod + ".json";
    container.tile.data.loadJsonFile(source,(fileData) => {
      console.log(fileData)
      response.success = fileData.data.filecontent.success;
      response.data = fileData.data.filecontent.data;
      callbackFunc(response)
    });
  }
};

const callLocalConnector = (connname, connmethod, connversion, requestParams, callbackFunc) => {
    // load connector config json file
    container.tile.data.loadJsonFile("mock/mock_connectorConfig.json", (res) => {
      const data = JSON.parse(JSON.stringify(res).replace(/&#x2F;/g, "/"));
      if (res.success) {
        console.log(data.data.filecontent);
        const myConnector = data.data.filecontent.find(
          (x) =>
            x.ConnectorName === connname &&
            x.ConnectorMethod === connmethod &&
            x.ConnectorVersion === connversion
        );
        console.log(myConnector)
        if (myConnector !== undefined) {
          url = myConnector.ConnectorURL.replace(/&#x2F;/g, "/").replace(/&amp;/g, "&");
          method = myConnector.RequestMethod;
        }
        if (url !== "") {
          let connectorParams = [];
          if (typeof requestParams !== "object") {
            connectorParams = [];
          } else {
            // convert to array of key value pair
            connectorParams = Object.keys(requestParams).map((e) => {
              const ret = {};
              ret.name = e;
              ret.value = requestParams[e];
              return ret;
            });
          }
          if (!_.isEmpty(myConnector.ConnectorParams)) {
            for (const p in myConnector.ConnectorParams) {
              connectorParams.push(myConnector.ConnectorParams[p]);
            }
          }
          console.log("connector params", connectorParams);
          const req = {
            externalServicePayload: {
              requestType: {
                connector: connname,
                version: connversion,
                method: connmethod,
              },
              payload: {
                valuePair: [],
              },
              userData: {
                userId: "abc12345-6789-abcd-abcd-09b2f99daf02",
                firstName: "John",
                middleName: "D",
                lastName: "Smith",
                emailAddress: "nope@noreply.com",
                homePhone: "555-555-5555",
                mobilePhone: null,
                mailingAddress: {
                  line1: "123 MAIN ST",
                  line2: null,
                  city: "RALEIGH",
                  state: "NC",
                  zipCode: "90210",
                },
              },
            },
            connectorParametersResponse: {
              parameters: {
                valuePair: connectorParams,
              },
              method: {
                parameters: {
                  valuePair: [],
                },
                isValid: true,
              },
              connectorController: "",
            },
            response: "",
            responseStatus: {
              statusCode: "",
              statusDescription: "",
              status: "",
              statusReason: "",
              requiredFields: [],
            },
          };
          $.ajax({
            url,
            method,
            contentType: "application/json",
            data: JSON.stringify(req),
            error: (a, b, c) => {
              console.error("sendRequest error");
              console.error(a);
              console.error(b);
              console.error(c);
              callbackFunc.call(null, {
                success: false,
                data: "",
                message: "error",
              });
            },
          }).done((response) => {
            console.info("sendRequest done", response);
            if (callbackFunc && typeof callbackFunc === "function") {
              // console.log(response.response)
              const myData = JSON.parse(response.response);
              console.log(myData)
              callbackFunc.call(null, {
                success: true,
                data: myData,
                message: "",
              });
            }
          });
        } else {
          callbackFunc.call(null, {
            message: "no match",
            success: false,
            data: {},
          });
        }
      }
    });
}

container.tile.data.loadJsonFile = (fileName, successFunc) => {

  const response = {
    'success': false,
    'message': fileName,
    'data': {}
  };

  $.getJSON(fileName, function (data) {
    response.data.filecontent = data;
    // CHECK for JSON file, if exist read into 'data'
    response.success = true;
    Response.escape(response);
    successFunc(response);
  }).fail(function (er) {
    response.data.filecontent = {};
    response.success = false;
    successFunc(response);
    console.error("FAILED", er)
  });
}