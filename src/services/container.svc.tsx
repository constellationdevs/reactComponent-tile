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
    
    if (isLocalHost()) {
      /* MOCK THE GET OPEN DATA
        - toggle the success to false if you don't want to use the data section and fall back to the tileConfig.json file
        - alter the meta action as needed to test different entry points
      */
      container.tile.data.getOpenData = (callbackFunc: any) => {
        console.log("get open data local");
        const response = {
          success: false,
          data: {
            "openData": {
              "actionType": 3,
              "component": "Dashboard",
              "pageName": "dashboard",
              "openData": {
                "componentID": "",
                "data": {
                  "Hero": {
                    "componentID": "",
                    "templateID": "",
                    "data": {
                      "btnSetting": {
                        "componentID": "BtnSettings",
                        "iconClass": "fa-cog",
                        "metaAction": {
                          "actionType": 3,
                          "pageName": "commCenter",
                          "component": "CommCenter",
                          "pageTitle": "Communication Center",
                          "openData": {
                            "componentID": "",
                            "data": {
                              "Hero": {
                                "componentID": "",
                                "templateID": "",
                                "data": {
                                  "btnSetting": {
                                    "componentID": "BtnSettings",
                                    "iconClass": "fa-cog",
                                    "text": "",
                                    "metaAction": {}
                                  },
                                  "profileImageURL": "https://render.bitstrips.com/v2/cpanel/0d95534f-4c8d-4b5e-8d6b-2a0a26204c8c-b648b385-6730-4e60-875e-b71ce5070e13-v1.png?transparent=1&palette=1",
                                  "heading": "Communication Center",
                                  "headerCallOut": "OBI-WAN KENOBI",
                                  "primaryActions": {
                                    "componentID": "",
                                    "data": [
                                      {
                                        "componentID": "",
                                        "label": "Create New Message",
                                        "iconClass": "",
                                        "metaAction": {}
                                      }
                                    ]
                                  }
                                },
                                "dataSource": {
                                  "type": 1,
                                  "connectorName": "",
                                  "connectorMethod": "",
                                  "connectorVersion": "",
                                  "params": ""
                                }
                              },
                              "List": {
                                "componentID": "tmpList",
                                "data": {
                                  "search": {
                                    "buttonIcon": "fa-search",
                                    "metaAction": {
                                      "actionType": 3,
                                      "pageName": "Search Page",
                                      "component": "SearchPage",
                                      "pageTitle": "Search",
                                      "openData": {
                                        "componentID": "seachpage",
                                        "data": {
                                          "results": [
                                            {
                                              "headerTitle": "unread",
                                              "items": [
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                }
                                              ]
                                            },
                                            {
                                              "headerTitle": "read",
                                              "items": [
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                }
                                              ]
                                            },
                                            {
                                              "headerTitle": "1/1/2019",
                                              "items": [
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                }
                                              ]
                                            },
                                            {
                                              "headerTitle": "2/1/2019",
                                              "items": [
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "leftIcon":
                                                    "https://logo.clearbit.com/netflix.com",
                                                  "title": "Message title Here",
                                                  "subTitle":
                                                    "This is the subject line of the message...",
                                                  "callout": "Review",
                                                  "templateID": 1,
                                                  "metaAction": {}
                                                }
                                              ]
                                            }
                                          ],
                                          "filters": [
                                            {"keyName":"switchFilter","labelText":"Select From Account...","filterType":1,"iconUrl":"fromaccount.png","iconOverride":null,"selectedPrependText":"From ","multi":true,"filterTemplateItems":[{"icon":"internalaccount.png","display":"Option 1","value":"c5b1cda3-3fb4-4be8-81f8-cf00c4204f75","color":null},{"icon":"internalaccount.png","display":"Option 2","value":"b6c58cf2-e0df-48cf-9a8c-abc231a23598","color":null}]},
                                            {"keyName":"amountGreaterThan","labelText":"Greater than","filterType":2,"iconUrl":"dollargreaterthan.png","iconOverride":null,"selectedPrependText":">$","multi":false,"filterTemplateItems":null},
                                            {"keyName":"amountLessThan","labelText":"Less than","filterType":2,"iconUrl":"dollarlessthan.png","iconOverride":null,"selectedPrependText":"<$","multi":false,"filterTemplateItems":null},
                                            {"keyName":"dateAfter","labelText":"Transfer date after...","filterType":3,"iconUrl":"calendargreaterthan.png","iconOverride":null,"selectedPrependText":">","multi":false,"filterTemplateItems":null},
                                            {"keyName":"dateBefore","labelText":"Transfer date before...","filterType":3,"iconUrl":"calendarlessthan.png","iconOverride":null,"selectedPrependText":"<","multi":false,"filterTemplateItems":null},
                                            {
                                              "keyName": "radioFilter",
                                              "labelText": "Radio Filter",
                                              "filterType": 4,
                                              "multi": false,
                                              "iconUrl": "",
                                              "iconOverride": "fa-paperclip",
                                              "selectedPrependText": ""
                                          },
                                          {
                                            "keyName": "category",
                                            "labelText": "Select one",
                                            "filterType": 5,
                                            "iconUrl": "",
                                            "iconOverride": "fa-th",
                                            "selectedPrependText": "",
                                            "multi": "false",
                                            "filterTemplateItems": [
                                              {
                                                "icon": "",
                                                "display": "Option 1",
                                                "value": "option1",
                                                "color": ""
                                              },
                                              {
                                                "icon": "",
                                                "display": "Option 2",
                                                "value": "option2",
                                                "color": ""
                                              },
                                              {
                                                "icon": "",
                                                "display": "Option 3",
                                                "value": "option3",
                                                "color": ""
                                              },
                                              {
                                                "icon": "",
                                                "display": "Option 4",
                                                "value": "option4",
                                                "color": ""
                                              },
                                              {
                                                "icon": "",
                                                "display": "Option 5",
                                                "value": "option5",
                                                "color": ""
                                              }
                                            ]
                                          }
                                          ]
                                        },
                                        "dataSource": {
                                          "type": 1,
                                          "connectorName": "",
                                          "connectorMethod": "",
                                          "connectorVersion": "",
                                          "params": {},
                                          "callbackFunc": ""
                                        }
                                      }
                                    }
                                  },
                                  "results": [
                                    {
                                      "headerTitle": "unread",
                                      "items": [
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/netflix.com",
                                          "title": "Message Title 1",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/foodlion.com",
                                          "title": "Message Title 2",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/netflix.com",
                                          "title": "Message Title 1",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/foodlion.com",
                                          "title": "Message Title 2",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        }
                                      ]
                                    },
                                    {
                                      "headerTitle": "read",
                                      "items": [
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/amazon.com",
                                          "title": "Message Title 3",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/kmart.com",
                                          "title": "Message Title3",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/netflix.com",
                                          "title": "Message Title 1",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/foodlion.com",
                                          "title": "Message Title 2",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/amazon.com",
                                          "title": "Message Title 3",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/kmart.com",
                                          "title": "Message Title3",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/netflix.com",
                                          "title": "Message Title 1",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        },
                                        {
                                          "templateID": 1,
                                          "leftIcon": "https://logo.clearbit.com/foodlion.com",
                                          "title": "Message Title 2",
                                          "subTitle": "This is the subject line of the message...",
                                          "callout": "Review",
                                          "metaAction": {
                                            "actionType": 3,
                                            "pageName": "messageDetails.html",
                                            "openData": {}
                                          }
                                        }
                                      ]
                                    }
                                  ]
                                },
                                "templateID": "tmpList",
                                "dataSource": {
                                  "type": 1,
                                  "connectorName": "",
                                  "connectorMethod": "",
                                  "connectorVersion": "",
                                  "params": {},
                                  "callbackFunc": ""
                                }
                              }
                            },
                            "dataSource": {
                              "type": 1,
                              "connectorName": "",
                              "connectorMethod": "",
                              "connectorVersion": "",
                              "params": {},
                              "callbackFunc": ""
                            }
                          }
                        }
                      },
                      "heading": "This is a Heading",
                      "headerCallOut": "THIS IS CALL OUT TEXT",
                      "bodyCallOut": "This is text that will live in the body of the hero section.",
                      "iconClass": "fa-file",
                      "primaryActions": {
                        "componentID": "heroActions",
                        "data": [
                          {
                            "componentID": "",
                            "label": "Action 1",
                            "metaAction": {
                              "actionType": 3,
                              "component": "ListSamples",
                              "pageName": "listSamples",
                              "pageTitle": "List Samples",
                              "openData": {
                                "componentID": "",
                                "data": {
                                  "List": {
                                    "componentID": "ListSamplesListContainer",
                                    "templateID": "listTemplate",
                                    "data": {
                                      "results": [
                                        {
                                          "headerTitle": "example - search control template",
                                          "items": [
                                            {
                                              "templateID": 2,
                                              "placeholder": "Search...",
                                              "clearIconClass": "fa-times-circle"
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "example - secondary action template/aka",
                                          "items": [
                                            {
                                              "templateID": 3,
                                              "secondaryActions": [
                                                {
                                                  "label": "notifications",
                                                  "iconClass": "fa-bell",
                                                  "notifications": 123,
                                                  "metaAction": {}
                                                }
                                              ]
                                            },
                                            {
                                              "templateID": 3,
                                              "secondaryActions": [
                                                {
                                                  "label": "notifications",
                                                  "iconClass": "fa-bell",
                                                  "notifications": 123,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "label": "card controls",
                                                  "iconClass": "fa-unlock",
                                                  "notifications": "",
                                                  "metaAction": {}
                                                },
                                                {
                                                  "label": "find atm",
                                                  "iconClass": "md-zoom-in",
                                                  "notifications": "",
                                                  "metaAction": {}
                                                }
                                              ]
                                            },
                                            {
                                              "templateID": 3,
                                              "secondaryActions": [
                                                {
                                                  "label": "notifications",
                                                  "iconClass": "fa-bell",
                                                  "notifications": 123,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "label": "card controls",
                                                  "iconClass": "fa-unlock",
                                                  "notifications": "",
                                                  "metaAction": {}
                                                },
                                                {
                                                  "label": "find atm",
                                                  "iconClass": "md-zoom-in",
                                                  "notifications": "",
                                                  "metaAction": {}
                                                },
                                                {
                                                  "label": "notifications",
                                                  "iconClass": "fa-bell",
                                                  "notifications": 123,
                                                  "metaAction": {}
                                                },
                                                {
                                                  "label": "card controls",
                                                  "iconClass": "fa-unlock",
                                                  "notifications": "",
                                                  "metaAction": {}
                                                }
                                              ]
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "example - single primary buttons",
                                          "items": [
                                            {
                                              "templateID": 3,
                                              "primaryActions": [
                                                {
                                                  "label": "Primary Button",
                                                  "metaAction": {}
                                                }
                                              ]
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "example - two primary buttons",
                                          "items": [
                                            {
                                              "templateID": 3,
                                              "primaryActions": [
                                                {
                                                  "label": "Primary Button 1",
                                                  "metaAction": {}
                                                },
                                                {
                                                  "label": "Primary Button 2",
                                                  "metaAction": {}
                                                }
                                              ]
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "mar 7, 2019 - thumbnails and titles",
                                          "items": [
                                            {
                                              "templateID": 1,
                                              "leftIcon": "https://logo.clearbit.com/netflix.com",
                                              "title": "Netflix",
                                              "calloutBold": "$10.49",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "leftIcon": "https://logo.clearbit.com/foodlion.com",
                                              "title": "Food Lion",
                                              "subTitle": "Monthly grocery run",
                                              "calloutBold": "$87.54",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                                              "title": "Amazon",
                                              "subTitle": "Feeding my addiction",
                                              "calloutBold": "$149.99",
                                              "metaAction": {}
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "mar 6, 2019 - thumbnails and titles",
                                          "items": [
                                            {
                                              "templateID": 1,
                                              "leftIcon": "https://logo.clearbit.com/target.com",
                                              "title": "Target",
                                              "calloutBold": "$24.49",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                                              "title": "Amazon",
                                              "subTitle": "Feeding my addiction",
                                              "calloutBold": "$149.99",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "leftIcon": "https://logo.clearbit.com/kmart.com",
                                              "title": "Kmart",
                                              "calloutBold": "$87.54",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                                              "title": "Amazon",
                                              "subTitle": "Feeding my addiction",
                                              "calloutBold": "$149.99",
                                              "metaAction": {}
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "example - notification",
                                          "items": [
                                            {
                                              "templateID": 1,
                                              "leftIcon": "https://logo.clearbit.com/capitalone.com",
                                              "title": "Fraud Alert",
                                              "subTitle": "Last updated 2 days ago",
                                              "calloutBold": "Processing",
                                              "metaAction": {}
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "example - icon and paragraph",
                                          "items": [
                                            {
                                              "templateID": 1,
                                              "leftIconClass": "fa-check-circle",
                                              "body": "Helps you establish or rebuild a healthy credit score by allowing you to use your savings as collateral",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "leftIconClass": "fa-check-circle",
                                              "body": "Sign up for free fraud text alerts in Online Banking",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "leftIconClass": "fa-check-circle",
                                              "body": "Manage your account anytime through Online Banking and Mobile Banking",
                                              "metaAction": {}
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "example - key value pairs",
                                          "items": [
                                            {
                                              "templateID": 1,
                                              "name": "purchase apr",
                                              "value": "19.24%",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "name": "cash advance apr",
                                              "value": "26.24%",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "name": "activity since last statement",
                                              "value": "$0.00",
                                              "metaAction": {}
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "example - take action (load page or tile)",
                                          "items": [
                                            {
                                              "templateID": 1,
                                              "modifier": "chevron",
                                              "label": "Action - Open Page",
                                              "metaAction": {}
                                            },
                                            {
                                              "templateID": 1,
                                              "modifier": "chevron",
                                              "label": "Loan Status",
                                              "calloutBold": "Processing",
                                              "metaAction": {}
                                            }
                                          ]
                                        },
                                        {
                                          "headerTitle": "example - form 1 (label & value same line)",
                                          "items": [
                                            {
                                              "templateID": 4,
                                              "type": "money",
                                              "inputID": "currentRate",
                                              "label": "Rate",
                                              "placeholder": "Current Rate"
                                            },
                                            {
                                              "templateID": 4,
                                              "type": "money",
                                              "inputID": "currentBalance",
                                              "label": "Balance",
                                              "placeholder": "Current Balance"
                                            },
                                            {
                                              "templateID": 4,
                                              "type": "money",
                                              "inputID": "monthsRemaining",
                                              "label": "Time Remaining",
                                              "placeholder": "Time Remaining"
                                            },
                                            {
                                              "templateID": 4,
                                              "type": "select",
                                              "label": "Select Score Range",
                                              "inputID": "creditScore",
                                              "options": [
                                                {
                                                  "value": ""
                                                },
                                                {
                                                  "value": "Excellent",
                                                  "label": "Excellent:Above 719"
                                                },
                                                {
                                                  "value": "Very Good",
                                                  "label": "Very Good:680-719"
                                                },
                                                {
                                                  "value": "Good",
                                                  "label": "Good:600-679"
                                                },
                                                {
                                                  "value": "Fair",
                                                  "label": "Fair:540-599"
                                                },
                                                {
                                                  "value": "Poor",
                                                  "label": "Poor:Below 540"
                                                }
                                              ]
                                            }
                                          ]
                                        }
                                      ]
                                    }
                                  }
                                }
                              }
                            }
                          },
                          {
                            "componentID": "",
                            "label": "Action 2",
                            "metaAction": {}
                          }
                        ]
                      }
                    }
                  },
                  "List": {
                    "componentID": "DashboardListContainer",
                    "templateID": "listTemplate",
                    "data": {
                      "results": [
                        {
                          "headerTitle": "example - search control template",
                          "items": [
                            {
                              "templateID": 2,
                              "placeholder": "Search...",
                              "clearIconClass": "fa-times-circle"
                            }
                          ]
                        },
                        {
                          "headerTitle": "mar 7, 2019",
                          "items": [
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/netflix.com",
                              "title": "Netflix",
                              "calloutBold": "$10.49",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/foodlion.com",
                              "title": "Food Lion",
                              "subTitle": "Monthly grocery run",
                              "calloutBold": "$87.54",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                              "title": "Amazon",
                              "subTitle": "Feeding my addiction",
                              "calloutBold": "$149.99",
                              "metaAction": {}
                            }
                          ]
                        },
                        {
                          "headerTitle": "mar 6, 2019",
                          "items": [
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/target.com",
                              "title": "Target",
                              "calloutBold": "$24.49",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                              "title": "Amazon",
                              "subTitle": "Feeding my addiction",
                              "calloutBold": "$149.99",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/kmart.com",
                              "title": "Kmart",
                              "calloutBold": "$87.54",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                              "title": "Amazon",
                              "subTitle": "Feeding my addiction",
                              "calloutBold": "$149.99",
                              "metaAction": {}
                            }
                          ]
                        },
                        {
                          "headerTitle": "mar 5, 2019",
                          "items": [
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/netflix.com",
                              "title": "Netflix",
                              "calloutBold": "$10.49",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/foodlion.com",
                              "title": "Food Lion",
                              "subTitle": "Monthly grocery run",
                              "calloutBold": "$87.54",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                              "title": "Amazon",
                              "subTitle": "Feeding my addiction",
                              "calloutBold": "$149.99",
                              "metaAction": {}
                            }
                          ]
                        },
                        {
                          "headerTitle": "mar 4, 2019",
                          "items": [
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/target.com",
                              "title": "Target",
                              "calloutBold": "$24.49",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                              "title": "Amazon",
                              "subTitle": "Feeding my addiction",
                              "calloutBold": "$149.99",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/kmart.com",
                              "title": "Kmart",
                              "calloutBold": "$87.54",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                              "title": "Amazon",
                              "subTitle": "Feeding my addiction",
                              "calloutBold": "$149.99",
                              "metaAction": {}
                            }
                          ]
                        },
                        {
                          "headerTitle": "mar 3, 2019",
                          "items": [
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/netflix.com",
                              "title": "Netflix",
                              "calloutBold": "$10.49",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/foodlion.com",
                              "title": "Food Lion",
                              "subTitle": "Monthly grocery run",
                              "calloutBold": "$87.54",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                              "title": "Amazon",
                              "subTitle": "Feeding my addiction",
                              "calloutBold": "$149.99",
                              "metaAction": {}
                            }
                          ]
                        },
                        {
                          "headerTitle": "mar 2, 2019",
                          "items": [
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/target.com",
                              "title": "Target",
                              "calloutBold": "$24.49",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                              "title": "Amazon",
                              "subTitle": "Feeding my addiction",
                              "calloutBold": "$149.99",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/kmart.com",
                              "title": "Kmart",
                              "calloutBold": "$87.54",
                              "metaAction": {}
                            },
                            {
                              "templateID": 1,
                              "leftIcon": "https://logo.clearbit.com/amazon.com",
                              "title": "Amazon",
                              "subTitle": "Feeding my addiction",
                              "calloutBold": "$149.99",
                              "metaAction": {}
                            }
                          ]
                        }
                      ]
                    }
                  },
                  "BottomBar": {
                    "componentID": "DashboardBottomBarContainer",
                    "templateID": "bottomBarTemplate",
                    "data": {
                      "callOut": "$220.71 total, $27,589.00 average",
                      "iconClass": "ion-ios-download-outline",
                      "metaAction": {}
                    }
                  }
                }
              }
            }
          }
          
        };
        callbackFunc(response);
      };
      container.connectors.sendRequest = (connname: string, connversion: string, connmethod: string, requestParams: any, callbackFunc: any) => {
        console.info("FROM LOCAL");
        let url = "";
        let method = "";
    
        // load connector config json file
        container.tile.data.loadJsonFile("mock_connectorConfig.json", (data: any) => {
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
    }
    
    export default container;
    