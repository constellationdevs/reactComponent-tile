/** ************************************************************************
 * CONSOLE LOG Override
 ***************************************************************************/

const LogLevel = {
    OFF: 99,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
  
  }
  
  window.console = (function (origConsole) {
  
    if (!window.console || !origConsole) {
        origConsole = {};
    }
    let configLevel = LogLevel["OFF"];
  
  
    return {
        log: function () {
            if (tile.tileConfig && tile.tileConfig.config) {
                configLevel = LogLevel[tile.tileConfig.config.loglevel];
            }
            (localHost || configLevel === 1) && origConsole.log && origConsole.log.apply(origConsole, arguments);
        },
        info: function () {
            if (tile.tileConfig && tile.tileConfig.config) {
                configLevel = LogLevel[tile.tileConfig.config.loglevel];
            }
            (localHost || configLevel === 1) && origConsole.info && origConsole.info.apply(origConsole, arguments);
        },
        warn: function () {
            if (tile.tileConfig && tile.tileConfig.config) {
                configLevel = LogLevel[tile.tileConfig.config.loglevel];
            }
            (localHost || configLevel <= 2) && origConsole.warn && origConsole.warn.apply(origConsole, arguments);
        },
        error: function () {
            if (tile.tileConfig && tile.tileConfig.config) {
                configLevel = LogLevel[tile.tileConfig.config.loglevel];
            }
            (localHost || configLevel <= 3) && origConsole.error && origConsole.error.apply(origConsole, arguments);
        },
  
  
    };
  
  }(window.console));
  /** ************************************************************************
  * END: CONSOLE LOG Override
  ***************************************************************************/