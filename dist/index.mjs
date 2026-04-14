import { createRequire as __bannerCrReq } from 'node:module';
import __bannerPath from 'node:path';
import __bannerUrl from 'node:url';
globalThis.require = __bannerCrReq(import.meta.url);
globalThis.__filename = __bannerUrl.fileURLToPath(import.meta.url);
globalThis.__dirname = __bannerPath.dirname(globalThis.__filename);

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc2) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc2 = __getOwnPropDesc(from, key)) || desc2.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-helpers.js
var require_err_helpers = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-helpers.js"(exports, module) {
    "use strict";
    var isErrorLike = (err) => {
      return err && typeof err.message === "string";
    };
    var getErrorCause = (err) => {
      if (!err) return;
      const cause = err.cause;
      if (typeof cause === "function") {
        const causeResult = err.cause();
        return isErrorLike(causeResult) ? causeResult : void 0;
      } else {
        return isErrorLike(cause) ? cause : void 0;
      }
    };
    var _stackWithCauses = (err, seen) => {
      if (!isErrorLike(err)) return "";
      const stack = err.stack || "";
      if (seen.has(err)) {
        return stack + "\ncauses have become circular...";
      }
      const cause = getErrorCause(err);
      if (cause) {
        seen.add(err);
        return stack + "\ncaused by: " + _stackWithCauses(cause, seen);
      } else {
        return stack;
      }
    };
    var stackWithCauses = (err) => _stackWithCauses(err, /* @__PURE__ */ new Set());
    var _messageWithCauses = (err, seen, skip) => {
      if (!isErrorLike(err)) return "";
      const message = skip ? "" : err.message || "";
      if (seen.has(err)) {
        return message + ": ...";
      }
      const cause = getErrorCause(err);
      if (cause) {
        seen.add(err);
        const skipIfVErrorStyleCause = typeof err.cause === "function";
        return message + (skipIfVErrorStyleCause ? "" : ": ") + _messageWithCauses(cause, seen, skipIfVErrorStyleCause);
      } else {
        return message;
      }
    };
    var messageWithCauses = (err) => _messageWithCauses(err, /* @__PURE__ */ new Set());
    module.exports = {
      isErrorLike,
      getErrorCause,
      stackWithCauses,
      messageWithCauses
    };
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-proto.js
var require_err_proto = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-proto.js"(exports, module) {
    "use strict";
    var seen = /* @__PURE__ */ Symbol("circular-ref-tag");
    var rawSymbol = /* @__PURE__ */ Symbol("pino-raw-err-ref");
    var pinoErrProto = Object.create({}, {
      type: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      message: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      stack: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      aggregateErrors: {
        enumerable: true,
        writable: true,
        value: void 0
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoErrProto, rawSymbol, {
      writable: true,
      value: {}
    });
    module.exports = {
      pinoErrProto,
      pinoErrorSymbols: {
        seen,
        rawSymbol
      }
    };
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err.js
var require_err = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err.js"(exports, module) {
    "use strict";
    module.exports = errSerializer;
    var { messageWithCauses, stackWithCauses, isErrorLike } = require_err_helpers();
    var { pinoErrProto, pinoErrorSymbols } = require_err_proto();
    var { seen } = pinoErrorSymbols;
    var { toString } = Object.prototype;
    function errSerializer(err) {
      if (!isErrorLike(err)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = messageWithCauses(err);
      _err.stack = stackWithCauses(err);
      if (Array.isArray(err.errors)) {
        _err.aggregateErrors = err.errors.map((err2) => errSerializer(err2));
      }
      for (const key in err) {
        if (_err[key] === void 0) {
          const val = err[key];
          if (isErrorLike(val)) {
            if (key !== "cause" && !Object.prototype.hasOwnProperty.call(val, seen)) {
              _err[key] = errSerializer(val);
            }
          } else {
            _err[key] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-with-cause.js
var require_err_with_cause = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/err-with-cause.js"(exports, module) {
    "use strict";
    module.exports = errWithCauseSerializer;
    var { isErrorLike } = require_err_helpers();
    var { pinoErrProto, pinoErrorSymbols } = require_err_proto();
    var { seen } = pinoErrorSymbols;
    var { toString } = Object.prototype;
    function errWithCauseSerializer(err) {
      if (!isErrorLike(err)) {
        return err;
      }
      err[seen] = void 0;
      const _err = Object.create(pinoErrProto);
      _err.type = toString.call(err.constructor) === "[object Function]" ? err.constructor.name : err.name;
      _err.message = err.message;
      _err.stack = err.stack;
      if (Array.isArray(err.errors)) {
        _err.aggregateErrors = err.errors.map((err2) => errWithCauseSerializer(err2));
      }
      if (isErrorLike(err.cause) && !Object.prototype.hasOwnProperty.call(err.cause, seen)) {
        _err.cause = errWithCauseSerializer(err.cause);
      }
      for (const key in err) {
        if (_err[key] === void 0) {
          const val = err[key];
          if (isErrorLike(val)) {
            if (!Object.prototype.hasOwnProperty.call(val, seen)) {
              _err[key] = errWithCauseSerializer(val);
            }
          } else {
            _err[key] = val;
          }
        }
      }
      delete err[seen];
      _err.raw = err;
      return _err;
    }
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/req.js
var require_req = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/req.js"(exports, module) {
    "use strict";
    module.exports = {
      mapHttpRequest,
      reqSerializer
    };
    var rawSymbol = /* @__PURE__ */ Symbol("pino-raw-req-ref");
    var pinoReqProto = Object.create({}, {
      id: {
        enumerable: true,
        writable: true,
        value: ""
      },
      method: {
        enumerable: true,
        writable: true,
        value: ""
      },
      url: {
        enumerable: true,
        writable: true,
        value: ""
      },
      query: {
        enumerable: true,
        writable: true,
        value: ""
      },
      params: {
        enumerable: true,
        writable: true,
        value: ""
      },
      headers: {
        enumerable: true,
        writable: true,
        value: {}
      },
      remoteAddress: {
        enumerable: true,
        writable: true,
        value: ""
      },
      remotePort: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoReqProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function reqSerializer(req) {
      const connection = req.info || req.socket;
      const _req = Object.create(pinoReqProto);
      _req.id = typeof req.id === "function" ? req.id() : req.id || (req.info ? req.info.id : void 0);
      _req.method = req.method;
      if (req.originalUrl) {
        _req.url = req.originalUrl;
      } else {
        const path = req.path;
        _req.url = typeof path === "string" ? path : req.url ? req.url.path || req.url : void 0;
      }
      if (req.query) {
        _req.query = req.query;
      }
      if (req.params) {
        _req.params = req.params;
      }
      _req.headers = req.headers;
      _req.remoteAddress = connection && connection.remoteAddress;
      _req.remotePort = connection && connection.remotePort;
      _req.raw = req.raw || req;
      return _req;
    }
    function mapHttpRequest(req) {
      return {
        req: reqSerializer(req)
      };
    }
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/res.js
var require_res = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/lib/res.js"(exports, module) {
    "use strict";
    module.exports = {
      mapHttpResponse,
      resSerializer
    };
    var rawSymbol = /* @__PURE__ */ Symbol("pino-raw-res-ref");
    var pinoResProto = Object.create({}, {
      statusCode: {
        enumerable: true,
        writable: true,
        value: 0
      },
      headers: {
        enumerable: true,
        writable: true,
        value: ""
      },
      raw: {
        enumerable: false,
        get: function() {
          return this[rawSymbol];
        },
        set: function(val) {
          this[rawSymbol] = val;
        }
      }
    });
    Object.defineProperty(pinoResProto, rawSymbol, {
      writable: true,
      value: {}
    });
    function resSerializer(res) {
      const _res = Object.create(pinoResProto);
      _res.statusCode = res.headersSent ? res.statusCode : null;
      _res.headers = res.getHeaders ? res.getHeaders() : res._headers;
      _res.raw = res;
      return _res;
    }
    function mapHttpResponse(res) {
      return {
        res: resSerializer(res)
      };
    }
  }
});

// ../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/index.js
var require_pino_std_serializers = __commonJS({
  "../../node_modules/.pnpm/pino-std-serializers@7.1.0/node_modules/pino-std-serializers/index.js"(exports, module) {
    "use strict";
    var errSerializer = require_err();
    var errWithCauseSerializer = require_err_with_cause();
    var reqSerializers = require_req();
    var resSerializers = require_res();
    module.exports = {
      err: errSerializer,
      errWithCause: errWithCauseSerializer,
      mapHttpRequest: reqSerializers.mapHttpRequest,
      mapHttpResponse: resSerializers.mapHttpResponse,
      req: reqSerializers.reqSerializer,
      res: resSerializers.resSerializer,
      wrapErrorSerializer: function wrapErrorSerializer(customSerializer) {
        if (customSerializer === errSerializer) return customSerializer;
        return function wrapErrSerializer(err) {
          return customSerializer(errSerializer(err));
        };
      },
      wrapRequestSerializer: function wrapRequestSerializer(customSerializer) {
        if (customSerializer === reqSerializers.reqSerializer) return customSerializer;
        return function wrappedReqSerializer(req) {
          return customSerializer(reqSerializers.reqSerializer(req));
        };
      },
      wrapResponseSerializer: function wrapResponseSerializer(customSerializer) {
        if (customSerializer === resSerializers.resSerializer) return customSerializer;
        return function wrappedResSerializer(res) {
          return customSerializer(resSerializers.resSerializer(res));
        };
      }
    };
  }
});

// ../../node_modules/.pnpm/get-caller-file@2.0.5/node_modules/get-caller-file/index.js
var require_get_caller_file = __commonJS({
  "../../node_modules/.pnpm/get-caller-file@2.0.5/node_modules/get-caller-file/index.js"(exports, module) {
    "use strict";
    module.exports = function getCallerFile(position) {
      if (position === void 0) {
        position = 2;
      }
      if (position >= Error.stackTraceLimit) {
        throw new TypeError("getCallerFile(position) requires position be less then Error.stackTraceLimit but position was: `" + position + "` and Error.stackTraceLimit was: `" + Error.stackTraceLimit + "`");
      }
      var oldPrepareStackTrace = Error.prepareStackTrace;
      Error.prepareStackTrace = function(_, stack2) {
        return stack2;
      };
      var stack = new Error().stack;
      Error.prepareStackTrace = oldPrepareStackTrace;
      if (stack !== null && typeof stack === "object") {
        return stack[position] ? stack[position].getFileName() : void 0;
      }
    };
  }
});

// ../../node_modules/.pnpm/pino-http@10.5.0/node_modules/pino-http/logger.js
var require_logger = __commonJS({
  "../../node_modules/.pnpm/pino-http@10.5.0/node_modules/pino-http/logger.js"(exports, module) {
    "use strict";
    var { pino: pino2, symbols: { stringifySym, chindingsSym } } = __require("pino");
    var serializers = require_pino_std_serializers();
    var getCallerFile = require_get_caller_file();
    var startTime = /* @__PURE__ */ Symbol("startTime");
    var reqObject = /* @__PURE__ */ Symbol("reqObject");
    function pinoLogger(opts, stream) {
      if (opts && opts._writableState) {
        stream = opts;
        opts = null;
      }
      opts = Object.assign({}, opts);
      opts.customAttributeKeys = opts.customAttributeKeys || {};
      const reqKey = opts.customAttributeKeys.req || "req";
      const resKey = opts.customAttributeKeys.res || "res";
      const errKey = opts.customAttributeKeys.err || "err";
      const requestIdKey = opts.customAttributeKeys.reqId || "reqId";
      const responseTimeKey = opts.customAttributeKeys.responseTime || "responseTime";
      delete opts.customAttributeKeys;
      const customProps = opts.customProps || void 0;
      opts.wrapSerializers = "wrapSerializers" in opts ? opts.wrapSerializers : true;
      if (opts.wrapSerializers) {
        opts.serializers = Object.assign({}, opts.serializers);
        const requestSerializer = opts.serializers[reqKey] || opts.serializers.req || serializers.req;
        const responseSerializer = opts.serializers[resKey] || opts.serializers.res || serializers.res;
        const errorSerializer = opts.serializers[errKey] || opts.serializers.err || serializers.err;
        opts.serializers[reqKey] = serializers.wrapRequestSerializer(requestSerializer);
        opts.serializers[resKey] = serializers.wrapResponseSerializer(responseSerializer);
        opts.serializers[errKey] = serializers.wrapErrorSerializer(errorSerializer);
      }
      delete opts.wrapSerializers;
      if (opts.useLevel && opts.customLogLevel) {
        throw new Error("You can't pass 'useLevel' and 'customLogLevel' together");
      }
      function getValidLogLevel(level, defaultValue = "info") {
        if (level && typeof level === "string") {
          const logLevel = level.trim();
          if (validLogLevels.includes(logLevel) === true) {
            return logLevel;
          }
        }
        return defaultValue;
      }
      function getLogLevelFromCustomLogLevel(customLogLevel2, useLevel2, res, err, req) {
        return customLogLevel2 ? getValidLogLevel(customLogLevel2(req, res, err), useLevel2) : useLevel2;
      }
      const customLogLevel = opts.customLogLevel;
      delete opts.customLogLevel;
      const theStream = opts.stream || stream;
      delete opts.stream;
      const autoLogging = opts.autoLogging !== false;
      const autoLoggingIgnore = opts.autoLogging && opts.autoLogging.ignore ? opts.autoLogging.ignore : null;
      delete opts.autoLogging;
      const onRequestReceivedObject = getFunctionOrDefault(opts.customReceivedObject, void 0);
      const receivedMessage = getFunctionOrDefault(opts.customReceivedMessage, void 0);
      const onRequestSuccessObject = getFunctionOrDefault(opts.customSuccessObject, defaultSuccessfulRequestObjectProvider);
      const successMessage = getFunctionOrDefault(opts.customSuccessMessage, defaultSuccessfulRequestMessageProvider);
      const onRequestErrorObject = getFunctionOrDefault(opts.customErrorObject, defaultFailedRequestObjectProvider);
      const errorMessage = getFunctionOrDefault(opts.customErrorMessage, defaultFailedRequestMessageProvider);
      delete opts.customSuccessfulMessage;
      delete opts.customErroredMessage;
      const quietReqLogger = !!opts.quietReqLogger;
      const quietResLogger = !!opts.quietResLogger;
      const logger2 = wrapChild(opts, theStream);
      const validLogLevels = Object.keys(logger2.levels.values).concat("silent");
      const useLevel = getValidLogLevel(opts.useLevel);
      delete opts.useLevel;
      const genReqId = reqIdGenFactory(opts.genReqId);
      const result = (req, res, next) => {
        return loggingMiddleware(logger2, req, res, next);
      };
      result.logger = logger2;
      return result;
      function onResFinished(res, logger3, err) {
        let log = logger3;
        const responseTime = Date.now() - res[startTime];
        const req = res[reqObject];
        const level = getLogLevelFromCustomLogLevel(customLogLevel, useLevel, res, err, req);
        if (level === "silent") {
          return;
        }
        const customPropBindings = typeof customProps === "function" ? customProps(req, res) : customProps;
        if (customPropBindings) {
          const customPropBindingStr = logger3[stringifySym](customPropBindings).replace(/[{}]/g, "");
          const customPropBindingsStr = logger3[chindingsSym];
          if (!customPropBindingsStr.includes(customPropBindingStr)) {
            log = logger3.child(customPropBindings);
          }
        }
        if (err || res.err || res.statusCode >= 500) {
          const error = err || res.err || new Error("failed with status code " + res.statusCode);
          log[level](
            onRequestErrorObject(req, res, error, {
              [resKey]: res,
              [errKey]: error,
              [responseTimeKey]: responseTime
            }),
            errorMessage(req, res, error, responseTime)
          );
          return;
        }
        log[level](
          onRequestSuccessObject(req, res, {
            [resKey]: res,
            [responseTimeKey]: responseTime
          }),
          successMessage(req, res, responseTime)
        );
      }
      function loggingMiddleware(logger3, req, res, next) {
        let shouldLogSuccess = true;
        req.id = req.id || genReqId(req, res);
        const log = quietReqLogger ? logger3.child({ [requestIdKey]: req.id }) : logger3;
        let fullReqLogger = log.child({ [reqKey]: req });
        const customPropBindings = typeof customProps === "function" ? customProps(req, res) : customProps;
        if (customPropBindings) {
          fullReqLogger = fullReqLogger.child(customPropBindings);
        }
        const responseLogger = quietResLogger ? log : fullReqLogger;
        const requestLogger = quietReqLogger ? log : fullReqLogger;
        if (!res.log) {
          res.log = responseLogger;
        }
        if (Array.isArray(res.allLogs) === false) {
          res.allLogs = [];
        }
        res.allLogs.push(responseLogger);
        if (!req.log) {
          req.log = requestLogger;
        }
        if (!req.allLogs) {
          req.allLogs = [];
        }
        req.allLogs.push(requestLogger);
        res[startTime] = res[startTime] || Date.now();
        res[reqObject] = req;
        const onResponseComplete = (err) => {
          res.removeListener("close", onResponseComplete);
          res.removeListener("finish", onResponseComplete);
          res.removeListener("error", onResponseComplete);
          return onResFinished(res, responseLogger, err);
        };
        if (autoLogging) {
          if (autoLoggingIgnore !== null && shouldLogSuccess === true) {
            const isIgnored = autoLoggingIgnore(req);
            shouldLogSuccess = !isIgnored;
          }
          if (shouldLogSuccess) {
            const shouldLogReceived = receivedMessage !== void 0 || onRequestReceivedObject !== void 0;
            if (shouldLogReceived) {
              const level = getLogLevelFromCustomLogLevel(customLogLevel, useLevel, res, void 0, req);
              const receivedObjectResult = onRequestReceivedObject !== void 0 ? onRequestReceivedObject(req, res, void 0) : {};
              const receivedStringResult = receivedMessage !== void 0 ? receivedMessage(req, res) : void 0;
              requestLogger[level](receivedObjectResult, receivedStringResult);
            }
            res.on("close", onResponseComplete);
            res.on("finish", onResponseComplete);
          }
          res.on("error", onResponseComplete);
        }
        if (next) {
          next();
        }
      }
    }
    function wrapChild(opts, stream) {
      const prevLogger = opts.logger;
      const prevGenReqId = opts.genReqId;
      let logger2 = null;
      if (prevLogger) {
        opts.logger = void 0;
        opts.genReqId = void 0;
        logger2 = prevLogger.child({}, opts);
        opts.logger = prevLogger;
        opts.genReqId = prevGenReqId;
      } else {
        if (opts.transport && !opts.transport.caller) {
          opts.transport.caller = getCallerFile();
        }
        logger2 = pino2(opts, stream);
      }
      return logger2;
    }
    function reqIdGenFactory(func) {
      if (typeof func === "function") return func;
      const maxInt = 2147483647;
      let nextReqId = 0;
      return function genReqId(req, res) {
        return req.id || (nextReqId = nextReqId + 1 & maxInt);
      };
    }
    function getFunctionOrDefault(value, defaultValue) {
      if (value && typeof value === "function") {
        return value;
      }
      return defaultValue;
    }
    function defaultSuccessfulRequestObjectProvider(req, res, successObject) {
      return successObject;
    }
    function defaultFailedRequestObjectProvider(req, res, error, errorObject) {
      return errorObject;
    }
    function defaultFailedRequestMessageProvider() {
      return "request errored";
    }
    function defaultSuccessfulRequestMessageProvider(req, res) {
      return !req.readableAborted && res.writableEnded ? "request completed" : "request aborted";
    }
    module.exports = pinoLogger;
    module.exports.stdSerializers = {
      err: serializers.err,
      req: serializers.req,
      res: serializers.res
    };
    module.exports.startTime = startTime;
    module.exports.default = pinoLogger;
    module.exports.pinoHttp = pinoLogger;
  }
});

// src/app.ts
var import_pino_http = __toESM(require_logger(), 1);
import express from "express";
import cors from "cors";
import session from "express-session";

// src/routes/index.ts
import { Router as Router8 } from "express";

// src/routes/health.ts
import { Router } from "express";

// ../../lib/api-zod/src/generated/api.ts
import * as zod from "zod";
var HealthCheckResponse = zod.object({
  status: zod.string()
});
var ListCategoriesResponseItem = zod.object({
  id: zod.number(),
  name: zod.string(),
  slug: zod.string(),
  icon: zod.string(),
  description: zod.string().optional(),
  productCount: zod.number().optional()
});
var ListCategoriesResponse = zod.array(ListCategoriesResponseItem);
var ListProductsQueryParams = zod.object({
  categoryId: zod.coerce.number().optional().describe("Filter by category"),
  isBio: zod.coerce.boolean().optional().describe("Filter bio products"),
  isVegan: zod.coerce.boolean().optional().describe("Filter vegan products"),
  search: zod.coerce.string().optional().describe("Search by name"),
  sort: zod.enum(["relevance", "price_asc", "price_desc", "name_asc"]).optional().describe("Sort order"),
  featured: zod.coerce.boolean().optional().describe("Only featured products")
});
var ListProductsResponseItem = zod.object({
  id: zod.number(),
  name: zod.string(),
  brand: zod.string(),
  categoryId: zod.number(),
  categoryName: zod.string(),
  description: zod.string().optional(),
  price: zod.number(),
  originalPrice: zod.number().nullish(),
  imageUrl: zod.string(),
  quantity: zod.string(),
  isBio: zod.boolean(),
  isVegan: zod.boolean(),
  isFeatured: zod.boolean(),
  discountPercent: zod.number().nullish(),
  inStock: zod.boolean()
});
var ListProductsResponse = zod.array(ListProductsResponseItem);
var GetProductParams = zod.object({
  id: zod.coerce.number()
});
var GetProductResponse = zod.object({
  id: zod.number(),
  name: zod.string(),
  brand: zod.string(),
  categoryId: zod.number(),
  categoryName: zod.string(),
  description: zod.string().optional(),
  price: zod.number(),
  originalPrice: zod.number().nullish(),
  imageUrl: zod.string(),
  quantity: zod.string(),
  isBio: zod.boolean(),
  isVegan: zod.boolean(),
  isFeatured: zod.boolean(),
  discountPercent: zod.number().nullish(),
  inStock: zod.boolean()
});
var ListBookingsQueryParams = zod.object({
  date: zod.date().optional().describe("Date to get slots for (YYYY-MM-DD)")
});
var ListBookingsResponse = zod.object({
  date: zod.date(),
  slots: zod.array(
    zod.object({
      time: zod.string(),
      available: zod.boolean()
    })
  )
});
var CreateBookingBody = zod.object({
  consultationType: zod.enum(["alimentare", "fitoterapica"]),
  date: zod.date(),
  time: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  notes: zod.string().nullish()
});
var SubmitContactBody = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string().nullish(),
  subject: zod.string(),
  message: zod.string()
});
var ListGiftPackagesResponseItem = zod.object({
  id: zod.number(),
  name: zod.string(),
  description: zod.string(),
  imageUrl: zod.string(),
  basePrice: zod.number(),
  maxProducts: zod.number(),
  isChristmas: zod.boolean()
});
var ListGiftPackagesResponse = zod.array(ListGiftPackagesResponseItem);

// src/routes/health.ts
var router = Router();
router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});
var health_default = router;

// src/routes/categories.ts
import { Router as Router2 } from "express";

// ../../lib/db/src/index.ts
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

// ../../lib/db/src/schema/index.ts
var schema_exports = {};
__export(schema_exports, {
  bookingsTable: () => bookingsTable,
  categoriesTable: () => categoriesTable,
  contactsTable: () => contactsTable,
  giftPackagesTable: () => giftPackagesTable,
  insertBookingSchema: () => insertBookingSchema,
  insertCategorySchema: () => insertCategorySchema,
  insertContactSchema: () => insertContactSchema,
  insertGiftPackageSchema: () => insertGiftPackageSchema,
  insertProductSchema: () => insertProductSchema,
  insertUserSchema: () => insertUserSchema,
  loginSchema: () => loginSchema,
  productsTable: () => productsTable,
  usersTable: () => usersTable
});

// ../../lib/db/src/schema/categories.ts
import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  icon: text("icon").notNull(),
  description: text("description"),
  productCount: integer("product_count").notNull().default(0),
  parentId: integer("parent_id"),
  sortOrder: integer("sort_order").notNull().default(0)
});
var insertCategorySchema = createInsertSchema(categoriesTable).omit({ id: true });

// ../../lib/db/src/schema/products.ts
import { pgTable as pgTable2, serial as serial2, text as text2, integer as integer2, numeric, boolean as boolean2 } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema2 } from "drizzle-zod";
var productsTable = pgTable2("products", {
  id: serial2("id").primaryKey(),
  name: text2("name").notNull(),
  brand: text2("brand").notNull(),
  categoryId: integer2("category_id").notNull(),
  categoryName: text2("category_name").notNull(),
  description: text2("description"),
  price: numeric("price", { precision: 10, scale: 2 }).notNull(),
  originalPrice: numeric("original_price", { precision: 10, scale: 2 }),
  imageUrl: text2("image_url").notNull(),
  quantity: text2("quantity").notNull(),
  isBio: boolean2("is_bio").notNull().default(false),
  isVegan: boolean2("is_vegan").notNull().default(false),
  isFeatured: boolean2("is_featured").notNull().default(false),
  discountPercent: integer2("discount_percent"),
  inStock: boolean2("in_stock").notNull().default(true)
});
var insertProductSchema = createInsertSchema2(productsTable).omit({ id: true });

// ../../lib/db/src/schema/bookings.ts
import { pgTable as pgTable3, serial as serial3, text as text3, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema3 } from "drizzle-zod";
var bookingsTable = pgTable3("bookings", {
  id: serial3("id").primaryKey(),
  consultationType: text3("consultation_type").notNull(),
  date: text3("date").notNull(),
  time: text3("time").notNull(),
  firstName: text3("first_name").notNull(),
  lastName: text3("last_name").notNull(),
  email: text3("email").notNull(),
  phone: text3("phone").notNull(),
  notes: text3("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow()
});
var insertBookingSchema = createInsertSchema3(bookingsTable).omit({ id: true, createdAt: true });

// ../../lib/db/src/schema/contacts.ts
import { pgTable as pgTable4, serial as serial4, text as text4, timestamp as timestamp2 } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema4 } from "drizzle-zod";
var contactsTable = pgTable4("contacts", {
  id: serial4("id").primaryKey(),
  name: text4("name").notNull(),
  email: text4("email").notNull(),
  phone: text4("phone"),
  subject: text4("subject").notNull(),
  message: text4("message").notNull(),
  createdAt: timestamp2("created_at").notNull().defaultNow()
});
var insertContactSchema = createInsertSchema4(contactsTable).omit({ id: true, createdAt: true });

// ../../lib/db/src/schema/gift_packages.ts
import { pgTable as pgTable5, serial as serial5, text as text5, numeric as numeric2, integer as integer3, boolean as boolean3 } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema5 } from "drizzle-zod";
var giftPackagesTable = pgTable5("gift_packages", {
  id: serial5("id").primaryKey(),
  name: text5("name").notNull(),
  description: text5("description").notNull(),
  imageUrl: text5("image_url").notNull(),
  basePrice: numeric2("base_price", { precision: 10, scale: 2 }).notNull(),
  maxProducts: integer3("max_products").notNull().default(5),
  isChristmas: boolean3("is_christmas").notNull().default(false)
});
var insertGiftPackageSchema = createInsertSchema5(giftPackagesTable).omit({ id: true });

// ../../lib/db/src/schema/users.ts
import { pgTable as pgTable6, serial as serial6, text as text6, timestamp as timestamp3 } from "drizzle-orm/pg-core";
import { createInsertSchema as createInsertSchema6 } from "drizzle-zod";
import { z } from "zod/v4";
var usersTable = pgTable6("users", {
  id: serial6("id").primaryKey(),
  name: text6("name").notNull(),
  email: text6("email").notNull().unique(),
  passwordHash: text6("password_hash").notNull(),
  createdAt: timestamp3("created_at").defaultNow().notNull()
});
var insertUserSchema = createInsertSchema6(usersTable).omit({ id: true, createdAt: true, passwordHash: true }).extend({
  password: z.string().min(8, "La password deve avere almeno 8 caratteri")
});
var loginSchema = z.object({
  email: z.email("Email non valida"),
  password: z.string().min(1, "Password richiesta")
});

// ../../lib/db/src/index.ts
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}
var pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
var db = drizzle(pool, { schema: schema_exports });

// src/routes/categories.ts
import { eq, sql } from "drizzle-orm";
var router2 = Router2();
router2.get("/categories", async (req, res) => {
  try {
    const allCategories = await db.select({
      id: categoriesTable.id,
      name: categoriesTable.name,
      slug: categoriesTable.slug,
      icon: categoriesTable.icon,
      description: categoriesTable.description,
      parentId: categoriesTable.parentId,
      sortOrder: categoriesTable.sortOrder,
      productCount: sql`COUNT(${productsTable.id})::int`
    }).from(categoriesTable).leftJoin(productsTable, eq(productsTable.categoryId, categoriesTable.id)).groupBy(categoriesTable.id).orderBy(categoriesTable.sortOrder);
    res.json(allCategories);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch categories");
    res.status(500).json({ message: "Errore interno del server" });
  }
});
var categories_default = router2;

// src/routes/products.ts
import { Router as Router3 } from "express";
import { eq as eq2, and, ilike, asc, desc, sql as sql2, inArray } from "drizzle-orm";
var router3 = Router3();
function parseProduct(p) {
  return {
    ...p,
    price: parseFloat(p.price),
    originalPrice: p.originalPrice != null ? parseFloat(p.originalPrice) : null
  };
}
router3.get("/products", async (req, res) => {
  try {
    const { categoryId, parentCategoryId, isBio, isVegan, search, sort, featured } = req.query;
    let conditions = [];
    if (categoryId) {
      conditions.push(eq2(productsTable.categoryId, Number(categoryId)));
    }
    if (parentCategoryId && !categoryId) {
      const subcats = await db.select({ id: categoriesTable.id }).from(categoriesTable).where(eq2(categoriesTable.parentId, Number(parentCategoryId)));
      const subIds = subcats.map((s) => s.id);
      const allIds = [...subIds, Number(parentCategoryId)];
      if (allIds.length > 0) {
        conditions.push(inArray(productsTable.categoryId, allIds));
      }
    }
    if (isBio === "true") {
      conditions.push(eq2(productsTable.isBio, true));
    }
    if (isVegan === "true") {
      conditions.push(eq2(productsTable.isVegan, true));
    }
    if (search && typeof search === "string") {
      conditions.push(ilike(productsTable.name, `%${search}%`));
    }
    if (featured === "true") {
      conditions.push(eq2(productsTable.isFeatured, true));
    }
    let query = db.select().from(productsTable);
    if (conditions.length > 0) {
      query = query.where(and(...conditions));
    }
    if (sort === "price_asc") {
      query = query.orderBy(asc(sql2`${productsTable.price}::numeric`));
    } else if (sort === "price_desc") {
      query = query.orderBy(desc(sql2`${productsTable.price}::numeric`));
    } else if (sort === "name_asc") {
      query = query.orderBy(asc(productsTable.name));
    }
    const products = await query;
    res.json(products.map(parseProduct));
  } catch (err) {
    req.log.error({ err }, "Failed to fetch products");
    res.status(500).json({ message: "Errore interno del server" });
  }
});
router3.get("/products/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ message: "ID non valido" });
      return;
    }
    const [product] = await db.select().from(productsTable).where(eq2(productsTable.id, id)).limit(1);
    if (!product) {
      res.status(404).json({ message: "Prodotto non trovato" });
      return;
    }
    res.json(parseProduct(product));
  } catch (err) {
    req.log.error({ err }, "Failed to fetch product");
    res.status(500).json({ message: "Errore interno del server" });
  }
});
var products_default = router3;

// src/routes/bookings.ts
import { Router as Router4 } from "express";
import { and as and2, eq as eq3 } from "drizzle-orm";
var router4 = Router4();
var ALL_SLOTS = ["09:00", "10:00", "11:00", "16:00", "17:00", "18:00"];
router4.get("/bookings", async (req, res) => {
  try {
    const { date: date2 } = req.query;
    if (!date2 || typeof date2 !== "string") {
      res.status(400).json({ message: "Data richiesta nel formato YYYY-MM-DD" });
      return;
    }
    const existingBookings = await db.select({ time: bookingsTable.time }).from(bookingsTable).where(eq3(bookingsTable.date, date2));
    const bookedTimes = new Set(existingBookings.map((b) => b.time));
    const slots = ALL_SLOTS.map((time) => ({
      time,
      available: !bookedTimes.has(time)
    }));
    res.json({ date: date2, slots });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch booking slots");
    res.status(500).json({ message: "Errore interno del server" });
  }
});
router4.post("/bookings", async (req, res) => {
  try {
    const parsed = insertBookingSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Dati non validi: " + parsed.error.message });
      return;
    }
    const { date: date2, time } = parsed.data;
    const existing = await db.select().from(bookingsTable).where(and2(eq3(bookingsTable.date, date2), eq3(bookingsTable.time, time))).limit(1);
    if (existing.length > 0) {
      res.status(400).json({ message: "Lo slot selezionato non \xE8 pi\xF9 disponibile" });
      return;
    }
    const [booking] = await db.insert(bookingsTable).values(parsed.data).returning();
    res.status(201).json(booking);
  } catch (err) {
    req.log.error({ err }, "Failed to create booking");
    res.status(500).json({ message: "Errore interno del server" });
  }
});
var bookings_default = router4;

// src/routes/contact.ts
import { Router as Router5 } from "express";
var router5 = Router5();
router5.post("/contact", async (req, res) => {
  try {
    const parsed = insertContactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ message: "Dati non validi: " + parsed.error.message });
      return;
    }
    await db.insert(contactsTable).values(parsed.data);
    res.status(201).json({ success: true, message: "Messaggio ricevuto! Ti contatteremo al pi\xF9 presto." });
  } catch (err) {
    req.log.error({ err }, "Failed to submit contact form");
    res.status(500).json({ message: "Errore interno del server" });
  }
});
var contact_default = router5;

// src/routes/gift.ts
import { Router as Router6 } from "express";
var router6 = Router6();
router6.get("/gift-packages", async (req, res) => {
  try {
    const packages = await db.select().from(giftPackagesTable);
    res.json(packages.map((p) => ({
      ...p,
      basePrice: parseFloat(p.basePrice)
    })));
  } catch (err) {
    req.log.error({ err }, "Failed to fetch gift packages");
    res.status(500).json({ message: "Errore interno del server" });
  }
});
var gift_default = router6;

// src/routes/auth.ts
import { Router as Router7 } from "express";
import bcrypt from "bcryptjs";
import { eq as eq4 } from "drizzle-orm";
var router7 = Router7();
router7.post("/auth/register", async (req, res) => {
  try {
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dati non validi", details: parsed.error.issues });
    }
    const { name, email, password } = parsed.data;
    const existing = await db.select({ id: usersTable.id }).from(usersTable).where(eq4(usersTable.email, email)).limit(1);
    if (existing.length > 0) {
      return res.status(409).json({ error: "Email gi\xE0 registrata" });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    const [user] = await db.insert(usersTable).values({ name, email, passwordHash }).returning({
      id: usersTable.id,
      name: usersTable.name,
      email: usersTable.email
    });
    req.session.user = { userId: user.id, name: user.name, email: user.email };
    return res.status(201).json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    return res.status(500).json({ error: "Errore del server" });
  }
});
router7.post("/auth/login", async (req, res) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ error: "Dati non validi" });
    }
    const { email, password } = parsed.data;
    const [user] = await db.select().from(usersTable).where(eq4(usersTable.email, email)).limit(1);
    if (!user) {
      return res.status(401).json({ error: "Email o password non corretti" });
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return res.status(401).json({ error: "Email o password non corretti" });
    }
    req.session.user = { userId: user.id, name: user.name, email: user.email };
    return res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch {
    return res.status(500).json({ error: "Errore del server" });
  }
});
router7.post("/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.json({ ok: true });
  });
});
router7.get("/auth/me", (req, res) => {
  const user = req.session?.user;
  if (!user) return res.status(401).json({ error: "Non autenticato" });
  return res.json({ user });
});
var auth_default = router7;

// src/routes/index.ts
var router8 = Router8();
router8.use(health_default);
router8.use(categories_default);
router8.use(products_default);
router8.use(bookings_default);
router8.use(contact_default);
router8.use(gift_default);
router8.use(auth_default);
var routes_default = router8;

// src/lib/logger.ts
import pino from "pino";
var isProduction = process.env.NODE_ENV === "production";
var logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: [
    "req.headers.authorization",
    "req.headers.cookie",
    "res.headers['set-cookie']"
  ],
  ...isProduction ? {} : {
    transport: {
      target: "pino-pretty",
      options: { colorize: true }
    }
  }
});

// src/app.ts
var app = express();
app.use(
  (0, import_pino_http.default)({
    logger,
    serializers: {
      req(req) {
        return {
          id: req.id,
          method: req.method,
          url: req.url?.split("?")[0]
        };
      },
      res(res) {
        return {
          statusCode: res.statusCode
        };
      }
    }
  })
);
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env["SESSION_SECRET"] || "frutto-proibito-2024-secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1e3 }
  })
);
app.use("/api", routes_default);
if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  const { fileURLToPath } = await import("url");
  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const publicDir = path.resolve(__dirname, "public");
  app.use(express.static(publicDir));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });
}
var app_default = app;

// src/index.ts
var rawPort = process.env["PORT"];
if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided."
  );
}
var port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}
app_default.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }
  logger.info({ port }, "Server listening");
});
