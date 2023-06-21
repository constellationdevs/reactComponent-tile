container.tile.data.getOpenData = (callbackFunc) => {
    console.log("get open data local");
    const response = {
      success: false,
      data: {
        opendata: {
          actionType: 3,
          pageName: "Landing",
          component: "LandingPage",
          openData: {
            data: {
              componentId: 1,
            },
          },
        },
      },
    };
    callbackFunc(response);
  };