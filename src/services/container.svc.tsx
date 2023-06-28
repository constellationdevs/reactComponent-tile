/* THIS FILE IS USED FOR 3 THINGS. 
  1. SET THE CONTAINER OBJECT
  2. SET THE TILE OBJECT
  3. OVERRIDE ANY CONTAINER CALLS
    - THIS IS FOR LOCAL TESTING ONLY.  NO OVERRIDES TO THE CONTAINER SHOULD RUN IF isLocalHost = FALSE
 ************************************************************************************************************************/

    import { isLocalHost } from "./helper.svc";
    import $ from "jquery";
    
    // @ts-ignore
    export const container = window.container; // find the container api for global use
    // @ts-ignore
    export const tile = window.tile; // find the tile.js for global use
    

      container.connectors.sendRequest = (connname: string, connversion: string, connmethod: string, requestParams: any, callbackFunc: any) => {
        console.info("FROM LOCAL");
        let url = "";
        let method = "";
    
        // load connector config json file
        container.tile.data.loadJsonFile("mock/mock_connectorConfig.json", (data: any) => {
          if (data.success) {
            console.log(data.data.filecontent);
            const myConnector = data.data.filecontent.find((x: any) => x.ConnectorName === connname && x.ConnectorMethod === connmethod && x.ConnectorVersion === connversion);
            if (myConnector !== undefined) {
              url = myConnector.ConnectorURL.replace(/&#x2F;/g, "/").replace(/&amp;/g, "&");
              method = myConnector.RequestMethod;
            }
            if (url !== "") {
              let connectorParams = {};
              if (typeof requestParams !== "object") {
                connectorParams = {};
              } else {
                // convert to array of key value pair
                connectorParams = Object.keys(requestParams).map((e) => {
                  const ret: any = {};
                  ret.name = e;
                  ret.value = requestParams[e];
                  return ret;
                });
                console.log("connector params");
                console.log(connectorParams);
              }
              const req: any = {
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
                error: (a: any, b: any, c: any) => {
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
              }).done((response: any) => {
                console.info("sendRequest done", response);
                if (callbackFunc && typeof callbackFunc === "function") {
                  const myData = JSON.parse(response.response);
                  callbackFunc.call(null, {
                    success: true,
                    data: myData.response,
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
      };
    
    
    export default container;
    