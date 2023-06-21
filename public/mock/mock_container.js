// eslint-disable-next-line @typescript-eslint/no-empty-function
consolelog = (msg) => {};

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


container.connectors.sendRequest = (connectorName, connectorVersion, connectorMethod, requestParams, callbackFunc) => {

  setTimeout(() => {



    const response = {
      success: true,
      data: {},
      message: ""
    };


    // if (connectorName !== "CDPHomescreen") {
    const fileName = `mock/${connectorName}_${connectorVersion}_${connectorMethod}.json`;
    // console.log(fileName)
    container.tile.data.loadJsonFile(fileName, (fileData) => {
      // const data = JSON.parse(he.decode(JSON.stringify(fileData)));
      response.success = fileData.data.filecontent.success;
      response.data = fileData.data.filecontent.data;
      callbackFunc(response)
    });
        // } else {

    //   // call the local connector
    //   let url = '';
    //   let method = '';

    //   requestParams.org = "7C889888-F75F-4C6A-82F2-DA74579564FC";
    //   requestParams._org = "7C889888-F75F-4C6A-82F2-DA74579564FC";
    //   requestParams.tileCode = "38B51DF8-0B65-41A7-A6E9-14081E2C266F";
    //   requestParams.memberNumberIndexKey = "Ps7sehCMnaZT2UsJ4d6LGUEaLybjQNW6";
    //   requestParams.memberNumberDecryptionKey = "Mn2FkW6kZ8eYQnNvgPryFH7DPtKyPPcg";
    //   requestParams.acctConnectorName = "CDPAccountConnector";
    //   requestParams.acctConnectorMethod = "getAccounts";
    //   requestParams.acctConnectorVersion = "1.0";
    //   requestParams.localDbUrl = "jdbc:postgresql://cons-services-instance.cify3ngu76ln.us-east-1.rds.amazonaws.com:5432/CDPSVC_7C889888-F75F-4C6A-82F2-DA74579564FC";
    //   requestParams.localDbPassword = "Constellation2019homescreen";
    //   requestParams.localDbUser = "home_screen";
    //   requestParams.EnableConnectorLogging = true;

    //   // load connector config json file
    //   container.tile.data.loadJsonFile("mock/mock_connectorConfig.json", function (data) {

    //     if (data.success) {
    //       console.log(data.data.filecontent);
    //       let myConnector = data.data.filecontent.find(x => x.ConnectorName === connectorName && x.ConnectorMethod === connectorMethod && x.ConnectorVersion === connectorVersion);

    //       if (myConnector !== undefined) {

    //         url = myConnector.ConnectorURL.replace(/&#x2F;/g, '/').replace(/&amp;/g, '&');
    //         method = myConnector.RequestMethod;

    //       }

    //       if (url !== '') {
    //         let connectorParams = {};
    //         if (typeof requestParams !== 'object') {
    //           connectorParams = [];
    //         } else {
    //           // convert to array of key value pair
    //           connectorParams = Object.keys(requestParams).map(e => {
    //             let ret = {};
    //             ret.name = e;
    //             ret.value = requestParams[e];
    //             return ret;
    //           });
    //           console.log("connector params");
    //           console.log(connectorParams);

    //         }


    //         const data = {
    //           "externalServicePayload": {
    //             "requestType": {
    //               "connector": connectorName,
    //               "version": connectorVersion,
    //               "method": connectorMethod
    //             },
    //             "payload": {
    //               "valuePair": []
    //             },
    //             "userData": {
    //               "userId": "abc12345-6789-abcd-abcd-09b2f99daf02",
    //               "firstName": "local",
    //               "middleName": "u",
    //               "lastName": "local",
    //               "emailAddress": "nope@noreply.com",
    //               "homePhone": "555-555-5555",
    //               "mobilePhone": null,
    //               "mailingAddress": {
    //                 "line1": "123 MAIN ST",
    //                 "line2": null,
    //                 "city": "RALEIGH",
    //                 "state": "NC",
    //                 "zipCode": "90210"
    //               }
    //             }
    //           },
    //           "connectorParametersResponse": {
    //             "parameters": {
    //               "valuePair": connectorParams
    //             },
    //             "method": {
    //               "parameters": {
    //                 "valuePair": []
    //               },
    //               "isValid": true
    //             },
    //             "connectorController": ""
    //           },
    //           "response": "",
    //           "responseStatus": {
    //             "statusCode": "",
    //             "statusDescription": "",
    //             "status": "",
    //             "statusReason": "",
    //             "requiredFields": []
    //           }
    //         };

    //         $.ajax({
    //           url: url,
    //           method: method,
    //           contentType: 'application/json',
    //           data: JSON.stringify(data),
    //           error: function (a, b, c) {
    //             consolelog('sendRequest error');
    //             consolelog(a);
    //             consolelog(b);
    //             consolelog(c);
    //             callbackFunc({
    //               "success": false,
    //               "data": "",
    //               "message": "error"
    //             });
    //           }
    //         }).done(function (response) {
    //           console.log("sendRequest done");
    //           if (callbackFunc && typeof callbackFunc === 'function') {
    //             const data = JSON.parse(response.response);
    //           //  console.info(connectorMethod,response);
    //             callbackFunc({
    //               "success": true,
    //               "data": data.response,
    //               "message": ""
    //             });
    //           }

    //         });
    //       } else {
    //         callbackFunc({
    //           message: "no match",
    //           success: false,
    //           data: {}
    //         });
    //       }

    //     }
    //   });

    // }


  }, 100);


};