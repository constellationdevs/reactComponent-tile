/* eslint-disable no-var */
var localHost = location.hostname === "localhost";

var tile = {
  data: {},
  str: {},
  tileConfig: {},

  getNav: function () {
    return document.getElementById("AppNavigator");
  },
  popPanel: function () {
    consolelog("popPanel");
    tile.getNav().popPage();
  },
  resetStack: function () {
    tile.getNav().resetPage();
  },
  dollarify: function (price) {
    if (price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2
      }).format(price);
    } else {
      return null;
    }
  },
  stickyHeaderInit: function (pageName) {
    var $stickies;

    var stickies = $("#" + pageName + " .sticky");
    // console.log(stickies);

    if (stickies.length > 0) {
      // console.log("sticky length greater than zero")
      $stickies = stickies.each(function () {

        let $thisSticky;

        if (!$(this).parent().hasClass("followWrap")) {
          $thisSticky = $(this).wrap('<div class="followWrap" />');
        } else {
          // console.log("parent found")
          $thisSticky = $(this)
        }
        $thisSticky
          .data('originalPosition', $thisSticky.offset().top)
          .data('originalHeight', $thisSticky.outerHeight())
          .parent()
          .height($thisSticky.outerHeight());

      });


    }
    return $stickies;
  },
  stickyHeaderScroll: function (pageName, heroHeight, stickies) {
    var scrollingPosition = $("#" + pageName + " .cdp_page_container ").scrollTop();
    var smallHeroHeight = document.querySelector(".cdp_hero").offsetHeight;
    var searchIcon = $("#" + pageName + " .cdp_page_container .search-icon");

    if (scrollingPosition != 0) {
      stickies.each(function (i) {


        var $thisSticky = $(this);
        var $stickyPosition = $thisSticky.data('originalPosition');
        if ($stickyPosition <= (heroHeight + scrollingPosition)) {

          var $nextSticky = stickies.eq(i + 1);

          var $nextStickyPosition = $nextSticky.data('originalPosition') - $thisSticky.data('originalHeight');


          // TODO figure out why this isn't dynamically setting the top value ?
          // create an "override" for native and desktop for the stickyFixed css class and add the top value there
          // the hero is a fixed height for each so that ok
          $thisSticky.addClass("stickyFixed");
          // $thisSticky.css("top", heroHeight); // this works everywhere but here!!


          if ($nextSticky.length > 0 && (scrollingPosition + $thisSticky.offset().top + heroHeight) >= $nextStickyPosition) {

            var topPos = $nextStickyPosition;
            $thisSticky.addClass("stickyAbsolute")
              .css("top", smallHeroHeight);

          }

        } else {
          var $prevSticky = stickies.eq(i - 1);

          $thisSticky.removeClass("stickyFixed");

          if ($prevSticky.length > 0 && (scrollingPosition + smallHeroHeight) <= ($thisSticky.data('originalPosition') - $thisSticky.data('originalHeight'))) {
            $prevSticky.removeClass("stickyAbsolute").removeAttr("style");
          }
        }
      });
    } else {
      stickies.each(function (i) {
        var $thisSticky = $(this);
        $thisSticky.removeClass("stickyFixed").removeClass("stickyAbsolute").removeAttr("style");
      });
    }
  }
};
