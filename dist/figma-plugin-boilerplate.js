(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

	var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var runtime = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	!function (global) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined; // More compressible than void 0.

	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
	  var runtime = global.regeneratorRuntime;

	  if (runtime) {
	    {
	      // If regeneratorRuntime is defined globally and we're in a module,
	      // make the exports object identical to regeneratorRuntime.
	      module.exports = runtime;
	    } // Don't bother evaluating the rest of this file if the runtime was
	    // already defined globally.


	    return;
	  } // Define the runtime globally (as expected by generated code) as either
	  // module.exports (if we're in a module) or a new, empty object.


	  runtime = global.regeneratorRuntime = module.exports;

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.

	    generator._invoke = makeInvokeMethod(innerFn, self, context);
	    return generator;
	  }

	  runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.

	  function tryCatch(fn, obj, arg) {
	    try {
	      return {
	        type: "normal",
	        arg: fn.call(obj, arg)
	      };
	    } catch (err) {
	      return {
	        type: "throw",
	        arg: err
	      };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.

	  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.

	  function Generator() {}

	  function GeneratorFunction() {}

	  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.


	  var IteratorPrototype = {};

	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

	  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.

	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function (method) {
	      prototype[method] = function (arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  runtime.isGeneratorFunction = function (genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
	    // do is to check its .name property.
	    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
	  };

	  runtime.mark = function (genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;

	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }

	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  }; // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.


	  runtime.awrap = function (arg) {
	    return {
	      __await: arg
	    };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);

	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;

	        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function (value) {
	            invoke("next", value, resolve, reject);
	          }, function (err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function (unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function (error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function (resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise = // If enqueue has been called before, then we want to wait until
	      // all previous Promises have been resolved before calling invoke,
	      // so that results are always delivered in the correct order. If
	      // enqueue has not been called before, then it is important to
	      // call invoke immediately, without waiting on a callback to fire,
	      // so that the async generator function has the opportunity to do
	      // any necessary setup in a predictable way. This predictability
	      // is why the Promise constructor synchronously invokes its
	      // executor callback, and why async functions synchronously
	      // execute code before the first await. Since we implement simple
	      // async functions in terms of async generators, it is especially
	      // important to get this right, even though it requires care.
	      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
	      // invocations of the iterator.
	      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
	    } // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).


	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);

	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };

	  runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.

	  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
	    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
	    : iter.next().then(function (result) {
	      return result.done ? result.value : iter.next();
	    });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;
	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        } // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;

	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);

	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;
	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);
	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;
	        var record = tryCatch(innerFn, self, context);

	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };
	        } else if (record.type === "throw") {
	          state = GenStateCompleted; // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.

	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  } // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.


	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];

	    if (method === undefined) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        if (delegate.iterator.return) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError("The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (!info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

	      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.

	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined;
	      }
	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    } // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.


	    context.delegate = null;
	    return ContinueSentinel;
	  } // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.


	  defineIteratorMethods(Gp);
	  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.

	  Gp[iteratorSymbol] = function () {
	    return this;
	  };

	  Gp.toString = function () {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = {
	      tryLoc: locs[0]
	    };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{
	      tryLoc: "root"
	    }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  runtime.keys = function (object) {
	    var keys = [];

	    for (var key in object) {
	      keys.push(key);
	    }

	    keys.reverse(); // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.

	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();

	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      } // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.


	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];

	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1,
	            next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined;
	          next.done = true;
	          return next;
	        };

	        return next.next = next;
	      }
	    } // Return an iterator with no values.


	    return {
	      next: doneResult
	    };
	  }

	  runtime.values = values;

	  function doneResult() {
	    return {
	      value: undefined,
	      done: true
	    };
	  }

	  Context.prototype = {
	    constructor: Context,
	    reset: function reset(skipTempReset) {
	      this.prev = 0;
	      this.next = 0; // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.

	      this.sent = this._sent = undefined;
	      this.done = false;
	      this.delegate = null;
	      this.method = "next";
	      this.arg = undefined;
	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
	            this[name] = undefined;
	          }
	        }
	      }
	    },
	    stop: function stop() {
	      this.done = true;
	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;

	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },
	    dispatchException: function dispatchException(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;

	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined;
	        }

	        return !!caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }
	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }
	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },
	    abrupt: function abrupt(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },
	    complete: function complete(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" || record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },
	    finish: function finish(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },
	    "catch": function _catch(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];

	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;

	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }

	          return thrown;
	        }
	      } // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.


	      throw new Error("illegal catch attempt");
	    },
	    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined;
	      }

	      return ContinueSentinel;
	    }
	  };
	}( // In sloppy mode, unbound `this` refers to the global object, fallback to
	// Function constructor if we're in global strict mode. That is sadly a form
	// of indirect eval which violates Content Security Policy.
	function () {
	  return this || typeof self === "object" && self;
	}() || Function("return this")());
	});

	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */
	// This method of obtaining a reference to the global object needs to be
	// kept identical to the way it is obtained in runtime.js
	var g = function () {
	  return this || typeof self === "object" && self;
	}() || Function("return this")(); // Use `getOwnPropertyNames` because not all browsers support calling
	// `hasOwnProperty` on the global `self` object in a worker. See #183.


	var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0; // Save the old regeneratorRuntime in case it needs to be restored later.

	var oldRuntime = hadRuntime && g.regeneratorRuntime; // Force reevalutation of runtime.js.

	g.regeneratorRuntime = undefined;
	var runtimeModule = runtime;

	if (hadRuntime) {
	  // Restore the original runtime.
	  g.regeneratorRuntime = oldRuntime;
	} else {
	  // Remove the global property added by runtime.js.
	  try {
	    delete g.regeneratorRuntime;
	  } catch (e) {
	    g.regeneratorRuntime = undefined;
	  }
	}

	var regenerator = runtimeModule;

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	var asyncToGenerator = _asyncToGenerator;

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	var classCallCheck = _classCallCheck;

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	var createClass = _createClass;

	/**
	 * lodash (Custom Build) <https://lodash.com/>
	 * Build: `lodash modularize exports="npm" -o ./`
	 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
	 * Released under MIT license <https://lodash.com/license>
	 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	 */

	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	/** Used as references for various `Number` constants. */

	var NAN = 0 / 0;
	/** `Object#toString` result references. */

	var symbolTag = '[object Symbol]';
	/** Used to match leading and trailing whitespace. */

	var reTrim = /^\s+|\s+$/g;
	/** Used to detect bad signed hexadecimal string values. */

	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	/** Used to detect binary string values. */

	var reIsBinary = /^0b[01]+$/i;
	/** Used to detect octal string values. */

	var reIsOctal = /^0o[0-7]+$/i;
	/** Built-in method references without a dependency on `root`. */

	var freeParseInt = parseInt;
	/** Detect free variable `global` from Node.js. */

	var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
	/** Detect free variable `self`. */

	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
	/** Used as a reference to the global object. */

	var root = freeGlobal || freeSelf || Function('return this')();
	/** Used for built-in method references. */

	var objectProto = Object.prototype;
	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */

	var objectToString = objectProto.toString;
	/* Built-in method references for those with the same name as other `lodash` methods. */

	var nativeMax = Math.max,
	    nativeMin = Math.min;
	/**
	 * Gets the timestamp of the number of milliseconds that have elapsed since
	 * the Unix epoch (1 January 1970 00:00:00 UTC).
	 *
	 * @static
	 * @memberOf _
	 * @since 2.4.0
	 * @category Date
	 * @returns {number} Returns the timestamp.
	 * @example
	 *
	 * _.defer(function(stamp) {
	 *   console.log(_.now() - stamp);
	 * }, _.now());
	 * // => Logs the number of milliseconds it took for the deferred invocation.
	 */

	var now = function now() {
	  return root.Date.now();
	};
	/**
	 * Creates a debounced function that delays invoking `func` until after `wait`
	 * milliseconds have elapsed since the last time the debounced function was
	 * invoked. The debounced function comes with a `cancel` method to cancel
	 * delayed `func` invocations and a `flush` method to immediately invoke them.
	 * Provide `options` to indicate whether `func` should be invoked on the
	 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
	 * with the last arguments provided to the debounced function. Subsequent
	 * calls to the debounced function return the result of the last `func`
	 * invocation.
	 *
	 * **Note:** If `leading` and `trailing` options are `true`, `func` is
	 * invoked on the trailing edge of the timeout only if the debounced function
	 * is invoked more than once during the `wait` timeout.
	 *
	 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
	 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
	 *
	 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
	 * for details over the differences between `_.debounce` and `_.throttle`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Function
	 * @param {Function} func The function to debounce.
	 * @param {number} [wait=0] The number of milliseconds to delay.
	 * @param {Object} [options={}] The options object.
	 * @param {boolean} [options.leading=false]
	 *  Specify invoking on the leading edge of the timeout.
	 * @param {number} [options.maxWait]
	 *  The maximum time `func` is allowed to be delayed before it's invoked.
	 * @param {boolean} [options.trailing=true]
	 *  Specify invoking on the trailing edge of the timeout.
	 * @returns {Function} Returns the new debounced function.
	 * @example
	 *
	 * // Avoid costly calculations while the window size is in flux.
	 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
	 *
	 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
	 * jQuery(element).on('click', _.debounce(sendMail, 300, {
	 *   'leading': true,
	 *   'trailing': false
	 * }));
	 *
	 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
	 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
	 * var source = new EventSource('/stream');
	 * jQuery(source).on('message', debounced);
	 *
	 * // Cancel the trailing debounced invocation.
	 * jQuery(window).on('popstate', debounced.cancel);
	 */


	function debounce(func, wait, options) {
	  var lastArgs,
	      lastThis,
	      maxWait,
	      result,
	      timerId,
	      lastCallTime,
	      lastInvokeTime = 0,
	      leading = false,
	      maxing = false,
	      trailing = true;

	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }

	  wait = toNumber(wait) || 0;

	  if (isObject(options)) {
	    leading = !!options.leading;
	    maxing = 'maxWait' in options;
	    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
	    trailing = 'trailing' in options ? !!options.trailing : trailing;
	  }

	  function invokeFunc(time) {
	    var args = lastArgs,
	        thisArg = lastThis;
	    lastArgs = lastThis = undefined;
	    lastInvokeTime = time;
	    result = func.apply(thisArg, args);
	    return result;
	  }

	  function leadingEdge(time) {
	    // Reset any `maxWait` timer.
	    lastInvokeTime = time; // Start the timer for the trailing edge.

	    timerId = setTimeout(timerExpired, wait); // Invoke the leading edge.

	    return leading ? invokeFunc(time) : result;
	  }

	  function remainingWait(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime,
	        result = wait - timeSinceLastCall;
	    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
	  }

	  function shouldInvoke(time) {
	    var timeSinceLastCall = time - lastCallTime,
	        timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
	    // trailing edge, the system time has gone backwards and we're treating
	    // it as the trailing edge, or we've hit the `maxWait` limit.

	    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
	  }

	  function timerExpired() {
	    var time = now();

	    if (shouldInvoke(time)) {
	      return trailingEdge(time);
	    } // Restart the timer.


	    timerId = setTimeout(timerExpired, remainingWait(time));
	  }

	  function trailingEdge(time) {
	    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
	    // debounced at least once.

	    if (trailing && lastArgs) {
	      return invokeFunc(time);
	    }

	    lastArgs = lastThis = undefined;
	    return result;
	  }

	  function cancel() {
	    if (timerId !== undefined) {
	      clearTimeout(timerId);
	    }

	    lastInvokeTime = 0;
	    lastArgs = lastCallTime = lastThis = timerId = undefined;
	  }

	  function flush() {
	    return timerId === undefined ? result : trailingEdge(now());
	  }

	  function debounced() {
	    var time = now(),
	        isInvoking = shouldInvoke(time);
	    lastArgs = arguments;
	    lastThis = this;
	    lastCallTime = time;

	    if (isInvoking) {
	      if (timerId === undefined) {
	        return leadingEdge(lastCallTime);
	      }

	      if (maxing) {
	        // Handle invocations in a tight loop.
	        timerId = setTimeout(timerExpired, wait);
	        return invokeFunc(lastCallTime);
	      }
	    }

	    if (timerId === undefined) {
	      timerId = setTimeout(timerExpired, wait);
	    }

	    return result;
	  }

	  debounced.cancel = cancel;
	  debounced.flush = flush;
	  return debounced;
	}
	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */


	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */


	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */


	function isSymbol(value) {
	  return typeof value == 'symbol' || isObjectLike(value) && objectToString.call(value) == symbolTag;
	}
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3.2);
	 * // => 3.2
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3.2');
	 * // => 3.2
	 */


	function toNumber(value) {
	  if (typeof value == 'number') {
	    return value;
	  }

	  if (isSymbol(value)) {
	    return NAN;
	  }

	  if (isObject(value)) {
	    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
	    value = isObject(other) ? other + '' : other;
	  }

	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }

	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
	}

	var lodash_debounce = debounce;

	var createNodes = (function (htmlString) {
	  return document.createRange().createContextualFragment(htmlString);
	});

	var until = (function (conditionFunction) {
	  var poll = function poll(resolve) {
	    if (conditionFunction()) resolve();else setTimeout(function () {
	      return poll(resolve);
	    }, 500);
	  };

	  return new Promise(poll);
	});

	var getActiveTab = (function (getActiveTab) {
	  var tab = document.querySelector(".properties_panel--activeTab--eBYRG.properties_panel--tab--1g-EF");
	  return tab ? tab.textContent : false;
	});

	var getNodeType = (function (nodeId) {
	  return window.figmaPlugin.getNodeType(nodeId);
	});

	// This work is licensed under the GNU Public License (GPL).
	// Written by Nick Doiron (@mapmeld)
	// Ported from python-arabic-reshaper by Abdullah Diab (mpcabd)
	// Which was ported and tweaked from Java to Python, from Better Arabic Reshaper
	// [https://github.com/agawish/Better-Arabic-Reshaper/]
	var LIGATURES = [// Sentences
	// Ligature BISMILLAH AR-RAHMAN AR-RAHEEM
	{
	  matches: ["\u0628\u0633\u0645 ", "\u0627\u0644\u0644\u0647 ", "\u0627\u0644\u0631\u062D\u0645\u0646 ", "\u0627\u0644\u0631\u062D\u064A\u0645"],
	  forms: {
	    isolated: "\uFDFD"
	  }
	}, // Ligature JALLAJALALOUHOU
	{
	  matches: ["\u062C\u0644 \u062C\u0644\u0627\u0644\u0647"],
	  forms: {
	    isolated: "\uFDFB"
	  }
	}, // Ligature SALLALLAHOU ALAYHE WASALLAM
	{
	  matches: ["\u0635\u0644\u0649 ", "\u0627\u0644\u0644\u0647 ", "\u0639\u0644\u064A\u0647 ", "\u0648\u0633\u0644\u0645"],
	  forms: {
	    isolated: "\uFDFA"
	  }
	}, // Words
	// Ligature ALLAH
	{
	  matches: ["\u0627\u0644\u0644\u0647"],
	  forms: {
	    isolated: "\uFDF2"
	  }
	}, //Ligature AKBAR
	{
	  matches: ["\u0623\u0643\u0628\u0631"],
	  forms: {
	    isolated: "\uFDF3"
	  }
	}, // Ligature ALAYHE
	{
	  matches: ["\u0639\u0644\u064A\u0647"],
	  forms: {
	    isolated: "\uFDF7"
	  }
	}, // Ligature MOHAMMAD
	{
	  matches: ["\u0645\u062D\u0645\u062F"],
	  forms: {
	    isolated: "\uFDF4"
	  }
	}, // Ligature RASOUL
	{
	  matches: ["\u0631\u0633\u0648\u0644"],
	  forms: {
	    isolated: "\uFDF6"
	  }
	}, // Ligature SALAM
	{
	  matches: ["\u0635\u0644\u0639\u0645"],
	  forms: {
	    isolated: "\uFDF5"
	  }
	}, // Ligature SALLA
	{
	  matches: ["\u0635\u0644\u0649"],
	  forms: {
	    isolated: "\uFDF9"
	  }
	}, // Ligature WASALLAM
	{
	  matches: ["\u0648\u0633\u0644\u0645"],
	  forms: {
	    isolated: "\uFDF8"
	  }
	}, // RIAL SIGN
	{
	  matches: ["\u0631[\u06CC\u064A]\u0627\u0644"],
	  forms: {
	    isolated: "\uFDFC"
	  }
	}, // Letters
	// Ligature AIN WITH ALEF MAKSURA
	{
	  matches: ["\u0639\u0649"],
	  forms: {
	    isolated: "\uFCF7",
	    final: "\uFD13"
	  }
	}, // Ligature AIN WITH JEEM
	{
	  matches: ["\u0639\u062C"],
	  forms: {
	    isolated: "\uFC29",
	    initial: "\uFCBA"
	  }
	}, // Ligature AIN WITH JEEM WITH MEEM
	{
	  matches: ["\u0639\u062C\u0645"],
	  forms: {
	    initial: "\uFDC4",
	    final: "\uFD75"
	  }
	}, // Ligature AIN WITH MEEM
	{
	  matches: ["\u0639\u0645"],
	  forms: {
	    isolated: "\uFC2A",
	    initial: "\uFCBB"
	  }
	}, // Ligature AIN WITH MEEM WITH ALEF MAKSURA
	{
	  matches: ["\u0639\u0645\u0649"],
	  forms: {
	    final: "\uFD78"
	  }
	}, // Ligature AIN WITH MEEM WITH MEEM
	{
	  matches: ["\u0639\u0645\u0645"],
	  forms: {
	    initial: "\uFD77",
	    final: "\uFD76"
	  }
	}, // Ligature AIN WITH MEEM WITH YEH
	{
	  matches: ["\u0639\u0645\u064A"],
	  forms: {
	    final: "\uFDB6"
	  }
	}, // Ligature AIN WITH YEH
	{
	  matches: ["\u0639\u064A"],
	  forms: {
	    isolated: "\uFCF8",
	    final: "\uFD14"
	  }
	}, // Ligature ALEF MAKSURA WITH SUPERSCRIPT ALEF
	{
	  matches: ["\u0649\u0670"],
	  forms: {
	    isolated: "\uFC5D",
	    final: "\uFC90"
	  }
	}, // Ligature ALEF WITH FATHATAN
	{
	  matches: ["\u0627\u064B"],
	  forms: {
	    isolated: "\uFD3D",
	    final: "\uFD3C"
	  }
	}, // Ligature BEH WITH ALEF MAKSURA
	{
	  matches: ["\u0628\u0649"],
	  forms: {
	    isolated: "\uFC09",
	    final: "\uFC6E"
	  }
	}, // Ligature BEH WITH HAH
	{
	  matches: ["\u0628\u062D"],
	  forms: {
	    isolated: "\uFC06",
	    initial: "\uFC9D"
	  }
	}, // Ligature BEH WITH HAH WITH YEH
	{
	  matches: ["\u0628\u062D\u064A"],
	  forms: {
	    final: "\uFDC2"
	  }
	}, // Ligature BEH WITH HEH
	{
	  matches: ["\u0628\u0647"],
	  forms: {
	    initial: "\uFCA0",
	    medial: "\uFCE2"
	  }
	}, // Ligature BEH WITH JEEM
	{
	  matches: ["\u0628\u062C"],
	  forms: {
	    isolated: "\uFC05",
	    initial: "\uFC9C"
	  }
	}, // Ligature BEH WITH KHAH
	{
	  matches: ["\u0628\u062E"],
	  forms: {
	    isolated: "\uFC07",
	    initial: "\uFC9E"
	  }
	}, // Ligature BEH WITH KHAH WITH YEH
	{
	  matches: ["\u0628\u062E\u064A"],
	  forms: {
	    final: "\uFD9E"
	  }
	}, // Ligature BEH WITH MEEM
	{
	  matches: ["\u0628\u0645"],
	  forms: {
	    isolated: "\uFC08",
	    initial: "\uFC9F",
	    medial: "\uFCE1",
	    final: "\uFC6C"
	  }
	}, // Ligature BEH WITH NOON
	{
	  matches: ["\u0628\u0646"],
	  forms: {
	    final: "\uFC6D"
	  }
	}, // Ligature BEH WITH REH
	{
	  matches: ["\u0628\u0631"],
	  forms: {
	    final: "\uFC6A"
	  }
	}, // Ligature AIN WITH ALEF MAKSURA
	{
	  matches: ["\u0639\u0649"],
	  forms: {
	    isolated: "\uFCF7",
	    final: "\uFD13"
	  }
	}, // Ligature AIN WITH JEEM
	{
	  matches: ["\u0639\u062C"],
	  forms: {
	    isolated: "\uFC29",
	    initial: "\uFCBA"
	  }
	}, // Ligature AIN WITH JEEM WITH MEEM
	{
	  matches: ["\u0639\u062C\u0645"],
	  forms: {
	    inital: "\uFDC4",
	    final: "\uFD75"
	  }
	}, // Ligature AIN WITH MEEM
	{
	  matches: ["\u0639\u0645"],
	  forms: {
	    isolated: "\uFC2A",
	    initial: "\uFCBB"
	  }
	}, // Ligature AIN WITH MEEM WITH ALEF MAKSURA
	{
	  matches: ["\u0639\u0645\u0649"],
	  forms: {
	    final: "\uFD78"
	  }
	}, // Ligature AIN WITH MEEM WITH MEEM
	{
	  matches: ["\u0639\u0645\u0645"],
	  forms: {
	    initial: "\uFD77",
	    final: "\uFD76"
	  }
	}, // Ligature AIN WITH MEEM WITH YEH
	{
	  matches: ["\u0639\u0645\u064A"],
	  forms: {
	    final: "\uFDB6"
	  }
	}, // Ligature AIN WITH YEH
	{
	  matches: ["\u0639\u064A"],
	  forms: {
	    isolated: "\uFCF8",
	    final: "\uFD14"
	  }
	}, // Ligature ALEF MAKSURA WITH SUPERSCRIPT ALEF
	{
	  matches: ["\u0649\u0670"],
	  forms: {
	    isolated: "\uFC5D",
	    final: "\uFC90"
	  }
	}, // Ligature ALEF WITH FATHATAN
	{
	  matches: ["\u0627\u064B"],
	  forms: {
	    isolated: "\uFD3D",
	    final: "\uFD3C"
	  }
	}, // Ligature BEH WITH ALEF MAKSURA
	{
	  matches: ["\u0628\u0649"],
	  forms: {
	    isolated: "\uFC09",
	    final: "\uFC6E"
	  }
	}, // Ligature BEH WITH HAH
	{
	  matches: ["\u0628\u062D"],
	  forms: {
	    isolated: "\uFC06",
	    initial: "\uFC9D"
	  }
	}, // Ligature BEH WITH HAH WITH YEH
	{
	  matches: ["\u0628\u062D\u064A"],
	  forms: {
	    final: "\uFDC2"
	  }
	}, // Ligature BEH WITH HEH
	{
	  matches: ["\u0628\u0647"],
	  forms: {
	    initial: "\uFCA0",
	    medial: "\uFCE2"
	  }
	}, // Ligature BEH WITH JEEM
	{
	  matches: ["\u0628\u062C"],
	  forms: {
	    isolated: "\uFC05",
	    initial: "\uFC9C"
	  }
	}, // Ligature BEH WITH KHAH
	{
	  matches: ["\u0628\u062E"],
	  forms: {
	    isolated: "\uFC07",
	    initial: "\uFC9E"
	  }
	}, // Ligature BEH WITH KHAH WITH YEH
	{
	  matches: ["\u0628\u062E\u064A"],
	  forms: {
	    final: "\uFD9E"
	  }
	}, // Ligature BEH WITH MEEM
	{
	  matches: ["\u0628\u0645"],
	  forms: {
	    isolated: "\uFC08",
	    initial: "\uFC9F",
	    medial: "\uFCE1",
	    final: "\uFC6C"
	  }
	}, // Ligature BEH WITH NOON
	{
	  matches: ["\u0628\u0646"],
	  forms: {
	    final: "\uFC6D"
	  }
	}, // Ligature BEH WITH REH
	{
	  matches: ["\u0628\u0631"],
	  forms: {
	    final: "\uFC6A"
	  }
	}, // Ligature BEH WITH YEH
	{
	  matches: ["\u0628\u064A"],
	  forms: {
	    isolated: "\uFC0A",
	    final: "\uFC6F"
	  }
	}, // Ligature BEH WITH ZAIN
	{
	  matches: ["\u0628\u0632"],
	  forms: {
	    final: "\uFC6B"
	  }
	}, // Ligature DAD WITH ALEF MAKSURA
	{
	  matches: ["\u0636\u0649"],
	  forms: {
	    isolated: "\uFD07",
	    final: "\uFD23"
	  }
	}, // Ligature DAD WITH HAH
	{
	  matches: ["\u0636\u062D"],
	  forms: {
	    isolated: "\uFC23",
	    initial: "\uFCB5"
	  }
	}, // Ligature DAD WITH HAH WITH ALEF MAKSURA
	{
	  matches: ["\u0636\u062D\u0649"],
	  forms: {
	    final: "\uFD6E"
	  }
	}, // Ligature DAD WITH HAH WITH YEH
	{
	  matches: ["\u0636\u062D\u064A"],
	  forms: {
	    final: "\uFDAB"
	  }
	}, // Ligature DAD WITH JEEM
	{
	  matches: ["\u0636\u062C"],
	  forms: {
	    isolated: "\uFC22",
	    initial: "\uFCB4"
	  }
	}, // Ligature DAD WITH KHAH
	{
	  matches: ["\u0636\u062E"],
	  forms: {
	    isolated: "\uFC24",
	    initial: "\uFCB6"
	  }
	}, // Ligature DAD WITH KHAH WITH MEEM
	{
	  matches: ["\u0636\u062E\u0645"],
	  forms: {
	    initial: "\uFD70",
	    final: "\uFD6F"
	  }
	}, // Ligature DAD WITH MEEM
	{
	  matches: ["\u0636\u0645"],
	  forms: {
	    isolated: "\uFC25",
	    initial: "\uFCB7"
	  }
	}, // Ligature DAD WITH REH
	{
	  matches: ["\u0636\u0631"],
	  forms: {
	    isolated: "\uFD10",
	    final: "\uFD2C"
	  }
	}, // Ligature DAD WITH YEH
	{
	  matches: ["\u0636\u064A"],
	  forms: {
	    isolated: "\uFD08",
	    final: "\uFD24"
	  }
	}, // Ligature FEH WITH ALEF MAKSURA
	{
	  matches: ["\u0641\u0649"],
	  forms: {
	    isolated: "\uFC31",
	    final: "\uFC7C"
	  }
	}, // Ligature FEH WITH HAH
	{
	  matches: ["\u0641\u062D"],
	  forms: {
	    isolated: "\uFC2E",
	    initial: "\uFCBF"
	  }
	}, // Ligature FEH WITH JEEM
	{
	  matches: ["\u0641\u062C"],
	  forms: {
	    isolated: "\uFC2D",
	    initial: "\uFCBE"
	  }
	}, // Ligature FEH WITH KHAH
	{
	  matches: ["\u0641\u062E"],
	  forms: {
	    isolated: "\uFC2F",
	    initial: "\uFCC0"
	  }
	}, // Ligature FEH WITH KHAH WITH MEEM
	{
	  matches: ["\u0641\u062E\u0645"],
	  forms: {
	    initial: "\uFD7D",
	    final: "\uFD7C"
	  }
	}, // Ligature FEH WITH MEEM
	{
	  matches: ["\u0641\u0645"],
	  forms: {
	    isolated: "\uFC30",
	    initial: "\uFCC1"
	  }
	}, // Ligature FEH WITH MEEM WITH YEH
	{
	  matches: ["\u0641\u0645\u064A"],
	  forms: {
	    final: "\uFDC1"
	  }
	}, // Ligature FEH WITH YEH
	{
	  matches: ["\u0641\u064A"],
	  forms: {
	    isolated: "\uFC32",
	    final: "\uFC7D"
	  }
	}, // Ligature GHAIN WITH ALEF MAKSURA
	{
	  matches: ["\u063A\u0649"],
	  forms: {
	    isolated: "\uFCF9",
	    final: "\uFD15"
	  }
	}, // Ligature GHAIN WITH JEEM
	{
	  matches: ["\u063A\u062C"],
	  forms: {
	    isolated: "\uFC2B",
	    initial: "\uFCBC"
	  }
	}, // Ligature GHAIN WITH MEEM
	{
	  matches: ["\u063A\u0645"],
	  forms: {
	    isolated: "\uFC2C",
	    initial: "\uFCBD"
	  }
	}, // Ligature GHAIN WITH MEEM WITH ALEF MAKSURA
	{
	  matches: ["\u063A\u0645\u0649"],
	  forms: {
	    final: "\uFD7B"
	  }
	}, // Ligature GHAIN WITH MEEM WITH MEEM
	{
	  matches: ["\u063A\u0645\u0645"],
	  forms: {
	    final: "\uFD79"
	  }
	}, // Ligature GHAIN WITH MEEM WITH YEH
	{
	  matches: ["\u063A\u0645\u064A"],
	  forms: {
	    final: "\uFD7A"
	  }
	}, // Ligature GHAIN WITH YEH
	{
	  matches: ["\u063A\u064A"],
	  forms: {
	    isolated: "\uFCFA",
	    final: "\uFD16"
	  }
	}, // Ligature HAH WITH ALEF MAKSURA
	{
	  matches: ["\u062D\u0649"],
	  forms: {
	    isolated: "\uFCFF",
	    final: "\uFD1B"
	  }
	}, // Ligature HAH WITH JEEM
	{
	  matches: ["\u062D\u062C"],
	  forms: {
	    isolated: "\uFC17",
	    initial: "\uFCA9"
	  }
	}, // Ligature HAH WITH JEEM WITH YEH
	{
	  matches: ["\u062D\u062C\u064A"],
	  forms: {
	    final: "\uFDBF"
	  }
	}, // Ligature HAH WITH MEEM
	{
	  matches: ["\u062D\u0645"],
	  forms: {
	    isolated: "\uFC18",
	    initial: "\uFCAA"
	  }
	}, // Ligature HAH WITH MEEM WITH ALEF MAKSURA
	{
	  matches: ["\u062D\u0645\u0649"],
	  forms: {
	    final: "\uFD5B"
	  }
	}, // Ligature HAH WITH MEEM WITH YEH
	{
	  matches: ["\u062D\u0645\u064A"],
	  forms: {
	    final: "\uFD5A"
	  }
	}, // Ligature HAH WITH YEH
	{
	  matches: ["\u062D\u064A"],
	  forms: {
	    isolated: "\uFD00",
	    final: "\uFD1C"
	  }
	}, // Ligature HEH WITH ALEF MAKSURA
	{
	  matches: ["\u0647\u0649"],
	  forms: {
	    isolated: "\uFC53"
	  }
	}, // Ligature HEH WITH JEEM
	{
	  matches: ["\u0647\u062C"],
	  forms: {
	    isolated: "\uFC51",
	    initial: "\uFCD7"
	  }
	}, // Ligature HEH WITH MEEM
	{
	  matches: ["\u0647\u0645"],
	  forms: {
	    isolated: "\uFC52",
	    initial: "\uFCD8"
	  }
	}, // Ligature HEH WITH MEEM WITH JEEM
	{
	  matches: ["\u0647\u0645\u062C"],
	  forms: {
	    initial: "\uFD93"
	  }
	}, // Ligature HEH WITH MEEM WITH MEEM
	{
	  matches: ["\u0647\u0645\u0645"],
	  forms: {
	    initial: "\uFD94"
	  }
	}, // Ligature HEH WITH SUPERSCRIPT ALEF
	{
	  matches: ["\u0647\u0670"],
	  forms: {
	    initial: "\uFCD9"
	  }
	}, // Ligature HEH WITH YEH
	{
	  matches: ["\u0647\u064A"],
	  forms: {
	    isolated: "\uFC54"
	  }
	}, // Ligature JEEM WITH ALEF MAKSURA
	{
	  matches: ["\u062C\u0649"],
	  forms: {
	    isolated: "\uFD01",
	    final: "\uFD1D"
	  }
	}, // Ligature JEEM WITH HAH
	{
	  matches: ["\u062C\u062D"],
	  forms: {
	    isolated: "\uFC15",
	    initial: "\uFCA7"
	  }
	}, // Ligature JEEM WITH HAH WITH ALEF MAKSURA
	{
	  matches: ["\u062C\u062D\u0649"],
	  forms: {
	    final: "\uFDA6"
	  }
	}, // Ligature JEEM WITH HAH WITH YEH
	{
	  matches: ["\u062C\u062D\u064A"],
	  forms: {
	    final: "\uFDBE"
	  }
	}, // Ligature JEEM WITH MEEM
	{
	  matches: ["\u062C\u0645"],
	  forms: {
	    isolated: "\uFC16",
	    initial: "\uFCA8"
	  }
	}, // Ligature JEEM WITH MEEM WITH ALEF MAKSURA
	{
	  matches: ["\u062C\u0645\u0649"],
	  forms: {
	    final: "\uFDA7"
	  }
	}, // Ligature JEEM WITH MEEM WITH HAH
	{
	  matches: ["\u062C\u0645\u062D"],
	  forms: {
	    initial: "\uFD59",
	    final: "\uFD58"
	  }
	}, // Ligature JEEM WITH MEEM WITH YEH
	{
	  matches: ["\u062C\u0645\u064A"],
	  forms: {
	    final: "\uFDA5"
	  }
	}, // Ligature JEEM WITH YEH
	{
	  matches: ["\u062C\u064A"],
	  forms: {
	    isolated: "\uFD02",
	    final: "\uFD1E"
	  }
	}, // Ligature KAF WITH ALEF
	{
	  matches: ["\u0643\u0627"],
	  forms: {
	    isolated: "\uFC37",
	    final: "\uFC80"
	  }
	}, // Ligature KAF WITH ALEF MAKSURA
	{
	  matches: ["\u0643\u0649"],
	  forms: {
	    isolated: "\uFC3D",
	    final: "\uFC83"
	  }
	}, // Ligature KAF WITH HAH
	{
	  matches: ["\u0643\u062D"],
	  forms: {
	    isolated: "\uFC39",
	    initial: "\uFCC5"
	  }
	}, // Ligature KAF WITH JEEM
	{
	  matches: ["\u0643\u062C"],
	  forms: {
	    isolated: "\uFC38",
	    initial: "\uFCC4"
	  }
	}, // Ligature KAF WITH KHAH
	{
	  matches: ["\u0643\u062E"],
	  forms: {
	    isolated: "\uFC3A",
	    initial: "\uFCC6"
	  }
	}, // Ligature KAF WITH LAM
	{
	  matches: ["\u0643\u0644"],
	  forms: {
	    isolated: "\uFC3B",
	    initial: "\uFCC7",
	    medial: "\uFCEB",
	    final: "\uFC81"
	  }
	}, // Ligature KAF WITH MEEM
	{
	  matches: ["\u0643\u0645"],
	  forms: {
	    isolated: "\uFC3C",
	    initial: "\uFCC8",
	    medial: "\uFCEC",
	    final: "\uFC82"
	  }
	}, // Ligature KAF WITH MEEM WITH MEEM
	{
	  matches: ["\u0643\u0645\u0645"],
	  forms: {
	    initial: "\uFDC3",
	    final: "\uFDBB"
	  }
	}, // Ligature KAF WITH MEEM WITH YEH
	{
	  matches: ["\u0643\u0645\u064A"],
	  forms: {
	    final: "\uFDB7"
	  }
	}, // Ligature KAF WITH YEH
	{
	  matches: ["\u0643\u064A"],
	  forms: {
	    isolated: "\uFC3E",
	    final: "\uFC84"
	  }
	}, // Ligature KHAH WITH ALEF MAKSURA
	{
	  matches: ["\u062E\u0649"],
	  forms: {
	    isolated: "\uFD03",
	    final: "\uFD1F"
	  }
	}, // Ligature KHAH WITH HAH
	{
	  matches: ["\u062E\u062D"],
	  forms: {
	    isolated: "\uFC1A"
	  }
	}, // Ligature KHAH WITH JEEM
	{
	  matches: ["\u062E\u062C"],
	  forms: {
	    isolated: "\uFC19",
	    initial: "\uFCAB"
	  }
	}, // Ligature KHAH WITH MEEM
	{
	  matches: ["\u062E\u0645"],
	  forms: {
	    isolated: "\uFC1B",
	    initial: "\uFCAC"
	  }
	}, // Ligature KHAH WITH YEH
	{
	  matches: ["\u062E\u064A"],
	  forms: {
	    isolated: "\uFD04",
	    final: "\uFD20"
	  }
	}, // Ligature LAM WITH ALEF
	{
	  matches: ["\u0644\u0627"],
	  forms: {
	    isolated: "\uFEFB",
	    final: "\uFEFC"
	  }
	}, // Ligature LAM WITH ALEF MAKSURA
	{
	  matches: ["\u0644\u0649"],
	  forms: {
	    isolated: "\uFC43",
	    final: "\uFC86"
	  }
	}, // Ligature LAM WITH ALEF WITH HAMZA ABOVE
	{
	  matches: ["\u0644\u0623"],
	  forms: {
	    isolated: "\uFEF7",
	    final: "\uFEF8"
	  }
	}, // Ligature LAM WITH ALEF WITH HAMZA BELOW
	{
	  matches: ["\u0644\u0625"],
	  forms: {
	    isolated: "\uFEF9",
	    final: "\uFEFA"
	  }
	}, // Ligature LAM WITH ALEF WITH MADDA ABOVE
	{
	  matches: ["\u0644\u0622"],
	  forms: {
	    isolated: "\uFEF5",
	    final: "\uFEF6"
	  }
	}, // Ligature LAM WITH HAH
	{
	  matches: ["\u0644\u062D"],
	  forms: {
	    isolated: "\uFC40",
	    initial: "\uFCCA"
	  }
	}, // Ligature LAM WITH HAH WITH ALEF MAKSURA
	{
	  matches: ["\u0644\u062D\u0649"],
	  forms: {
	    final: "\uFD82"
	  }
	}, // Ligature LAM WITH HAH WITH MEEM
	{
	  matches: ["\u0644\u062D\u0645"],
	  forms: {
	    initial: "\uFDB5",
	    final: "\uFD80"
	  }
	}, // Ligature LAM WITH HAH WITH YEH
	{
	  matches: ["\u0644\u062D\u064A"],
	  forms: {
	    final: "\uFD81"
	  }
	}, // Ligature LAM WITH HEH
	{
	  matches: ["\u0644\u0647"],
	  forms: {
	    initial: "\uFCCD"
	  }
	}, // Ligature LAM WITH JEEM
	{
	  matches: ["\u0644\u062C"],
	  forms: {
	    isolated: "\uFC3F",
	    initial: "\uFCC9"
	  }
	}, // Ligature LAM WITH JEEM WITH JEEM
	{
	  matches: ["\u0644\u062C\u062C"],
	  forms: {
	    initial: "\uFD83",
	    final: "\uFD84"
	  }
	}, // Ligature LAM WITH JEEM WITH MEEM
	{
	  matches: ["\u0644\u062C\u0645"],
	  forms: {
	    initial: "\uFDBA",
	    final: "\uFDBC"
	  }
	}, // Ligature LAM WITH JEEM WITH YEH
	{
	  matches: ["\u0644\u062C\u064A"],
	  forms: {
	    final: "\uFDAC"
	  }
	}, // Ligature LAM WITH KHAH
	{
	  matches: ["\u0644\u062E"],
	  forms: {
	    isolated: "\uFC41",
	    initial: "\uFCCB"
	  }
	}, // Ligature LAM WITH KHAH WITH MEEM
	{
	  matches: ["\u0644\u062E\u0645"],
	  forms: {
	    initial: "\uFD86",
	    final: "\uFD85"
	  }
	}, // Ligature LAM WITH MEEM
	{
	  matches: ["\u0644\u0645"],
	  forms: {
	    isolated: "\uFC42",
	    initial: "\uFCCC",
	    medial: "\uFCED",
	    final: "\uFC85"
	  }
	}, // Ligature LAM WITH MEEM WITH HAH
	{
	  matches: ["\u0644\u0645\u062D"],
	  forms: {
	    initial: "\uFD88",
	    final: "\uFD87"
	  }
	}, // Ligature LAM WITH MEEM WITH YEH
	{
	  matches: ["\u0644\u0645\u064A"],
	  forms: {
	    final: "\uFDAD"
	  }
	}, // Ligature LAM WITH YEH
	{
	  matches: ["\u0644\u064A"],
	  forms: {
	    isolated: "\uFC44",
	    final: "\uFC87"
	  }
	}, // Ligature MEEM WITH ALEF
	{
	  matches: ["\u0645\u0627"],
	  forms: {
	    final: "\uFC88"
	  }
	}, // Ligature MEEM WITH ALEF MAKSURA
	{
	  matches: ["\u0645\u0649"],
	  forms: {
	    isolated: "\uFC49"
	  }
	}, // Ligature MEEM WITH HAH
	{
	  matches: ["\u0645\u062D"],
	  forms: {
	    isolated: "\uFC46",
	    initial: "\uFCCF"
	  }
	}, // Ligature MEEM WITH HAH WITH JEEM
	{
	  matches: ["\u0645\u062D\u062C"],
	  forms: {
	    initial: "\uFD89"
	  }
	}, // Ligature MEEM WITH HAH WITH MEEM
	{
	  matches: ["\u0645\u062D\u0645"],
	  forms: {
	    initial: "\uFD8A"
	  }
	}, // Ligature MEEM WITH HAH WITH YEH
	{
	  matches: ["\u0645\u062D\u064A"],
	  forms: {
	    final: "\uFD8B"
	  }
	}, // Ligature MEEM WITH JEEM
	{
	  matches: ["\u0645\u062C"],
	  forms: {
	    isolated: "\uFC45",
	    initial: "\uFCCE"
	  }
	}, // Ligature MEEM WITH JEEM WITH HAH
	{
	  matches: ["\u0645\u062C\u062D"],
	  forms: {
	    initial: "\uFD8C"
	  }
	}, // Ligature MEEM WITH JEEM WITH KHAH
	{
	  matches: ["\u0645\u062C\u062E"],
	  forms: {
	    initial: "\uFD92"
	  }
	}, // Ligature MEEM WITH JEEM WITH MEEM
	{
	  matches: ["\u0645\u062C\u0645"],
	  forms: {
	    initial: "\uFD8D"
	  }
	}, // Ligature MEEM WITH JEEM WITH YEH
	{
	  matches: ["\u0645\u062C\u064A"],
	  forms: {
	    final: "\uFDC0"
	  }
	}, // Ligature MEEM WITH KHAH
	{
	  matches: ["\u0645\u062E"],
	  forms: {
	    isolated: "\uFC47",
	    initial: "\uFCD0"
	  }
	}, // Ligature MEEM WITH KHAH WITH JEEM
	{
	  matches: ["\u0645\u062E\u062C"],
	  forms: {
	    initial: "\uFD8E"
	  }
	}, // Ligature MEEM WITH KHAH WITH MEEM
	{
	  matches: ["\u0645\u062E\u0645"],
	  forms: {
	    initial: "\uFD8F"
	  }
	}, // Ligature MEEM WITH KHAH WITH YEH
	{
	  matches: ["\u0645\u062E\u064A"],
	  forms: {
	    final: "\uFDB9"
	  }
	}, // Ligature MEEM WITH MEEM
	{
	  matches: ["\u0645\u0645"],
	  forms: {
	    isolated: "\uFC48",
	    initial: "\uFCD1",
	    final: "\uFC89"
	  }
	}, // Ligature MEEM WITH MEEM WITH YEH
	{
	  matches: ["\u0645\u0645\u064A"],
	  forms: {
	    final: "\uFDB1"
	  }
	}, // Ligature MEEM WITH YEH
	{
	  matches: ["\u0645\u064A"],
	  forms: {
	    isolated: "\uFC4A"
	  }
	}, // Ligature NOON WITH ALEF MAKSURA
	{
	  matches: ["\u0646\u0649"],
	  forms: {
	    isolated: "\uFC4F",
	    final: "\uFC8E"
	  }
	}, // Ligature NOON WITH HAH
	{
	  matches: ["\u0646\u062D"],
	  forms: {
	    isolated: "\uFC4C",
	    initial: "\uFCD3"
	  }
	}, // Ligature NOON WITH HAH WITH ALEF MAKSURA
	{
	  matches: ["\u0646\u062D\u0649"],
	  forms: {
	    final: "\uFD96"
	  }
	}, // Ligature NOON WITH HAH WITH MEEM
	{
	  matches: ["\u0646\u062D\u0645"],
	  forms: {
	    initial: "\uFD95"
	  }
	}, // Ligature NOON WITH HAH WITH YEH
	{
	  matches: ["\u0646\u062D\u064A"],
	  forms: {
	    final: "\uFDB3"
	  }
	}, // Ligature NOON WITH HEH
	{
	  matches: ["\u0646\u0647"],
	  forms: {
	    initial: "\uFCD6",
	    medial: "\uFCEF"
	  }
	}, // Ligature NOON WITH JEEM
	{
	  matches: ["\u0646\u062C"],
	  forms: {
	    isolated: "\uFC4B",
	    initial: "\uFCD2"
	  }
	}, // Ligature NOON WITH JEEM WITH ALEF MAKSURA
	{
	  matches: ["\u0646\u062C\u0649"],
	  forms: {
	    final: "\uFD99"
	  }
	}, // Ligature NOON WITH JEEM WITH HAH
	{
	  matches: ["\u0646\u062C\u062D"],
	  forms: {
	    initial: "\uFDB8",
	    final: "\uFDBD"
	  }
	}, // Ligature NOON WITH JEEM WITH MEEM
	{
	  matches: ["\u0646\u062C\u0645"],
	  forms: {
	    initial: "\uFD98",
	    final: "\uFD97"
	  }
	}, // Ligature NOON WITH JEEM WITH YEH
	{
	  matches: ["\u0646\u062C\u064A"],
	  forms: {
	    final: "\uFDC7"
	  }
	}, // Ligature NOON WITH KHAH
	{
	  matches: ["\u0646\u062E"],
	  forms: {
	    isolated: "\uFC4D",
	    initial: "\uFCD4"
	  }
	}, // Ligature NOON WITH MEEM
	{
	  matches: ["\u0646\u0645"],
	  forms: {
	    isolated: "\uFC4E",
	    initial: "\uFCD5",
	    medial: "\uFCEE",
	    final: "\uFC8C"
	  }
	}, // Ligature NOON WITH MEEM WITH ALEF MAKSURA
	{
	  matches: ["\u0646\u0645\u0649"],
	  forms: {
	    final: "\uFD9B"
	  }
	}, // Ligature NOON WITH MEEM WITH YEH
	{
	  matches: ["\u0646\u0645\u064A"],
	  forms: {
	    final: "\uFD9A"
	  }
	}, // Ligature NOON WITH NOON
	{
	  matches: ["\u0646\u0646"],
	  forms: {
	    final: "\uFC8D"
	  }
	}, // Ligature NOON WITH REH
	{
	  matches: ["\u0646\u0631"],
	  forms: {
	    final: "\uFC8A"
	  }
	}, // Ligature NOON WITH YEH
	{
	  matches: ["\u0646\u064A"],
	  forms: {
	    isolated: "\uFC50",
	    final: "\uFC8F"
	  }
	}, // Ligature NOON WITH ZAIN
	{
	  matches: ["\u0646\u0632"],
	  forms: {
	    final: "\uFC8B"
	  }
	}, // Ligature QAF WITH ALEF MAKSURA
	{
	  matches: ["\u0642\u0649"],
	  forms: {
	    isolated: "\uFC35",
	    final: "\uFC7E"
	  }
	}, // Ligature QAF WITH HAH
	{
	  matches: ["\u0642\u062D"],
	  forms: {
	    isolated: "\uFC33",
	    initial: "\uFCC2"
	  }
	}, // Ligature QAF WITH MEEM
	{
	  matches: ["\u0642\u0645"],
	  forms: {
	    isolated: "\uFC34",
	    initial: "\uFCC3"
	  }
	}, // Ligature QAF WITH MEEM WITH HAH
	{
	  matches: ["\u0642\u0645\u062D"],
	  forms: {
	    initial: "\uFDB4",
	    final: "\uFD7E"
	  }
	}, // Ligature QAF WITH MEEM WITH MEEM
	{
	  matches: ["\u0642\u0645\u0645"],
	  forms: {
	    final: "\uFD7F"
	  }
	}, // Ligature QAF WITH MEEM WITH YEH
	{
	  matches: ["\u0642\u0645\u064A"],
	  forms: {
	    final: "\uFDB2"
	  }
	}, // Ligature QAF WITH YEH
	{
	  matches: ["\u0642\u064A"],
	  forms: {
	    isolated: "\uFC36",
	    final: "\uFC7F"
	  }
	}, // Ligature REH WITH SUPERSCRIPT ALEF
	{
	  matches: ["\u0631\u0670"],
	  forms: {
	    isolated: "\uFC5C"
	  }
	}, // Ligature SAD WITH ALEF MAKSURA
	{
	  matches: ["\u0635\u0649"],
	  forms: {
	    isolated: "\uFD05",
	    final: "\uFD21"
	  }
	}, // Ligature SAD WITH HAH
	{
	  matches: ["\u0635\u062D"],
	  forms: {
	    isolated: "\uFC20",
	    initial: "\uFCB1"
	  }
	}, // Ligature SAD WITH HAH WITH HAH
	{
	  matches: ["\u0635\u062D\u062D"],
	  forms: {
	    initial: "\uFD65",
	    final: "\uFD64"
	  }
	}, // Ligature SAD WITH HAH WITH YEH
	{
	  matches: ["\u0635\u062D\u064A"],
	  forms: {
	    final: "\uFDA9"
	  }
	}, // Ligature SAD WITH KHAH
	{
	  matches: ["\u0635\u062E"],
	  forms: {
	    initial: "\uFCB2"
	  }
	}, // Ligature SAD WITH MEEM
	{
	  matches: ["\u0635\u0645"],
	  forms: {
	    isolated: "\uFC21",
	    initial: "\uFCB3"
	  }
	}, // Ligature SAD WITH MEEM WITH MEEM
	{
	  matches: ["\u0635\u0645\u0645"],
	  forms: {
	    initial: "\uFDC5",
	    final: "\uFD66"
	  }
	}, // Ligature SAD WITH REH
	{
	  matches: ["\u0635\u0631"],
	  forms: {
	    isolated: "\uFD0F",
	    final: "\uFD2B"
	  }
	}, // Ligature SAD WITH YEH
	{
	  matches: ["\u0635\u064A"],
	  forms: {
	    isolated: "\uFD06",
	    final: "\uFD22"
	  }
	}, // Ligature SEEN WITH ALEF MAKSURA
	{
	  matches: ["\u0633\u0649"],
	  forms: {
	    isolated: "\uFCFB",
	    final: "\uFD17"
	  }
	}, // Ligature SEEN WITH HAH
	{
	  matches: ["\u0633\u062D"],
	  forms: {
	    isolated: "\uFC1D",
	    initial: "\uFCAE",
	    medial: "\uFD35"
	  }
	}, // Ligature SEEN WITH HAH WITH JEEM
	{
	  matches: ["\u0633\u062D\u062C"],
	  forms: {
	    initial: "\uFD5C"
	  }
	}, // Ligature SEEN WITH HEH
	{
	  matches: ["\u0633\u0647"],
	  forms: {
	    initial: "\uFD31",
	    medial: "\uFCE8"
	  }
	}, // Ligature SEEN WITH JEEM
	{
	  matches: ["\u0633\u062C"],
	  forms: {
	    isolated: "\uFC1C",
	    initial: "\uFCAD",
	    medial: "\uFD34"
	  }
	}, // Ligature SEEN WITH JEEM WITH ALEF MAKSURA
	{
	  matches: ["\u0633\u062C\u0649"],
	  forms: {
	    final: "\uFD5E"
	  }
	}, // Ligature SEEN WITH JEEM WITH HAH
	{
	  matches: ["\u0633\u062C\u062D"],
	  forms: {
	    initial: "\uFD5D"
	  }
	}, // Ligature SEEN WITH KHAH
	{
	  matches: ["\u0633\u062E"],
	  forms: {
	    isolated: "\uFC1E",
	    initial: "\uFCAF",
	    medial: "\uFD36"
	  }
	}, // Ligature SEEN WITH KHAH WITH ALEF MAKSURA
	{
	  matches: ["\u0633\u062E\u0649"],
	  forms: {
	    final: "\uFDA8"
	  }
	}, // Ligature SEEN WITH KHAH WITH YEH
	{
	  matches: ["\u0633\u062E\u064A"],
	  forms: {
	    final: "\uFDC6"
	  }
	}, // Ligature SEEN WITH MEEM
	{
	  matches: ["\u0633\u0645"],
	  forms: {
	    isolated: "\uFC1F",
	    initial: "\uFCB0",
	    medial: "\uFCE7"
	  }
	}, // Ligature SEEN WITH MEEM WITH HAH
	{
	  matches: ["\u0633\u0645\u062D"],
	  forms: {
	    initial: "\uFD60",
	    final: "\uFD5F"
	  }
	}, // Ligature SEEN WITH MEEM WITH JEEM
	{
	  matches: ["\u0633\u0645\u062C"],
	  forms: {
	    initial: "\uFD61"
	  }
	}, // Ligature SEEN WITH MEEM WITH MEEM
	{
	  matches: ["\u0633\u0645\u0645"],
	  forms: {
	    initial: "\uFD63",
	    final: "\uFD62"
	  }
	}, // Ligature SEEN WITH REH
	{
	  matches: ["\u0633\u0631"],
	  forms: {
	    isolated: "\uFD0E",
	    final: "\uFD2A"
	  }
	}, // Ligature SEEN WITH YEH
	{
	  matches: ["\u0633\u064A"],
	  forms: {
	    isolated: "\uFCFC",
	    final: "\uFD18"
	  }
	}, // Ligature SHADDA WITH DAMMA
	{
	  matches: ["\u0640\u064F\u0651"],
	  forms: {
	    medial: "\uFCF3"
	  }
	}, // Ligature SHADDA WITH FATHA
	{
	  matches: ["\u0640\u064E\u0651"],
	  forms: {
	    medial: "\uFCF2"
	  }
	}, // Ligature SHADDA WITH KASRA
	{
	  matches: ["\u0640\u0650\u0651"],
	  forms: {
	    medial: "\uFCF4"
	  }
	}, // Ligature SHEEN WITH ALEF MAKSURA
	{
	  matches: ["\u0634\u0649"],
	  forms: {
	    isolated: "\uFCFD",
	    final: "\uFD19"
	  }
	}, // Ligature SHEEN WITH HAH
	{
	  matches: ["\u0634\u062D"],
	  forms: {
	    isolated: "\uFD0A",
	    initial: "\uFD2E",
	    medial: "\uFD38",
	    final: "\uFD26"
	  }
	}, // Ligature SHEEN WITH HAH WITH MEEM
	{
	  matches: ["\u0634\u062D\u0645"],
	  forms: {
	    initial: "\uFD68",
	    final: "\uFD67"
	  }
	}, // Ligature SHEEN WITH HAH WITH YEH
	{
	  matches: ["\u0634\u062D\u064A"],
	  forms: {
	    final: "\uFDAA"
	  }
	}, // Ligature SHEEN WITH HEH
	{
	  matches: ["\u0634\u0647"],
	  forms: {
	    initial: "\uFD32",
	    medial: "\uFCEA"
	  }
	}, // Ligature SHEEN WITH JEEM
	{
	  matches: ["\u0634\u062C"],
	  forms: {
	    isolated: "\uFD09",
	    initial: "\uFD2D",
	    medial: "\uFD37",
	    final: "\uFD25"
	  }
	}, // Ligature SHEEN WITH JEEM WITH YEH
	{
	  matches: ["\u0634\u062C\u064A"],
	  forms: {
	    final: "\uFD69"
	  }
	}, // Ligature SHEEN WITH KHAH
	{
	  matches: ["\u0634\u062E"],
	  forms: {
	    isolated: "\uFD0B",
	    initial: "\uFD2F",
	    medial: "\uFD39",
	    final: "\uFD27"
	  }
	}, // Ligature SHEEN WITH MEEM
	{
	  matches: ["\u0634\u0645"],
	  forms: {
	    isolated: "\uFD0C",
	    initial: "\uFD30",
	    medial: "\uFCE9",
	    final: "\uFD28"
	  }
	}, // Ligature SHEEN WITH MEEM WITH KHAH
	{
	  matches: ["\u0634\u0645\u062E"],
	  forms: {
	    initial: "\uFD6B",
	    final: "\uFD6A"
	  }
	}, // Ligature SHEEN WITH MEEM WITH MEEM
	{
	  matches: ["\u0634\u0645\u0645"],
	  forms: {
	    initial: "\uFD6D",
	    final: "\uFD6C"
	  }
	}, // Ligature SHEEN WITH REH
	{
	  matches: ["\u0634\u0631"],
	  forms: {
	    isolated: "\uFD0D",
	    final: "\uFD29"
	  }
	}, // Ligature SHEEN WITH YEH
	{
	  matches: ["\u0634\u064A"],
	  forms: {
	    isolated: "\uFCFE",
	    final: "\uFD1A"
	  }
	}, // Ligature TAH WITH ALEF MAKSURA
	{
	  matches: ["\u0637\u0649"],
	  forms: {
	    isolated: "\uFCF5",
	    final: "\uFD11"
	  }
	}, // Ligature TAH WITH HAH
	{
	  matches: ["\u0637\u062D"],
	  forms: {
	    isolated: "\uFC26",
	    initial: "\uFCB8"
	  }
	}, // Ligature TAH WITH MEEM
	{
	  matches: ["\u0637\u0645"],
	  forms: {
	    isolated: "\uFC27",
	    initial: "\uFD33",
	    medial: "\uFD3A"
	  }
	}, // Ligature TAH WITH MEEM WITH HAH
	{
	  matches: ["\u0637\u0645\u062D"],
	  forms: {
	    initial: "\uFD72",
	    final: "\uFD71"
	  }
	}, // Ligature TAH WITH MEEM WITH MEEM
	{
	  matches: ["\u0637\u0645\u0645"],
	  forms: {
	    initial: "\uFD73"
	  }
	}, // Ligature TAH WITH MEEM WITH YEH
	{
	  matches: ["\u0637\u0645\u064A"],
	  forms: {
	    final: "\uFD74"
	  }
	}, // Ligature TAH WITH YEH
	{
	  matches: ["\u0637\u064A"],
	  forms: {
	    isolated: "\uFCF6",
	    final: "\uFD12"
	  }
	}, // Ligature TEH WITH ALEF MAKSURA
	{
	  matches: ["\u062A\u0649"],
	  forms: {
	    isolated: "\uFC0F",
	    final: "\uFC74"
	  }
	}, // Ligature TEH WITH HAH
	{
	  matches: ["\u062A\u062D"],
	  forms: {
	    isolated: "\uFC0C",
	    initial: "\uFCA2"
	  }
	}, // Ligature TEH WITH HAH WITH JEEM
	{
	  matches: ["\u062A\u062D\u062C"],
	  forms: {
	    initial: "\uFD52",
	    final: "\uFD51"
	  }
	}, // Ligature TEH WITH HAH WITH MEEM
	{
	  matches: ["\u062A\u062D\u0645"],
	  forms: {
	    initial: "\uFD53"
	  }
	}, // Ligature TEH WITH HEH
	{
	  matches: ["\u062A\u0647"],
	  forms: {
	    initial: "\uFCA5",
	    medial: "\uFCE4"
	  }
	}, // Ligature TEH WITH JEEM
	{
	  matches: ["\u062A\u062C"],
	  forms: {
	    isolated: "\uFC0B",
	    initial: "\uFCA1"
	  }
	}, // Ligature TEH WITH JEEM WITH ALEF MAKSURA
	{
	  matches: ["\u062A\u062C\u0649"],
	  forms: {
	    final: "\uFDA0"
	  }
	}, // Ligature TEH WITH JEEM WITH MEEM
	{
	  matches: ["\u062A\u062C\u0645"],
	  forms: {
	    initial: "\uFD50"
	  }
	}, // Ligature TEH WITH JEEM WITH YEH
	{
	  matches: ["\u062A\u062C\u064A"],
	  forms: {
	    final: "\uFD9F"
	  }
	}, // Ligature TEH WITH KHAH
	{
	  matches: ["\u062A\u062E"],
	  forms: {
	    isolated: "\uFC0D",
	    initial: "\uFCA3"
	  }
	}, // Ligature TEH WITH KHAH WITH ALEF MAKSURA
	{
	  matches: ["\u062A\u062E\u0649"],
	  forms: {
	    final: "\uFDA2"
	  }
	}, // Ligature TEH WITH KHAH WITH MEEM
	{
	  matches: ["\u062A\u062E\u0645"],
	  forms: {
	    initial: "\uFD54"
	  }
	}, // Ligature TEH WITH KHAH WITH YEH
	{
	  matches: ["\u062A\u062E\u064A"],
	  forms: {
	    final: "\uFDA1"
	  }
	}, // Ligature TEH WITH MEEM
	{
	  matches: ["\u062A\u0645"],
	  forms: {
	    isolated: "\uFC0E",
	    initial: "\uFCA4",
	    medial: "\uFCE3",
	    final: "\uFC72"
	  }
	}, // Ligature TEH WITH MEEM WITH ALEF MAKSURA
	{
	  matches: ["\u062A\u0645\u0649"],
	  forms: {
	    final: "\uFDA4"
	  }
	}, // Ligature TEH WITH MEEM WITH HAH
	{
	  matches: ["\u062A\u0645\u062D"],
	  forms: {
	    initial: "\uFD56"
	  }
	}, // Ligature TEH WITH MEEM WITH JEEM
	{
	  matches: ["\u062A\u0645\u062C"],
	  forms: {
	    initial: "\uFD55"
	  }
	}, // Ligature TEH WITH MEEM WITH KHAH
	{
	  matches: ["\u062A\u0645\u062E"],
	  forms: {
	    initial: "\uFD57"
	  }
	}, // Ligature TEH WITH MEEM WITH YEH
	{
	  matches: ["\u062A\u0645\u064A"],
	  forms: {
	    final: "\uFDA3"
	  }
	}, // Ligature TEH WITH NOON
	{
	  matches: ["\u062A\u0646"],
	  forms: {
	    final: "\uFC73"
	  }
	}, // Ligature TEH WITH REH
	{
	  matches: ["\u062A\u0631"],
	  forms: {
	    final: "\uFC70"
	  }
	}, // Ligature TEH WITH YEH
	{
	  matches: ["\u062A\u064A"],
	  forms: {
	    isolated: "\uFC10",
	    final: "\uFC75"
	  }
	}, // Ligature TEH WITH ZAIN
	{
	  matches: ["\u062A\u0632"],
	  forms: {
	    final: "\uFC71"
	  }
	}, // Ligature THAL WITH SUPERSCRIPT ALEF
	{
	  matches: ["\u0630\u0670"],
	  forms: {
	    isolated: "\uFC5B"
	  }
	}, // Ligature THEH WITH ALEF MAKSURA
	{
	  matches: ["\u062B\u0649"],
	  forms: {
	    isolated: "\uFC13",
	    final: "\uFC7A"
	  }
	}, // Ligature THEH WITH HEH
	{
	  matches: ["\u062B\u0647"],
	  forms: {
	    medial: "\uFCE6"
	  }
	}, // Ligature THEH WITH JEEM
	{
	  matches: ["\u062B\u062C"],
	  forms: {
	    isolated: "\uFC11"
	  }
	}, // Ligature THEH WITH MEEM
	{
	  matches: ["\u062B\u0645"],
	  forms: {
	    isolated: "\uFC12",
	    initial: "\uFCA6",
	    medial: "\uFCE5",
	    final: "\uFC78"
	  }
	}, // Ligature THEH WITH NOON
	{
	  matches: ["\u062B\u0646"],
	  forms: {
	    final: "\uFC79"
	  }
	}, // Ligature THEH WITH REH
	{
	  matches: ["\u062B\u0631"],
	  forms: {
	    final: "\uFC76"
	  }
	}, // Ligature THEH WITH YEH
	{
	  matches: ["\u062B\u064A"],
	  forms: {
	    isolated: "\uFC14",
	    final: "\uFC7B"
	  }
	}, // Ligature THEH WITH ZAIN
	{
	  matches: ["\u062B\u0632"],
	  forms: {
	    final: "\uFC77"
	  }
	}, // Ligature UIGHUR KIRGHIZ YEH WITH HAMZA ABOVE WITH ALEF MAKSURA
	{
	  matches: ["\u0626\u0649"],
	  forms: {
	    isolated: "\uFBF9",
	    initial: "\uFBFB",
	    final: "\uFBFA"
	  }
	}, // Ligature YEH WITH ALEF MAKSURA
	{
	  matches: ["\u064A\u0649"],
	  forms: {
	    isolated: "\uFC59",
	    final: "\uFC95"
	  }
	}, // Ligature YEH WITH HAH
	{
	  matches: ["\u064A\u062D"],
	  forms: {
	    isolated: "\uFC56",
	    initial: "\uFCDB"
	  }
	}, // Ligature YEH WITH HAH WITH YEH
	{
	  matches: ["\u064A\u062D\u064A"],
	  forms: {
	    final: "\uFDAE"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH AE
	{
	  matches: ["\u0626\u06D5"],
	  forms: {
	    isolated: "\uFBEC",
	    final: "\uFBED"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH ALEF
	{
	  matches: ["\u0626\u0627"],
	  forms: {
	    isolated: "\uFBEA",
	    final: "\uFBEB"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH ALEF MAKSURA
	{
	  matches: ["\u0626\u0649"],
	  forms: {
	    isolated: "\uFC03",
	    final: "\uFC68"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH E
	{
	  matches: ["\u0626\u06D0"],
	  forms: {
	    isolated: "\uFBF6",
	    initial: "\uFBF8",
	    final: "\uFBF7"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH HAH
	{
	  matches: ["\u0626\u062D"],
	  forms: {
	    isolated: "\uFC01",
	    initial: "\uFC98"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH HEH
	{
	  matches: ["\u0626\u0647"],
	  forms: {
	    initial: "\uFC9B",
	    medial: "\uFCE0"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH JEEM
	{
	  matches: ["\u0626\u062C"],
	  forms: {
	    isolated: "\uFC00",
	    initial: "\uFC97"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH KHAH
	{
	  matches: ["\u0626\u062E"],
	  forms: {
	    initial: "\uFC99"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH MEEM
	{
	  matches: ["\u0626\u0645"],
	  forms: {
	    isolated: "\uFC02",
	    initial: "\uFC9A",
	    medial: "\uFCDF",
	    final: "\uFC66"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH NOON
	{
	  matches: ["\u0626\u0646"],
	  forms: {
	    final: "\uFC67"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH OE
	{
	  matches: ["\u0626\u06C6"],
	  forms: {
	    isolated: "\uFBF2",
	    final: "\uFBF3"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH REH
	{
	  matches: ["\u0626\u0631"],
	  forms: {
	    final: "\uFC64"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH U
	{
	  matches: ["\u0626\u06C7"],
	  forms: {
	    isolated: "\uFBF0",
	    final: "\uFBF1"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH WAW
	{
	  matches: ["\u0626\u0648"],
	  forms: {
	    isolated: "\uFBEE",
	    final: "\uFBEF"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH YEH
	{
	  matches: ["\u0626\u064A"],
	  forms: {
	    isolated: "\uFC04",
	    final: "\uFC69"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH YU
	{
	  matches: ["\u0626\u06C8"],
	  forms: {
	    isolated: "\uFBF4",
	    final: "\uFBF5"
	  }
	}, // Ligature YEH WITH HAMZA ABOVE WITH ZAIN
	{
	  matches: ["\u0626\u0632"],
	  forms: {
	    final: "\uFC65"
	  }
	}, // Ligature YEH WITH HEH
	{
	  matches: ["\u064A\u0647"],
	  forms: {
	    initial: "\uFCDE",
	    medial: "\uFCF1"
	  }
	}, // Ligature YEH WITH JEEM
	{
	  matches: ["\u064A\u062C"],
	  forms: {
	    isolated: "\uFC55",
	    initial: "\uFCDA"
	  }
	}, // Ligature YEH WITH JEEM WITH YEH
	{
	  matches: ["\u064A\u062C\u064A"],
	  forms: {
	    final: "\uFDAF"
	  }
	}, // Ligature YEH WITH KHAH
	{
	  matches: ["\u064A\u062E"],
	  forms: {
	    isolated: "\uFC57",
	    initial: "\uFCDC"
	  }
	}, // Ligature YEH WITH MEEM
	{
	  matches: ["\u064A\u0645"],
	  forms: {
	    isolated: "\uFC58",
	    initial: "\uFCDD",
	    medial: "\uFCF0",
	    final: "\uFC93"
	  }
	}, // Ligature YEH WITH MEEM WITH MEEM
	{
	  matches: ["\u064A\u0645\u0645"],
	  forms: {
	    initial: "\uFD9D",
	    final: "\uFD9C"
	  }
	}, // Ligature YEH WITH MEEM WITH YEH
	{
	  matches: ["\u064A\u0645\u064A"],
	  forms: {
	    final: "\uFDB0"
	  }
	}, // Ligature YEH WITH NOON
	{
	  matches: ["\u064A\u0646"],
	  forms: {
	    final: "\uFC94"
	  }
	}, // Ligature YEH WITH REH
	{
	  matches: ["\u064A\u0631"],
	  forms: {
	    final: "\uFC91"
	  }
	}, // Ligature YEH WITH YEH
	{
	  matches: ["\u064A\u064A"],
	  forms: {
	    isolated: "\uFC5A",
	    final: "\uFC96"
	  }
	}, // Ligature YEH WITH ZAIN
	{
	  matches: ["\u064A\u0632"],
	  forms: {
	    final: "\uFC92"
	  }
	}, // Ligature ZAH WITH MEEM
	{
	  matches: ["\u0638\u0645"],
	  forms: {
	    isolated: "\uFC28",
	    initial: "\uFCB9",
	    medial: "\uFD3B"
	  }
	}];
	var LETTERS = {
	  // Letter HAMZA
	  "\u0621": {
	    isolated: "\uFE80"
	  },
	  // Letter ALEF WITH MADDA ABOVE
	  "\u0622": {
	    isolated: "\uFE81",
	    final: "\uFE82"
	  },
	  // Letter ALEF WITH HAMZA ABOVE
	  "\u0623": {
	    isolated: "\uFE83",
	    final: "\uFE84"
	  },
	  // Letter WAW WITH HAMZA ABOVE
	  "\u0624": {
	    isolated: "\uFE85",
	    final: "\uFE86"
	  },
	  // Letter ALEF WITH HAMZA BELOW
	  "\u0625": {
	    isolated: "\uFE87",
	    final: "\uFE88"
	  },
	  // Letter YEH WITH HAMZA ABOVE
	  "\u0626": {
	    isolated: "\uFE89",
	    initial: "\uFE8B",
	    medial: "\uFE8C",
	    final: "\uFE8A"
	  },
	  // Letter ALEF
	  "\u0627": {
	    isolated: "\uFE8D",
	    final: "\uFE8E"
	  },
	  // Letter BEH
	  "\u0628": {
	    isolated: "\uFE8F",
	    initial: "\uFE91",
	    medial: "\uFE92",
	    final: "\uFE90"
	  },
	  // Letter TEH MARBUTA
	  "\u0629": {
	    isolated: "\uFE93",
	    final: "\uFE94"
	  },
	  // Letter TEH
	  "\u062A": {
	    isolated: "\uFE95",
	    initial: "\uFE97",
	    medial: "\uFE98",
	    final: "\uFE96"
	  },
	  // Letter THEH
	  "\u062B": {
	    isolated: "\uFE99",
	    initial: "\uFE9B",
	    medial: "\uFE9C",
	    final: "\uFE9A"
	  },
	  // Letter JEEM
	  "\u062C": {
	    isolated: "\uFE9D",
	    initial: "\uFE9F",
	    medial: "\uFEA0",
	    final: "\uFE9E"
	  },
	  // Letter HAH
	  "\u062D": {
	    isolated: "\uFEA1",
	    initial: "\uFEA3",
	    medial: "\uFEA4",
	    final: "\uFEA2"
	  },
	  // Letter KHAH
	  "\u062E": {
	    isolated: "\uFEA5",
	    initial: "\uFEA7",
	    medial: "\uFEA8",
	    final: "\uFEA6"
	  },
	  // Letter DAL
	  "\u062F": {
	    isolated: "\uFEA9",
	    final: "\uFEAA"
	  },
	  // Letter THAL
	  "\u0630": {
	    isolated: "\uFEAB",
	    final: "\uFEAC"
	  },
	  // Letter REH
	  "\u0631": {
	    isolated: "\uFEAD",
	    final: "\uFEAE"
	  },
	  // Letter ZAIN
	  "\u0632": {
	    isolated: "\uFEAF",
	    final: "\uFEB0"
	  },
	  // Letter SEEN
	  "\u0633": {
	    isolated: "\uFEB1",
	    initial: "\uFEB3",
	    medial: "\uFEB4",
	    final: "\uFEB2"
	  },
	  // Letter SHEEN
	  "\u0634": {
	    isolated: "\uFEB5",
	    initial: "\uFEB7",
	    medial: "\uFEB8",
	    final: "\uFEB6"
	  },
	  // Letter SAD
	  "\u0635": {
	    isolated: "\uFEB9",
	    initial: "\uFEBB",
	    medial: "\uFEBC",
	    final: "\uFEBA"
	  },
	  // Letter DAD
	  "\u0636": {
	    isolated: "\uFEBD",
	    initial: "\uFEBF",
	    medial: "\uFEC0",
	    final: "\uFEBE"
	  },
	  // Letter TAH
	  "\u0637": {
	    isolated: "\uFEC1",
	    initial: "\uFEC3",
	    medial: "\uFEC4",
	    final: "\uFEC2"
	  },
	  // Letter ZAH
	  "\u0638": {
	    isolated: "\uFEC5",
	    initial: "\uFEC7",
	    medial: "\uFEC8",
	    final: "\uFEC6"
	  },
	  // Letter AIN
	  "\u0639": {
	    isolated: "\uFEC9",
	    initial: "\uFECB",
	    medial: "\uFECC",
	    final: "\uFECA"
	  },
	  // Letter GHAIN
	  "\u063A": {
	    isolated: "\uFECD",
	    initial: "\uFECF",
	    medial: "\uFED0",
	    final: "\uFECE"
	  },
	  // TATWEEL
	  "\u0640": {
	    isolated: "\u0640",
	    initial: "\u0640",
	    medial: "\u0640",
	    final: "\u0640"
	  },
	  // Letter FEH
	  "\u0641": {
	    isolated: "\uFED1",
	    initial: "\uFED3",
	    medial: "\uFED4",
	    final: "\uFED2"
	  },
	  // Letter QAF
	  "\u0642": {
	    isolated: "\uFED5",
	    initial: "\uFED7",
	    medial: "\uFED8",
	    final: "\uFED6"
	  },
	  // Letter KAF
	  "\u0643": {
	    isolated: "\uFED9",
	    initial: "\uFEDB",
	    medial: "\uFEDC",
	    final: "\uFEDA"
	  },
	  // Letter LAM
	  "\u0644": {
	    isolated: "\uFEDD",
	    initial: "\uFEDF",
	    medial: "\uFEE0",
	    final: "\uFEDE"
	  },
	  // Letter MEEM
	  "\u0645": {
	    isolated: "\uFEE1",
	    initial: "\uFEE3",
	    medial: "\uFEE4",
	    final: "\uFEE2"
	  },
	  // Letter NOON
	  "\u0646": {
	    isolated: "\uFEE5",
	    initial: "\uFEE7",
	    medial: "\uFEE8",
	    final: "\uFEE6"
	  },
	  // Letter HEH
	  "\u0647": {
	    isolated: "\uFEE9",
	    initial: "\uFEEB",
	    medial: "\uFEEC",
	    final: "\uFEEA"
	  },
	  // Letter WAW
	  "\u0648": {
	    isolated: "\uFEED",
	    final: "\uFEEE"
	  },
	  // Letter ALEF MAKSURA
	  "\u0649": {
	    isolated: "\uFEEF",
	    final: "\uFEF0"
	  },
	  // Letter YEH
	  "\u064A": {
	    isolated: "\uFEF1",
	    initial: "\uFEF3",
	    medial: "\uFEF4",
	    final: "\uFEF2"
	  },
	  // Letter ALEF WASLA
	  "\u0671": {
	    isolated: "\uFB50",
	    final: "\uFB51"
	  },
	  // Letter U WITH HAMZA ABOVE
	  "\u0677": {
	    isolated: "\uFBDD"
	  },
	  // Letter TTEH
	  "\u0679": {
	    isolated: "\uFB66",
	    initial: "\uFB68",
	    medial: "\uFB69",
	    final: "\uFB67"
	  },
	  // Letter TTEHEH
	  "\u067A": {
	    isolated: "\uFB5E",
	    initial: "\uFB60",
	    medial: "\uFB61",
	    final: "\uFB5F"
	  },
	  // Letter BEEH
	  "\u067B": {
	    isolated: "\uFB52",
	    initial: "\uFB54",
	    medial: "\uFB55",
	    final: "\uFB53"
	  },
	  // Letter PEH
	  "\u067E": {
	    isolated: "\uFB56",
	    initial: "\uFB58",
	    medial: "\uFB59",
	    final: "\uFB57"
	  },
	  // Letter TEHEH
	  "\u067F": {
	    isolated: "\uFB62",
	    initial: "\uFB64",
	    medial: "\uFB65",
	    final: "\uFB63"
	  },
	  // Letter BEHEH
	  "\u0680": {
	    isolated: "\uFB5A",
	    initial: "\uFB5C",
	    medial: "\uFB5D",
	    final: "\uFB5B"
	  },
	  // Letter NYEH
	  "\u0683": {
	    isolated: "\uFB76",
	    initial: "\uFB78",
	    medial: "\uFB79",
	    final: "\uFB77"
	  },
	  // Letter DYEH
	  "\u0684": {
	    isolated: "\uFB72",
	    initial: "\uFB74",
	    medial: "\uFB75",
	    final: "\uFB73"
	  },
	  // Letter TCHEH
	  "\u0686": {
	    isolated: "\uFB7A",
	    initial: "\uFB7C",
	    medial: "\uFB7D",
	    final: "\uFB7B"
	  },
	  // Letter TCHEHEH
	  "\u0687": {
	    isolated: "\uFB7E",
	    initial: "\uFB80",
	    medial: "\uFB81",
	    final: "\uFB7F"
	  },
	  // Letter DDAL
	  "\u0688": {
	    isolated: "\uFB88",
	    final: "\uFB89"
	  },
	  // Letter DAHAL
	  "\u068C": {
	    isolated: "\uFB84",
	    final: "\uFB85"
	  },
	  // Letter DDAHAL
	  "\u068D": {
	    isolated: "\uFB82",
	    final: "\uFB83"
	  },
	  // Letter DUL
	  "\u068E": {
	    isolated: "\uFB86",
	    final: "\uFB87"
	  },
	  // Letter RREH
	  "\u0691": {
	    isolated: "\uFB8C",
	    final: "\uFB8D"
	  },
	  // Letter JEH
	  "\u0698": {
	    isolated: "\uFB8A",
	    final: "\uFB8B"
	  },
	  // Letter VEH
	  "\u06A4": {
	    isolated: "\uFB6A",
	    initial: "\uFB6C",
	    medial: "\uFB6D",
	    final: "\uFB6B"
	  },
	  // Letter PEHEH
	  "\u06A6": {
	    isolated: "\uFB6E",
	    initial: "\uFB70",
	    medial: "\uFB71",
	    final: "\uFB6F"
	  },
	  // Letter KEHEH
	  "\u06A9": {
	    isolated: "\uFB8E",
	    initial: "\uFB90",
	    medial: "\uFB91",
	    final: "\uFB8F"
	  },
	  // Letter NG
	  "\u06AD": {
	    isolated: "\uFBD3",
	    initial: "\uFBD5",
	    medial: "\uFBD6",
	    final: "\uFBD4"
	  },
	  // Letter GAF
	  "\u06AF": {
	    isolated: "\uFB92",
	    initial: "\uFB94",
	    medial: "\uFB95",
	    final: "\uFB93"
	  },
	  // Letter NGOEH
	  "\u06B1": {
	    isolated: "\uFB9A",
	    initial: "\uFB9C",
	    medial: "\uFB9D",
	    final: "\uFB9B"
	  },
	  // Letter GUEH
	  "\u06B3": {
	    isolated: "\uFB96",
	    initial: "\uFB98",
	    medial: "\uFB99",
	    final: "\uFB97"
	  },
	  // Letter NOON GHUNNA
	  "\u06BA": {
	    isolated: "\uFB9E",
	    final: "\uFB9F"
	  },
	  // Letter RNOON
	  "\u06BB": {
	    isolated: "\uFBA0",
	    initial: "\uFBA2",
	    medial: "\uFBA3",
	    final: "\uFBA1"
	  },
	  // Letter HEH DOACHASHMEE
	  "\u06BE": {
	    isolated: "\uFBAA",
	    initial: "\uFBAC",
	    medial: "\uFBAD",
	    final: "\uFBAB"
	  },
	  // Letter HEH WITH YEH ABOVE
	  "\u06C0": {
	    isolated: "\uFBA4",
	    final: "\uFBA5"
	  },
	  // Letter HEH GOAL
	  "\u06C1": {
	    isolated: "\uFBA6",
	    initial: "\uFBA8",
	    medial: "\uFBA9",
	    final: "\uFBA7"
	  },
	  // Letter KIRGHIZ OE
	  "\u06C5": {
	    isolated: "\uFBE0",
	    final: "\uFBE1"
	  },
	  // Letter OE
	  "\u06C6": {
	    isolated: "\uFBD9",
	    final: "\uFBDA"
	  },
	  // Letter U
	  "\u06C7": {
	    isolated: "\uFBD7",
	    final: "\uFBD8"
	  },
	  // Letter YU
	  "\u06C8": {
	    isolated: "\uFBDB",
	    final: "\uFBDC"
	  },
	  // Letter KIRGHIZ YU
	  "\u06C9": {
	    isolated: "\uFBE2",
	    final: "\uFBE3"
	  },
	  // Letter VE
	  "\u06CB": {
	    isolated: "\uFBDE",
	    final: "\uFBDF"
	  },
	  // Letter FARSI YEH
	  "\u06CC": {
	    isolated: "\uFBFC",
	    initial: "\uFBFE",
	    medial: "\uFBFF",
	    final: "\uFBFD"
	  },
	  // Letter E
	  "\u06D0": {
	    isolated: "\uFBE4",
	    initial: "\uFBE6",
	    medial: "\uFBE7",
	    final: "\uFBE5"
	  },
	  // Letter YEH BARREE
	  "\u06D2": {
	    isolated: "\uFBAE",
	    final: "\uFBAF"
	  },
	  // Letter YEH BARREE WITH HAMZA ABOVE
	  "\u06D3": {
	    isolated: "\uFBB0",
	    final: "\uFBB1"
	  }
	}; // accent / vowel marks

	var HARAKAT_RE = new RegExp("[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED\u08D4-\u08E1\u08D4-\u08ED\u08E3-\u08FF]");

	function _connects_with_letter_before(letter) {
	  if (!LETTERS[letter]) {
	    return false;
	  }

	  var forms = LETTERS[letter];
	  return forms.final || forms.medial;
	}

	function _connects_with_letter_after(letter) {
	  if (!LETTERS[letter]) {
	    return false;
	  }

	  var forms = LETTERS[letter];
	  return forms.initial || forms.medial;
	}

	function _connects_with_letters_before_and_after(letter) {
	  if (!LETTERS[letter]) {
	    return false;
	  }

	  var forms = LETTERS[letter];
	  return forms.medial;
	}
	/* options
	{
	delete_harakat: false, // remove short vowel marks?
	ligatures: true  // combine multiple letters into longer ligatures?
	}
	*/


	function reshape(text, options) {
	  if (!text) {
	    return '';
	  }

	  if (!options) {
	    options = {};
	  }

	  var output = [];
	  var LETTER = 0;
	  var FORM = 1;
	  var NOT_SUPPORTED = -1; // harakat and letters

	  var delete_harakat = options.delete_harakat || false;

	  for (var i = 0; i < text.length; i++) {
	    var letter = text[i]; // handle removing harakat

	    if (delete_harakat && HARAKAT_RE.match(letter)) {
	      output.push(['', NOT_SUPPORTED]);
	    }

	    if (!LETTERS[letter]) {
	      // handle non-Arabic letter
	      output.push([letter, NOT_SUPPORTED]);
	    } else if (!output.length) {
	      // first Arabic letter - display isolated form
	      output.push([letter, 'isolated']);
	    } else {
	      var previous_output = output[output.length - 1];

	      if (previous_output[FORM] === NOT_SUPPORTED) {
	        // not Arabic before this one
	        output.push([letter, 'isolated']);
	      } else if (!_connects_with_letter_before(letter)) {
	        // this letter doesn't try to connect with previous
	        output.push([letter, 'isolated']);
	      } else if (!_connects_with_letter_after(previous_output[LETTER])) {
	        // previous letter doesn't try to connect to me
	        output.push([letter, 'isolated']);
	      } else if (previous_output[FORM] === 'final' && !_connects_with_letters_before_and_after(previous_output[LETTER])) {
	        // previous letter was final and cannot be medial to connect to me
	        output.push([letter, 'isolated']);
	      } else if (previous_output[FORM] == 'isolated') {
	        // previous letter was alone - we can change it to be initial of my phrase
	        // for now this letter is the final of the phrase
	        output[output.length - 1][1] = 'initial';
	        output.push([letter, 'final']);
	      } else {
	        // previous letter can be changed to medial
	        // this one can be final
	        output[output.length - 1][1] = 'medial';
	        output.push([letter, 'final']);
	      }
	    }
	  } // ligatures


	  if (options.ligatures !== false) {
	    for (var x = 0; x < LIGATURES.length; x++) {
	      var ligature = LIGATURES[x];

	      for (var y = 0; y < ligature.matches.length; y++) {
	        var pattern = ligature.matches[y];
	        var textFragment = text;
	        var textFragmentOffset = 0;

	        while (textFragment.indexOf(pattern) > -1) {
	          // determine which ligature form to use
	          var a = textFragment.indexOf(pattern);
	          var start_form = output[a + textFragmentOffset][FORM];
	          var end_form = output[a + textFragmentOffset + pattern.length - 1][FORM];
	          var ligature_form = null;
	          /*
	          +-----------+----------+---------+---------+----------+
	          | a   \   b | ISOLATED | INITIAL | MEDIAL  | FINAL    |
	          +-----------+----------+---------+---------+----------+
	          | ISOLATED  | ISOLATED | INITIAL | INITIAL | ISOLATED |
	          | INITIAL   | ISOLATED | INITIAL | INITIAL | ISOLATED |
	          | MEDIAL    | FINAL    | MEDIAL  | MEDIAL  | FINAL    |
	          | FINAL     | FINAL    | MEDIAL  | MEDIAL  | FINAL    |
	          +-----------+----------+---------+---------+----------+
	          */

	          if (start_form === 'isolated' || start_form === 'initial') {
	            if (end_form === 'isolated' || end_form === 'final') {
	              ligature_form = 'isolated';
	            } else {
	              ligature_form = 'initial';
	            }
	          } else {
	            if (end_form === 'isolated' || end_form === 'final') {
	              ligature_form = 'final';
	            } else {
	              ligature_form = 'medial';
	            }
	          }

	          if (!ligature.forms[ligature_form]) {
	            // this ligature cannot be applied in this location
	            textFragmentOffset += a + 1;
	            textFragment = textFragment.substring(textFragmentOffset);
	            continue;
	          }

	          output[a + textFragmentOffset][0] = ligature.forms[ligature_form];
	          output[a + textFragmentOffset][1] = NOT_SUPPORTED;

	          for (var z = a + textFragmentOffset + 1; z < a + textFragmentOffset + pattern.length; z++) {
	            output[z] = ['', NOT_SUPPORTED];
	          }

	          textFragmentOffset += a + 1;
	          textFragment = textFragment.substring(textFragmentOffset);
	        }
	      }
	    }
	  }

	  return output.map(function (o) {
	    if (o[FORM] === NOT_SUPPORTED && o[LETTER].length) {
	      return o[LETTER];
	    } else if (options.ignoreIsolates && o[FORM] === 'isolated') {
	      return o[LETTER] || '';
	    } else {
	      return (LETTERS[o[LETTER]] || {})[o[FORM]] || '';
	    }
	  }).join('');
	}

	var jsArabicReshaper = {
	  LETTERS: LETTERS,
	  LIGATURES: LIGATURES,
	  LIGATURES: LIGATURES,
	  reshape: reshape
	};
	var jsArabicReshaper_3 = jsArabicReshaper.reshape;

	var direction_1 = direction;
	var RTL = "\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
	var LTR = "A-Za-z\xC0-\xD6\xD8-\xF6" + "\xF8-\u02B8\u0300-\u0590\u0800-\u1FFF\u200E\u2C00-\uFB1C" + "\uFE00-\uFE6F\uFEFD-\uFFFF";
	var rtl = new RegExp('^[^' + LTR + ']*[' + RTL + ']');
	var ltr = new RegExp('^[^' + RTL + ']*[' + LTR + ']');

	function direction(value) {
	  value = String(value || '');

	  if (rtl.test(value)) {
	    return 'rtl';
	  }

	  if (ltr.test(value)) {
	    return 'ltr';
	  }

	  return 'neutral';
	}

	var reverse = (function (str) {
	  return str.split('').reverse().join('');
	});

	var isLTR = function isLTR(str) {
	  return direction_1(str) === 'ltr';
	};

	var isNeutral = function isNeutral(str) {
	  return direction_1(str) === 'neutral';
	};

	var split = function split(str, tokens) {
	  var tempChar = tokens[0]; // We can use the first token as a temporary join character

	  for (var i = 1; i < tokens.length; i++) {
	    str = str.split(tokens[i]).join(tempChar);
	  }

	  str = str.split(tempChar);
	  return str;
	};

	var transform = function transform(str) {
	  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
	      _ref$spaceHack = _ref.spaceHack,
	      spaceHack = _ref$spaceHack === void 0 ? false : _ref$spaceHack,
	      _ref$ligatures = _ref.ligatures,
	      ligatures = _ref$ligatures === void 0 ? false : _ref$ligatures,
	      _ref$ignoreIsolates = _ref.ignoreIsolates,
	      ignoreIsolates = _ref$ignoreIsolates === void 0 ? true : _ref$ignoreIsolates;

	  var neutral = str.split('').filter(function (char) {
	    return isNeutral(char);
	  });
	  var reversed; // A single word, no need to split

	  if (neutral.length === 0) {
	    reversed = isLTR(str) ? str : reverse(str);
	  } else {
	    reversed = split(str, neutral).map(function (word) {
	      if (isLTR(word)) {
	        return word;
	      } else {
	        var reshapedWord = jsArabicReshaper_3(word, {
	          ligatures: ligatures,
	          ignoreIsolates: ignoreIsolates
	        });
	        var reverseWord = reverse(reshapedWord);
	        return reverseWord;
	      }
	    });
	  }

	  var transformed;

	  if (Array.isArray(reversed)) {
	    var merged = reversed.map(function (v, i) {
	      return [v, neutral[i]];
	    }).reduce(function (a, b) {
	      return a.concat(b);
	    });
	    transformed = merged.reverse().join('');
	  } else {
	    transformed = reversed;
	  }

	  if (spaceHack) {
	    transformed = transformed.split('').join("\u200A");
	  }

	  return transformed;
	};

	if (typeof process !== 'undefined' && process.env.ROLLUP_WATCH) {
	  var text = "أنا دائم التألق بالكتابة بالعربي with English. والعربية أيضاm";
	  console.log(transform(text, {
	    ligatures: false
	  }));
	}

	var selectionToNodeId = (function (selection) {
	  var leftSideArray = selection.slice(0, Math.floor(selection.length / 2));
	  var rightSideArray = selection.slice(Math.floor(selection.length / 2), selection.length);
	  return "".concat(toString(leftSideArray), ":").concat(toString(rightSideArray));
	});

	var toString = function toString(array) {
	  return array.reduce(function (accumulator, currentValue, index) {
	    return accumulator + currentValue * Math.pow(256, index);
	  });
	};

	var getSelectedType = (function () {
	  var nodeIds = Object.keys(App._state.mirror.sceneGraphSelection);

	  if (nodeIds.length === 1 && nodeIds[0]) {
	    return window.figmaPlugin.getNodeType(nodeIds[0]);
	  }

	  return false;
	});

	var getSelectedNodesIds = (function () {
	  return Object.keys(App._state.mirror.sceneGraphSelection);
	});

	var nodesText = "\n<div id=\"arabic-support\" class=\"raw_components--panel--3IcXg \" style=\"display: block;\">\n    <div>\n        <div class=\"raw_components--panelTitle--7MaOu raw_components--base--3TpZG raw_components--row--3dLxJ collapsible_property_panel--panelTitle--1cZql\">\n            <div class=\"collapsible_property_panel--panelTitleText--3GA0U\">Arabic Support</div>\n        </div>\n        <span></span>\n        <div>\n            <div class=\"raw_components--row--3dLxJ type_panel--twoCol--Fj7rw\" style=\"height: auto;\"><label class=\"\" style=\"display: flex;flex-direction: column;align-items: flex-start;justify-content: stretch;width: 100%;\"><textarea dir=\"rtl\" id=\"arabic-support-textarea\" type=\"text\" spellcheck=\"false\" value=\"0\" style=\"background: #fcfcfc;width: 100%;height: 24px;padding: 4px;box-sizing: border-box;border: 1px solid #d4d4d4;border-radius: 3px;height: 80px;margin-bottom: 8px;\"></textarea></label></div>\n        </div>\n        <div class=\"raw_components--row--3dLxJ \"><input type=\"checkbox\" id=\"enable-ligatures\" class=\" checkbox--checkbox--2ubjb basic_form--checkbox--3eCIg\"><label for=\"enable-ligatures\" class=\"raw_components--label--34YmO raw_components--base--3TpZG \">Enable Ligatures</label>\n        <div style=\"flex-grow: 1;\"></div>\n            <span tabindex=\"0\" class=\"raw_components--iconButton--1XZ77\">\n              <span class=\"gc358a75c\" data-tooltip-text=\"Some fonts pack great ligatures, some don't\"></span>\n            </span>\n        </div>\n        <div class=\"raw_components--row--3dLxJ \"><input type=\"checkbox\" id=\"ignore-isolates\" class=\" checkbox--checkbox--2ubjb basic_form--checkbox--3eCIg\" checked=\"checked\"><label for=\"ignore-isolates\" class=\"raw_components--label--34YmO raw_components--base--3TpZG \">Ignore Isolates</label>\n            <div style=\"flex-grow: 1;\"></div>\n            <span tabindex=\"0\" class=\"raw_components--iconButton--1XZ77\">\n              <span class=\"gc358a75c\" data-tooltip-text=\"Some fonts don't have proper isolates glyphs. You'll notice this when some glyphs disappear from your text.\"></span>\n            </span>\n        </div>\n        <div class=\"raw_components--row--3dLxJ \"><input type=\"checkbox\" id=\"spacer-hack\" class=\" checkbox--checkbox--2ubjb basic_form--checkbox--3eCIg\"><label for=\"spacer-hack\" class=\"raw_components--label--34YmO raw_components--base--3TpZG \">Enable Spacer Hack</label>\n            <div style=\"flex-grow: 1;\"></div>\n            <span tabindex=\"0\" class=\"raw_components--iconButton--1XZ77\">\n              <span class=\"gc358a75c\" data-tooltip-text=\"Figma partially reshapes Arabic glyphs with an unexpected behavior.  This hack will add a tiny space between all characters to prevent Figma from reshaping, you need to decrease character spacing by about %2 to counter this increase.\"></span>\n            </span>\n        </div>\n    </div>\n</div>\n";

	var ArabicSupport =
	/*#__PURE__*/
	function () {
	  function ArabicSupport() {
	    classCallCheck(this, ArabicSupport);

	    this.inject();
	    window.App.fromFullscreen.on("selection:replaceSelectors", this.onLayersSelected.bind(this));
	    window.App.fromFullscreen.on("selection:addSelectors", this.onLayersSelected.bind(this));
	    setInterval(this.inject.bind(this), 500);
	  }

	  createClass(ArabicSupport, [{
	    key: "getPanel",
	    value: function getPanel() {
	      return document.getElementById("arabic-support");
	    }
	  }, {
	    key: "getTextarea",
	    value: function getTextarea() {
	      return document.getElementById("arabic-support-textarea");
	    }
	  }, {
	    key: "getLigaturesCheckbox",
	    value: function getLigaturesCheckbox() {
	      return document.getElementById("enable-ligatures");
	    }
	  }, {
	    key: "getIsolatesCheckbox",
	    value: function getIsolatesCheckbox() {
	      return document.getElementById("ignore-isolates");
	    }
	  }, {
	    key: "getSpacerHackCheckbox",
	    value: function getSpacerHackCheckbox() {
	      return document.getElementById("spacer-hack");
	    }
	  }, {
	    key: "inject",
	    value: function () {
	      var _inject = asyncToGenerator(
	      /*#__PURE__*/
	      regenerator.mark(function _callee() {
	        var nodes, textPanel, textarea, ligaturesCheckbox, isolatesCheckbox, spacerHackCheckbox, selectedNodeId, selectedNodeData;
	        return regenerator.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                _context.next = 2;
	                return until(function () {
	                  return getActiveTab() === "DESIGN" && getSelectedType() === "TEXT";
	                });

	              case 2:
	                if (this.getPanel()) {
	                  _context.next = 21;
	                  break;
	                }

	                nodes = createNodes(nodesText);
	                textPanel = [].slice.call(document.getElementsByClassName("properties_panel--propertiesPanel--3PCth")[0].getElementsByClassName("cachedSubtree")).filter(function (panel) {
	                  return panel.textContent.indexOf("Text") !== -1;
	                })[0];
	                textPanel.appendChild(nodes);
	                textarea = this.getTextarea();
	                ligaturesCheckbox = this.getLigaturesCheckbox();
	                isolatesCheckbox = this.getIsolatesCheckbox();
	                spacerHackCheckbox = this.getSpacerHackCheckbox();
	                selectedNodeId = getSelectedNodesIds()[0];
	                this.selectedNodeId = selectedNodeId;
	                _context.next = 14;
	                return until(function () {
	                  return typeof selectedNodeId !== "undefined";
	                });

	              case 14:
	                selectedNodeData = this.getOriginalData();
	                textarea.value = selectedNodeData.text;

	                if (selectedNodeData.settings) {
	                  ligaturesCheckbox.checked = selectedNodeData.settings[0];
	                  isolatesCheckbox.checked = selectedNodeData.settings[1];
	                  spacerHackCheckbox.checked = selectedNodeData.settings[2];
	                }

	                textarea.addEventListener("input", lodash_debounce(this.handleInput.bind(this), 150));
	                ligaturesCheckbox.addEventListener("change", lodash_debounce(this.handleCheckbox.bind(this), 150));
	                isolatesCheckbox.addEventListener("change", lodash_debounce(this.handleCheckbox.bind(this), 150));
	                spacerHackCheckbox.addEventListener("change", lodash_debounce(this.handleCheckbox.bind(this), 150));

	              case 21:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function inject() {
	        return _inject.apply(this, arguments);
	      }

	      return inject;
	    }()
	  }, {
	    key: "onLayersSelected",
	    value: function onLayersSelected(event) {
	      var ui = this.getPanel();
	      var selections = Array.from(event.buffer);
	      var sceneGraphSelection = Object.keys(window.App._state.mirror.sceneGraphSelection);
	      if (ui === null || selections.length !== 8 || sceneGraphSelection.length > 1) return;
	      var selectedNodeId = selectionToNodeId(selections);
	      this.selectedNodeId = selectedNodeId;
	      var nodeType = getNodeType(selectedNodeId);

	      if (nodeType === "TEXT") {
	        ui.style.display = "block";
	        var textarea = this.getTextarea();
	        var ligaturesCheckbox = this.getLigaturesCheckbox();
	        var isolatesCheckbox = this.getIsolatesCheckbox();
	        var spacerHackCheckbox = this.getSpacerHackCheckbox();
	        var selectedNodeData = this.getOriginalData();
	        textarea.value = selectedNodeData.text;

	        if (selectedNodeData.settings) {
	          ligaturesCheckbox.checked = selectedNodeData.settings[0];
	          isolatesCheckbox.checked = selectedNodeData.settings[1];
	          spacerHackCheckbox.checked = selectedNodeData.settings[2];
	        }
	      } else {
	        ui.style.display = "none";

	        var _textarea = this.getTextarea();

	        var _ligaturesCheckbox = this.getLigaturesCheckbox();

	        var _isolatesCheckbox = this.getIsolatesCheckbox();

	        var _spacerHackCheckbox = this.getSpacerHackCheckbox();

	        _textarea.value = "";
	        this.selectedNodeId = null;
	        _ligaturesCheckbox.checked = false;
	        _isolatesCheckbox.checked = true;
	        _spacerHackCheckbox.checked = false;
	      }
	    }
	  }, {
	    key: "getOriginalData",
	    value: function getOriginalData() {
	      var layerName = App._state.mirror.sceneGraph.get(this.selectedNodeId).name;

	      if (layerName.indexOf('<!--ARS[') !== -1) {
	        var settings = JSON.parse(layerName.match(/\[([\s\S]*?)\]/)[0]);
	        var text = layerName.replace(/<!--([\s\S]*?)-->/, "");
	        return {
	          text: text,
	          settings: settings
	        };
	      } else {
	        return {
	          text: ''
	        };
	      }
	    }
	  }, {
	    key: "saveOriginalData",
	    value: function saveOriginalData(text, settings) {
	      var textWithSettings = "<!--ARS[".concat(settings.ligatures, ",").concat(settings.ignoreIsolates, ",").concat(settings.spaceHack, "]-->").concat(text);
	      App.sendMessage('setNodeProperty', {
	        nodeId: this.selectedNodeId,
	        property: 'name',
	        value: textWithSettings
	      });
	    }
	  }, {
	    key: "handleInput",
	    value: function handleInput(event) {
	      this.transformText(event.target.value);
	    }
	  }, {
	    key: "handleCheckbox",
	    value: function handleCheckbox() {
	      var text = this.getTextarea().value;
	      this.transformText(text);
	    }
	  }, {
	    key: "transformText",
	    value: function transformText(text) {
	      var settings = {
	        ligatures: this.getLigaturesCheckbox().checked,
	        ignoreIsolates: this.getIsolatesCheckbox().checked,
	        spaceHack: this.getSpacerHackCheckbox().checked
	      };
	      this.saveOriginalData(text, settings);
	      var transformedText = transform(text, settings);
	      window.figmaPlugin.replaceText(transformedText);
	      var textarea = this.getTextarea();
	      textarea.focus();
	    }
	  }]);

	  return ArabicSupport;
	}();

	if (typeof window !== 'undefined') window.arabicSupport = new ArabicSupport();

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnbWEtcGx1Z2luLWJvaWxlcnBsYXRlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS1tb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL25vZGVfbW9kdWxlcy9sb2Rhc2guZGVib3VuY2UvaW5kZXguanMiLCIuLi9zcmMvdXRpbHMvY3JlYXRlLW5vZGVzLmpzIiwiLi4vc3JjL3V0aWxzL3VudGlsLmpzIiwiLi4vc3JjL3V0aWxzL2dldC1hY3RpdmUtdGFiLmpzIiwiLi4vc3JjL3V0aWxzL2dldC1ub2RlLXR5cGUuanMiLCIuLi9zcmMvdXRpbHMvanMtYXJhYmljLXJlc2hhcGVyLmpzIiwiLi4vbm9kZV9tb2R1bGVzL2RpcmVjdGlvbi9pbmRleC5qcyIsIi4uL3NyYy91dGlscy9yZXZlcnNlLXN0cmluZy5qcyIsIi4uL3NyYy91dGlscy90cmFuc2Zvcm0uanMiLCIuLi9zcmMvdXRpbHMvc2VsZWN0aW9uLXRvLW5vZGUtaWQuanMiLCIuLi9zcmMvdXRpbHMvZ2V0LXNlbGVjdGVkLXR5cGUuanMiLCIuLi9zcmMvdXRpbHMvZ2V0LXNlbGVjdGVkLW5vZGVzLWlkcy5qcyIsIi4uL3NyYy9hcmFiaWMtc3VwcG9ydC5qcyIsIi4uL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgLy8gSWYgYSByZWplY3RlZCBQcm9taXNlIHdhcyB5aWVsZGVkLCB0aHJvdyB0aGUgcmVqZWN0aW9uIGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gc28gaXQgY2FuIGJlIGhhbmRsZWQgdGhlcmUuXG4gICAgICAgICAgcmV0dXJuIGludm9rZShcInRocm93XCIsIGVycm9yLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcHJldmlvdXNQcm9taXNlO1xuXG4gICAgZnVuY3Rpb24gZW5xdWV1ZShtZXRob2QsIGFyZykge1xuICAgICAgZnVuY3Rpb24gY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICBpbnZva2UobWV0aG9kLCBhcmcsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJldmlvdXNQcm9taXNlID1cbiAgICAgICAgLy8gSWYgZW5xdWV1ZSBoYXMgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIHdlIHdhbnQgdG8gd2FpdCB1bnRpbFxuICAgICAgICAvLyBhbGwgcHJldmlvdXMgUHJvbWlzZXMgaGF2ZSBiZWVuIHJlc29sdmVkIGJlZm9yZSBjYWxsaW5nIGludm9rZSxcbiAgICAgICAgLy8gc28gdGhhdCByZXN1bHRzIGFyZSBhbHdheXMgZGVsaXZlcmVkIGluIHRoZSBjb3JyZWN0IG9yZGVyLiBJZlxuICAgICAgICAvLyBlbnF1ZXVlIGhhcyBub3QgYmVlbiBjYWxsZWQgYmVmb3JlLCB0aGVuIGl0IGlzIGltcG9ydGFudCB0b1xuICAgICAgICAvLyBjYWxsIGludm9rZSBpbW1lZGlhdGVseSwgd2l0aG91dCB3YWl0aW5nIG9uIGEgY2FsbGJhY2sgdG8gZmlyZSxcbiAgICAgICAgLy8gc28gdGhhdCB0aGUgYXN5bmMgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhcyB0aGUgb3Bwb3J0dW5pdHkgdG8gZG9cbiAgICAgICAgLy8gYW55IG5lY2Vzc2FyeSBzZXR1cCBpbiBhIHByZWRpY3RhYmxlIHdheS4gVGhpcyBwcmVkaWN0YWJpbGl0eVxuICAgICAgICAvLyBpcyB3aHkgdGhlIFByb21pc2UgY29uc3RydWN0b3Igc3luY2hyb25vdXNseSBpbnZva2VzIGl0c1xuICAgICAgICAvLyBleGVjdXRvciBjYWxsYmFjaywgYW5kIHdoeSBhc3luYyBmdW5jdGlvbnMgc3luY2hyb25vdXNseVxuICAgICAgICAvLyBleGVjdXRlIGNvZGUgYmVmb3JlIHRoZSBmaXJzdCBhd2FpdC4gU2luY2Ugd2UgaW1wbGVtZW50IHNpbXBsZVxuICAgICAgICAvLyBhc3luYyBmdW5jdGlvbnMgaW4gdGVybXMgb2YgYXN5bmMgZ2VuZXJhdG9ycywgaXQgaXMgZXNwZWNpYWxseVxuICAgICAgICAvLyBpbXBvcnRhbnQgdG8gZ2V0IHRoaXMgcmlnaHQsIGV2ZW4gdGhvdWdoIGl0IHJlcXVpcmVzIGNhcmUuXG4gICAgICAgIHByZXZpb3VzUHJvbWlzZSA/IHByZXZpb3VzUHJvbWlzZS50aGVuKFxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnLFxuICAgICAgICAgIC8vIEF2b2lkIHByb3BhZ2F0aW5nIGZhaWx1cmVzIHRvIFByb21pc2VzIHJldHVybmVkIGJ5IGxhdGVyXG4gICAgICAgICAgLy8gaW52b2NhdGlvbnMgb2YgdGhlIGl0ZXJhdG9yLlxuICAgICAgICAgIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnXG4gICAgICAgICkgOiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpO1xuICAgIH1cblxuICAgIC8vIERlZmluZSB0aGUgdW5pZmllZCBoZWxwZXIgbWV0aG9kIHRoYXQgaXMgdXNlZCB0byBpbXBsZW1lbnQgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiAoc2VlIGRlZmluZUl0ZXJhdG9yTWV0aG9kcykuXG4gICAgdGhpcy5faW52b2tlID0gZW5xdWV1ZTtcbiAgfVxuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhBc3luY0l0ZXJhdG9yLnByb3RvdHlwZSk7XG4gIEFzeW5jSXRlcmF0b3IucHJvdG90eXBlW2FzeW5jSXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuICBydW50aW1lLkFzeW5jSXRlcmF0b3IgPSBBc3luY0l0ZXJhdG9yO1xuXG4gIC8vIE5vdGUgdGhhdCBzaW1wbGUgYXN5bmMgZnVuY3Rpb25zIGFyZSBpbXBsZW1lbnRlZCBvbiB0b3Agb2ZcbiAgLy8gQXN5bmNJdGVyYXRvciBvYmplY3RzOyB0aGV5IGp1c3QgcmV0dXJuIGEgUHJvbWlzZSBmb3IgdGhlIHZhbHVlIG9mXG4gIC8vIHRoZSBmaW5hbCByZXN1bHQgcHJvZHVjZWQgYnkgdGhlIGl0ZXJhdG9yLlxuICBydW50aW1lLmFzeW5jID0gZnVuY3Rpb24oaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICB2YXIgaXRlciA9IG5ldyBBc3luY0l0ZXJhdG9yKFxuICAgICAgd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdClcbiAgICApO1xuXG4gICAgcmV0dXJuIHJ1bnRpbWUuaXNHZW5lcmF0b3JGdW5jdGlvbihvdXRlckZuKVxuICAgICAgPyBpdGVyIC8vIElmIG91dGVyRm4gaXMgYSBnZW5lcmF0b3IsIHJldHVybiB0aGUgZnVsbCBpdGVyYXRvci5cbiAgICAgIDogaXRlci5uZXh0KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcmVzdWx0LmRvbmUgPyByZXN1bHQudmFsdWUgOiBpdGVyLm5leHQoKTtcbiAgICAgICAgfSk7XG4gIH07XG5cbiAgZnVuY3Rpb24gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KSB7XG4gICAgdmFyIHN0YXRlID0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydDtcblxuICAgIHJldHVybiBmdW5jdGlvbiBpbnZva2UobWV0aG9kLCBhcmcpIHtcbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVFeGVjdXRpbmcpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgcnVubmluZ1wiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUNvbXBsZXRlZCkge1xuICAgICAgICBpZiAobWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICB0aHJvdyBhcmc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBCZSBmb3JnaXZpbmcsIHBlciAyNS4zLjMuMy4zIG9mIHRoZSBzcGVjOlxuICAgICAgICAvLyBodHRwczovL3Blb3BsZS5tb3ppbGxhLm9yZy9+am9yZW5kb3JmZi9lczYtZHJhZnQuaHRtbCNzZWMtZ2VuZXJhdG9ycmVzdW1lXG4gICAgICAgIHJldHVybiBkb25lUmVzdWx0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnRleHQubWV0aG9kID0gbWV0aG9kO1xuICAgICAgY29udGV4dC5hcmcgPSBhcmc7XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIHZhciBkZWxlZ2F0ZSA9IGNvbnRleHQuZGVsZWdhdGU7XG4gICAgICAgIGlmIChkZWxlZ2F0ZSkge1xuICAgICAgICAgIHZhciBkZWxlZ2F0ZVJlc3VsdCA9IG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0ID09PSBDb250aW51ZVNlbnRpbmVsKSBjb250aW51ZTtcbiAgICAgICAgICAgIHJldHVybiBkZWxlZ2F0ZVJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgICAgLy8gU2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgICAgICBjb250ZXh0LnNlbnQgPSBjb250ZXh0Ll9zZW50ID0gY29udGV4dC5hcmc7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0KSB7XG4gICAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgICAgdGhyb3cgY29udGV4dC5hcmc7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZyk7XG5cbiAgICAgICAgfSBlbHNlIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICAgIGNvbnRleHQuYWJydXB0KFwicmV0dXJuXCIsIGNvbnRleHQuYXJnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0YXRlID0gR2VuU3RhdGVFeGVjdXRpbmc7XG5cbiAgICAgICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpO1xuICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIpIHtcbiAgICAgICAgICAvLyBJZiBhbiBleGNlcHRpb24gaXMgdGhyb3duIGZyb20gaW5uZXJGbiwgd2UgbGVhdmUgc3RhdGUgPT09XG4gICAgICAgICAgLy8gR2VuU3RhdGVFeGVjdXRpbmcgYW5kIGxvb3AgYmFjayBmb3IgYW5vdGhlciBpbnZvY2F0aW9uLlxuICAgICAgICAgIHN0YXRlID0gY29udGV4dC5kb25lXG4gICAgICAgICAgICA/IEdlblN0YXRlQ29tcGxldGVkXG4gICAgICAgICAgICA6IEdlblN0YXRlU3VzcGVuZGVkWWllbGQ7XG5cbiAgICAgICAgICBpZiAocmVjb3JkLmFyZyA9PT0gQ29udGludWVTZW50aW5lbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHZhbHVlOiByZWNvcmQuYXJnLFxuICAgICAgICAgICAgZG9uZTogY29udGV4dC5kb25lXG4gICAgICAgICAgfTtcblxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBzdGF0ZSA9IEdlblN0YXRlQ29tcGxldGVkO1xuICAgICAgICAgIC8vIERpc3BhdGNoIHRoZSBleGNlcHRpb24gYnkgbG9vcGluZyBiYWNrIGFyb3VuZCB0byB0aGVcbiAgICAgICAgICAvLyBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKSBjYWxsIGFib3ZlLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cblxuICAvLyBDYWxsIGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXShjb250ZXh0LmFyZykgYW5kIGhhbmRsZSB0aGVcbiAgLy8gcmVzdWx0LCBlaXRoZXIgYnkgcmV0dXJuaW5nIGEgeyB2YWx1ZSwgZG9uZSB9IHJlc3VsdCBmcm9tIHRoZVxuICAvLyBkZWxlZ2F0ZSBpdGVyYXRvciwgb3IgYnkgbW9kaWZ5aW5nIGNvbnRleHQubWV0aG9kIGFuZCBjb250ZXh0LmFyZyxcbiAgLy8gc2V0dGluZyBjb250ZXh0LmRlbGVnYXRlIHRvIG51bGwsIGFuZCByZXR1cm5pbmcgdGhlIENvbnRpbnVlU2VudGluZWwuXG4gIGZ1bmN0aW9uIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpIHtcbiAgICB2YXIgbWV0aG9kID0gZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdO1xuICAgIGlmIChtZXRob2QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgLy8gQSAudGhyb3cgb3IgLnJldHVybiB3aGVuIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgbm8gLnRocm93XG4gICAgICAvLyBtZXRob2QgYWx3YXlzIHRlcm1pbmF0ZXMgdGhlIHlpZWxkKiBsb29wLlxuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIGlmIChkZWxlZ2F0ZS5pdGVyYXRvci5yZXR1cm4pIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIGEgcmV0dXJuIG1ldGhvZCwgZ2l2ZSBpdCBhXG4gICAgICAgICAgLy8gY2hhbmNlIHRvIGNsZWFuIHVwLlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcblxuICAgICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICAvLyBJZiBtYXliZUludm9rZURlbGVnYXRlKGNvbnRleHQpIGNoYW5nZWQgY29udGV4dC5tZXRob2QgZnJvbVxuICAgICAgICAgICAgLy8gXCJyZXR1cm5cIiB0byBcInRocm93XCIsIGxldCB0aGF0IG92ZXJyaWRlIHRoZSBUeXBlRXJyb3IgYmVsb3cuXG4gICAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFxuICAgICAgICAgIFwiVGhlIGl0ZXJhdG9yIGRvZXMgbm90IHByb3ZpZGUgYSAndGhyb3cnIG1ldGhvZFwiKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIHJlY29yZCA9IHRyeUNhdGNoKG1ldGhvZCwgZGVsZWdhdGUuaXRlcmF0b3IsIGNvbnRleHQuYXJnKTtcblxuICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgdmFyIGluZm8gPSByZWNvcmQuYXJnO1xuXG4gICAgaWYgKCEgaW5mbykge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXCJpdGVyYXRvciByZXN1bHQgaXMgbm90IGFuIG9iamVjdFwiKTtcbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuXG4gICAgaWYgKGluZm8uZG9uZSkge1xuICAgICAgLy8gQXNzaWduIHRoZSByZXN1bHQgb2YgdGhlIGZpbmlzaGVkIGRlbGVnYXRlIHRvIHRoZSB0ZW1wb3JhcnlcbiAgICAgIC8vIHZhcmlhYmxlIHNwZWNpZmllZCBieSBkZWxlZ2F0ZS5yZXN1bHROYW1lIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0W2RlbGVnYXRlLnJlc3VsdE5hbWVdID0gaW5mby52YWx1ZTtcblxuICAgICAgLy8gUmVzdW1lIGV4ZWN1dGlvbiBhdCB0aGUgZGVzaXJlZCBsb2NhdGlvbiAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dC5uZXh0ID0gZGVsZWdhdGUubmV4dExvYztcblxuICAgICAgLy8gSWYgY29udGV4dC5tZXRob2Qgd2FzIFwidGhyb3dcIiBidXQgdGhlIGRlbGVnYXRlIGhhbmRsZWQgdGhlXG4gICAgICAvLyBleGNlcHRpb24sIGxldCB0aGUgb3V0ZXIgZ2VuZXJhdG9yIHByb2NlZWQgbm9ybWFsbHkuIElmXG4gICAgICAvLyBjb250ZXh0Lm1ldGhvZCB3YXMgXCJuZXh0XCIsIGZvcmdldCBjb250ZXh0LmFyZyBzaW5jZSBpdCBoYXMgYmVlblxuICAgICAgLy8gXCJjb25zdW1lZFwiIGJ5IHRoZSBkZWxlZ2F0ZSBpdGVyYXRvci4gSWYgY29udGV4dC5tZXRob2Qgd2FzXG4gICAgICAvLyBcInJldHVyblwiLCBhbGxvdyB0aGUgb3JpZ2luYWwgLnJldHVybiBjYWxsIHRvIGNvbnRpbnVlIGluIHRoZVxuICAgICAgLy8gb3V0ZXIgZ2VuZXJhdG9yLlxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kICE9PSBcInJldHVyblwiKSB7XG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJlLXlpZWxkIHRoZSByZXN1bHQgcmV0dXJuZWQgYnkgdGhlIGRlbGVnYXRlIG1ldGhvZC5cbiAgICAgIHJldHVybiBpbmZvO1xuICAgIH1cblxuICAgIC8vIFRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBpcyBmaW5pc2hlZCwgc28gZm9yZ2V0IGl0IGFuZCBjb250aW51ZSB3aXRoXG4gICAgLy8gdGhlIG91dGVyIGdlbmVyYXRvci5cbiAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgfVxuXG4gIC8vIERlZmluZSBHZW5lcmF0b3IucHJvdG90eXBlLntuZXh0LHRocm93LHJldHVybn0gaW4gdGVybXMgb2YgdGhlXG4gIC8vIHVuaWZpZWQgLl9pbnZva2UgaGVscGVyIG1ldGhvZC5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEdwKTtcblxuICBHcFt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvclwiO1xuXG4gIC8vIEEgR2VuZXJhdG9yIHNob3VsZCBhbHdheXMgcmV0dXJuIGl0c2VsZiBhcyB0aGUgaXRlcmF0b3Igb2JqZWN0IHdoZW4gdGhlXG4gIC8vIEBAaXRlcmF0b3IgZnVuY3Rpb24gaXMgY2FsbGVkIG9uIGl0LiBTb21lIGJyb3dzZXJzJyBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlXG4gIC8vIGl0ZXJhdG9yIHByb3RvdHlwZSBjaGFpbiBpbmNvcnJlY3RseSBpbXBsZW1lbnQgdGhpcywgY2F1c2luZyB0aGUgR2VuZXJhdG9yXG4gIC8vIG9iamVjdCB0byBub3QgYmUgcmV0dXJuZWQgZnJvbSB0aGlzIGNhbGwuIFRoaXMgZW5zdXJlcyB0aGF0IGRvZXNuJ3QgaGFwcGVuLlxuICAvLyBTZWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlZ2VuZXJhdG9yL2lzc3Vlcy8yNzQgZm9yIG1vcmUgZGV0YWlscy5cbiAgR3BbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgR3AudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gXCJbb2JqZWN0IEdlbmVyYXRvcl1cIjtcbiAgfTtcblxuICBmdW5jdGlvbiBwdXNoVHJ5RW50cnkobG9jcykge1xuICAgIHZhciBlbnRyeSA9IHsgdHJ5TG9jOiBsb2NzWzBdIH07XG5cbiAgICBpZiAoMSBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5jYXRjaExvYyA9IGxvY3NbMV07XG4gICAgfVxuXG4gICAgaWYgKDIgaW4gbG9jcykge1xuICAgICAgZW50cnkuZmluYWxseUxvYyA9IGxvY3NbMl07XG4gICAgICBlbnRyeS5hZnRlckxvYyA9IGxvY3NbM107XG4gICAgfVxuXG4gICAgdGhpcy50cnlFbnRyaWVzLnB1c2goZW50cnkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVzZXRUcnlFbnRyeShlbnRyeSkge1xuICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uIHx8IHt9O1xuICAgIHJlY29yZC50eXBlID0gXCJub3JtYWxcIjtcbiAgICBkZWxldGUgcmVjb3JkLmFyZztcbiAgICBlbnRyeS5jb21wbGV0aW9uID0gcmVjb3JkO1xuICB9XG5cbiAgZnVuY3Rpb24gQ29udGV4dCh0cnlMb2NzTGlzdCkge1xuICAgIC8vIFRoZSByb290IGVudHJ5IG9iamVjdCAoZWZmZWN0aXZlbHkgYSB0cnkgc3RhdGVtZW50IHdpdGhvdXQgYSBjYXRjaFxuICAgIC8vIG9yIGEgZmluYWxseSBibG9jaykgZ2l2ZXMgdXMgYSBwbGFjZSB0byBzdG9yZSB2YWx1ZXMgdGhyb3duIGZyb21cbiAgICAvLyBsb2NhdGlvbnMgd2hlcmUgdGhlcmUgaXMgbm8gZW5jbG9zaW5nIHRyeSBzdGF0ZW1lbnQuXG4gICAgdGhpcy50cnlFbnRyaWVzID0gW3sgdHJ5TG9jOiBcInJvb3RcIiB9XTtcbiAgICB0cnlMb2NzTGlzdC5mb3JFYWNoKHB1c2hUcnlFbnRyeSwgdGhpcyk7XG4gICAgdGhpcy5yZXNldCh0cnVlKTtcbiAgfVxuXG4gIHJ1bnRpbWUua2V5cyA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHZhciBrZXlzID0gW107XG4gICAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgICAga2V5cy5wdXNoKGtleSk7XG4gICAgfVxuICAgIGtleXMucmV2ZXJzZSgpO1xuXG4gICAgLy8gUmF0aGVyIHRoYW4gcmV0dXJuaW5nIGFuIG9iamVjdCB3aXRoIGEgbmV4dCBtZXRob2QsIHdlIGtlZXBcbiAgICAvLyB0aGluZ3Mgc2ltcGxlIGFuZCByZXR1cm4gdGhlIG5leHQgZnVuY3Rpb24gaXRzZWxmLlxuICAgIHJldHVybiBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgd2hpbGUgKGtleXMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzLnBvcCgpO1xuICAgICAgICBpZiAoa2V5IGluIG9iamVjdCkge1xuICAgICAgICAgIG5leHQudmFsdWUgPSBrZXk7XG4gICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVG8gYXZvaWQgY3JlYXRpbmcgYW4gYWRkaXRpb25hbCBvYmplY3QsIHdlIGp1c3QgaGFuZyB0aGUgLnZhbHVlXG4gICAgICAvLyBhbmQgLmRvbmUgcHJvcGVydGllcyBvZmYgdGhlIG5leHQgZnVuY3Rpb24gb2JqZWN0IGl0c2VsZi4gVGhpc1xuICAgICAgLy8gYWxzbyBlbnN1cmVzIHRoYXQgdGhlIG1pbmlmaWVyIHdpbGwgbm90IGFub255bWl6ZSB0aGUgZnVuY3Rpb24uXG4gICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfTtcbiAgfTtcblxuICBmdW5jdGlvbiB2YWx1ZXMoaXRlcmFibGUpIHtcbiAgICBpZiAoaXRlcmFibGUpIHtcbiAgICAgIHZhciBpdGVyYXRvck1ldGhvZCA9IGl0ZXJhYmxlW2l0ZXJhdG9yU3ltYm9sXTtcbiAgICAgIGlmIChpdGVyYXRvck1ldGhvZCkge1xuICAgICAgICByZXR1cm4gaXRlcmF0b3JNZXRob2QuY2FsbChpdGVyYWJsZSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgaXRlcmFibGUubmV4dCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIHJldHVybiBpdGVyYWJsZTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc05hTihpdGVyYWJsZS5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBpID0gLTEsIG5leHQgPSBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBpdGVyYWJsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChoYXNPd24uY2FsbChpdGVyYWJsZSwgaSkpIHtcbiAgICAgICAgICAgICAgbmV4dC52YWx1ZSA9IGl0ZXJhYmxlW2ldO1xuICAgICAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dC52YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICBuZXh0LmRvbmUgPSB0cnVlO1xuXG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIG5leHQubmV4dCA9IG5leHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGl0ZXJhdG9yIHdpdGggbm8gdmFsdWVzLlxuICAgIHJldHVybiB7IG5leHQ6IGRvbmVSZXN1bHQgfTtcbiAgfVxuICBydW50aW1lLnZhbHVlcyA9IHZhbHVlcztcblxuICBmdW5jdGlvbiBkb25lUmVzdWx0KCkge1xuICAgIHJldHVybiB7IHZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWUgfTtcbiAgfVxuXG4gIENvbnRleHQucHJvdG90eXBlID0ge1xuICAgIGNvbnN0cnVjdG9yOiBDb250ZXh0LFxuXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKHNraXBUZW1wUmVzZXQpIHtcbiAgICAgIHRoaXMucHJldiA9IDA7XG4gICAgICB0aGlzLm5leHQgPSAwO1xuICAgICAgLy8gUmVzZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICB0aGlzLnNlbnQgPSB0aGlzLl9zZW50ID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5kb25lID0gZmFsc2U7XG4gICAgICB0aGlzLmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuXG4gICAgICB0aGlzLnRyeUVudHJpZXMuZm9yRWFjaChyZXNldFRyeUVudHJ5KTtcblxuICAgICAgaWYgKCFza2lwVGVtcFJlc2V0KSB7XG4gICAgICAgIGZvciAodmFyIG5hbWUgaW4gdGhpcykge1xuICAgICAgICAgIC8vIE5vdCBzdXJlIGFib3V0IHRoZSBvcHRpbWFsIG9yZGVyIG9mIHRoZXNlIGNvbmRpdGlvbnM6XG4gICAgICAgICAgaWYgKG5hbWUuY2hhckF0KDApID09PSBcInRcIiAmJlxuICAgICAgICAgICAgICBoYXNPd24uY2FsbCh0aGlzLCBuYW1lKSAmJlxuICAgICAgICAgICAgICAhaXNOYU4oK25hbWUuc2xpY2UoMSkpKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gdW5kZWZpbmVkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdG9wOiBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZG9uZSA9IHRydWU7XG5cbiAgICAgIHZhciByb290RW50cnkgPSB0aGlzLnRyeUVudHJpZXNbMF07XG4gICAgICB2YXIgcm9vdFJlY29yZCA9IHJvb3RFbnRyeS5jb21wbGV0aW9uO1xuICAgICAgaWYgKHJvb3RSZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJvb3RSZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5ydmFsO1xuICAgIH0sXG5cbiAgICBkaXNwYXRjaEV4Y2VwdGlvbjogZnVuY3Rpb24oZXhjZXB0aW9uKSB7XG4gICAgICBpZiAodGhpcy5kb25lKSB7XG4gICAgICAgIHRocm93IGV4Y2VwdGlvbjtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgZnVuY3Rpb24gaGFuZGxlKGxvYywgY2F1Z2h0KSB7XG4gICAgICAgIHJlY29yZC50eXBlID0gXCJ0aHJvd1wiO1xuICAgICAgICByZWNvcmQuYXJnID0gZXhjZXB0aW9uO1xuICAgICAgICBjb250ZXh0Lm5leHQgPSBsb2M7XG5cbiAgICAgICAgaWYgKGNhdWdodCkge1xuICAgICAgICAgIC8vIElmIHRoZSBkaXNwYXRjaGVkIGV4Y2VwdGlvbiB3YXMgY2F1Z2h0IGJ5IGEgY2F0Y2ggYmxvY2ssXG4gICAgICAgICAgLy8gdGhlbiBsZXQgdGhhdCBjYXRjaCBibG9jayBoYW5kbGUgdGhlIGV4Y2VwdGlvbiBub3JtYWxseS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICEhIGNhdWdodDtcbiAgICAgIH1cblxuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IFwicm9vdFwiKSB7XG4gICAgICAgICAgLy8gRXhjZXB0aW9uIHRocm93biBvdXRzaWRlIG9mIGFueSB0cnkgYmxvY2sgdGhhdCBjb3VsZCBoYW5kbGVcbiAgICAgICAgICAvLyBpdCwgc28gc2V0IHRoZSBjb21wbGV0aW9uIHZhbHVlIG9mIHRoZSBlbnRpcmUgZnVuY3Rpb24gdG9cbiAgICAgICAgICAvLyB0aHJvdyB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJldHVybiBoYW5kbGUoXCJlbmRcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldikge1xuICAgICAgICAgIHZhciBoYXNDYXRjaCA9IGhhc093bi5jYWxsKGVudHJ5LCBcImNhdGNoTG9jXCIpO1xuICAgICAgICAgIHZhciBoYXNGaW5hbGx5ID0gaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKTtcblxuICAgICAgICAgIGlmIChoYXNDYXRjaCAmJiBoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzQ2F0Y2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSBpZiAoaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5maW5hbGx5TG9jKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJ0cnkgc3RhdGVtZW50IHdpdGhvdXQgY2F0Y2ggb3IgZmluYWxseVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgYWJydXB0OiBmdW5jdGlvbih0eXBlLCBhcmcpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jIDw9IHRoaXMucHJldiAmJlxuICAgICAgICAgICAgaGFzT3duLmNhbGwoZW50cnksIFwiZmluYWxseUxvY1wiKSAmJlxuICAgICAgICAgICAgdGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgIHZhciBmaW5hbGx5RW50cnkgPSBlbnRyeTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZmluYWxseUVudHJ5ICYmXG4gICAgICAgICAgKHR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgICB0eXBlID09PSBcImNvbnRpbnVlXCIpICYmXG4gICAgICAgICAgZmluYWxseUVudHJ5LnRyeUxvYyA8PSBhcmcgJiZcbiAgICAgICAgICBhcmcgPD0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgLy8gSWdub3JlIHRoZSBmaW5hbGx5IGVudHJ5IGlmIGNvbnRyb2wgaXMgbm90IGp1bXBpbmcgdG8gYVxuICAgICAgICAvLyBsb2NhdGlvbiBvdXRzaWRlIHRoZSB0cnkvY2F0Y2ggYmxvY2suXG4gICAgICAgIGZpbmFsbHlFbnRyeSA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHZhciByZWNvcmQgPSBmaW5hbGx5RW50cnkgPyBmaW5hbGx5RW50cnkuY29tcGxldGlvbiA6IHt9O1xuICAgICAgcmVjb3JkLnR5cGUgPSB0eXBlO1xuICAgICAgcmVjb3JkLmFyZyA9IGFyZztcblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSkge1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICB0aGlzLm5leHQgPSBmaW5hbGx5RW50cnkuZmluYWxseUxvYztcbiAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRlKHJlY29yZCk7XG4gICAgfSxcblxuICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZWNvcmQsIGFmdGVyTG9jKSB7XG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByZWNvcmQuYXJnO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwiYnJlYWtcIiB8fFxuICAgICAgICAgIHJlY29yZC50eXBlID09PSBcImNvbnRpbnVlXCIpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gcmVjb3JkLmFyZztcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgdGhpcy5ydmFsID0gdGhpcy5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB0aGlzLm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgIHRoaXMubmV4dCA9IFwiZW5kXCI7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiICYmIGFmdGVyTG9jKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IGFmdGVyTG9jO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9LFxuXG4gICAgZmluaXNoOiBmdW5jdGlvbihmaW5hbGx5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LmZpbmFsbHlMb2MgPT09IGZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB0aGlzLmNvbXBsZXRlKGVudHJ5LmNvbXBsZXRpb24sIGVudHJ5LmFmdGVyTG9jKTtcbiAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBcImNhdGNoXCI6IGZ1bmN0aW9uKHRyeUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPT09IHRyeUxvYykge1xuICAgICAgICAgIHZhciByZWNvcmQgPSBlbnRyeS5jb21wbGV0aW9uO1xuICAgICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgICB2YXIgdGhyb3duID0gcmVjb3JkLmFyZztcbiAgICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdGhyb3duO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRoZSBjb250ZXh0LmNhdGNoIG1ldGhvZCBtdXN0IG9ubHkgYmUgY2FsbGVkIHdpdGggYSBsb2NhdGlvblxuICAgICAgLy8gYXJndW1lbnQgdGhhdCBjb3JyZXNwb25kcyB0byBhIGtub3duIGNhdGNoIGJsb2NrLlxuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiaWxsZWdhbCBjYXRjaCBhdHRlbXB0XCIpO1xuICAgIH0sXG5cbiAgICBkZWxlZ2F0ZVlpZWxkOiBmdW5jdGlvbihpdGVyYWJsZSwgcmVzdWx0TmFtZSwgbmV4dExvYykge1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IHtcbiAgICAgICAgaXRlcmF0b3I6IHZhbHVlcyhpdGVyYWJsZSksXG4gICAgICAgIHJlc3VsdE5hbWU6IHJlc3VsdE5hbWUsXG4gICAgICAgIG5leHRMb2M6IG5leHRMb2NcbiAgICAgIH07XG5cbiAgICAgIGlmICh0aGlzLm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgLy8gRGVsaWJlcmF0ZWx5IGZvcmdldCB0aGUgbGFzdCBzZW50IHZhbHVlIHNvIHRoYXQgd2UgZG9uJ3RcbiAgICAgICAgLy8gYWNjaWRlbnRhbGx5IHBhc3MgaXQgb24gdG8gdGhlIGRlbGVnYXRlLlxuICAgICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfVxuICB9O1xufSkoXG4gIC8vIEluIHNsb3BweSBtb2RlLCB1bmJvdW5kIGB0aGlzYCByZWZlcnMgdG8gdGhlIGdsb2JhbCBvYmplY3QsIGZhbGxiYWNrIHRvXG4gIC8vIEZ1bmN0aW9uIGNvbnN0cnVjdG9yIGlmIHdlJ3JlIGluIGdsb2JhbCBzdHJpY3QgbW9kZS4gVGhhdCBpcyBzYWRseSBhIGZvcm1cbiAgLy8gb2YgaW5kaXJlY3QgZXZhbCB3aGljaCB2aW9sYXRlcyBDb250ZW50IFNlY3VyaXR5IFBvbGljeS5cbiAgKGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzIHx8ICh0eXBlb2Ygc2VsZiA9PT0gXCJvYmplY3RcIiAmJiBzZWxmKTtcbiAgfSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKClcbik7XG4iLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuICovXG5cbi8vIFRoaXMgbWV0aG9kIG9mIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCBuZWVkcyB0byBiZVxuLy8ga2VwdCBpZGVudGljYWwgdG8gdGhlIHdheSBpdCBpcyBvYnRhaW5lZCBpbiBydW50aW1lLmpzXG52YXIgZyA9IChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpO1xufSkoKSB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG5cbi8vIFVzZSBgZ2V0T3duUHJvcGVydHlOYW1lc2AgYmVjYXVzZSBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgY2FsbGluZ1xuLy8gYGhhc093blByb3BlcnR5YCBvbiB0aGUgZ2xvYmFsIGBzZWxmYCBvYmplY3QgaW4gYSB3b3JrZXIuIFNlZSAjMTgzLlxudmFyIGhhZFJ1bnRpbWUgPSBnLnJlZ2VuZXJhdG9yUnVudGltZSAmJlxuICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhnKS5pbmRleE9mKFwicmVnZW5lcmF0b3JSdW50aW1lXCIpID49IDA7XG5cbi8vIFNhdmUgdGhlIG9sZCByZWdlbmVyYXRvclJ1bnRpbWUgaW4gY2FzZSBpdCBuZWVkcyB0byBiZSByZXN0b3JlZCBsYXRlci5cbnZhciBvbGRSdW50aW1lID0gaGFkUnVudGltZSAmJiBnLnJlZ2VuZXJhdG9yUnVudGltZTtcblxuLy8gRm9yY2UgcmVldmFsdXRhdGlvbiBvZiBydW50aW1lLmpzLlxuZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vcnVudGltZVwiKTtcblxuaWYgKGhhZFJ1bnRpbWUpIHtcbiAgLy8gUmVzdG9yZSB0aGUgb3JpZ2luYWwgcnVudGltZS5cbiAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSBvbGRSdW50aW1lO1xufSBlbHNlIHtcbiAgLy8gUmVtb3ZlIHRoZSBnbG9iYWwgcHJvcGVydHkgYWRkZWQgYnkgcnVudGltZS5qcy5cbiAgdHJ5IHtcbiAgICBkZWxldGUgZy5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIH0gY2F0Y2goZSkge1xuICAgIGcucmVnZW5lcmF0b3JSdW50aW1lID0gdW5kZWZpbmVkO1xuICB9XG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWdlbmVyYXRvci1ydW50aW1lXCIpO1xuIiwiZnVuY3Rpb24gYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBrZXksIGFyZykge1xuICB0cnkge1xuICAgIHZhciBpbmZvID0gZ2VuW2tleV0oYXJnKTtcbiAgICB2YXIgdmFsdWUgPSBpbmZvLnZhbHVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIHJlamVjdChlcnJvcik7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGluZm8uZG9uZSkge1xuICAgIHJlc29sdmUodmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihfbmV4dCwgX3Rocm93KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfYXN5bmNUb0dlbmVyYXRvcihmbikge1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0gdGhpcyxcbiAgICAgICAgYXJncyA9IGFyZ3VtZW50cztcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgdmFyIGdlbiA9IGZuLmFwcGx5KHNlbGYsIGFyZ3MpO1xuXG4gICAgICBmdW5jdGlvbiBfbmV4dCh2YWx1ZSkge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwibmV4dFwiLCB2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIF90aHJvdyhlcnIpIHtcbiAgICAgICAgYXN5bmNHZW5lcmF0b3JTdGVwKGdlbiwgcmVzb2x2ZSwgcmVqZWN0LCBfbmV4dCwgX3Rocm93LCBcInRocm93XCIsIGVycik7XG4gICAgICB9XG5cbiAgICAgIF9uZXh0KHVuZGVmaW5lZCk7XG4gICAgfSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2FzeW5jVG9HZW5lcmF0b3I7IiwiZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfY2xhc3NDYWxsQ2hlY2s7IiwiZnVuY3Rpb24gX2RlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9jcmVhdGVDbGFzcyhDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgaWYgKHByb3RvUHJvcHMpIF9kZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gIGlmIChzdGF0aWNQcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgcmV0dXJuIENvbnN0cnVjdG9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jcmVhdGVDbGFzczsiLCIvKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIGBUeXBlRXJyb3JgIG1lc3NhZ2UgZm9yIFwiRnVuY3Rpb25zXCIgbWV0aG9kcy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCJleHBvcnQgZGVmYXVsdCAoaHRtbFN0cmluZykgPT4ge1xuICByZXR1cm4gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKS5jcmVhdGVDb250ZXh0dWFsRnJhZ21lbnQoaHRtbFN0cmluZyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoY29uZGl0aW9uRnVuY3Rpb24pID0+IHtcbiAgY29uc3QgcG9sbCA9IChyZXNvbHZlKSA9PiB7XG4gICAgaWYgKGNvbmRpdGlvbkZ1bmN0aW9uKCkpIHJlc29sdmUoKTtcbiAgICBlbHNlIHNldFRpbWVvdXQoKCkgPT4gcG9sbChyZXNvbHZlKSwgNTAwKTtcbiAgfTtcblxuICByZXR1cm4gbmV3IFByb21pc2UocG9sbCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCAoZ2V0QWN0aXZlVGFiKSA9PiB7XG4gIGNvbnN0IHRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgXCIucHJvcGVydGllc19wYW5lbC0tYWN0aXZlVGFiLS1lQllSRy5wcm9wZXJ0aWVzX3BhbmVsLS10YWItLTFnLUVGXCJcbiAgKTtcbiAgcmV0dXJuIHRhYiA/IHRhYi50ZXh0Q29udGVudCA6IGZhbHNlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgKG5vZGVJZCkgPT4ge1xuICByZXR1cm4gd2luZG93LmZpZ21hUGx1Z2luLmdldE5vZGVUeXBlKG5vZGVJZCk7XG59XG4iLCIvLyBUaGlzIHdvcmsgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEdOVSBQdWJsaWMgTGljZW5zZSAoR1BMKS5cblxuLy8gV3JpdHRlbiBieSBOaWNrIERvaXJvbiAoQG1hcG1lbGQpXG4vLyBQb3J0ZWQgZnJvbSBweXRob24tYXJhYmljLXJlc2hhcGVyIGJ5IEFiZHVsbGFoIERpYWIgKG1wY2FiZClcbi8vIFdoaWNoIHdhcyBwb3J0ZWQgYW5kIHR3ZWFrZWQgZnJvbSBKYXZhIHRvIFB5dGhvbiwgZnJvbSBCZXR0ZXIgQXJhYmljIFJlc2hhcGVyXG4vLyBbaHR0cHM6Ly9naXRodWIuY29tL2FnYXdpc2gvQmV0dGVyLUFyYWJpYy1SZXNoYXBlci9dXG5cbmNvbnN0IExJR0FUVVJFUyA9IFtcbiAgLy8gU2VudGVuY2VzXG4gIC8vIExpZ2F0dXJlIEJJU01JTExBSCBBUi1SQUhNQU4gQVItUkFIRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbXG4gICAgICAnXFx1MDYyOFxcdTA2MzNcXHUwNjQ1XFx1MDAyMCcsXG4gICAgICAnXFx1MDYyN1xcdTA2NDRcXHUwNjQ0XFx1MDY0N1xcdTAwMjAnLFxuICAgICAgJ1xcdTA2MjdcXHUwNjQ0XFx1MDYzMVxcdTA2MkRcXHUwNjQ1XFx1MDY0NlxcdTAwMjAnLFxuICAgICAgJ1xcdTA2MjdcXHUwNjQ0XFx1MDYzMVxcdTA2MkRcXHUwNjRBXFx1MDY0NSdcbiAgICBdLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6ICdcXHVGREZEJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSkFMTEFKQUxBTE9VSE9VXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkNcXHUwNjQ0XFx1MDAyMFxcdTA2MkNcXHUwNjQ0XFx1MDYyN1xcdTA2NDRcXHUwNjQ3J10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDogJ1xcdUZERkInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTQUxMQUxMQUhPVSBBTEFZSEUgV0FTQUxMQU1cbiAge1xuICAgIG1hdGNoZXM6IFtcbiAgICAgICdcXHUwNjM1XFx1MDY0NFxcdTA2NDlcXHUwMDIwJyxcbiAgICAgICdcXHUwNjI3XFx1MDY0NFxcdTA2NDRcXHUwNjQ3XFx1MDAyMCcsXG4gICAgICAnXFx1MDYzOVxcdTA2NDRcXHUwNjRBXFx1MDY0N1xcdTAwMjAnLFxuICAgICAgJ1xcdTA2NDhcXHUwNjMzXFx1MDY0NFxcdTA2NDUnXG4gICAgXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOiAnXFx1RkRGQSd9XG4gIH0sXG5cbiAgLy8gV29yZHNcbiAgLy8gTGlnYXR1cmUgQUxMQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyN1xcdTA2NDRcXHUwNjQ0XFx1MDY0NyddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6ICdcXHVGREYyJ31cbiAgfSxcbiAgLy9MaWdhdHVyZSBBS0JBUlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjIzXFx1MDY0M1xcdTA2MjhcXHUwNjMxJ10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDogJ1xcdUZERjMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBTEFZSEVcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzOVxcdTA2NDRcXHUwNjRBXFx1MDY0NyddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6ICdcXHVGREY3J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTU9IQU1NQURcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkRcXHUwNjQ1XFx1MDYyRiddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6ICdcXHVGREY0J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgUkFTT1VMXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzFcXHUwNjMzXFx1MDY0OFxcdTA2NDQnXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOiAnXFx1RkRGNid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNBTEFNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzVcXHUwNjQ0XFx1MDYzOVxcdTA2NDUnXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOiAnXFx1RkRGNSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNBTExBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzVcXHUwNjQ0XFx1MDY0OSddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6ICdcXHVGREY5J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgV0FTQUxMQU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0OFxcdTA2MzNcXHUwNjQ0XFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6ICdcXHVGREY4J31cbiAgfSxcbiAgLy8gUklBTCBTSUdOXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzFbXFx1MDZDQ1xcdTA2NEFdXFx1MDYyN1xcdTA2NDQnXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOiAnXFx1RkRGQyd9XG4gIH0sXG5cbiAgLy8gTGV0dGVyc1xuICBcbiAgLy8gTGlnYXR1cmUgQUlOIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ5J10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDogJ1xcdUZDRjcnLGZpbmFsOidcXHVGRDEzJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQUlOIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDYyQyddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6J1xcdUZDMjknLGluaXRpYWw6J1xcdUZDQkEnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBKRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDYyQ1xcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZEQzQnLGZpbmFsOidcXHVGRDc1J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQUlOIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6J1xcdUZDMkEnLGluaXRpYWw6J1xcdUZDQkInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBNRUVNIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1XFx1MDY0OSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZENzgnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBNRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDY0NVxcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZENzcnLGZpbmFsOidcXHVGRDc2J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQUlOIFdJVEggTUVFTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDY0NVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREI2J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQUlOIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDonXFx1RkNGOCcsZmluYWw6J1xcdUZEMTQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBTEVGIE1BS1NVUkEgV0lUSCBTVVBFUlNDUklQVCBBTEVGXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDlcXHUwNjcwJ10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDonXFx1RkM1RCcsZmluYWw6J1xcdUZDOTAnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBTEVGIFdJVEggRkFUSEFUQU5cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyN1xcdTA2NEInXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOidcXHVGRDNEJyxmaW5hbDonXFx1RkQzQyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEJFSCBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDY0OSddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6J1xcdUZDMDknLGZpbmFsOidcXHVGQzZFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQkVIIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjJEJ10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDonXFx1RkMwNicsaW5pdGlhbDonXFx1RkM5RCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEJFSCBXSVRIIEhBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyRFxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREMyJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQkVIIFdJVEggSEVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ3J10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGQ0EwJyxtZWRpYWw6J1xcdUZDRTInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBCRUggV0lUSCBKRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjJDJ10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDonXFx1RkMwNScsaW5pdGlhbDonXFx1RkM5Qyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEJFSCBXSVRIIEtIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyOFxcdTA2MkUnXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOidcXHVGQzA3Jyxpbml0aWFsOidcXHVGQzlFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQkVIIFdJVEggS0hBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyRVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGRDlFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQkVIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6J1xcdUZDMDgnLGluaXRpYWw6J1xcdUZDOUYnLG1lZGlhbDonXFx1RkNFMScsZmluYWw6J1xcdUZDNkMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBCRUggV0lUSCBOT09OXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ2J10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkM2RCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEJFSCBXSVRIIFJFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYzMSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZDNkEnfVxuICB9LFxuXG4gIC8vIExpZ2F0dXJlIEFJTiBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDY0OSddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6J1xcdUZDRjcnLGZpbmFsOidcXHVGRDEzJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQUlOIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDYyQyddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6J1xcdUZDMjknLGluaXRpYWw6J1xcdUZDQkEnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBKRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM5XFx1MDYyQ1xcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRhbDonXFx1RkRDNCcsZmluYWw6J1xcdUZENzUnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1J10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDonXFx1RkMyQScsaW5pdGlhbDonXFx1RkNCQid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEFJTiBXSVRIIE1FRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzOVxcdTA2NDVcXHUwNjQ5J10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkQ3OCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEFJTiBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1XFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ3NycsZmluYWw6J1xcdUZENzYnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBNRUVNIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzlcXHUwNjQ1XFx1MDY0QSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEQjYnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBBSU4gV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzOVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOidcXHVGQ0Y4JyxmaW5hbDonXFx1RkQxNCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEFMRUYgTUFLU1VSQSBXSVRIIFNVUEVSU0NSSVBUIEFMRUZcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0OVxcdTA2NzAnXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOidcXHVGQzVEJyxmaW5hbDonXFx1RkM5MCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEFMRUYgV0lUSCBGQVRIQVRBTlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI3XFx1MDY0QiddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6J1xcdUZEM0QnLGZpbmFsOidcXHVGRDNDJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQkVIIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzA5JyxmaW5hbDonXFx1RkM2RSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEJFSCBXSVRIIEhBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyRCddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMwNicsaW5pdGlhbDonXFx1RkM5RCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEJFSCBXSVRIIEhBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyRFxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREMyJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQkVIIFdJVEggSEVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjQ3J10sXG4gICAgZm9ybXM6e2luaXRpYWw6J1xcdUZDQTAnLG1lZGlhbDonXFx1RkNFMid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEJFSCBXSVRIIEpFRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyOFxcdTA2MkMnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMDUnLGluaXRpYWw6J1xcdUZDOUMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBCRUggV0lUSCBLSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjJFJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzA3Jyxpbml0aWFsOidcXHVGQzlFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQkVIIFdJVEggS0hBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDYyRVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGRDlFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQkVIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDY0NSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMwOCcsaW5pdGlhbDonXFx1RkM5RicsbWVkaWFsOidcXHVGQ0UxJyxmaW5hbDonXFx1RkM2Qyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEJFSCBXSVRIIE5PT05cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyOFxcdTA2NDYnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGQzZEJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgQkVIIFdJVEggUkVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjMxJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkM2QSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEJFSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI4XFx1MDY0QSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMwQScsZmluYWw6J1xcdUZDNkYnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBCRUggV0lUSCBaQUlOXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjhcXHUwNjMyJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkM2Qid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIERBRCBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM2XFx1MDY0OSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkQwNycsZmluYWw6J1xcdUZEMjMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNlxcdTA2MkQnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMjMnLGluaXRpYWw6J1xcdUZDQjUnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBIQUggV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNlxcdTA2MkRcXHUwNjQ5J10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkQ2RSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIERBRCBXSVRIIEhBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM2XFx1MDYyRFxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREFCJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgREFEIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM2XFx1MDYyQyddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMyMicsaW5pdGlhbDonXFx1RkNCNCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIERBRCBXSVRIIEtIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNlxcdTA2MkUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMjQnLGluaXRpYWw6J1xcdUZDQjYnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBLSEFIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM2XFx1MDYyRVxcdTA2NDUnXSxcbiAgICBmb3Jtczp7aW5pdGlhbDonXFx1RkQ3MCcsZmluYWw6J1xcdUZENkYnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBEQUQgV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzZcXHUwNjQ1J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzI1Jyxpbml0aWFsOidcXHVGQ0I3J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgREFEIFdJVEggUkVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzZcXHUwNjMxJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGRDEwJyxmaW5hbDonXFx1RkQyQyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIERBRCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM2XFx1MDY0QSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkQwOCcsZmluYWw6J1xcdUZEMjQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBGRUggV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0MVxcdTA2NDknXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMzEnLGZpbmFsOidcXHVGQzdDJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgRkVIIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDFcXHUwNjJEJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzJFJyxpbml0aWFsOidcXHVGQ0JGJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgRkVIIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQxXFx1MDYyQyddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMyRCcsaW5pdGlhbDonXFx1RkNCRSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEZFSCBXSVRIIEtIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0MVxcdTA2MkUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMkYnLGluaXRpYWw6J1xcdUZDQzAnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBGRUggV0lUSCBLSEFIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQxXFx1MDYyRVxcdTA2NDUnXSxcbiAgICBmb3Jtczp7aW5pdGlhbDonXFx1RkQ3RCcsZmluYWw6J1xcdUZEN0MnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBGRUggV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDFcXHUwNjQ1J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzMwJyxpbml0aWFsOidcXHVGQ0MxJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgRkVIIFdJVEggTUVFTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQxXFx1MDY0NVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREMxJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgRkVIIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDFcXHUwNjRBJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzMyJyxmaW5hbDonXFx1RkM3RCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEdIQUlOIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2M0FcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQ0Y5JyxmaW5hbDonXFx1RkQxNSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEdIQUlOIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjNBXFx1MDYyQyddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMyQicsaW5pdGlhbDonXFx1RkNCQyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEdIQUlOIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjNBXFx1MDY0NSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMyQycsaW5pdGlhbDonXFx1RkNCRCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEdIQUlOIFdJVEggTUVFTSBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjNBXFx1MDY0NVxcdTA2NDknXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGRDdCJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgR0hBSU4gV0lUSCBNRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjNBXFx1MDY0NVxcdTA2NDUnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGRDc5J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgR0hBSU4gV0lUSCBNRUVNIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2M0FcXHUwNjQ1XFx1MDY0QSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEN0EnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBHSEFJTiBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjNBXFx1MDY0QSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkNGQScsZmluYWw6J1xcdUZEMTYnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBIQUggV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyRFxcdTA2NDknXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDRkYnLGZpbmFsOidcXHVGRDFCJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSEFIIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJEXFx1MDYyQyddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMxNycsaW5pdGlhbDonXFx1RkNBOSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEhBSCBXSVRIIEpFRU0gV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyRFxcdTA2MkNcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkRCRid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEhBSCBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyRFxcdTA2NDUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMTgnLGluaXRpYWw6J1xcdUZDQUEnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBIQUggV0lUSCBNRUVNIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkRcXHUwNjQ1XFx1MDY0OSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZENUInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBIQUggV0lUSCBNRUVNIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkRcXHUwNjQ1XFx1MDY0QSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZENUEnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBIQUggV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyRFxcdTA2NEEnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZEMDAnLGZpbmFsOidcXHVGRDFDJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSEVIIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDdcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzUzJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSEVIIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ3XFx1MDYyQyddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkM1MScsaW5pdGlhbDonXFx1RkNENyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEhFSCBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0N1xcdTA2NDUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDNTInLGluaXRpYWw6J1xcdUZDRDgnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBIRUggV0lUSCBNRUVNIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ3XFx1MDY0NVxcdTA2MkMnXSxcbiAgICBmb3Jtczp7aW5pdGlhbDonXFx1RkQ5Myd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEhFSCBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDdcXHUwNjQ1XFx1MDY0NSddLFxuICAgIGZvcm1zOntpbml0aWFsOidcXHVGRDk0J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSEVIIFdJVEggU1VQRVJTQ1JJUFQgQUxFRlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ3XFx1MDY3MCddLFxuICAgIGZvcm1zOntpbml0aWFsOidcXHVGQ0Q5J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSEVIIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDdcXHUwNjRBJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzU0J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSkVFTSBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJDXFx1MDY0OSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkQwMScsZmluYWw6J1xcdUZEMUQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBKRUVNIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkNcXHUwNjJEJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzE1Jyxpbml0aWFsOidcXHVGQ0E3J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSkVFTSBXSVRIIEhBSCBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJDXFx1MDYyRFxcdTA2NDknXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREE2J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSkVFTSBXSVRIIEhBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJDXFx1MDYyRFxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREJFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSkVFTSBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQ1xcdTA2NDUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMTYnLGluaXRpYWw6J1xcdUZDQTgnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBKRUVNIFdJVEggTUVFTSBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJDXFx1MDY0NVxcdTA2NDknXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREE3J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgSkVFTSBXSVRIIE1FRU0gV0lUSCBIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQ1xcdTA2NDVcXHUwNjJEJ10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDU5JyxmaW5hbDonXFx1RkQ1OCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEpFRU0gV0lUSCBNRUVNIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkNcXHUwNjQ1XFx1MDY0QSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEQTUnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBKRUVNIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkNcXHUwNjRBJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGRDAyJyxmaW5hbDonXFx1RkQxRSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEtBRiBXSVRIIEFMRUZcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0M1xcdTA2MjcnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMzcnLGZpbmFsOidcXHVGQzgwJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgS0FGIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDNcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzNEJyxmaW5hbDonXFx1RkM4Myd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEtBRiBXSVRIIEhBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQzXFx1MDYyRCddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMzOScsaW5pdGlhbDonXFx1RkNDNSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEtBRiBXSVRIIEpFRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0M1xcdTA2MkMnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMzgnLGluaXRpYWw6J1xcdUZDQzQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBLQUYgV0lUSCBLSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDNcXHUwNjJFJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzNBJyxpbml0aWFsOidcXHVGQ0M2J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgS0FGIFdJVEggTEFNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDNcXHUwNjQ0J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzNCJyxpbml0aWFsOidcXHVGQ0M3JyxtZWRpYWw6J1xcdUZDRUInLGZpbmFsOidcXHVGQzgxJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgS0FGIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQzXFx1MDY0NSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMzQycsaW5pdGlhbDonXFx1RkNDOCcsbWVkaWFsOidcXHVGQ0VDJyxmaW5hbDonXFx1RkM4Mid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEtBRiBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDNcXHUwNjQ1XFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkRDMycsZmluYWw6J1xcdUZEQkInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBLQUYgV0lUSCBNRUVNIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDNcXHUwNjQ1XFx1MDY0QSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEQjcnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBLQUYgV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0M1xcdTA2NEEnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDM0UnLGZpbmFsOidcXHVGQzg0J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgS0hBSCBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJFXFx1MDY0OSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkQwMycsZmluYWw6J1xcdUZEMUYnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBLSEFIIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkVcXHUwNjJEJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzFBJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgS0hBSCBXSVRIIEpFRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyRVxcdTA2MkMnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMTknLGluaXRpYWw6J1xcdUZDQUInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBLSEFIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJFXFx1MDY0NSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMxQicsaW5pdGlhbDonXFx1RkNBQyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIEtIQUggV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyRVxcdTA2NEEnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZEMDQnLGZpbmFsOidcXHVGRDIwJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTEFNIFdJVEggQUxFRlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDYyNyddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkVGQicsZmluYWw6J1xcdUZFRkMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2NDknXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDNDMnLGZpbmFsOidcXHVGQzg2J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTEFNIFdJVEggQUxFRiBXSVRIIEhBTVpBIEFCT1ZFXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDRcXHUwNjIzJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGRUY3JyxmaW5hbDonXFx1RkVGOCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIExBTSBXSVRIIEFMRUYgV0lUSCBIQU1aQSBCRUxPV1xuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDYyNSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkVGOScsZmluYWw6J1xcdUZFRkEnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBBTEVGIFdJVEggTUFEREEgQUJPVkVcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MjInXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZFRjUnLGZpbmFsOidcXHVGRUY2J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTEFNIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDRcXHUwNjJEJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzQwJyxpbml0aWFsOidcXHVGQ0NBJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTEFNIFdJVEggSEFIIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDRcXHUwNjJEXFx1MDY0OSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEODInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBIQUggV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDRcXHUwNjJEXFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkRCNScsZmluYWw6J1xcdUZEODAnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBIQUggV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MkRcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkQ4MSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIExBTSBXSVRIIEhFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDY0NyddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkNDRCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIExBTSBXSVRIIEpFRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MkMnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDM0YnLGluaXRpYWw6J1xcdUZDQzknfVxuICB9LFxuICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBKRUVNIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDYyQ1xcdTA2MkMnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZEODMnLGZpbmFsOidcXHVGRDg0J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTEFNIFdJVEggSkVFTSBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MkNcXHUwNjQ1J10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGREJBJyxmaW5hbDonXFx1RkRCQyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIExBTSBXSVRIIEpFRU0gV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MkNcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkRBQyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIExBTSBXSVRIIEtIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2MkUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDNDEnLGluaXRpYWw6J1xcdUZDQ0InfVxuICB9LFxuICAvLyBMaWdhdHVyZSBMQU0gV0lUSCBLSEFIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDYyRVxcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZEODYnLGZpbmFsOidcXHVGRDg1J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTEFNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDY0NSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkM0MicsaW5pdGlhbDonXFx1RkNDQycsbWVkaWFsOidcXHVGQ0VEJyxmaW5hbDonXFx1RkM4NSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIExBTSBXSVRIIE1FRU0gV0lUSCBIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2NDVcXHUwNjJEJ10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDg4JyxmaW5hbDonXFx1RkQ4Nyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIExBTSBXSVRIIE1FRU0gV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NFxcdTA2NDVcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkRBRCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIExBTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ0XFx1MDY0QSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkM0NCcsZmluYWw6J1xcdUZDODcnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggQUxFRlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDYyNyddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZDODgnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzQ5J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEhBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDYyRCddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkM0NicsaW5pdGlhbDonXFx1RkNDRid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBIQUggV0lUSCBKRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJEXFx1MDYyQyddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ4OSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBIQUggV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJEXFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ4QSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBIQUggV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkRcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkQ4Qid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBKRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJDJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzQ1Jyxpbml0aWFsOidcXHVGQ0NFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEpFRU0gV0lUSCBIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkNcXHUwNjJEJ10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDhDJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEpFRU0gV0lUSCBLSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJDXFx1MDYyRSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ5Mid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBKRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDYyQ1xcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZEOEQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggSkVFTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDYyQ1xcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREMwJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEtIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDNDcnLGluaXRpYWw6J1xcdUZDRDAnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggS0hBSCBXSVRIIEpFRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NVxcdTA2MkVcXHUwNjJDJ10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDhFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIEtIQUggV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJFXFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ4Rid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE1FRU0gV0lUSCBLSEFIIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDVcXHUwNjJFXFx1MDY0QSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEQjknfVxuICB9LFxuICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDY0NSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkM0OCcsaW5pdGlhbDonXFx1RkNEMScsZmluYWw6J1xcdUZDODknfVxuICB9LFxuICAvLyBMaWdhdHVyZSBNRUVNIFdJVEggTUVFTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDY0NVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREIxJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTUVFTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ1XFx1MDY0QSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkM0QSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2NDknXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDNEYnLGZpbmFsOidcXHVGQzhFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIEhBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDYyRCddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkM0QycsaW5pdGlhbDonXFx1RkNEMyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBIQUggV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkRcXHUwNjQ5J10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkQ5Nid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBIQUggV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDZcXHUwNjJEXFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ5NSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBIQUggV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkRcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkRCMyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBIRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2NDcnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZDRDYnLG1lZGlhbDonXFx1RkNFRid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBKRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDZcXHUwNjJDJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzRCJyxpbml0aWFsOidcXHVGQ0QyJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIEpFRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkNcXHUwNjQ5J10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkQ5OSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBKRUVNIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDZcXHUwNjJDXFx1MDYyRCddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkRCOCcsZmluYWw6J1xcdUZEQkQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBOT09OIFdJVEggSkVFTSBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MkNcXHUwNjQ1J10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDk4JyxmaW5hbDonXFx1RkQ5Nyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBKRUVNIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDZcXHUwNjJDXFx1MDY0QSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEQzcnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBOT09OIFdJVEggS0hBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDYyRSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkM0RCcsaW5pdGlhbDonXFx1RkNENCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDZcXHUwNjQ1J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzRFJyxpbml0aWFsOidcXHVGQ0Q1JyxtZWRpYWw6J1xcdUZDRUUnLGZpbmFsOidcXHVGQzhDJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIE1FRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2NDVcXHUwNjQ5J10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkQ5Qid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBNRUVNIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDZcXHUwNjQ1XFx1MDY0QSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEOUEnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBOT09OIFdJVEggTk9PTlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQ2XFx1MDY0NiddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZDOEQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBOT09OIFdJVEggUkVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDZcXHUwNjMxJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkM4QSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIE5PT04gV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2NEEnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDNTAnLGZpbmFsOidcXHVGQzhGJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgTk9PTiBXSVRIIFpBSU5cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0NlxcdTA2MzInXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGQzhCJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgUUFGIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDJcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzM1JyxmaW5hbDonXFx1RkM3RSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFFBRiBXSVRIIEhBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQyXFx1MDYyRCddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMzMycsaW5pdGlhbDonXFx1RkNDMid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFFBRiBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0MlxcdTA2NDUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMzQnLGluaXRpYWw6J1xcdUZDQzMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBRQUYgV0lUSCBNRUVNIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDJcXHUwNjQ1XFx1MDYyRCddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkRCNCcsZmluYWw6J1xcdUZEN0UnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBRQUYgV0lUSCBNRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQyXFx1MDY0NVxcdTA2NDUnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGRDdGJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgUUFGIFdJVEggTUVFTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQyXFx1MDY0NVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREIyJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgUUFGIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDJcXHUwNjRBJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzM2JyxmaW5hbDonXFx1RkM3Rid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFJFSCBXSVRIIFNVUEVSU0NSSVBUIEFMRUZcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzMVxcdTA2NzAnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDNUMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTQUQgV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNVxcdTA2NDknXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZEMDUnLGZpbmFsOidcXHVGRDIxJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0FEIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzVcXHUwNjJEJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzIwJyxpbml0aWFsOidcXHVGQ0IxJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0FEIFdJVEggSEFIIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzVcXHUwNjJEXFx1MDYyRCddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ2NScsZmluYWw6J1xcdUZENjQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTQUQgV0lUSCBIQUggV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNVxcdTA2MkRcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkRBOSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNBRCBXSVRIIEtIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNVxcdTA2MkUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZDQjInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTQUQgV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzVcXHUwNjQ1J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzIxJyxpbml0aWFsOidcXHVGQ0IzJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0FEIFdJVEggTUVFTSBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNVxcdTA2NDVcXHUwNjQ1J10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGREM1JyxmaW5hbDonXFx1RkQ2Nid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNBRCBXSVRIIFJFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM1XFx1MDYzMSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkQwRicsZmluYWw6J1xcdUZEMkInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTQUQgV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNVxcdTA2NEEnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZEMDYnLGZpbmFsOidcXHVGRDIyJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDY0OSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkNGQicsZmluYWw6J1xcdUZEMTcnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjJEJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzFEJyxpbml0aWFsOidcXHVGQ0FFJyxtZWRpYWw6J1xcdUZEMzUnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggSEFIIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDYyRFxcdTA2MkMnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZENUMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggSEVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjQ3J10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDMxJyxtZWRpYWw6J1xcdUZDRTgnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDYyQyddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMxQycsaW5pdGlhbDonXFx1RkNBRCcsbWVkaWFsOidcXHVGRDM0J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIEpFRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzM1xcdTA2MkNcXHUwNjQ5J10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkQ1RSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNFRU4gV0lUSCBKRUVNIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjJDXFx1MDYyRCddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ1RCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNFRU4gV0lUSCBLSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjJFJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzFFJyxpbml0aWFsOidcXHVGQ0FGJyxtZWRpYWw6J1xcdUZEMzYnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggS0hBSCBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDYyRVxcdTA2NDknXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREE4J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIEtIQUggV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzM1xcdTA2MkVcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkRDNid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNFRU4gV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjQ1J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzFGJyxpbml0aWFsOidcXHVGQ0IwJyxtZWRpYWw6J1xcdUZDRTcnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggTUVFTSBXSVRIIEhBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDY0NVxcdTA2MkQnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZENjAnLGZpbmFsOidcXHVGRDVGJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIE1FRU0gV0lUSCBKRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjQ1XFx1MDYyQyddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ2MSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNFRU4gV0lUSCBNRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDY0NVxcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZENjMnLGZpbmFsOidcXHVGRDYyJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0VFTiBXSVRIIFJFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjMzXFx1MDYzMSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkQwRScsZmluYWw6J1xcdUZEMkEnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTRUVOIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzNcXHUwNjRBJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQ0ZDJyxmaW5hbDonXFx1RkQxOCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNIQUREQSBXSVRIIERBTU1BXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NDBcXHUwNjRGXFx1MDY1MSddLFxuICAgIGZvcm1zOiB7bWVkaWFsOidcXHVGQ0YzJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0hBRERBIFdJVEggRkFUSEFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0MFxcdTA2NEVcXHUwNjUxJ10sXG4gICAgZm9ybXM6IHttZWRpYWw6J1xcdUZDRjInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTSEFEREEgV0lUSCBLQVNSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjQwXFx1MDY1MFxcdTA2NTEnXSxcbiAgICBmb3Jtczoge21lZGlhbDonXFx1RkNGNCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQ0ZEJyxmaW5hbDonXFx1RkQxOSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjJEJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGRDBBJyxpbml0aWFsOidcXHVGRDJFJyxtZWRpYWw6J1xcdUZEMzgnLGZpbmFsOidcXHVGRDI2J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBIQUggV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjJEXFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ2OCcsZmluYWw6J1xcdUZENjcnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBTSEVFTiBXSVRIIEhBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDYyRFxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREFBJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBIRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNFxcdTA2NDcnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZEMzInLG1lZGlhbDonXFx1RkNFQSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDYyQyddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkQwOScsaW5pdGlhbDonXFx1RkQyRCcsbWVkaWFsOidcXHVGRDM3JyxmaW5hbDonXFx1RkQyNSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFNIRUVOIFdJVEggSkVFTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDYyQ1xcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGRDY5J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBLSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjJFJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGRDBCJyxpbml0aWFsOidcXHVGRDJGJyxtZWRpYWw6J1xcdUZEMzknLGZpbmFsOidcXHVGRDI3J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzRcXHUwNjQ1J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGRDBDJyxpbml0aWFsOidcXHVGRDMwJyxtZWRpYWw6J1xcdUZDRTknLGZpbmFsOidcXHVGRDI4J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBNRUVNIFdJVEggS0hBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDY0NVxcdTA2MkUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZENkInLGZpbmFsOidcXHVGRDZBJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBNRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM0XFx1MDY0NVxcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZENkQnLGZpbmFsOidcXHVGRDZDJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBSRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNFxcdTA2MzEnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZEMEQnLGZpbmFsOidcXHVGRDI5J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgU0hFRU4gV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzNFxcdTA2NEEnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDRkUnLGZpbmFsOidcXHVGRDFBJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEFIIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzdcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQ0Y1JyxmaW5hbDonXFx1RkQxMSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRBSCBXSVRIIEhBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM3XFx1MDYyRCddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMyNicsaW5pdGlhbDonXFx1RkNCOCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRBSCBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzN1xcdTA2NDUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMjcnLGluaXRpYWw6J1xcdUZEMzMnLG1lZGlhbDonXFx1RkQzQSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRBSCBXSVRIIE1FRU0gV0lUSCBIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzN1xcdTA2NDVcXHUwNjJEJ10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDcyJyxmaW5hbDonXFx1RkQ3MSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRBSCBXSVRIIE1FRU0gV0lUSCBNRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MzdcXHUwNjQ1XFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkQ3Myd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRBSCBXSVRIIE1FRU0gV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzN1xcdTA2NDVcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkQ3NCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM3XFx1MDY0QSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkNGNicsZmluYWw6J1xcdUZEMTInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBURUggV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2NDknXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMEYnLGZpbmFsOidcXHVGQzc0J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjJEJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzBDJyxpbml0aWFsOidcXHVGQ0EyJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggSEFIIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDYyRFxcdTA2MkMnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZENTInLGZpbmFsOidcXHVGRDUxJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggSEFIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDYyRFxcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZENTMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBURUggV0lUSCBIRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2NDcnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZDQTUnLG1lZGlhbDonXFx1RkNFNCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRFSCBXSVRIIEpFRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MkMnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMEInLGluaXRpYWw6J1xcdUZDQTEnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBURUggV0lUSCBKRUVNIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjJDXFx1MDY0OSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEQTAnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBURUggV0lUSCBKRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDYyQ1xcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZENTAnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBURUggV0lUSCBKRUVNIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjJDXFx1MDY0QSddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZEOUYnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBURUggV0lUSCBLSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjJFJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzBEJyxpbml0aWFsOidcXHVGQ0EzJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggS0hBSCBXSVRIIEFMRUYgTUFLU1VSQVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDYyRVxcdTA2NDknXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREEyJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggS0hBSCBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MkVcXHUwNjQ1J10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDU0J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggS0hBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDYyRVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREExJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDY0NSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMwRScsaW5pdGlhbDonXFx1RkNBNCcsbWVkaWFsOidcXHVGQ0UzJyxmaW5hbDonXFx1RkM3Mid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRFSCBXSVRIIE1FRU0gV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2NDVcXHUwNjQ5J10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkRBNCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRFSCBXSVRIIE1FRU0gV0lUSCBIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2NDVcXHUwNjJEJ10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDU2J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggTUVFTSBXSVRIIEpFRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2NDVcXHUwNjJDJ10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDU1J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggTUVFTSBXSVRIIEtIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2NDVcXHUwNjJFJ10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGRDU3J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggTUVFTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDY0NVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREEzJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggTk9PTlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJBXFx1MDY0NiddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZDNzMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBURUggV0lUSCBSRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MzEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGQzcwJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEVIIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkFcXHUwNjRBJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzEwJyxmaW5hbDonXFx1RkM3NSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRFSCBXSVRIIFpBSU5cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQVxcdTA2MzInXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGQzcxJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEhBTCBXSVRIIFNVUEVSU0NSSVBUIEFMRUZcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYzMFxcdTA2NzAnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDNUInfVxuICB9LFxuICAvLyBMaWdhdHVyZSBUSEVIIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkJcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzEzJyxmaW5hbDonXFx1RkM3QSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRIRUggV0lUSCBIRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQlxcdTA2NDcnXSxcbiAgICBmb3Jtczoge21lZGlhbDonXFx1RkNFNid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRIRUggV0lUSCBKRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkJcXHUwNjJDJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzExJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEhFSCBXSVRIIE1FRU1cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQlxcdTA2NDUnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMTInLGluaXRpYWw6J1xcdUZDQTYnLG1lZGlhbDonXFx1RkNFNScsZmluYWw6J1xcdUZDNzgnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBUSEVIIFdJVEggTk9PTlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjJCXFx1MDY0NiddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZDNzknfVxuICB9LFxuICAvLyBMaWdhdHVyZSBUSEVIIFdJVEggUkVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MkJcXHUwNjMxJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkM3Nid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFRIRUggV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQlxcdTA2NEEnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMTQnLGZpbmFsOidcXHVGQzdCJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVEhFSCBXSVRIIFpBSU5cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyQlxcdTA2MzInXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGQzc3J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgVUlHSFVSIEtJUkdISVogWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2NDknXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZCRjknLGluaXRpYWw6J1xcdUZCRkInLGZpbmFsOidcXHVGQkZBJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggQUxFRiBNQUtTVVJBXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NEFcXHUwNjQ5J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzU5JyxmaW5hbDonXFx1RkM5NSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDYyRCddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkM1NicsaW5pdGlhbDonXFx1RkNEQid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDYyRFxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREFFJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBBRVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDZENSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkJFQycsZmluYWw6J1xcdUZCRUQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIEFMRUZcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2MjcnXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZCRUEnLGZpbmFsOidcXHVGQkVCJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBBTEVGIE1BS1NVUkFcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2NDknXSxcbiAgICBmb3Jtczp7aXNvbGF0ZWQ6J1xcdUZDMDMnLGZpbmFsOidcXHVGQzY4J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBFXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNkQwJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQkY2Jyxpbml0aWFsOidcXHVGQkY4JyxmaW5hbDonXFx1RkJGNyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggSEFIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNjJEJ10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQzAxJyxpbml0aWFsOidcXHVGQzk4J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBIRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2NDcnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZDOUInLG1lZGlhbDonXFx1RkNFMCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggSkVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDYyQyddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMwMCcsaW5pdGlhbDonXFx1RkM5Nyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggS0hBSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDYyRSddLFxuICAgIGZvcm1zOiB7aW5pdGlhbDonXFx1RkM5OSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDY0NSddLFxuICAgIGZvcm1zOntpc29sYXRlZDonXFx1RkMwMicsaW5pdGlhbDonXFx1RkM5QScsbWVkaWFsOidcXHVGQ0RGJyxmaW5hbDonXFx1RkM2Nid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggTk9PTlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDY0NiddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZDNjcnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIE9FXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNkM2J10sXG4gICAgZm9ybXM6e2lzb2xhdGVkOidcXHVGQkYyJyxmaW5hbDonXFx1RkJGMyd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggUkVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNjMxJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkM2NCd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggVVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjI2XFx1MDZDNyddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6J1xcdUZCRjAnLGZpbmFsOidcXHVGQkYxJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEFNWkEgQUJPVkUgV0lUSCBXQVdcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2NDgnXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOidcXHVGQkVFJyxmaW5hbDonXFx1RkJFRid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEhBTVpBIEFCT1ZFIFdJVEggWUVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDonXFx1RkMwNCcsZmluYWw6J1xcdUZDNjknfVxuICB9LFxuICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIFlVXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2MjZcXHUwNkM4J10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDonXFx1RkJGNCcsZmluYWw6J1xcdUZCRjUnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBZRUggV0lUSCBIQU1aQSBBQk9WRSBXSVRIIFpBSU5cbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDYyNlxcdTA2MzInXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGQzY1J31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggSEVIXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NEFcXHUwNjQ3J10sXG4gICAgZm9ybXM6IHtpbml0aWFsOidcXHVGQ0RFJyxtZWRpYWw6J1xcdUZDRjEnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBZRUggV0lUSCBKRUVNXG4gIHtcbiAgICBtYXRjaGVzOiBbJ1xcdTA2NEFcXHUwNjJDJ10sXG4gICAgZm9ybXM6IHtpc29sYXRlZDonXFx1RkM1NScsaW5pdGlhbDonXFx1RkNEQSd9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEpFRU0gV0lUSCBZRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0QVxcdTA2MkNcXHUwNjRBJ10sXG4gICAgZm9ybXM6IHtmaW5hbDonXFx1RkRBRid9XG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIEtIQUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0QVxcdTA2MkUnXSxcbiAgICBmb3Jtczoge2lzb2xhdGVkOidcXHVGQzU3Jyxpbml0aWFsOidcXHVGQ0RDJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6J1xcdUZDNTgnLGluaXRpYWw6J1xcdUZDREQnLG1lZGlhbDonXFx1RkNGMCcsZmluYWw6J1xcdUZDOTMnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBZRUggV0lUSCBNRUVNIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDY0NVxcdTA2NDUnXSxcbiAgICBmb3Jtczoge2luaXRpYWw6J1xcdUZEOUQnLGZpbmFsOidcXHVGRDlDJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggTUVFTSBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDY0NVxcdTA2NEEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGREIwJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggTk9PTlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDY0NiddLFxuICAgIGZvcm1zOiB7ZmluYWw6J1xcdUZDOTQnfVxuICB9LFxuICAvLyBMaWdhdHVyZSBZRUggV0lUSCBSRUhcbiAge1xuICAgIG1hdGNoZXM6IFsnXFx1MDY0QVxcdTA2MzEnXSxcbiAgICBmb3Jtczoge2ZpbmFsOidcXHVGQzkxJ30sXG4gIH0sXG4gIC8vIExpZ2F0dXJlIFlFSCBXSVRIIFlFSFxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDY0QSddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6ICdcXHVGQzVBJyxmaW5hbDogJ1xcdUZDOTYnfSxcbiAgfSxcbiAgLy8gTGlnYXR1cmUgWUVIIFdJVEggWkFJTlxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjRBXFx1MDYzMiddLFxuICAgIGZvcm1zOiB7ZmluYWw6ICdcXHVGQzkyJ31cbiAgfSxcbiAgLy8gTGlnYXR1cmUgWkFIIFdJVEggTUVFTVxuICB7XG4gICAgbWF0Y2hlczogWydcXHUwNjM4XFx1MDY0NSddLFxuICAgIGZvcm1zOiB7aXNvbGF0ZWQ6ICdcXHVGQzI4Jyxpbml0aWFsOiAnXFx1RkNCOScsbWVkaWFsOiAnXFx1RkQzQid9XG4gIH1cbl07XG5cbmNvbnN0IExFVFRFUlMgPSB7XG4gIC8vIExldHRlciBIQU1aQVxuICAnXFx1MDYyMSc6IHtpc29sYXRlZDonXFx1RkU4MCd9LFxuICAvLyBMZXR0ZXIgQUxFRiBXSVRIIE1BRERBIEFCT1ZFXG4gICdcXHUwNjIyJzp7aXNvbGF0ZWQ6J1xcdUZFODEnLGZpbmFsOidcXHVGRTgyJ30sXG4gIC8vIExldHRlciBBTEVGIFdJVEggSEFNWkEgQUJPVkVcbiAgJ1xcdTA2MjMnOntpc29sYXRlZDonXFx1RkU4MycsZmluYWw6J1xcdUZFODQnfSxcbiAgLy8gTGV0dGVyIFdBVyBXSVRIIEhBTVpBIEFCT1ZFXG4gICdcXHUwNjI0Jzp7aXNvbGF0ZWQ6J1xcdUZFODUnLGZpbmFsOidcXHVGRTg2J30sXG4gIC8vIExldHRlciBBTEVGIFdJVEggSEFNWkEgQkVMT1dcbiAgJ1xcdTA2MjUnOntpc29sYXRlZDonXFx1RkU4NycsZmluYWw6J1xcdUZFODgnfSxcbiAgLy8gTGV0dGVyIFlFSCBXSVRIIEhBTVpBIEFCT1ZFXG4gICdcXHUwNjI2Jzp7aXNvbGF0ZWQ6J1xcdUZFODknLGluaXRpYWw6J1xcdUZFOEInLG1lZGlhbDonXFx1RkU4QycsZmluYWw6J1xcdUZFOEEnfSxcbiAgLy8gTGV0dGVyIEFMRUZcbiAgJ1xcdTA2MjcnOntpc29sYXRlZDonXFx1RkU4RCcsZmluYWw6J1xcdUZFOEUnfSxcbiAgLy8gTGV0dGVyIEJFSFxuICAnXFx1MDYyOCc6e2lzb2xhdGVkOidcXHVGRThGJyxpbml0aWFsOidcXHVGRTkxJyxtZWRpYWw6J1xcdUZFOTInLGZpbmFsOidcXHVGRTkwJ30sXG4gIC8vIExldHRlciBURUggTUFSQlVUQVxuICAnXFx1MDYyOSc6e2lzb2xhdGVkOidcXHVGRTkzJyxmaW5hbDonXFx1RkU5NCd9LFxuICAvLyBMZXR0ZXIgVEVIXG4gICdcXHUwNjJBJzp7aXNvbGF0ZWQ6J1xcdUZFOTUnLGluaXRpYWw6J1xcdUZFOTcnLG1lZGlhbDonXFx1RkU5OCcsZmluYWw6J1xcdUZFOTYnfSxcbiAgLy8gTGV0dGVyIFRIRUhcbiAgJ1xcdTA2MkInOntpc29sYXRlZDonXFx1RkU5OScsaW5pdGlhbDonXFx1RkU5QicsbWVkaWFsOidcXHVGRTlDJyxmaW5hbDonXFx1RkU5QSd9LFxuICAvLyBMZXR0ZXIgSkVFTVxuICAnXFx1MDYyQyc6e2lzb2xhdGVkOidcXHVGRTlEJyxpbml0aWFsOidcXHVGRTlGJyxtZWRpYWw6J1xcdUZFQTAnLGZpbmFsOidcXHVGRTlFJ30sXG4gIC8vIExldHRlciBIQUhcbiAgJ1xcdTA2MkQnOntpc29sYXRlZDonXFx1RkVBMScsaW5pdGlhbDonXFx1RkVBMycsbWVkaWFsOidcXHVGRUE0JyxmaW5hbDonXFx1RkVBMid9LFxuICAvLyBMZXR0ZXIgS0hBSFxuICAnXFx1MDYyRSc6e2lzb2xhdGVkOidcXHVGRUE1Jyxpbml0aWFsOidcXHVGRUE3JyxtZWRpYWw6J1xcdUZFQTgnLGZpbmFsOidcXHVGRUE2J30sXG4gIC8vIExldHRlciBEQUxcbiAgJ1xcdTA2MkYnOntpc29sYXRlZDonXFx1RkVBOScsZmluYWw6J1xcdUZFQUEnfSxcbiAgLy8gTGV0dGVyIFRIQUxcbiAgJ1xcdTA2MzAnOntpc29sYXRlZDonXFx1RkVBQicsZmluYWw6J1xcdUZFQUMnfSxcbiAgLy8gTGV0dGVyIFJFSFxuICAnXFx1MDYzMSc6e2lzb2xhdGVkOidcXHVGRUFEJyxmaW5hbDonXFx1RkVBRSd9LFxuICAvLyBMZXR0ZXIgWkFJTlxuICAnXFx1MDYzMic6e2lzb2xhdGVkOidcXHVGRUFGJyxmaW5hbDonXFx1RkVCMCd9LFxuICAvLyBMZXR0ZXIgU0VFTlxuICAnXFx1MDYzMyc6e2lzb2xhdGVkOidcXHVGRUIxJyxpbml0aWFsOidcXHVGRUIzJyxtZWRpYWw6J1xcdUZFQjQnLGZpbmFsOidcXHVGRUIyJ30sXG4gIC8vIExldHRlciBTSEVFTlxuICAnXFx1MDYzNCc6e2lzb2xhdGVkOidcXHVGRUI1Jyxpbml0aWFsOidcXHVGRUI3JyxtZWRpYWw6J1xcdUZFQjgnLGZpbmFsOidcXHVGRUI2J30sXG4gIC8vIExldHRlciBTQURcbiAgJ1xcdTA2MzUnOntpc29sYXRlZDonXFx1RkVCOScsaW5pdGlhbDonXFx1RkVCQicsbWVkaWFsOidcXHVGRUJDJyxmaW5hbDonXFx1RkVCQSd9LFxuICAvLyBMZXR0ZXIgREFEXG4gICdcXHUwNjM2Jzp7aXNvbGF0ZWQ6J1xcdUZFQkQnLGluaXRpYWw6J1xcdUZFQkYnLG1lZGlhbDonXFx1RkVDMCcsZmluYWw6J1xcdUZFQkUnfSxcbiAgLy8gTGV0dGVyIFRBSFxuICAnXFx1MDYzNyc6e2lzb2xhdGVkOidcXHVGRUMxJyxpbml0aWFsOidcXHVGRUMzJyxtZWRpYWw6J1xcdUZFQzQnLGZpbmFsOidcXHVGRUMyJ30sXG4gIC8vIExldHRlciBaQUhcbiAgJ1xcdTA2MzgnOntpc29sYXRlZDonXFx1RkVDNScsaW5pdGlhbDonXFx1RkVDNycsbWVkaWFsOidcXHVGRUM4JyxmaW5hbDonXFx1RkVDNid9LFxuICAvLyBMZXR0ZXIgQUlOXG4gICdcXHUwNjM5Jzp7aXNvbGF0ZWQ6J1xcdUZFQzknLGluaXRpYWw6J1xcdUZFQ0InLG1lZGlhbDonXFx1RkVDQycsZmluYWw6J1xcdUZFQ0EnfSxcbiAgLy8gTGV0dGVyIEdIQUlOXG4gICdcXHUwNjNBJzp7aXNvbGF0ZWQ6J1xcdUZFQ0QnLGluaXRpYWw6J1xcdUZFQ0YnLG1lZGlhbDonXFx1RkVEMCcsZmluYWw6J1xcdUZFQ0UnfSxcbiAgLy8gVEFUV0VFTFxuICAnXFx1MDY0MCc6e2lzb2xhdGVkOidcXHUwNjQwJyxpbml0aWFsOidcXHUwNjQwJyxtZWRpYWw6J1xcdTA2NDAnLGZpbmFsOidcXHUwNjQwJ30sXG4gIC8vIExldHRlciBGRUhcbiAgJ1xcdTA2NDEnOntpc29sYXRlZDonXFx1RkVEMScsaW5pdGlhbDonXFx1RkVEMycsbWVkaWFsOidcXHVGRUQ0JyxmaW5hbDonXFx1RkVEMid9LFxuICAvLyBMZXR0ZXIgUUFGXG4gICdcXHUwNjQyJzp7aXNvbGF0ZWQ6J1xcdUZFRDUnLGluaXRpYWw6J1xcdUZFRDcnLG1lZGlhbDonXFx1RkVEOCcsZmluYWw6J1xcdUZFRDYnfSxcbiAgLy8gTGV0dGVyIEtBRlxuICAnXFx1MDY0Myc6e2lzb2xhdGVkOidcXHVGRUQ5Jyxpbml0aWFsOidcXHVGRURCJyxtZWRpYWw6J1xcdUZFREMnLGZpbmFsOidcXHVGRURBJ30sXG4gIC8vIExldHRlciBMQU1cbiAgJ1xcdTA2NDQnOntpc29sYXRlZDonXFx1RkVERCcsaW5pdGlhbDonXFx1RkVERicsbWVkaWFsOidcXHVGRUUwJyxmaW5hbDonXFx1RkVERSd9LFxuICAvLyBMZXR0ZXIgTUVFTVxuICAnXFx1MDY0NSc6e2lzb2xhdGVkOidcXHVGRUUxJyxpbml0aWFsOidcXHVGRUUzJyxtZWRpYWw6J1xcdUZFRTQnLGZpbmFsOidcXHVGRUUyJ30sXG4gIC8vIExldHRlciBOT09OXG4gICdcXHUwNjQ2Jzp7aXNvbGF0ZWQ6J1xcdUZFRTUnLGluaXRpYWw6J1xcdUZFRTcnLG1lZGlhbDonXFx1RkVFOCcsZmluYWw6J1xcdUZFRTYnfSxcbiAgLy8gTGV0dGVyIEhFSFxuICAnXFx1MDY0Nyc6e2lzb2xhdGVkOidcXHVGRUU5Jyxpbml0aWFsOidcXHVGRUVCJyxtZWRpYWw6J1xcdUZFRUMnLGZpbmFsOidcXHVGRUVBJ30sXG4gIC8vIExldHRlciBXQVdcbiAgJ1xcdTA2NDgnOntpc29sYXRlZDonXFx1RkVFRCcsZmluYWw6J1xcdUZFRUUnfSxcbiAgLy8gTGV0dGVyIEFMRUYgTUFLU1VSQVxuICAnXFx1MDY0OSc6e2lzb2xhdGVkOidcXHVGRUVGJyxmaW5hbDonXFx1RkVGMCd9LFxuICAvLyBMZXR0ZXIgWUVIXG4gICdcXHUwNjRBJzp7aXNvbGF0ZWQ6J1xcdUZFRjEnLGluaXRpYWw6J1xcdUZFRjMnLG1lZGlhbDonXFx1RkVGNCcsZmluYWw6J1xcdUZFRjInfSxcbiAgLy8gTGV0dGVyIEFMRUYgV0FTTEFcbiAgJ1xcdTA2NzEnOntpc29sYXRlZDonXFx1RkI1MCcsZmluYWw6J1xcdUZCNTEnfSxcbiAgLy8gTGV0dGVyIFUgV0lUSCBIQU1aQSBBQk9WRVxuICAnXFx1MDY3Nyc6e2lzb2xhdGVkOidcXHVGQkREJ30sXG4gIC8vIExldHRlciBUVEVIXG4gICdcXHUwNjc5Jzp7aXNvbGF0ZWQ6J1xcdUZCNjYnLGluaXRpYWw6J1xcdUZCNjgnLG1lZGlhbDonXFx1RkI2OScsZmluYWw6J1xcdUZCNjcnfSxcbiAgLy8gTGV0dGVyIFRURUhFSFxuICAnXFx1MDY3QSc6e2lzb2xhdGVkOidcXHVGQjVFJyxpbml0aWFsOidcXHVGQjYwJyxtZWRpYWw6J1xcdUZCNjEnLGZpbmFsOidcXHVGQjVGJ30sXG4gIC8vIExldHRlciBCRUVIXG4gICdcXHUwNjdCJzp7aXNvbGF0ZWQ6J1xcdUZCNTInLGluaXRpYWw6J1xcdUZCNTQnLG1lZGlhbDonXFx1RkI1NScsZmluYWw6J1xcdUZCNTMnfSxcbiAgLy8gTGV0dGVyIFBFSFxuICAnXFx1MDY3RSc6e2lzb2xhdGVkOidcXHVGQjU2Jyxpbml0aWFsOidcXHVGQjU4JyxtZWRpYWw6J1xcdUZCNTknLGZpbmFsOidcXHVGQjU3J30sXG4gIC8vIExldHRlciBURUhFSFxuICAnXFx1MDY3Ric6e2lzb2xhdGVkOidcXHVGQjYyJyxpbml0aWFsOidcXHVGQjY0JyxtZWRpYWw6J1xcdUZCNjUnLGZpbmFsOidcXHVGQjYzJ30sXG4gIC8vIExldHRlciBCRUhFSFxuICAnXFx1MDY4MCc6e2lzb2xhdGVkOidcXHVGQjVBJyxpbml0aWFsOidcXHVGQjVDJyxtZWRpYWw6J1xcdUZCNUQnLGZpbmFsOidcXHVGQjVCJ30sXG4gIC8vIExldHRlciBOWUVIXG4gICdcXHUwNjgzJzp7aXNvbGF0ZWQ6J1xcdUZCNzYnLGluaXRpYWw6J1xcdUZCNzgnLG1lZGlhbDonXFx1RkI3OScsZmluYWw6J1xcdUZCNzcnfSxcbiAgLy8gTGV0dGVyIERZRUhcbiAgJ1xcdTA2ODQnOntpc29sYXRlZDonXFx1RkI3MicsaW5pdGlhbDonXFx1RkI3NCcsbWVkaWFsOidcXHVGQjc1JyxmaW5hbDonXFx1RkI3Myd9LFxuICAvLyBMZXR0ZXIgVENIRUhcbiAgJ1xcdTA2ODYnOntpc29sYXRlZDonXFx1RkI3QScsaW5pdGlhbDonXFx1RkI3QycsbWVkaWFsOidcXHVGQjdEJyxmaW5hbDonXFx1RkI3Qid9LFxuICAvLyBMZXR0ZXIgVENIRUhFSFxuICAnXFx1MDY4Nyc6e2lzb2xhdGVkOidcXHVGQjdFJyxpbml0aWFsOidcXHVGQjgwJyxtZWRpYWw6J1xcdUZCODEnLGZpbmFsOidcXHVGQjdGJ30sXG4gIC8vIExldHRlciBEREFMXG4gICdcXHUwNjg4Jzp7aXNvbGF0ZWQ6J1xcdUZCODgnLGZpbmFsOidcXHVGQjg5J30sXG4gIC8vIExldHRlciBEQUhBTFxuICAnXFx1MDY4Qyc6e2lzb2xhdGVkOidcXHVGQjg0JyxmaW5hbDonXFx1RkI4NSd9LFxuICAvLyBMZXR0ZXIgRERBSEFMXG4gICdcXHUwNjhEJzp7aXNvbGF0ZWQ6J1xcdUZCODInLGZpbmFsOidcXHVGQjgzJ30sXG4gIC8vIExldHRlciBEVUxcbiAgJ1xcdTA2OEUnOntpc29sYXRlZDonXFx1RkI4NicsZmluYWw6J1xcdUZCODcnfSxcbiAgLy8gTGV0dGVyIFJSRUhcbiAgJ1xcdTA2OTEnOntpc29sYXRlZDonXFx1RkI4QycsZmluYWw6J1xcdUZCOEQnfSxcbiAgLy8gTGV0dGVyIEpFSFxuICAnXFx1MDY5OCc6e2lzb2xhdGVkOidcXHVGQjhBJyxmaW5hbDonXFx1RkI4Qid9LFxuICAvLyBMZXR0ZXIgVkVIXG4gICdcXHUwNkE0Jzp7aXNvbGF0ZWQ6J1xcdUZCNkEnLGluaXRpYWw6J1xcdUZCNkMnLG1lZGlhbDonXFx1RkI2RCcsZmluYWw6J1xcdUZCNkInfSxcbiAgLy8gTGV0dGVyIFBFSEVIXG4gICdcXHUwNkE2Jzp7aXNvbGF0ZWQ6J1xcdUZCNkUnLGluaXRpYWw6J1xcdUZCNzAnLG1lZGlhbDonXFx1RkI3MScsZmluYWw6J1xcdUZCNkYnfSxcbiAgLy8gTGV0dGVyIEtFSEVIXG4gICdcXHUwNkE5Jzp7aXNvbGF0ZWQ6J1xcdUZCOEUnLGluaXRpYWw6J1xcdUZCOTAnLG1lZGlhbDonXFx1RkI5MScsZmluYWw6J1xcdUZCOEYnfSxcbiAgLy8gTGV0dGVyIE5HXG4gICdcXHUwNkFEJzp7aXNvbGF0ZWQ6J1xcdUZCRDMnLGluaXRpYWw6J1xcdUZCRDUnLG1lZGlhbDonXFx1RkJENicsZmluYWw6J1xcdUZCRDQnfSxcbiAgLy8gTGV0dGVyIEdBRlxuICAnXFx1MDZBRic6e2lzb2xhdGVkOidcXHVGQjkyJyxpbml0aWFsOidcXHVGQjk0JyxtZWRpYWw6J1xcdUZCOTUnLGZpbmFsOidcXHVGQjkzJ30sXG4gIC8vIExldHRlciBOR09FSFxuICAnXFx1MDZCMSc6e2lzb2xhdGVkOidcXHVGQjlBJyxpbml0aWFsOidcXHVGQjlDJyxtZWRpYWw6J1xcdUZCOUQnLGZpbmFsOidcXHVGQjlCJ30sXG4gIC8vIExldHRlciBHVUVIXG4gICdcXHUwNkIzJzp7aXNvbGF0ZWQ6J1xcdUZCOTYnLGluaXRpYWw6J1xcdUZCOTgnLG1lZGlhbDonXFx1RkI5OScsZmluYWw6J1xcdUZCOTcnfSxcbiAgLy8gTGV0dGVyIE5PT04gR0hVTk5BXG4gICdcXHUwNkJBJzp7aXNvbGF0ZWQ6J1xcdUZCOUUnLGZpbmFsOidcXHVGQjlGJ30sXG4gIC8vIExldHRlciBSTk9PTlxuICAnXFx1MDZCQic6e2lzb2xhdGVkOidcXHVGQkEwJyxpbml0aWFsOidcXHVGQkEyJyxtZWRpYWw6J1xcdUZCQTMnLGZpbmFsOidcXHVGQkExJ30sXG4gIC8vIExldHRlciBIRUggRE9BQ0hBU0hNRUVcbiAgJ1xcdTA2QkUnOntpc29sYXRlZDonXFx1RkJBQScsaW5pdGlhbDonXFx1RkJBQycsbWVkaWFsOidcXHVGQkFEJyxmaW5hbDonXFx1RkJBQid9LFxuICAvLyBMZXR0ZXIgSEVIIFdJVEggWUVIIEFCT1ZFXG4gICdcXHUwNkMwJzp7aXNvbGF0ZWQ6J1xcdUZCQTQnLGZpbmFsOidcXHVGQkE1J30sXG4gIC8vIExldHRlciBIRUggR09BTFxuICAnXFx1MDZDMSc6e2lzb2xhdGVkOidcXHVGQkE2Jyxpbml0aWFsOidcXHVGQkE4JyxtZWRpYWw6J1xcdUZCQTknLGZpbmFsOidcXHVGQkE3J30sXG4gIC8vIExldHRlciBLSVJHSElaIE9FXG4gICdcXHUwNkM1Jzp7aXNvbGF0ZWQ6J1xcdUZCRTAnLGZpbmFsOidcXHVGQkUxJ30sXG4gIC8vIExldHRlciBPRVxuICAnXFx1MDZDNic6e2lzb2xhdGVkOidcXHVGQkQ5JyxmaW5hbDonXFx1RkJEQSd9LFxuICAvLyBMZXR0ZXIgVVxuICAnXFx1MDZDNyc6e2lzb2xhdGVkOidcXHVGQkQ3JyxmaW5hbDonXFx1RkJEOCd9LFxuICAvLyBMZXR0ZXIgWVVcbiAgJ1xcdTA2QzgnOntpc29sYXRlZDonXFx1RkJEQicsZmluYWw6J1xcdUZCREMnfSxcbiAgLy8gTGV0dGVyIEtJUkdISVogWVVcbiAgJ1xcdTA2QzknOntpc29sYXRlZDonXFx1RkJFMicsZmluYWw6J1xcdUZCRTMnfSxcbiAgLy8gTGV0dGVyIFZFXG4gICdcXHUwNkNCJzp7aXNvbGF0ZWQ6J1xcdUZCREUnLGZpbmFsOidcXHVGQkRGJ30sXG4gIC8vIExldHRlciBGQVJTSSBZRUhcbiAgJ1xcdTA2Q0MnOntpc29sYXRlZDonXFx1RkJGQycsaW5pdGlhbDonXFx1RkJGRScsbWVkaWFsOidcXHVGQkZGJyxmaW5hbDonXFx1RkJGRCd9LFxuICAvLyBMZXR0ZXIgRVxuICAnXFx1MDZEMCc6e2lzb2xhdGVkOidcXHVGQkU0Jyxpbml0aWFsOidcXHVGQkU2JyxtZWRpYWw6J1xcdUZCRTcnLGZpbmFsOidcXHVGQkU1J30sXG4gIC8vIExldHRlciBZRUggQkFSUkVFXG4gICdcXHUwNkQyJzp7aXNvbGF0ZWQ6J1xcdUZCQUUnLGZpbmFsOidcXHVGQkFGJ30sXG4gIC8vIExldHRlciBZRUggQkFSUkVFIFdJVEggSEFNWkEgQUJPVkVcbiAgJ1xcdTA2RDMnOntpc29sYXRlZDonXFx1RkJCMCcsZmluYWw6J1xcdUZCQjEnfVxufTtcblxuLy8gYWNjZW50IC8gdm93ZWwgbWFya3NcbmNvbnN0IEhBUkFLQVRfUkUgPSBuZXcgUmVnRXhwKCdbXFx1MDYxMC1cXHUwNjFhXFx1MDY0Yi1cXHUwNjVmXFx1MDY3MFxcdTA2ZDYtXFx1MDZkY1xcdTA2ZGYtXFx1MDZlOFxcdTA2ZWEtXFx1MDZlZFxcdTA4ZDQtXFx1MDhlMVxcdTA4ZDQtXFx1MDhlZFxcdTA4ZTMtXFx1MDhmZl0nKTtcblxuZnVuY3Rpb24gX2Nvbm5lY3RzX3dpdGhfbGV0dGVyX2JlZm9yZShsZXR0ZXIpIHtcbmlmICghTEVUVEVSU1tsZXR0ZXJdKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cbmxldCBmb3JtcyA9IExFVFRFUlNbbGV0dGVyXTtcbnJldHVybiBmb3Jtcy5maW5hbCB8fCBmb3Jtcy5tZWRpYWw7XG59XG5cbmZ1bmN0aW9uIF9jb25uZWN0c193aXRoX2xldHRlcl9hZnRlcihsZXR0ZXIpIHtcbmlmICghTEVUVEVSU1tsZXR0ZXJdKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cbmxldCBmb3JtcyA9IExFVFRFUlNbbGV0dGVyXTtcbnJldHVybiBmb3Jtcy5pbml0aWFsIHx8IGZvcm1zLm1lZGlhbDtcbn1cblxuZnVuY3Rpb24gX2Nvbm5lY3RzX3dpdGhfbGV0dGVyc19iZWZvcmVfYW5kX2FmdGVyKGxldHRlcikge1xuaWYgKCFMRVRURVJTW2xldHRlcl0pIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxubGV0IGZvcm1zID0gTEVUVEVSU1tsZXR0ZXJdO1xucmV0dXJuIGZvcm1zLm1lZGlhbDtcbn1cblxuLyogb3B0aW9uc1xue1xuZGVsZXRlX2hhcmFrYXQ6IGZhbHNlLCAvLyByZW1vdmUgc2hvcnQgdm93ZWwgbWFya3M/XG5saWdhdHVyZXM6IHRydWUgIC8vIGNvbWJpbmUgbXVsdGlwbGUgbGV0dGVycyBpbnRvIGxvbmdlciBsaWdhdHVyZXM/XG59XG4qL1xuXG5mdW5jdGlvbiByZXNoYXBlKHRleHQsIG9wdGlvbnMpIHtcbmlmICghdGV4dCkge1xuICByZXR1cm4gJyc7XG59XG5pZiAoIW9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IHt9O1xufVxubGV0IG91dHB1dCA9IFtdO1xuXG5jb25zdCBMRVRURVIgPSAwXG5jb25zdCBGT1JNID0gMVxuY29uc3QgTk9UX1NVUFBPUlRFRCA9IC0xXG5cbi8vIGhhcmFrYXQgYW5kIGxldHRlcnNcbmxldCBkZWxldGVfaGFyYWthdCA9IG9wdGlvbnMuZGVsZXRlX2hhcmFrYXQgfHwgZmFsc2U7XG5mb3IgKGxldCBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgbGV0IGxldHRlciA9IHRleHRbaV07XG4gIFxuICAvLyBoYW5kbGUgcmVtb3ZpbmcgaGFyYWthdFxuICBpZiAoZGVsZXRlX2hhcmFrYXQgJiYgSEFSQUtBVF9SRS5tYXRjaChsZXR0ZXIpKSB7XG4gICAgb3V0cHV0LnB1c2goWycnLCBOT1RfU1VQUE9SVEVEXSk7XG4gIH1cbiAgXG4gIGlmICghTEVUVEVSU1tsZXR0ZXJdKSB7XG4gICAgLy8gaGFuZGxlIG5vbi1BcmFiaWMgbGV0dGVyXG4gICAgb3V0cHV0LnB1c2goW2xldHRlciwgTk9UX1NVUFBPUlRFRF0pO1xuICB9IGVsc2UgaWYgKCFvdXRwdXQubGVuZ3RoKSB7XG4gICAgLy8gZmlyc3QgQXJhYmljIGxldHRlciAtIGRpc3BsYXkgaXNvbGF0ZWQgZm9ybVxuICAgIG91dHB1dC5wdXNoKFtsZXR0ZXIsICdpc29sYXRlZCddKVxuICB9IGVsc2Uge1xuICAgIGxldCBwcmV2aW91c19vdXRwdXQgPSBvdXRwdXRbb3V0cHV0Lmxlbmd0aCAtIDFdO1xuICAgIGlmIChwcmV2aW91c19vdXRwdXRbRk9STV0gPT09IE5PVF9TVVBQT1JURUQpIHtcbiAgICAgIC8vIG5vdCBBcmFiaWMgYmVmb3JlIHRoaXMgb25lXG4gICAgICBvdXRwdXQucHVzaChbbGV0dGVyLCAnaXNvbGF0ZWQnXSk7XG4gICAgfSBlbHNlIGlmICghKF9jb25uZWN0c193aXRoX2xldHRlcl9iZWZvcmUobGV0dGVyKSkpIHtcbiAgICAgIC8vIHRoaXMgbGV0dGVyIGRvZXNuJ3QgdHJ5IHRvIGNvbm5lY3Qgd2l0aCBwcmV2aW91c1xuICAgICAgb3V0cHV0LnB1c2goW2xldHRlciwgJ2lzb2xhdGVkJ10pO1xuICAgIH0gZWxzZSBpZiAoIShfY29ubmVjdHNfd2l0aF9sZXR0ZXJfYWZ0ZXIocHJldmlvdXNfb3V0cHV0W0xFVFRFUl0pKSkge1xuICAgICAgLy8gcHJldmlvdXMgbGV0dGVyIGRvZXNuJ3QgdHJ5IHRvIGNvbm5lY3QgdG8gbWVcbiAgICAgIG91dHB1dC5wdXNoKFtsZXR0ZXIsICdpc29sYXRlZCddKTtcbiAgICB9IGVsc2UgaWYgKHByZXZpb3VzX291dHB1dFtGT1JNXSA9PT0gJ2ZpbmFsJyAmJiAhX2Nvbm5lY3RzX3dpdGhfbGV0dGVyc19iZWZvcmVfYW5kX2FmdGVyKHByZXZpb3VzX291dHB1dFtMRVRURVJdKSkge1xuICAgICAgLy8gcHJldmlvdXMgbGV0dGVyIHdhcyBmaW5hbCBhbmQgY2Fubm90IGJlIG1lZGlhbCB0byBjb25uZWN0IHRvIG1lXG4gICAgICBvdXRwdXQucHVzaChbbGV0dGVyLCAnaXNvbGF0ZWQnXSk7XG4gICAgfSBlbHNlIGlmIChwcmV2aW91c19vdXRwdXRbRk9STV0gPT0gJ2lzb2xhdGVkJykge1xuICAgICAgLy8gcHJldmlvdXMgbGV0dGVyIHdhcyBhbG9uZSAtIHdlIGNhbiBjaGFuZ2UgaXQgdG8gYmUgaW5pdGlhbCBvZiBteSBwaHJhc2VcbiAgICAgIC8vIGZvciBub3cgdGhpcyBsZXR0ZXIgaXMgdGhlIGZpbmFsIG9mIHRoZSBwaHJhc2VcbiAgICAgIG91dHB1dFtvdXRwdXQubGVuZ3RoIC0gMV1bMV0gPSAnaW5pdGlhbCc7XG4gICAgICBvdXRwdXQucHVzaChbbGV0dGVyLCAnZmluYWwnXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIHByZXZpb3VzIGxldHRlciBjYW4gYmUgY2hhbmdlZCB0byBtZWRpYWxcbiAgICAgIC8vIHRoaXMgb25lIGNhbiBiZSBmaW5hbFxuICAgICAgb3V0cHV0W291dHB1dC5sZW5ndGggLSAxXVsxXSA9ICdtZWRpYWwnO1xuICAgICAgb3V0cHV0LnB1c2goW2xldHRlciwgJ2ZpbmFsJ10pO1xuICAgIH1cbiAgfVxufVxuXG4vLyBsaWdhdHVyZXNcbmlmIChvcHRpb25zLmxpZ2F0dXJlcyAhPT0gZmFsc2UpIHtcbiAgZm9yIChsZXQgeCA9IDA7IHggPCBMSUdBVFVSRVMubGVuZ3RoOyB4KyspIHtcbiAgICBsZXQgbGlnYXR1cmUgPSBMSUdBVFVSRVNbeF07XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBsaWdhdHVyZS5tYXRjaGVzLmxlbmd0aDsgeSsrKSB7XG4gICAgICBsZXQgcGF0dGVybiA9IGxpZ2F0dXJlLm1hdGNoZXNbeV07XG4gICAgICBsZXQgdGV4dEZyYWdtZW50ID0gdGV4dDtcbiAgICAgIGxldCB0ZXh0RnJhZ21lbnRPZmZzZXQgPSAwO1xuICAgICAgd2hpbGUgKHRleHRGcmFnbWVudC5pbmRleE9mKHBhdHRlcm4pID4gLTEpIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIGxpZ2F0dXJlIGZvcm0gdG8gdXNlXG4gICAgICAgIGxldCBhID0gdGV4dEZyYWdtZW50LmluZGV4T2YocGF0dGVybik7XG4gICAgICAgIGxldCBzdGFydF9mb3JtID0gb3V0cHV0W2EgKyB0ZXh0RnJhZ21lbnRPZmZzZXRdW0ZPUk1dO1xuICAgICAgICBsZXQgZW5kX2Zvcm0gPSBvdXRwdXRbYSArIHRleHRGcmFnbWVudE9mZnNldCArIHBhdHRlcm4ubGVuZ3RoIC0gMV1bRk9STV07XG4gICAgICAgIGxldCBsaWdhdHVyZV9mb3JtID0gbnVsbDtcbiAgICAgIFxuICAgICAgICAvKlxuICAgICAgICArLS0tLS0tLS0tLS0rLS0tLS0tLS0tLSstLS0tLS0tLS0rLS0tLS0tLS0tKy0tLS0tLS0tLS0rXG4gICAgICAgIHwgYSAgIFxcICAgYiB8IElTT0xBVEVEIHwgSU5JVElBTCB8IE1FRElBTCAgfCBGSU5BTCAgICB8XG4gICAgICAgICstLS0tLS0tLS0tLSstLS0tLS0tLS0tKy0tLS0tLS0tLSstLS0tLS0tLS0rLS0tLS0tLS0tLStcbiAgICAgICAgfCBJU09MQVRFRCAgfCBJU09MQVRFRCB8IElOSVRJQUwgfCBJTklUSUFMIHwgSVNPTEFURUQgfFxuICAgICAgICB8IElOSVRJQUwgICB8IElTT0xBVEVEIHwgSU5JVElBTCB8IElOSVRJQUwgfCBJU09MQVRFRCB8XG4gICAgICAgIHwgTUVESUFMICAgIHwgRklOQUwgICAgfCBNRURJQUwgIHwgTUVESUFMICB8IEZJTkFMICAgIHxcbiAgICAgICAgfCBGSU5BTCAgICAgfCBGSU5BTCAgICB8IE1FRElBTCAgfCBNRURJQUwgIHwgRklOQUwgICAgfFxuICAgICAgICArLS0tLS0tLS0tLS0rLS0tLS0tLS0tLSstLS0tLS0tLS0rLS0tLS0tLS0tKy0tLS0tLS0tLS0rXG4gICAgICAgICovXG4gICAgICBcbiAgICAgICAgaWYgKHN0YXJ0X2Zvcm0gPT09ICdpc29sYXRlZCcgfHwgc3RhcnRfZm9ybSA9PT0gJ2luaXRpYWwnKSB7XG4gICAgICAgICAgaWYgKGVuZF9mb3JtID09PSAnaXNvbGF0ZWQnIHx8IGVuZF9mb3JtID09PSAnZmluYWwnKSB7XG4gICAgICAgICAgICBsaWdhdHVyZV9mb3JtID0gJ2lzb2xhdGVkJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlnYXR1cmVfZm9ybSA9ICdpbml0aWFsJztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGVuZF9mb3JtID09PSAnaXNvbGF0ZWQnIHx8IGVuZF9mb3JtID09PSAnZmluYWwnKSB7XG4gICAgICAgICAgICBsaWdhdHVyZV9mb3JtID0gJ2ZpbmFsJztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGlnYXR1cmVfZm9ybSA9ICdtZWRpYWwnO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWxpZ2F0dXJlLmZvcm1zW2xpZ2F0dXJlX2Zvcm1dKSB7XG4gICAgICAgICAgLy8gdGhpcyBsaWdhdHVyZSBjYW5ub3QgYmUgYXBwbGllZCBpbiB0aGlzIGxvY2F0aW9uXG4gICAgICAgICAgdGV4dEZyYWdtZW50T2Zmc2V0ICs9IGEgKyAxO1xuICAgICAgICAgIHRleHRGcmFnbWVudCA9IHRleHRGcmFnbWVudC5zdWJzdHJpbmcodGV4dEZyYWdtZW50T2Zmc2V0KTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBvdXRwdXRbYSArIHRleHRGcmFnbWVudE9mZnNldF1bMF0gPSBsaWdhdHVyZS5mb3Jtc1tsaWdhdHVyZV9mb3JtXTtcbiAgICAgICAgb3V0cHV0W2EgKyB0ZXh0RnJhZ21lbnRPZmZzZXRdWzFdID0gTk9UX1NVUFBPUlRFRDtcbiAgICAgICAgZm9yIChsZXQgeiA9IGEgKyB0ZXh0RnJhZ21lbnRPZmZzZXQgKyAxOyB6IDwgYSArIHRleHRGcmFnbWVudE9mZnNldCArIHBhdHRlcm4ubGVuZ3RoOyB6KyspIHtcbiAgICAgICAgICBvdXRwdXRbel0gPSBbJycsIE5PVF9TVVBQT1JURURdO1xuICAgICAgICB9XG4gICAgICAgIHRleHRGcmFnbWVudE9mZnNldCArPSBhICsgMTtcbiAgICAgICAgdGV4dEZyYWdtZW50ID0gdGV4dEZyYWdtZW50LnN1YnN0cmluZyh0ZXh0RnJhZ21lbnRPZmZzZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5yZXR1cm4gb3V0cHV0Lm1hcChmdW5jdGlvbihvKSB7XG4gIGlmIChvW0ZPUk1dID09PSBOT1RfU1VQUE9SVEVEICYmIG9bTEVUVEVSXS5sZW5ndGgpIHtcbiAgICByZXR1cm4gb1tMRVRURVJdO1xuICB9IGVsc2UgaWYgKG9wdGlvbnMuaWdub3JlSXNvbGF0ZXMgJiYgb1tGT1JNXSA9PT0gJ2lzb2xhdGVkJykge1xuICAgIHJldHVybiBvW0xFVFRFUl0gfHwgJyc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIChMRVRURVJTW29bTEVUVEVSXV0gfHwge30pW29bRk9STV1dIHx8ICcnO1xuICB9XG59KS5qb2luKCcnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5MRVRURVJTOiBMRVRURVJTLFxuTElHQVRVUkVTLCBMSUdBVFVSRVMsXG5yZXNoYXBlOiByZXNoYXBlXG59OyIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGRpcmVjdGlvblxuXG52YXIgUlRMID0gJ1xcdTA1OTEtXFx1MDdGRlxcdUZCMUQtXFx1RkRGRFxcdUZFNzAtXFx1RkVGQydcbnZhciBMVFIgPVxuICAnQS1aYS16XFx1MDBDMC1cXHUwMEQ2XFx1MDBEOC1cXHUwMEY2JyArXG4gICdcXHUwMEY4LVxcdTAyQjhcXHUwMzAwLVxcdTA1OTBcXHUwODAwLVxcdTFGRkZcXHUyMDBFXFx1MkMwMC1cXHVGQjFDJyArXG4gICdcXHVGRTAwLVxcdUZFNkZcXHVGRUZELVxcdUZGRkYnXG5cbnZhciBydGwgPSBuZXcgUmVnRXhwKCdeW14nICsgTFRSICsgJ10qWycgKyBSVEwgKyAnXScpXG52YXIgbHRyID0gbmV3IFJlZ0V4cCgnXlteJyArIFJUTCArICddKlsnICsgTFRSICsgJ10nKVxuXG5mdW5jdGlvbiBkaXJlY3Rpb24odmFsdWUpIHtcbiAgdmFsdWUgPSBTdHJpbmcodmFsdWUgfHwgJycpXG5cbiAgaWYgKHJ0bC50ZXN0KHZhbHVlKSkge1xuICAgIHJldHVybiAncnRsJ1xuICB9XG5cbiAgaWYgKGx0ci50ZXN0KHZhbHVlKSkge1xuICAgIHJldHVybiAnbHRyJ1xuICB9XG5cbiAgcmV0dXJuICduZXV0cmFsJ1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgKHN0cikgPT4ge1xuICByZXR1cm4gc3RyLnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJyk7XG59IiwiaW1wb3J0IHsgcmVzaGFwZSB9IGZyb20gJy4vanMtYXJhYmljLXJlc2hhcGVyJztcbmltcG9ydCBkaXJlY3Rpb24gZnJvbSAnZGlyZWN0aW9uJztcbmltcG9ydCByZXZlcnNlIGZyb20gXCIuL3JldmVyc2Utc3RyaW5nXCI7XG5cbmNvbnN0IGlzTFRSID0gKHN0cikgPT4gZGlyZWN0aW9uKHN0cikgPT09ICdsdHInO1xuY29uc3QgaXNSVEwgPSAoc3RyKSA9PiBkaXJlY3Rpb24oc3RyKSA9PT0gJ3J0bCc7XG5jb25zdCBpc05ldXRyYWwgPSAoc3RyKSA9PiBkaXJlY3Rpb24oc3RyKSA9PT0gJ25ldXRyYWwnO1xuXG5jb25zdCBzcGxpdCA9IChzdHIsIHRva2VucykgPT4ge1xuICB2YXIgdGVtcENoYXIgPSB0b2tlbnNbMF07IC8vIFdlIGNhbiB1c2UgdGhlIGZpcnN0IHRva2VuIGFzIGEgdGVtcG9yYXJ5IGpvaW4gY2hhcmFjdGVyXG4gIGZvciAodmFyIGkgPSAxOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKXtcbiAgICAgIHN0ciA9IHN0ci5zcGxpdCh0b2tlbnNbaV0pLmpvaW4odGVtcENoYXIpO1xuICB9XG4gIHN0ciA9IHN0ci5zcGxpdCh0ZW1wQ2hhcik7XG4gIHJldHVybiBzdHI7XG59XG5cbmNvbnN0IHRyYW5zZm9ybSA9IChzdHIsIHtzcGFjZUhhY2sgPSBmYWxzZSwgbGlnYXR1cmVzID0gZmFsc2UsIGlnbm9yZUlzb2xhdGVzID0gdHJ1ZX0gPSB7fSkgPT4ge1xuXG4gIGNvbnN0IG5ldXRyYWwgPSBzdHIuc3BsaXQoJycpLmZpbHRlcihjaGFyID0+IGlzTmV1dHJhbChjaGFyKSk7XG4gIFxuICBsZXQgcmV2ZXJzZWQ7XG5cbiAgLy8gQSBzaW5nbGUgd29yZCwgbm8gbmVlZCB0byBzcGxpdFxuICBpZiAobmV1dHJhbC5sZW5ndGggPT09IDApIHtcbiAgICByZXZlcnNlZCA9IGlzTFRSKHN0cikgPyBzdHIgOiByZXZlcnNlKHN0cik7XG4gIH1cbiAgZWxzZSB7XG4gICAgcmV2ZXJzZWQgPSBzcGxpdChzdHIsIG5ldXRyYWwpLm1hcCh3b3JkID0+IHtcbiAgICAgIGlmIChpc0xUUih3b3JkKSkge1xuICAgICAgICByZXR1cm4gd29yZDtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCByZXNoYXBlZFdvcmQgPSByZXNoYXBlKHdvcmQsIHtsaWdhdHVyZXMsIGlnbm9yZUlzb2xhdGVzfSk7XG4gICAgICAgIGNvbnN0IHJldmVyc2VXb3JkID0gcmV2ZXJzZShyZXNoYXBlZFdvcmQpO1xuICAgICAgICByZXR1cm4gcmV2ZXJzZVdvcmQ7XG4gICAgICB9ICAgICAgXG4gICAgfSk7XG4gIH1cblxuICBsZXQgdHJhbnNmb3JtZWQ7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkocmV2ZXJzZWQpKSB7XG4gICAgY29uc3QgbWVyZ2VkID0gcmV2ZXJzZWQubWFwKCh2LGkpID0+IFt2LCBuZXV0cmFsW2ldXSkucmVkdWNlKChhLGIpID0+IGEuY29uY2F0KGIpKTtcbiAgICB0cmFuc2Zvcm1lZCA9IG1lcmdlZC5yZXZlcnNlKCkuam9pbignJyk7XG4gIH1cbiAgZWxzZSB7XG4gICAgdHJhbnNmb3JtZWQgPSByZXZlcnNlZDtcbiAgfVxuXG4gIGlmIChzcGFjZUhhY2spIHtcbiAgICB0cmFuc2Zvcm1lZCA9IHRyYW5zZm9ybWVkLnNwbGl0KCcnKS5qb2luKCdcXHUyMDBhJyk7XG4gIH1cblxuICByZXR1cm4gdHJhbnNmb3JtZWQ7XG59XG5cbmlmKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudi5ST0xMVVBfV0FUQ0gpIHtcbiAgY29uc3QgdGV4dCA9IFwi2KPZhtinINiv2KfYptmFINin2YTYqtij2YTZgiDYqNin2YTZg9iq2KfYqNipINio2KfZhNi52LHYqNmKIHdpdGggRW5nbGlzaC4g2YjYp9mE2LnYsdio2YrYqSDYo9mK2LbYp21cIjtcbiAgY29uc29sZS5sb2codHJhbnNmb3JtKHRleHQsIHtsaWdhdHVyZXM6IGZhbHNlfSkpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB0cmFuc2Zvcm07IiwiZXhwb3J0IGRlZmF1bHQgKHNlbGVjdGlvbikgPT4ge1xuICBjb25zdCBsZWZ0U2lkZUFycmF5ID0gc2VsZWN0aW9uLnNsaWNlKDAsIE1hdGguZmxvb3Ioc2VsZWN0aW9uLmxlbmd0aCAvIDIpKTtcbiAgY29uc3QgcmlnaHRTaWRlQXJyYXkgPSBzZWxlY3Rpb24uc2xpY2UoTWF0aC5mbG9vcihzZWxlY3Rpb24ubGVuZ3RoIC8gMiksIHNlbGVjdGlvbi5sZW5ndGgpO1xuXG4gIHJldHVybiBgJHt0b1N0cmluZyhsZWZ0U2lkZUFycmF5KX06JHt0b1N0cmluZyhyaWdodFNpZGVBcnJheSl9YDtcbn1cblxuY29uc3QgdG9TdHJpbmcgPSAoYXJyYXkpID0+IGFycmF5LnJlZHVjZSgoYWNjdW11bGF0b3IsIGN1cnJlbnRWYWx1ZSwgaW5kZXgpID0+IHtcbiAgcmV0dXJuIGFjY3VtdWxhdG9yICsgKGN1cnJlbnRWYWx1ZSAqIE1hdGgucG93KDI1NiwgaW5kZXgpKTtcbn0pIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCBub2RlSWRzID0gT2JqZWN0LmtleXMoQXBwLl9zdGF0ZS5taXJyb3Iuc2NlbmVHcmFwaFNlbGVjdGlvbik7XG5cbiAgaWYgKG5vZGVJZHMubGVuZ3RoID09PSAxICYmIG5vZGVJZHNbMF0pIHtcbiAgICByZXR1cm4gd2luZG93LmZpZ21hUGx1Z2luLmdldE5vZGVUeXBlKG5vZGVJZHNbMF0pO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICByZXR1cm4gT2JqZWN0LmtleXMoQXBwLl9zdGF0ZS5taXJyb3Iuc2NlbmVHcmFwaFNlbGVjdGlvbik7XG59IiwiaW1wb3J0IGRlYm91bmNlIGZyb20gXCJsb2Rhc2guZGVib3VuY2VcIjtcblxuaW1wb3J0IHtcbiAgc2VsZWN0aW9uVG9Ob2RlSWQsXG4gIGNyZWF0ZU5vZGVzLFxuICB1bnRpbCxcbiAgZ2V0QWN0aXZlVGFiLFxuICBnZXROb2RlVHlwZSxcbiAgdHJhbnNmb3JtLFxuICBnZXROb2RlVGV4dCxcbiAgZ2V0U2VsZWN0ZWRUeXBlLFxuICBnZXRTZWxlY3RlZE5vZGVzSWRzXG59IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IG5vZGVzVGV4dCA9IGBcbjxkaXYgaWQ9XCJhcmFiaWMtc3VwcG9ydFwiIGNsYXNzPVwicmF3X2NvbXBvbmVudHMtLXBhbmVsLS0zSWNYZyBcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPlxuICAgIDxkaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJyYXdfY29tcG9uZW50cy0tcGFuZWxUaXRsZS0tN01hT3UgcmF3X2NvbXBvbmVudHMtLWJhc2UtLTNUcFpHIHJhd19jb21wb25lbnRzLS1yb3ctLTNkTHhKIGNvbGxhcHNpYmxlX3Byb3BlcnR5X3BhbmVsLS1wYW5lbFRpdGxlLS0xY1pxbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbGxhcHNpYmxlX3Byb3BlcnR5X3BhbmVsLS1wYW5lbFRpdGxlVGV4dC0tM0dBMFVcIj5BcmFiaWMgU3VwcG9ydDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPHNwYW4+PC9zcGFuPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhd19jb21wb25lbnRzLS1yb3ctLTNkTHhKIHR5cGVfcGFuZWwtLXR3b0NvbC0tRmo3cndcIiBzdHlsZT1cImhlaWdodDogYXV0bztcIj48bGFiZWwgY2xhc3M9XCJcIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7ZmxleC1kaXJlY3Rpb246IGNvbHVtbjthbGlnbi1pdGVtczogZmxleC1zdGFydDtqdXN0aWZ5LWNvbnRlbnQ6IHN0cmV0Y2g7d2lkdGg6IDEwMCU7XCI+PHRleHRhcmVhIGRpcj1cInJ0bFwiIGlkPVwiYXJhYmljLXN1cHBvcnQtdGV4dGFyZWFcIiB0eXBlPVwidGV4dFwiIHNwZWxsY2hlY2s9XCJmYWxzZVwiIHZhbHVlPVwiMFwiIHN0eWxlPVwiYmFja2dyb3VuZDogI2ZjZmNmYzt3aWR0aDogMTAwJTtoZWlnaHQ6IDI0cHg7cGFkZGluZzogNHB4O2JveC1zaXppbmc6IGJvcmRlci1ib3g7Ym9yZGVyOiAxcHggc29saWQgI2Q0ZDRkNDtib3JkZXItcmFkaXVzOiAzcHg7aGVpZ2h0OiA4MHB4O21hcmdpbi1ib3R0b206IDhweDtcIj48L3RleHRhcmVhPjwvbGFiZWw+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmF3X2NvbXBvbmVudHMtLXJvdy0tM2RMeEogXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiZW5hYmxlLWxpZ2F0dXJlc1wiIGNsYXNzPVwiIGNoZWNrYm94LS1jaGVja2JveC0tMnViamIgYmFzaWNfZm9ybS0tY2hlY2tib3gtLTNlQ0lnXCI+PGxhYmVsIGZvcj1cImVuYWJsZS1saWdhdHVyZXNcIiBjbGFzcz1cInJhd19jb21wb25lbnRzLS1sYWJlbC0tMzRZbU8gcmF3X2NvbXBvbmVudHMtLWJhc2UtLTNUcFpHIFwiPkVuYWJsZSBMaWdhdHVyZXM8L2xhYmVsPlxuICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1ncm93OiAxO1wiPjwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJyYXdfY29tcG9uZW50cy0taWNvbkJ1dHRvbi0tMVhaNzdcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnYzM1OGE3NWNcIiBkYXRhLXRvb2x0aXAtdGV4dD1cIlNvbWUgZm9udHMgcGFjayBncmVhdCBsaWdhdHVyZXMsIHNvbWUgZG9uJ3RcIj48L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwicmF3X2NvbXBvbmVudHMtLXJvdy0tM2RMeEogXCI+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwiaWdub3JlLWlzb2xhdGVzXCIgY2xhc3M9XCIgY2hlY2tib3gtLWNoZWNrYm94LS0ydWJqYiBiYXNpY19mb3JtLS1jaGVja2JveC0tM2VDSWdcIiBjaGVja2VkPVwiY2hlY2tlZFwiPjxsYWJlbCBmb3I9XCJpZ25vcmUtaXNvbGF0ZXNcIiBjbGFzcz1cInJhd19jb21wb25lbnRzLS1sYWJlbC0tMzRZbU8gcmF3X2NvbXBvbmVudHMtLWJhc2UtLTNUcFpHIFwiPklnbm9yZSBJc29sYXRlczwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1ncm93OiAxO1wiPjwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJyYXdfY29tcG9uZW50cy0taWNvbkJ1dHRvbi0tMVhaNzdcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnYzM1OGE3NWNcIiBkYXRhLXRvb2x0aXAtdGV4dD1cIlNvbWUgZm9udHMgZG9uJ3QgaGF2ZSBwcm9wZXIgaXNvbGF0ZXMgZ2x5cGhzLiBZb3UnbGwgbm90aWNlIHRoaXMgd2hlbiBzb21lIGdseXBocyBkaXNhcHBlYXIgZnJvbSB5b3VyIHRleHQuXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInJhd19jb21wb25lbnRzLS1yb3ctLTNkTHhKIFwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cInNwYWNlci1oYWNrXCIgY2xhc3M9XCIgY2hlY2tib3gtLWNoZWNrYm94LS0ydWJqYiBiYXNpY19mb3JtLS1jaGVja2JveC0tM2VDSWdcIj48bGFiZWwgZm9yPVwic3BhY2VyLWhhY2tcIiBjbGFzcz1cInJhd19jb21wb25lbnRzLS1sYWJlbC0tMzRZbU8gcmF3X2NvbXBvbmVudHMtLWJhc2UtLTNUcFpHIFwiPkVuYWJsZSBTcGFjZXIgSGFjazwvbGFiZWw+XG4gICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxleC1ncm93OiAxO1wiPjwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJyYXdfY29tcG9uZW50cy0taWNvbkJ1dHRvbi0tMVhaNzdcIj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJnYzM1OGE3NWNcIiBkYXRhLXRvb2x0aXAtdGV4dD1cIkZpZ21hIHBhcnRpYWxseSByZXNoYXBlcyBBcmFiaWMgZ2x5cGhzIHdpdGggYW4gdW5leHBlY3RlZCBiZWhhdmlvci4gIFRoaXMgaGFjayB3aWxsIGFkZCBhIHRpbnkgc3BhY2UgYmV0d2VlbiBhbGwgY2hhcmFjdGVycyB0byBwcmV2ZW50IEZpZ21hIGZyb20gcmVzaGFwaW5nLCB5b3UgbmVlZCB0byBkZWNyZWFzZSBjaGFyYWN0ZXIgc3BhY2luZyBieSBhYm91dCAlMiB0byBjb3VudGVyIHRoaXMgaW5jcmVhc2UuXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbjwvZGl2PlxuYDtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJhYmljU3VwcG9ydCB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuaW5qZWN0KCk7XG4gICAgd2luZG93LkFwcC5mcm9tRnVsbHNjcmVlbi5vbihcbiAgICAgIFwic2VsZWN0aW9uOnJlcGxhY2VTZWxlY3RvcnNcIixcbiAgICAgIHRoaXMub25MYXllcnNTZWxlY3RlZC5iaW5kKHRoaXMpXG4gICAgKTtcbiAgICB3aW5kb3cuQXBwLmZyb21GdWxsc2NyZWVuLm9uKFxuICAgICAgXCJzZWxlY3Rpb246YWRkU2VsZWN0b3JzXCIsXG4gICAgICB0aGlzLm9uTGF5ZXJzU2VsZWN0ZWQuYmluZCh0aGlzKVxuICAgICk7XG5cbiAgICBzZXRJbnRlcnZhbCh0aGlzLmluamVjdC5iaW5kKHRoaXMpLCA1MDApO1xuICB9XG5cbiAgZ2V0UGFuZWwoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXJhYmljLXN1cHBvcnRcIik7XG4gIH1cblxuICBnZXRUZXh0YXJlYSgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJhcmFiaWMtc3VwcG9ydC10ZXh0YXJlYVwiKTtcbiAgfVxuXG4gIGdldExpZ2F0dXJlc0NoZWNrYm94KCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVuYWJsZS1saWdhdHVyZXNcIik7XG4gIH1cblxuICBnZXRJc29sYXRlc0NoZWNrYm94KCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlnbm9yZS1pc29sYXRlc1wiKTtcbiAgfVxuXG4gIGdldFNwYWNlckhhY2tDaGVja2JveCgpIHtcbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzcGFjZXItaGFja1wiKTtcbiAgfVxuXG4gIGFzeW5jIGluamVjdCgpIHtcbiAgICBhd2FpdCB1bnRpbChcbiAgICAgICgpID0+IGdldEFjdGl2ZVRhYigpID09PSBcIkRFU0lHTlwiICYmIGdldFNlbGVjdGVkVHlwZSgpID09PSBcIlRFWFRcIlxuICAgICk7XG5cbiAgICBpZiAoIXRoaXMuZ2V0UGFuZWwoKSkge1xuICAgICAgY29uc3Qgbm9kZXMgPSBjcmVhdGVOb2Rlcyhub2Rlc1RleHQpO1xuICAgICAgY29uc3QgdGV4dFBhbmVsID0gW10uc2xpY2VcbiAgICAgICAgLmNhbGwoXG4gICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFxuICAgICAgICAgICAgICBcInByb3BlcnRpZXNfcGFuZWwtLXByb3BlcnRpZXNQYW5lbC0tM1BDdGhcIlxuICAgICAgICAgICAgKVswXVxuICAgICAgICAgICAgLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjYWNoZWRTdWJ0cmVlXCIpXG4gICAgICAgIClcbiAgICAgICAgLmZpbHRlcihwYW5lbCA9PiBwYW5lbC50ZXh0Q29udGVudC5pbmRleE9mKFwiVGV4dFwiKSAhPT0gLTEpWzBdO1xuICAgICAgdGV4dFBhbmVsLmFwcGVuZENoaWxkKG5vZGVzKTtcblxuICAgICAgY29uc3QgdGV4dGFyZWEgPSB0aGlzLmdldFRleHRhcmVhKCk7XG4gICAgICBjb25zdCBsaWdhdHVyZXNDaGVja2JveCA9IHRoaXMuZ2V0TGlnYXR1cmVzQ2hlY2tib3goKTtcbiAgICAgIGNvbnN0IGlzb2xhdGVzQ2hlY2tib3ggPSB0aGlzLmdldElzb2xhdGVzQ2hlY2tib3goKTtcbiAgICAgIGNvbnN0IHNwYWNlckhhY2tDaGVja2JveCA9IHRoaXMuZ2V0U3BhY2VySGFja0NoZWNrYm94KCk7XG4gICAgICBjb25zdCBzZWxlY3RlZE5vZGVJZCA9IGdldFNlbGVjdGVkTm9kZXNJZHMoKVswXTtcbiAgICAgIHRoaXMuc2VsZWN0ZWROb2RlSWQgPSBzZWxlY3RlZE5vZGVJZDtcblxuICAgICAgYXdhaXQgdW50aWwoKCkgPT4gdHlwZW9mIHNlbGVjdGVkTm9kZUlkICE9PSBcInVuZGVmaW5lZFwiKTtcblxuICAgICAgY29uc3Qgc2VsZWN0ZWROb2RlRGF0YSA9IHRoaXMuZ2V0T3JpZ2luYWxEYXRhKCk7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IHNlbGVjdGVkTm9kZURhdGEudGV4dDtcblxuICAgICAgaWYoc2VsZWN0ZWROb2RlRGF0YS5zZXR0aW5ncykge1xuICAgICAgICBsaWdhdHVyZXNDaGVja2JveC5jaGVja2VkID0gc2VsZWN0ZWROb2RlRGF0YS5zZXR0aW5nc1swXTtcbiAgICAgICAgaXNvbGF0ZXNDaGVja2JveC5jaGVja2VkID0gc2VsZWN0ZWROb2RlRGF0YS5zZXR0aW5nc1sxXTtcbiAgICAgICAgc3BhY2VySGFja0NoZWNrYm94LmNoZWNrZWQgPSBzZWxlY3RlZE5vZGVEYXRhLnNldHRpbmdzWzJdO1xuICAgICAgfVxuXG4gICAgICB0ZXh0YXJlYS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICBcImlucHV0XCIsXG4gICAgICAgIGRlYm91bmNlKHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKSwgMTUwKVxuICAgICAgKTtcblxuICAgICAgbGlnYXR1cmVzQ2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgXCJjaGFuZ2VcIixcbiAgICAgICAgZGVib3VuY2UodGhpcy5oYW5kbGVDaGVja2JveC5iaW5kKHRoaXMpLCAxNTApXG4gICAgICApO1xuXG4gICAgICBpc29sYXRlc0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2hhbmdlXCIsXG4gICAgICAgIGRlYm91bmNlKHRoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzKSwgMTUwKVxuICAgICAgKTtcblxuICAgICAgc3BhY2VySGFja0NoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgIFwiY2hhbmdlXCIsXG4gICAgICAgIGRlYm91bmNlKHRoaXMuaGFuZGxlQ2hlY2tib3guYmluZCh0aGlzKSwgMTUwKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBvbkxheWVyc1NlbGVjdGVkKGV2ZW50KSB7XG4gICAgY29uc3QgdWkgPSB0aGlzLmdldFBhbmVsKCk7XG4gICAgY29uc3Qgc2VsZWN0aW9ucyA9IEFycmF5LmZyb20oZXZlbnQuYnVmZmVyKTtcbiAgICBjb25zdCBzY2VuZUdyYXBoU2VsZWN0aW9uID0gT2JqZWN0LmtleXMoXG4gICAgICB3aW5kb3cuQXBwLl9zdGF0ZS5taXJyb3Iuc2NlbmVHcmFwaFNlbGVjdGlvblxuICAgICk7XG5cbiAgICBpZiAoXG4gICAgICB1aSA9PT0gbnVsbCB8fFxuICAgICAgc2VsZWN0aW9ucy5sZW5ndGggIT09IDggfHxcbiAgICAgIHNjZW5lR3JhcGhTZWxlY3Rpb24ubGVuZ3RoID4gMVxuICAgIClcbiAgICAgIHJldHVybjtcblxuICAgIGNvbnN0IHNlbGVjdGVkTm9kZUlkID0gc2VsZWN0aW9uVG9Ob2RlSWQoc2VsZWN0aW9ucyk7XG4gICAgdGhpcy5zZWxlY3RlZE5vZGVJZCA9IHNlbGVjdGVkTm9kZUlkO1xuICAgIGNvbnN0IG5vZGVUeXBlID0gZ2V0Tm9kZVR5cGUoc2VsZWN0ZWROb2RlSWQpO1xuXG4gICAgaWYgKG5vZGVUeXBlID09PSBcIlRFWFRcIikge1xuICAgICAgdWkuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgIGNvbnN0IHRleHRhcmVhID0gdGhpcy5nZXRUZXh0YXJlYSgpO1xuICAgICAgY29uc3QgbGlnYXR1cmVzQ2hlY2tib3ggPSB0aGlzLmdldExpZ2F0dXJlc0NoZWNrYm94KCk7XG4gICAgICBjb25zdCBpc29sYXRlc0NoZWNrYm94ID0gdGhpcy5nZXRJc29sYXRlc0NoZWNrYm94KCk7XG4gICAgICBjb25zdCBzcGFjZXJIYWNrQ2hlY2tib3ggPSB0aGlzLmdldFNwYWNlckhhY2tDaGVja2JveCgpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWROb2RlRGF0YSA9IHRoaXMuZ2V0T3JpZ2luYWxEYXRhKCk7XG4gICAgICB0ZXh0YXJlYS52YWx1ZSA9IHNlbGVjdGVkTm9kZURhdGEudGV4dDtcblxuICAgICAgaWYoc2VsZWN0ZWROb2RlRGF0YS5zZXR0aW5ncykge1xuICAgICAgICBsaWdhdHVyZXNDaGVja2JveC5jaGVja2VkID0gc2VsZWN0ZWROb2RlRGF0YS5zZXR0aW5nc1swXTtcbiAgICAgICAgaXNvbGF0ZXNDaGVja2JveC5jaGVja2VkID0gc2VsZWN0ZWROb2RlRGF0YS5zZXR0aW5nc1sxXTtcbiAgICAgICAgc3BhY2VySGFja0NoZWNrYm94LmNoZWNrZWQgPSBzZWxlY3RlZE5vZGVEYXRhLnNldHRpbmdzWzJdO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB1aS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBjb25zdCB0ZXh0YXJlYSA9IHRoaXMuZ2V0VGV4dGFyZWEoKTtcbiAgICAgIGNvbnN0IGxpZ2F0dXJlc0NoZWNrYm94ID0gdGhpcy5nZXRMaWdhdHVyZXNDaGVja2JveCgpO1xuICAgICAgY29uc3QgaXNvbGF0ZXNDaGVja2JveCA9IHRoaXMuZ2V0SXNvbGF0ZXNDaGVja2JveCgpO1xuICAgICAgY29uc3Qgc3BhY2VySGFja0NoZWNrYm94ID0gdGhpcy5nZXRTcGFjZXJIYWNrQ2hlY2tib3goKTtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gXCJcIjtcbiAgICAgIHRoaXMuc2VsZWN0ZWROb2RlSWQgPSBudWxsO1xuICAgICAgbGlnYXR1cmVzQ2hlY2tib3guY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgaXNvbGF0ZXNDaGVja2JveC5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIHNwYWNlckhhY2tDaGVja2JveC5jaGVja2VkID0gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZ2V0T3JpZ2luYWxEYXRhICgpIHtcbiAgICBjb25zdCBsYXllck5hbWUgPSBBcHAuX3N0YXRlLm1pcnJvci5zY2VuZUdyYXBoLmdldCh0aGlzLnNlbGVjdGVkTm9kZUlkKS5uYW1lO1xuXG4gICAgaWYgKGxheWVyTmFtZS5pbmRleE9mKCc8IS0tQVJTWycpICE9PSAtMSApIHtcbiAgICAgIGNvbnN0IHNldHRpbmdzID0gSlNPTi5wYXJzZShsYXllck5hbWUubWF0Y2goL1xcWyhbXFxzXFxTXSo/KVxcXS8pWzBdKTtcbiAgICAgIGNvbnN0IHRleHQgPSBsYXllck5hbWUucmVwbGFjZSgvPCEtLShbXFxzXFxTXSo/KS0tPi8sIFwiXCIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dCxcbiAgICAgICAgc2V0dGluZ3MsXG4gICAgICB9O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHQ6ICcnLFxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHNhdmVPcmlnaW5hbERhdGEgKHRleHQsIHNldHRpbmdzKSB7XG5cbiAgICBjb25zdCB0ZXh0V2l0aFNldHRpbmdzID0gYDwhLS1BUlNbJHtzZXR0aW5ncy5saWdhdHVyZXN9LCR7c2V0dGluZ3MuaWdub3JlSXNvbGF0ZXN9LCR7c2V0dGluZ3Muc3BhY2VIYWNrfV0tLT4ke3RleHR9YDtcblxuICAgIEFwcC5zZW5kTWVzc2FnZSgnc2V0Tm9kZVByb3BlcnR5Jywge1xuICAgICAgbm9kZUlkOiB0aGlzLnNlbGVjdGVkTm9kZUlkLFxuICAgICAgcHJvcGVydHk6ICduYW1lJyxcbiAgICAgIHZhbHVlOiB0ZXh0V2l0aFNldHRpbmdzXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVJbnB1dChldmVudCkge1xuICAgIHRoaXMudHJhbnNmb3JtVGV4dChldmVudC50YXJnZXQudmFsdWUpO1xuICB9XG5cbiAgaGFuZGxlQ2hlY2tib3goKSB7XG4gICAgY29uc3QgdGV4dCA9IHRoaXMuZ2V0VGV4dGFyZWEoKS52YWx1ZTtcbiAgICB0aGlzLnRyYW5zZm9ybVRleHQodGV4dCk7XG4gIH1cblxuICB0cmFuc2Zvcm1UZXh0KHRleHQpIHtcbiAgICBjb25zdCBzZXR0aW5ncyA9IHtcbiAgICAgIGxpZ2F0dXJlczogdGhpcy5nZXRMaWdhdHVyZXNDaGVja2JveCgpLmNoZWNrZWQsXG4gICAgICBpZ25vcmVJc29sYXRlczogdGhpcy5nZXRJc29sYXRlc0NoZWNrYm94KCkuY2hlY2tlZCxcbiAgICAgIHNwYWNlSGFjazogdGhpcy5nZXRTcGFjZXJIYWNrQ2hlY2tib3goKS5jaGVja2VkLFxuICAgIH1cblxuICAgIHRoaXMuc2F2ZU9yaWdpbmFsRGF0YSh0ZXh0LCBzZXR0aW5ncyk7XG4gICAgY29uc3QgdHJhbnNmb3JtZWRUZXh0ID0gdHJhbnNmb3JtKHRleHQsIHNldHRpbmdzKTtcbiAgICB3aW5kb3cuZmlnbWFQbHVnaW4ucmVwbGFjZVRleHQodHJhbnNmb3JtZWRUZXh0KTtcbiAgICBjb25zdCB0ZXh0YXJlYSA9IHRoaXMuZ2V0VGV4dGFyZWEoKTtcbiAgICB0ZXh0YXJlYS5mb2N1cygpO1xuICB9XG59XG4iLCJpbXBvcnQgQXJhYmljU3VwcG9ydCBmcm9tIFwiLi9hcmFiaWMtc3VwcG9ydC5qc1wiO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHdpbmRvdy5hcmFiaWNTdXBwb3J0ID0gbmV3IEFyYWJpY1N1cHBvcnQoKTtcbiJdLCJuYW1lcyI6WyJnbG9iYWwiLCJPcCIsIk9iamVjdCIsInByb3RvdHlwZSIsImhhc093biIsImhhc093blByb3BlcnR5IiwidW5kZWZpbmVkIiwiJFN5bWJvbCIsIlN5bWJvbCIsIml0ZXJhdG9yU3ltYm9sIiwiaXRlcmF0b3IiLCJhc3luY0l0ZXJhdG9yU3ltYm9sIiwiYXN5bmNJdGVyYXRvciIsInRvU3RyaW5nVGFnU3ltYm9sIiwidG9TdHJpbmdUYWciLCJydW50aW1lIiwicmVnZW5lcmF0b3JSdW50aW1lIiwibW9kdWxlIiwiaW5Nb2R1bGUiLCJleHBvcnRzIiwid3JhcCIsImlubmVyRm4iLCJvdXRlckZuIiwic2VsZiIsInRyeUxvY3NMaXN0IiwicHJvdG9HZW5lcmF0b3IiLCJHZW5lcmF0b3IiLCJnZW5lcmF0b3IiLCJjcmVhdGUiLCJjb250ZXh0IiwiQ29udGV4dCIsIl9pbnZva2UiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJmbiIsIm9iaiIsImFyZyIsInR5cGUiLCJjYWxsIiwiZXJyIiwiR2VuU3RhdGVTdXNwZW5kZWRTdGFydCIsIkdlblN0YXRlU3VzcGVuZGVkWWllbGQiLCJHZW5TdGF0ZUV4ZWN1dGluZyIsIkdlblN0YXRlQ29tcGxldGVkIiwiQ29udGludWVTZW50aW5lbCIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJJdGVyYXRvclByb3RvdHlwZSIsImdldFByb3RvIiwiZ2V0UHJvdG90eXBlT2YiLCJOYXRpdmVJdGVyYXRvclByb3RvdHlwZSIsInZhbHVlcyIsIkdwIiwiY29uc3RydWN0b3IiLCJkaXNwbGF5TmFtZSIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJtZXRob2QiLCJpc0dlbmVyYXRvckZ1bmN0aW9uIiwiZ2VuRnVuIiwiY3RvciIsIm5hbWUiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsIl9fYXdhaXQiLCJBc3luY0l0ZXJhdG9yIiwiaW52b2tlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlY29yZCIsInJlc3VsdCIsInZhbHVlIiwiUHJvbWlzZSIsInRoZW4iLCJ1bndyYXBwZWQiLCJlcnJvciIsInByZXZpb3VzUHJvbWlzZSIsImVucXVldWUiLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsImFzeW5jIiwiaXRlciIsIm5leHQiLCJkb25lIiwic3RhdGUiLCJFcnJvciIsImRvbmVSZXN1bHQiLCJkZWxlZ2F0ZSIsImRlbGVnYXRlUmVzdWx0IiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwicmV0dXJuIiwiVHlwZUVycm9yIiwiaW5mbyIsInJlc3VsdE5hbWUiLCJuZXh0TG9jIiwidG9TdHJpbmciLCJwdXNoVHJ5RW50cnkiLCJsb2NzIiwiZW50cnkiLCJ0cnlMb2MiLCJjYXRjaExvYyIsImZpbmFsbHlMb2MiLCJhZnRlckxvYyIsInRyeUVudHJpZXMiLCJwdXNoIiwicmVzZXRUcnlFbnRyeSIsImNvbXBsZXRpb24iLCJyZXNldCIsImtleXMiLCJvYmplY3QiLCJrZXkiLCJyZXZlcnNlIiwibGVuZ3RoIiwicG9wIiwiaXRlcmFibGUiLCJpdGVyYXRvck1ldGhvZCIsImlzTmFOIiwiaSIsInNraXBUZW1wUmVzZXQiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicm9vdEVudHJ5Iiwicm9vdFJlY29yZCIsInJ2YWwiLCJleGNlcHRpb24iLCJoYW5kbGUiLCJsb2MiLCJjYXVnaHQiLCJoYXNDYXRjaCIsImhhc0ZpbmFsbHkiLCJmaW5hbGx5RW50cnkiLCJjb21wbGV0ZSIsImZpbmlzaCIsInRocm93biIsImRlbGVnYXRlWWllbGQiLCJGdW5jdGlvbiIsImciLCJoYWRSdW50aW1lIiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImluZGV4T2YiLCJvbGRSdW50aW1lIiwicmVxdWlyZSIsImUiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJnZW4iLCJfbmV4dCIsIl90aHJvdyIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJncyIsImFyZ3VtZW50cyIsImFwcGx5IiwiX2NsYXNzQ2FsbENoZWNrIiwiaW5zdGFuY2UiLCJDb25zdHJ1Y3RvciIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwidGFyZ2V0IiwicHJvcHMiLCJkZXNjcmlwdG9yIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwiZGVmaW5lUHJvcGVydHkiLCJfY3JlYXRlQ2xhc3MiLCJwcm90b1Byb3BzIiwic3RhdGljUHJvcHMiLCJGVU5DX0VSUk9SX1RFWFQiLCJOQU4iLCJzeW1ib2xUYWciLCJyZVRyaW0iLCJyZUlzQmFkSGV4IiwicmVJc0JpbmFyeSIsInJlSXNPY3RhbCIsImZyZWVQYXJzZUludCIsInBhcnNlSW50IiwiZnJlZUdsb2JhbCIsImZyZWVTZWxmIiwicm9vdCIsIm9iamVjdFByb3RvIiwib2JqZWN0VG9TdHJpbmciLCJuYXRpdmVNYXgiLCJNYXRoIiwibWF4IiwibmF0aXZlTWluIiwibWluIiwibm93IiwiRGF0ZSIsImRlYm91bmNlIiwiZnVuYyIsIndhaXQiLCJvcHRpb25zIiwibGFzdEFyZ3MiLCJsYXN0VGhpcyIsIm1heFdhaXQiLCJ0aW1lcklkIiwibGFzdENhbGxUaW1lIiwibGFzdEludm9rZVRpbWUiLCJsZWFkaW5nIiwibWF4aW5nIiwidHJhaWxpbmciLCJ0b051bWJlciIsImlzT2JqZWN0IiwiaW52b2tlRnVuYyIsInRpbWUiLCJ0aGlzQXJnIiwibGVhZGluZ0VkZ2UiLCJzZXRUaW1lb3V0IiwidGltZXJFeHBpcmVkIiwicmVtYWluaW5nV2FpdCIsInRpbWVTaW5jZUxhc3RDYWxsIiwidGltZVNpbmNlTGFzdEludm9rZSIsInNob3VsZEludm9rZSIsInRyYWlsaW5nRWRnZSIsImNhbmNlbCIsImNsZWFyVGltZW91dCIsImZsdXNoIiwiZGVib3VuY2VkIiwiaXNJbnZva2luZyIsImlzT2JqZWN0TGlrZSIsImlzU3ltYm9sIiwib3RoZXIiLCJ2YWx1ZU9mIiwicmVwbGFjZSIsImlzQmluYXJ5IiwidGVzdCIsImh0bWxTdHJpbmciLCJkb2N1bWVudCIsImNyZWF0ZVJhbmdlIiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY29uZGl0aW9uRnVuY3Rpb24iLCJwb2xsIiwiZ2V0QWN0aXZlVGFiIiwidGFiIiwicXVlcnlTZWxlY3RvciIsInRleHRDb250ZW50Iiwibm9kZUlkIiwid2luZG93IiwiZmlnbWFQbHVnaW4iLCJnZXROb2RlVHlwZSIsIkxJR0FUVVJFUyIsIm1hdGNoZXMiLCJmb3JtcyIsImlzb2xhdGVkIiwiZmluYWwiLCJpbml0aWFsIiwibWVkaWFsIiwiaW5pdGFsIiwiTEVUVEVSUyIsIkhBUkFLQVRfUkUiLCJSZWdFeHAiLCJfY29ubmVjdHNfd2l0aF9sZXR0ZXJfYmVmb3JlIiwibGV0dGVyIiwiX2Nvbm5lY3RzX3dpdGhfbGV0dGVyX2FmdGVyIiwiX2Nvbm5lY3RzX3dpdGhfbGV0dGVyc19iZWZvcmVfYW5kX2FmdGVyIiwicmVzaGFwZSIsInRleHQiLCJvdXRwdXQiLCJMRVRURVIiLCJGT1JNIiwiTk9UX1NVUFBPUlRFRCIsImRlbGV0ZV9oYXJha2F0IiwibWF0Y2giLCJwcmV2aW91c19vdXRwdXQiLCJsaWdhdHVyZXMiLCJ4IiwibGlnYXR1cmUiLCJ5IiwicGF0dGVybiIsInRleHRGcmFnbWVudCIsInRleHRGcmFnbWVudE9mZnNldCIsImEiLCJzdGFydF9mb3JtIiwiZW5kX2Zvcm0iLCJsaWdhdHVyZV9mb3JtIiwic3Vic3RyaW5nIiwieiIsIm1hcCIsIm8iLCJpZ25vcmVJc29sYXRlcyIsImpvaW4iLCJkaXJlY3Rpb24iLCJSVEwiLCJMVFIiLCJydGwiLCJsdHIiLCJTdHJpbmciLCJzdHIiLCJzcGxpdCIsImlzTFRSIiwiaXNOZXV0cmFsIiwidG9rZW5zIiwidGVtcENoYXIiLCJ0cmFuc2Zvcm0iLCJzcGFjZUhhY2siLCJuZXV0cmFsIiwiZmlsdGVyIiwiY2hhciIsInJldmVyc2VkIiwid29yZCIsInJlc2hhcGVkV29yZCIsInJldmVyc2VXb3JkIiwidHJhbnNmb3JtZWQiLCJBcnJheSIsImlzQXJyYXkiLCJtZXJnZWQiLCJ2IiwicmVkdWNlIiwiYiIsImNvbmNhdCIsInByb2Nlc3MiLCJlbnYiLCJST0xMVVBfV0FUQ0giLCJjb25zb2xlIiwibG9nIiwic2VsZWN0aW9uIiwibGVmdFNpZGVBcnJheSIsImZsb29yIiwicmlnaHRTaWRlQXJyYXkiLCJhcnJheSIsImFjY3VtdWxhdG9yIiwiY3VycmVudFZhbHVlIiwiaW5kZXgiLCJwb3ciLCJub2RlSWRzIiwiQXBwIiwiX3N0YXRlIiwibWlycm9yIiwic2NlbmVHcmFwaFNlbGVjdGlvbiIsIm5vZGVzVGV4dCIsIkFyYWJpY1N1cHBvcnQiLCJpbmplY3QiLCJmcm9tRnVsbHNjcmVlbiIsIm9uIiwib25MYXllcnNTZWxlY3RlZCIsImJpbmQiLCJzZXRJbnRlcnZhbCIsImdldEVsZW1lbnRCeUlkIiwidW50aWwiLCJnZXRTZWxlY3RlZFR5cGUiLCJnZXRQYW5lbCIsIm5vZGVzIiwiY3JlYXRlTm9kZXMiLCJ0ZXh0UGFuZWwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwicGFuZWwiLCJhcHBlbmRDaGlsZCIsInRleHRhcmVhIiwiZ2V0VGV4dGFyZWEiLCJsaWdhdHVyZXNDaGVja2JveCIsImdldExpZ2F0dXJlc0NoZWNrYm94IiwiaXNvbGF0ZXNDaGVja2JveCIsImdldElzb2xhdGVzQ2hlY2tib3giLCJzcGFjZXJIYWNrQ2hlY2tib3giLCJnZXRTcGFjZXJIYWNrQ2hlY2tib3giLCJzZWxlY3RlZE5vZGVJZCIsImdldFNlbGVjdGVkTm9kZXNJZHMiLCJzZWxlY3RlZE5vZGVEYXRhIiwiZ2V0T3JpZ2luYWxEYXRhIiwic2V0dGluZ3MiLCJjaGVja2VkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUlucHV0IiwiaGFuZGxlQ2hlY2tib3giLCJldmVudCIsInVpIiwic2VsZWN0aW9ucyIsImZyb20iLCJidWZmZXIiLCJzZWxlY3Rpb25Ub05vZGVJZCIsIm5vZGVUeXBlIiwic3R5bGUiLCJkaXNwbGF5IiwibGF5ZXJOYW1lIiwic2NlbmVHcmFwaCIsImdldCIsIkpTT04iLCJwYXJzZSIsInRleHRXaXRoU2V0dGluZ3MiLCJzZW5kTWVzc2FnZSIsInByb3BlcnR5IiwidHJhbnNmb3JtVGV4dCIsInNhdmVPcmlnaW5hbERhdGEiLCJ0cmFuc2Zvcm1lZFRleHQiLCJyZXBsYWNlVGV4dCIsImZvY3VzIiwiYXJhYmljU3VwcG9ydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztDQUFBOzs7Ozs7Q0FPQSxDQUFFLFVBQVNBLE1BQVQsRUFBaUI7O09BR2JDLEVBQUUsR0FBR0MsTUFBTSxDQUFDQyxTQUFoQjtPQUNJQyxNQUFNLEdBQUdILEVBQUUsQ0FBQ0ksY0FBaEI7T0FDSUMsU0FBSixDQUxpQjs7T0FNYkMsT0FBTyxHQUFHLE9BQU9DLE1BQVAsS0FBa0IsVUFBbEIsR0FBK0JBLE1BQS9CLEdBQXdDLEVBQXREO09BQ0lDLGNBQWMsR0FBR0YsT0FBTyxDQUFDRyxRQUFSLElBQW9CLFlBQXpDO09BQ0lDLG1CQUFtQixHQUFHSixPQUFPLENBQUNLLGFBQVIsSUFBeUIsaUJBQW5EO09BQ0lDLGlCQUFpQixHQUFHTixPQUFPLENBQUNPLFdBQVIsSUFBdUIsZUFBL0M7T0FHSUMsT0FBTyxHQUFHZixNQUFNLENBQUNnQixrQkFBckI7O09BQ0lELE9BQUosRUFBYTtLQUNHOzs7T0FHWkUsY0FBQSxHQUFpQkYsT0FBakI7TUFKUzs7Ozs7SUFiSTs7OztHQTBCakJBLE9BQU8sR0FBR2YsTUFBTSxDQUFDZ0Isa0JBQVAsR0FBNEJFLEFBQVdELE1BQU0sQ0FBQ0UsT0FBVixBQUE5Qzs7WUFFU0MsSUFBVCxDQUFjQyxPQUFkLEVBQXVCQyxPQUF2QixFQUFnQ0MsSUFBaEMsRUFBc0NDLFdBQXRDLEVBQW1EOztTQUU3Q0MsY0FBYyxHQUFHSCxPQUFPLElBQUlBLE9BQU8sQ0FBQ25CLFNBQVIsWUFBNkJ1QixTQUF4QyxHQUFvREosT0FBcEQsR0FBOERJLFNBQW5GO1NBQ0lDLFNBQVMsR0FBR3pCLE1BQU0sQ0FBQzBCLE1BQVAsQ0FBY0gsY0FBYyxDQUFDdEIsU0FBN0IsQ0FBaEI7U0FDSTBCLE9BQU8sR0FBRyxJQUFJQyxPQUFKLENBQVlOLFdBQVcsSUFBSSxFQUEzQixDQUFkLENBSmlEOzs7S0FRakRHLFNBQVMsQ0FBQ0ksT0FBVixHQUFvQkMsZ0JBQWdCLENBQUNYLE9BQUQsRUFBVUUsSUFBVixFQUFnQk0sT0FBaEIsQ0FBcEM7WUFFT0YsU0FBUDs7O0dBRUZaLE9BQU8sQ0FBQ0ssSUFBUixHQUFlQSxJQUFmLENBeENpQjs7Ozs7Ozs7Ozs7WUFvRFJhLFFBQVQsQ0FBa0JDLEVBQWxCLEVBQXNCQyxHQUF0QixFQUEyQkMsR0FBM0IsRUFBZ0M7U0FDMUI7Y0FDSztTQUFFQyxJQUFJLEVBQUUsUUFBUjtTQUFrQkQsR0FBRyxFQUFFRixFQUFFLENBQUNJLElBQUgsQ0FBUUgsR0FBUixFQUFhQyxHQUFiO1FBQTlCO01BREYsQ0FFRSxPQUFPRyxHQUFQLEVBQVk7Y0FDTDtTQUFFRixJQUFJLEVBQUUsT0FBUjtTQUFpQkQsR0FBRyxFQUFFRztRQUE3Qjs7OztPQUlBQyxzQkFBc0IsR0FBRyxnQkFBN0I7T0FDSUMsc0JBQXNCLEdBQUcsZ0JBQTdCO09BQ0lDLGlCQUFpQixHQUFHLFdBQXhCO09BQ0lDLGlCQUFpQixHQUFHLFdBQXhCLENBL0RpQjs7O09BbUViQyxnQkFBZ0IsR0FBRyxFQUF2QixDQW5FaUI7Ozs7O1lBeUVSbEIsU0FBVCxHQUFxQjs7WUFDWm1CLGlCQUFULEdBQTZCOztZQUNwQkMsMEJBQVQsR0FBc0MsRUEzRXJCOzs7O09BK0ViQyxpQkFBaUIsR0FBRyxFQUF4Qjs7R0FDQUEsaUJBQWlCLENBQUN0QyxjQUFELENBQWpCLEdBQW9DLFlBQVk7WUFDdkMsSUFBUDtJQURGOztPQUlJdUMsUUFBUSxHQUFHOUMsTUFBTSxDQUFDK0MsY0FBdEI7T0FDSUMsdUJBQXVCLEdBQUdGLFFBQVEsSUFBSUEsUUFBUSxDQUFDQSxRQUFRLENBQUNHLE1BQU0sQ0FBQyxFQUFELENBQVAsQ0FBVCxDQUFsRDs7T0FDSUQsdUJBQXVCLElBQ3ZCQSx1QkFBdUIsS0FBS2pELEVBRDVCLElBRUFHLE1BQU0sQ0FBQ2tDLElBQVAsQ0FBWVksdUJBQVosRUFBcUN6QyxjQUFyQyxDQUZKLEVBRTBEOzs7S0FHeERzQyxpQkFBaUIsR0FBR0csdUJBQXBCOzs7T0FHRUUsRUFBRSxHQUFHTiwwQkFBMEIsQ0FBQzNDLFNBQTNCLEdBQ1B1QixTQUFTLENBQUN2QixTQUFWLEdBQXNCRCxNQUFNLENBQUMwQixNQUFQLENBQWNtQixpQkFBZCxDQUR4QjtHQUVBRixpQkFBaUIsQ0FBQzFDLFNBQWxCLEdBQThCaUQsRUFBRSxDQUFDQyxXQUFILEdBQWlCUCwwQkFBL0M7R0FDQUEsMEJBQTBCLENBQUNPLFdBQTNCLEdBQXlDUixpQkFBekM7R0FDQUMsMEJBQTBCLENBQUNqQyxpQkFBRCxDQUExQixHQUNFZ0MsaUJBQWlCLENBQUNTLFdBQWxCLEdBQWdDLG1CQURsQyxDQWxHaUI7OztZQXVHUkMscUJBQVQsQ0FBK0JwRCxTQUEvQixFQUEwQztNQUN2QyxNQUFELEVBQVMsT0FBVCxFQUFrQixRQUFsQixFQUE0QnFELE9BQTVCLENBQW9DLFVBQVNDLE1BQVQsRUFBaUI7T0FDbkR0RCxTQUFTLENBQUNzRCxNQUFELENBQVQsR0FBb0IsVUFBU3JCLEdBQVQsRUFBYztnQkFDekIsS0FBS0wsT0FBTCxDQUFhMEIsTUFBYixFQUFxQnJCLEdBQXJCLENBQVA7UUFERjtNQURGOzs7R0FPRnJCLE9BQU8sQ0FBQzJDLG1CQUFSLEdBQThCLFVBQVNDLE1BQVQsRUFBaUI7U0FDekNDLElBQUksR0FBRyxPQUFPRCxNQUFQLEtBQWtCLFVBQWxCLElBQWdDQSxNQUFNLENBQUNOLFdBQWxEO1lBQ09PLElBQUksR0FDUEEsSUFBSSxLQUFLZixpQkFBVDs7TUFHQ2UsSUFBSSxDQUFDTixXQUFMLElBQW9CTSxJQUFJLENBQUNDLElBQTFCLE1BQW9DLG1CQUo3QixHQUtQLEtBTEo7SUFGRjs7R0FVQTlDLE9BQU8sQ0FBQytDLElBQVIsR0FBZSxVQUFTSCxNQUFULEVBQWlCO1NBQzFCekQsTUFBTSxDQUFDNkQsY0FBWCxFQUEyQjtPQUN6QjdELE1BQU0sQ0FBQzZELGNBQVAsQ0FBc0JKLE1BQXRCLEVBQThCYiwwQkFBOUI7TUFERixNQUVPO09BQ0xhLE1BQU0sQ0FBQ0ssU0FBUCxHQUFtQmxCLDBCQUFuQjs7V0FDSSxFQUFFakMsaUJBQWlCLElBQUk4QyxNQUF2QixDQUFKLEVBQW9DO1NBQ2xDQSxNQUFNLENBQUM5QyxpQkFBRCxDQUFOLEdBQTRCLG1CQUE1Qjs7OztLQUdKOEMsTUFBTSxDQUFDeEQsU0FBUCxHQUFtQkQsTUFBTSxDQUFDMEIsTUFBUCxDQUFjd0IsRUFBZCxDQUFuQjtZQUNPTyxNQUFQO0lBVkYsQ0F6SGlCOzs7Ozs7R0EwSWpCNUMsT0FBTyxDQUFDa0QsS0FBUixHQUFnQixVQUFTN0IsR0FBVCxFQUFjO1lBQ3JCO09BQUU4QixPQUFPLEVBQUU5QjtNQUFsQjtJQURGOztZQUlTK0IsYUFBVCxDQUF1QnhDLFNBQXZCLEVBQWtDO2NBQ3ZCeUMsTUFBVCxDQUFnQlgsTUFBaEIsRUFBd0JyQixHQUF4QixFQUE2QmlDLE9BQTdCLEVBQXNDQyxNQUF0QyxFQUE4QztXQUN4Q0MsTUFBTSxHQUFHdEMsUUFBUSxDQUFDTixTQUFTLENBQUM4QixNQUFELENBQVYsRUFBb0I5QixTQUFwQixFQUErQlMsR0FBL0IsQ0FBckI7O1dBQ0ltQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLE9BQXBCLEVBQTZCO1NBQzNCaUMsTUFBTSxDQUFDQyxNQUFNLENBQUNuQyxHQUFSLENBQU47UUFERixNQUVPO2FBQ0RvQyxNQUFNLEdBQUdELE1BQU0sQ0FBQ25DLEdBQXBCO2FBQ0lxQyxLQUFLLEdBQUdELE1BQU0sQ0FBQ0MsS0FBbkI7O2FBQ0lBLEtBQUssSUFDTCxPQUFPQSxLQUFQLEtBQWlCLFFBRGpCLElBRUFyRSxNQUFNLENBQUNrQyxJQUFQLENBQVltQyxLQUFaLEVBQW1CLFNBQW5CLENBRkosRUFFbUM7a0JBQzFCQyxPQUFPLENBQUNMLE9BQVIsQ0FBZ0JJLEtBQUssQ0FBQ1AsT0FBdEIsRUFBK0JTLElBQS9CLENBQW9DLFVBQVNGLEtBQVQsRUFBZ0I7YUFDekRMLE1BQU0sQ0FBQyxNQUFELEVBQVNLLEtBQVQsRUFBZ0JKLE9BQWhCLEVBQXlCQyxNQUF6QixDQUFOO1lBREssRUFFSixVQUFTL0IsR0FBVCxFQUFjO2FBQ2Y2QixNQUFNLENBQUMsT0FBRCxFQUFVN0IsR0FBVixFQUFlOEIsT0FBZixFQUF3QkMsTUFBeEIsQ0FBTjtZQUhLLENBQVA7OztnQkFPS0ksT0FBTyxDQUFDTCxPQUFSLENBQWdCSSxLQUFoQixFQUF1QkUsSUFBdkIsQ0FBNEIsVUFBU0MsU0FBVCxFQUFvQjs7OztXQUlyREosTUFBTSxDQUFDQyxLQUFQLEdBQWVHLFNBQWY7V0FDQVAsT0FBTyxDQUFDRyxNQUFELENBQVA7VUFMSyxFQU1KLFVBQVNLLEtBQVQsRUFBZ0I7OztrQkFHVlQsTUFBTSxDQUFDLE9BQUQsRUFBVVMsS0FBVixFQUFpQlIsT0FBakIsRUFBMEJDLE1BQTFCLENBQWI7VUFUSyxDQUFQOzs7O1NBY0FRLGVBQUo7O2NBRVNDLE9BQVQsQ0FBaUJ0QixNQUFqQixFQUF5QnJCLEdBQXpCLEVBQThCO2dCQUNuQjRDLDBCQUFULEdBQXNDO2dCQUM3QixJQUFJTixPQUFKLENBQVksVUFBU0wsT0FBVCxFQUFrQkMsTUFBbEIsRUFBMEI7V0FDM0NGLE1BQU0sQ0FBQ1gsTUFBRCxFQUFTckIsR0FBVCxFQUFjaUMsT0FBZCxFQUF1QkMsTUFBdkIsQ0FBTjtVQURLLENBQVA7OztjQUtLUSxlQUFlOzs7Ozs7Ozs7Ozs7T0FhcEJBLGVBQWUsR0FBR0EsZUFBZSxDQUFDSCxJQUFoQixDQUNoQkssMEJBRGdCOztPQUloQkEsMEJBSmdCLENBQUgsR0FLWEEsMEJBQTBCLEVBbEJoQztNQXpDOEI7Ozs7VUFnRTNCakQsT0FBTCxHQUFlZ0QsT0FBZjs7O0dBR0Z4QixxQkFBcUIsQ0FBQ1ksYUFBYSxDQUFDaEUsU0FBZixDQUFyQjs7R0FDQWdFLGFBQWEsQ0FBQ2hFLFNBQWQsQ0FBd0JRLG1CQUF4QixJQUErQyxZQUFZO1lBQ2xELElBQVA7SUFERjs7R0FHQUksT0FBTyxDQUFDb0QsYUFBUixHQUF3QkEsYUFBeEIsQ0FyTmlCOzs7O0dBME5qQnBELE9BQU8sQ0FBQ2tFLEtBQVIsR0FBZ0IsVUFBUzVELE9BQVQsRUFBa0JDLE9BQWxCLEVBQTJCQyxJQUEzQixFQUFpQ0MsV0FBakMsRUFBOEM7U0FDeEQwRCxJQUFJLEdBQUcsSUFBSWYsYUFBSixDQUNUL0MsSUFBSSxDQUFDQyxPQUFELEVBQVVDLE9BQVYsRUFBbUJDLElBQW5CLEVBQXlCQyxXQUF6QixDQURLLENBQVg7WUFJT1QsT0FBTyxDQUFDMkMsbUJBQVIsQ0FBNEJwQyxPQUE1QixJQUNINEQsSUFERztPQUVIQSxJQUFJLENBQUNDLElBQUwsR0FBWVIsSUFBWixDQUFpQixVQUFTSCxNQUFULEVBQWlCO2NBQ3pCQSxNQUFNLENBQUNZLElBQVAsR0FBY1osTUFBTSxDQUFDQyxLQUFyQixHQUE2QlMsSUFBSSxDQUFDQyxJQUFMLEVBQXBDO01BREYsQ0FGSjtJQUxGOztZQVlTbkQsZ0JBQVQsQ0FBMEJYLE9BQTFCLEVBQW1DRSxJQUFuQyxFQUF5Q00sT0FBekMsRUFBa0Q7U0FDNUN3RCxLQUFLLEdBQUc3QyxzQkFBWjtZQUVPLFNBQVM0QixNQUFULENBQWdCWCxNQUFoQixFQUF3QnJCLEdBQXhCLEVBQTZCO1dBQzlCaUQsS0FBSyxLQUFLM0MsaUJBQWQsRUFBaUM7ZUFDekIsSUFBSTRDLEtBQUosQ0FBVSw4QkFBVixDQUFOOzs7V0FHRUQsS0FBSyxLQUFLMUMsaUJBQWQsRUFBaUM7YUFDM0JjLE1BQU0sS0FBSyxPQUFmLEVBQXdCO2lCQUNoQnJCLEdBQU47VUFGNkI7Ozs7Z0JBT3hCbUQsVUFBVSxFQUFqQjs7O09BR0YxRCxPQUFPLENBQUM0QixNQUFSLEdBQWlCQSxNQUFqQjtPQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWNBLEdBQWQ7O2NBRU8sSUFBUCxFQUFhO2FBQ1BvRCxRQUFRLEdBQUczRCxPQUFPLENBQUMyRCxRQUF2Qjs7YUFDSUEsUUFBSixFQUFjO2VBQ1JDLGNBQWMsR0FBR0MsbUJBQW1CLENBQUNGLFFBQUQsRUFBVzNELE9BQVgsQ0FBeEM7O2VBQ0k0RCxjQUFKLEVBQW9CO2lCQUNkQSxjQUFjLEtBQUs3QyxnQkFBdkIsRUFBeUM7b0JBQ2xDNkMsY0FBUDs7OzthQUlBNUQsT0FBTyxDQUFDNEIsTUFBUixLQUFtQixNQUF2QixFQUErQjs7O1dBRzdCNUIsT0FBTyxDQUFDOEQsSUFBUixHQUFlOUQsT0FBTyxDQUFDK0QsS0FBUixHQUFnQi9ELE9BQU8sQ0FBQ08sR0FBdkM7VUFIRixNQUtPLElBQUlQLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7ZUFDakM0QixLQUFLLEtBQUs3QyxzQkFBZCxFQUFzQzthQUNwQzZDLEtBQUssR0FBRzFDLGlCQUFSO21CQUNNZCxPQUFPLENBQUNPLEdBQWQ7OztXQUdGUCxPQUFPLENBQUNnRSxpQkFBUixDQUEwQmhFLE9BQU8sQ0FBQ08sR0FBbEM7VUFOSyxNQVFBLElBQUlQLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsUUFBdkIsRUFBaUM7V0FDdEM1QixPQUFPLENBQUNpRSxNQUFSLENBQWUsUUFBZixFQUF5QmpFLE9BQU8sQ0FBQ08sR0FBakM7OztTQUdGaUQsS0FBSyxHQUFHM0MsaUJBQVI7YUFFSTZCLE1BQU0sR0FBR3RDLFFBQVEsQ0FBQ1osT0FBRCxFQUFVRSxJQUFWLEVBQWdCTSxPQUFoQixDQUFyQjs7YUFDSTBDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsUUFBcEIsRUFBOEI7OztXQUc1QmdELEtBQUssR0FBR3hELE9BQU8sQ0FBQ3VELElBQVIsR0FDSnpDLGlCQURJLEdBRUpGLHNCQUZKOztlQUlJOEIsTUFBTSxDQUFDbkMsR0FBUCxLQUFlUSxnQkFBbkIsRUFBcUM7Ozs7a0JBSTlCO2FBQ0w2QixLQUFLLEVBQUVGLE1BQU0sQ0FBQ25DLEdBRFQ7YUFFTGdELElBQUksRUFBRXZELE9BQU8sQ0FBQ3VEO1lBRmhCO1VBWEYsTUFnQk8sSUFBSWIsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFwQixFQUE2QjtXQUNsQ2dELEtBQUssR0FBRzFDLGlCQUFSLENBRGtDOzs7V0FJbENkLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7V0FDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjbUMsTUFBTSxDQUFDbkMsR0FBckI7OztNQXJFTjtJQXpPZTs7Ozs7O1lBd1RSc0QsbUJBQVQsQ0FBNkJGLFFBQTdCLEVBQXVDM0QsT0FBdkMsRUFBZ0Q7U0FDMUM0QixNQUFNLEdBQUcrQixRQUFRLENBQUM5RSxRQUFULENBQWtCbUIsT0FBTyxDQUFDNEIsTUFBMUIsQ0FBYjs7U0FDSUEsTUFBTSxLQUFLbkQsU0FBZixFQUEwQjs7O09BR3hCdUIsT0FBTyxDQUFDMkQsUUFBUixHQUFtQixJQUFuQjs7V0FFSTNELE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7YUFDMUIrQixRQUFRLENBQUM5RSxRQUFULENBQWtCcUYsTUFBdEIsRUFBOEI7OztXQUc1QmxFLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsUUFBakI7V0FDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjOUIsU0FBZDtXQUNBb0YsbUJBQW1CLENBQUNGLFFBQUQsRUFBVzNELE9BQVgsQ0FBbkI7O2VBRUlBLE9BQU8sQ0FBQzRCLE1BQVIsS0FBbUIsT0FBdkIsRUFBZ0M7OztvQkFHdkJiLGdCQUFQOzs7O1NBSUpmLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7U0FDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjLElBQUk0RCxTQUFKLENBQ1osZ0RBRFksQ0FBZDs7O2NBSUtwRCxnQkFBUDs7O1NBR0UyQixNQUFNLEdBQUd0QyxRQUFRLENBQUN3QixNQUFELEVBQVMrQixRQUFRLENBQUM5RSxRQUFsQixFQUE0Qm1CLE9BQU8sQ0FBQ08sR0FBcEMsQ0FBckI7O1NBRUltQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLE9BQXBCLEVBQTZCO09BQzNCUixPQUFPLENBQUM0QixNQUFSLEdBQWlCLE9BQWpCO09BQ0E1QixPQUFPLENBQUNPLEdBQVIsR0FBY21DLE1BQU0sQ0FBQ25DLEdBQXJCO09BQ0FQLE9BQU8sQ0FBQzJELFFBQVIsR0FBbUIsSUFBbkI7Y0FDTzVDLGdCQUFQOzs7U0FHRXFELElBQUksR0FBRzFCLE1BQU0sQ0FBQ25DLEdBQWxCOztTQUVJLENBQUU2RCxJQUFOLEVBQVk7T0FDVnBFLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsT0FBakI7T0FDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjLElBQUk0RCxTQUFKLENBQWMsa0NBQWQsQ0FBZDtPQUNBbkUsT0FBTyxDQUFDMkQsUUFBUixHQUFtQixJQUFuQjtjQUNPNUMsZ0JBQVA7OztTQUdFcUQsSUFBSSxDQUFDYixJQUFULEVBQWU7OztPQUdidkQsT0FBTyxDQUFDMkQsUUFBUSxDQUFDVSxVQUFWLENBQVAsR0FBK0JELElBQUksQ0FBQ3hCLEtBQXBDLENBSGE7O09BTWI1QyxPQUFPLENBQUNzRCxJQUFSLEdBQWVLLFFBQVEsQ0FBQ1csT0FBeEIsQ0FOYTs7Ozs7OztXQWNUdEUsT0FBTyxDQUFDNEIsTUFBUixLQUFtQixRQUF2QixFQUFpQztTQUMvQjVCLE9BQU8sQ0FBQzRCLE1BQVIsR0FBaUIsTUFBakI7U0FDQTVCLE9BQU8sQ0FBQ08sR0FBUixHQUFjOUIsU0FBZDs7TUFoQkosTUFtQk87O2NBRUUyRixJQUFQO01BckU0Qzs7OztLQTBFOUNwRSxPQUFPLENBQUMyRCxRQUFSLEdBQW1CLElBQW5CO1lBQ081QyxnQkFBUDtJQW5ZZTs7OztHQXdZakJXLHFCQUFxQixDQUFDSCxFQUFELENBQXJCO0dBRUFBLEVBQUUsQ0FBQ3ZDLGlCQUFELENBQUYsR0FBd0IsV0FBeEIsQ0ExWWlCOzs7Ozs7R0FpWmpCdUMsRUFBRSxDQUFDM0MsY0FBRCxDQUFGLEdBQXFCLFlBQVc7WUFDdkIsSUFBUDtJQURGOztHQUlBMkMsRUFBRSxDQUFDZ0QsUUFBSCxHQUFjLFlBQVc7WUFDaEIsb0JBQVA7SUFERjs7WUFJU0MsWUFBVCxDQUFzQkMsSUFBdEIsRUFBNEI7U0FDdEJDLEtBQUssR0FBRztPQUFFQyxNQUFNLEVBQUVGLElBQUksQ0FBQyxDQUFEO01BQTFCOztTQUVJLEtBQUtBLElBQVQsRUFBZTtPQUNiQyxLQUFLLENBQUNFLFFBQU4sR0FBaUJILElBQUksQ0FBQyxDQUFELENBQXJCOzs7U0FHRSxLQUFLQSxJQUFULEVBQWU7T0FDYkMsS0FBSyxDQUFDRyxVQUFOLEdBQW1CSixJQUFJLENBQUMsQ0FBRCxDQUF2QjtPQUNBQyxLQUFLLENBQUNJLFFBQU4sR0FBaUJMLElBQUksQ0FBQyxDQUFELENBQXJCOzs7VUFHR00sVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUJOLEtBQXJCOzs7WUFHT08sYUFBVCxDQUF1QlAsS0FBdkIsRUFBOEI7U0FDeEJoQyxNQUFNLEdBQUdnQyxLQUFLLENBQUNRLFVBQU4sSUFBb0IsRUFBakM7S0FDQXhDLE1BQU0sQ0FBQ2xDLElBQVAsR0FBYyxRQUFkO1lBQ09rQyxNQUFNLENBQUNuQyxHQUFkO0tBQ0FtRSxLQUFLLENBQUNRLFVBQU4sR0FBbUJ4QyxNQUFuQjs7O1lBR096QyxPQUFULENBQWlCTixXQUFqQixFQUE4Qjs7OztVQUl2Qm9GLFVBQUwsR0FBa0IsQ0FBQztPQUFFSixNQUFNLEVBQUU7TUFBWCxDQUFsQjtLQUNBaEYsV0FBVyxDQUFDZ0MsT0FBWixDQUFvQjZDLFlBQXBCLEVBQWtDLElBQWxDO1VBQ0tXLEtBQUwsQ0FBVyxJQUFYOzs7R0FHRmpHLE9BQU8sQ0FBQ2tHLElBQVIsR0FBZSxVQUFTQyxNQUFULEVBQWlCO1NBQzFCRCxJQUFJLEdBQUcsRUFBWDs7VUFDSyxJQUFJRSxHQUFULElBQWdCRCxNQUFoQixFQUF3QjtPQUN0QkQsSUFBSSxDQUFDSixJQUFMLENBQVVNLEdBQVY7OztLQUVGRixJQUFJLENBQUNHLE9BQUwsR0FMOEI7OztZQVN2QixTQUFTakMsSUFBVCxHQUFnQjtjQUNkOEIsSUFBSSxDQUFDSSxNQUFaLEVBQW9CO2FBQ2RGLEdBQUcsR0FBR0YsSUFBSSxDQUFDSyxHQUFMLEVBQVY7O2FBQ0lILEdBQUcsSUFBSUQsTUFBWCxFQUFtQjtXQUNqQi9CLElBQUksQ0FBQ1YsS0FBTCxHQUFhMEMsR0FBYjtXQUNBaEMsSUFBSSxDQUFDQyxJQUFMLEdBQVksS0FBWjtrQkFDT0QsSUFBUDs7UUFOaUI7Ozs7O09BYXJCQSxJQUFJLENBQUNDLElBQUwsR0FBWSxJQUFaO2NBQ09ELElBQVA7TUFkRjtJQVRGOztZQTJCU2hDLE1BQVQsQ0FBZ0JvRSxRQUFoQixFQUEwQjtTQUNwQkEsUUFBSixFQUFjO1dBQ1JDLGNBQWMsR0FBR0QsUUFBUSxDQUFDOUcsY0FBRCxDQUE3Qjs7V0FDSStHLGNBQUosRUFBb0I7Z0JBQ1hBLGNBQWMsQ0FBQ2xGLElBQWYsQ0FBb0JpRixRQUFwQixDQUFQOzs7V0FHRSxPQUFPQSxRQUFRLENBQUNwQyxJQUFoQixLQUF5QixVQUE3QixFQUF5QztnQkFDaENvQyxRQUFQOzs7V0FHRSxDQUFDRSxLQUFLLENBQUNGLFFBQVEsQ0FBQ0YsTUFBVixDQUFWLEVBQTZCO2FBQ3ZCSyxDQUFDLEdBQUcsQ0FBQyxDQUFUO2FBQVl2QyxJQUFJLEdBQUcsU0FBU0EsSUFBVCxHQUFnQjtrQkFDMUIsRUFBRXVDLENBQUYsR0FBTUgsUUFBUSxDQUFDRixNQUF0QixFQUE4QjtpQkFDeEJqSCxNQUFNLENBQUNrQyxJQUFQLENBQVlpRixRQUFaLEVBQXNCRyxDQUF0QixDQUFKLEVBQThCO2VBQzVCdkMsSUFBSSxDQUFDVixLQUFMLEdBQWE4QyxRQUFRLENBQUNHLENBQUQsQ0FBckI7ZUFDQXZDLElBQUksQ0FBQ0MsSUFBTCxHQUFZLEtBQVo7c0JBQ09ELElBQVA7Ozs7V0FJSkEsSUFBSSxDQUFDVixLQUFMLEdBQWFuRSxTQUFiO1dBQ0E2RSxJQUFJLENBQUNDLElBQUwsR0FBWSxJQUFaO2tCQUVPRCxJQUFQO1VBWkY7O2dCQWVPQSxJQUFJLENBQUNBLElBQUwsR0FBWUEsSUFBbkI7O01BM0JvQjs7O1lBZ0NqQjtPQUFFQSxJQUFJLEVBQUVJO01BQWY7OztHQUVGeEUsT0FBTyxDQUFDb0MsTUFBUixHQUFpQkEsTUFBakI7O1lBRVNvQyxVQUFULEdBQXNCO1lBQ2I7T0FBRWQsS0FBSyxFQUFFbkUsU0FBVDtPQUFvQjhFLElBQUksRUFBRTtNQUFqQzs7O0dBR0Z0RCxPQUFPLENBQUMzQixTQUFSLEdBQW9CO0tBQ2xCa0QsV0FBVyxFQUFFdkIsT0FESztLQUdsQmtGLEtBQUssRUFBRSxlQUFTVyxhQUFULEVBQXdCO1lBQ3hCQyxJQUFMLEdBQVksQ0FBWjtZQUNLekMsSUFBTCxHQUFZLENBQVosQ0FGNkI7OztZQUt4QlEsSUFBTCxHQUFZLEtBQUtDLEtBQUwsR0FBYXRGLFNBQXpCO1lBQ0s4RSxJQUFMLEdBQVksS0FBWjtZQUNLSSxRQUFMLEdBQWdCLElBQWhCO1lBRUsvQixNQUFMLEdBQWMsTUFBZDtZQUNLckIsR0FBTCxHQUFXOUIsU0FBWDtZQUVLc0csVUFBTCxDQUFnQnBELE9BQWhCLENBQXdCc0QsYUFBeEI7O1dBRUksQ0FBQ2EsYUFBTCxFQUFvQjtjQUNiLElBQUk5RCxJQUFULElBQWlCLElBQWpCLEVBQXVCOztlQUVqQkEsSUFBSSxDQUFDZ0UsTUFBTCxDQUFZLENBQVosTUFBbUIsR0FBbkIsSUFDQXpILE1BQU0sQ0FBQ2tDLElBQVAsQ0FBWSxJQUFaLEVBQWtCdUIsSUFBbEIsQ0FEQSxJQUVBLENBQUM0RCxLQUFLLENBQUMsQ0FBQzVELElBQUksQ0FBQ2lFLEtBQUwsQ0FBVyxDQUFYLENBQUYsQ0FGVixFQUU0QjtrQkFDckJqRSxJQUFMLElBQWF2RCxTQUFiOzs7O01BdkJVO0tBNkJsQnlILElBQUksRUFBRSxnQkFBVztZQUNWM0MsSUFBTCxHQUFZLElBQVo7V0FFSTRDLFNBQVMsR0FBRyxLQUFLcEIsVUFBTCxDQUFnQixDQUFoQixDQUFoQjtXQUNJcUIsVUFBVSxHQUFHRCxTQUFTLENBQUNqQixVQUEzQjs7V0FDSWtCLFVBQVUsQ0FBQzVGLElBQVgsS0FBb0IsT0FBeEIsRUFBaUM7ZUFDekI0RixVQUFVLENBQUM3RixHQUFqQjs7O2NBR0ssS0FBSzhGLElBQVo7TUF0Q2dCO0tBeUNsQnJDLGlCQUFpQixFQUFFLDJCQUFTc0MsU0FBVCxFQUFvQjtXQUNqQyxLQUFLL0MsSUFBVCxFQUFlO2VBQ1ArQyxTQUFOOzs7V0FHRXRHLE9BQU8sR0FBRyxJQUFkOztnQkFDU3VHLE1BQVQsQ0FBZ0JDLEdBQWhCLEVBQXFCQyxNQUFyQixFQUE2QjtTQUMzQi9ELE1BQU0sQ0FBQ2xDLElBQVAsR0FBYyxPQUFkO1NBQ0FrQyxNQUFNLENBQUNuQyxHQUFQLEdBQWErRixTQUFiO1NBQ0F0RyxPQUFPLENBQUNzRCxJQUFSLEdBQWVrRCxHQUFmOzthQUVJQyxNQUFKLEVBQVk7OztXQUdWekcsT0FBTyxDQUFDNEIsTUFBUixHQUFpQixNQUFqQjtXQUNBNUIsT0FBTyxDQUFDTyxHQUFSLEdBQWM5QixTQUFkOzs7Z0JBR0ssQ0FBQyxDQUFFZ0ksTUFBVjs7O1lBR0csSUFBSVosQ0FBQyxHQUFHLEtBQUtkLFVBQUwsQ0FBZ0JTLE1BQWhCLEdBQXlCLENBQXRDLEVBQXlDSyxDQUFDLElBQUksQ0FBOUMsRUFBaUQsRUFBRUEsQ0FBbkQsRUFBc0Q7YUFDaERuQixLQUFLLEdBQUcsS0FBS0ssVUFBTCxDQUFnQmMsQ0FBaEIsQ0FBWjthQUNJbkQsTUFBTSxHQUFHZ0MsS0FBSyxDQUFDUSxVQUFuQjs7YUFFSVIsS0FBSyxDQUFDQyxNQUFOLEtBQWlCLE1BQXJCLEVBQTZCOzs7O2tCQUlwQjRCLE1BQU0sQ0FBQyxLQUFELENBQWI7OzthQUdFN0IsS0FBSyxDQUFDQyxNQUFOLElBQWdCLEtBQUtvQixJQUF6QixFQUErQjtlQUN6QlcsUUFBUSxHQUFHbkksTUFBTSxDQUFDa0MsSUFBUCxDQUFZaUUsS0FBWixFQUFtQixVQUFuQixDQUFmO2VBQ0lpQyxVQUFVLEdBQUdwSSxNQUFNLENBQUNrQyxJQUFQLENBQVlpRSxLQUFaLEVBQW1CLFlBQW5CLENBQWpCOztlQUVJZ0MsUUFBUSxJQUFJQyxVQUFoQixFQUE0QjtpQkFDdEIsS0FBS1osSUFBTCxHQUFZckIsS0FBSyxDQUFDRSxRQUF0QixFQUFnQztzQkFDdkIyQixNQUFNLENBQUM3QixLQUFLLENBQUNFLFFBQVAsRUFBaUIsSUFBakIsQ0FBYjtjQURGLE1BRU8sSUFBSSxLQUFLbUIsSUFBTCxHQUFZckIsS0FBSyxDQUFDRyxVQUF0QixFQUFrQztzQkFDaEMwQixNQUFNLENBQUM3QixLQUFLLENBQUNHLFVBQVAsQ0FBYjs7WUFKSixNQU9PLElBQUk2QixRQUFKLEVBQWM7aUJBQ2YsS0FBS1gsSUFBTCxHQUFZckIsS0FBSyxDQUFDRSxRQUF0QixFQUFnQztzQkFDdkIyQixNQUFNLENBQUM3QixLQUFLLENBQUNFLFFBQVAsRUFBaUIsSUFBakIsQ0FBYjs7WUFGRyxNQUtBLElBQUkrQixVQUFKLEVBQWdCO2lCQUNqQixLQUFLWixJQUFMLEdBQVlyQixLQUFLLENBQUNHLFVBQXRCLEVBQWtDO3NCQUN6QjBCLE1BQU0sQ0FBQzdCLEtBQUssQ0FBQ0csVUFBUCxDQUFiOztZQUZHLE1BS0E7bUJBQ0MsSUFBSXBCLEtBQUosQ0FBVSx3Q0FBVixDQUFOOzs7O01BL0ZVO0tBcUdsQlEsTUFBTSxFQUFFLGdCQUFTekQsSUFBVCxFQUFlRCxHQUFmLEVBQW9CO1lBQ3JCLElBQUlzRixDQUFDLEdBQUcsS0FBS2QsVUFBTCxDQUFnQlMsTUFBaEIsR0FBeUIsQ0FBdEMsRUFBeUNLLENBQUMsSUFBSSxDQUE5QyxFQUFpRCxFQUFFQSxDQUFuRCxFQUFzRDthQUNoRG5CLEtBQUssR0FBRyxLQUFLSyxVQUFMLENBQWdCYyxDQUFoQixDQUFaOzthQUNJbkIsS0FBSyxDQUFDQyxNQUFOLElBQWdCLEtBQUtvQixJQUFyQixJQUNBeEgsTUFBTSxDQUFDa0MsSUFBUCxDQUFZaUUsS0FBWixFQUFtQixZQUFuQixDQURBLElBRUEsS0FBS3FCLElBQUwsR0FBWXJCLEtBQUssQ0FBQ0csVUFGdEIsRUFFa0M7ZUFDNUIrQixZQUFZLEdBQUdsQyxLQUFuQjs7Ozs7V0FLQWtDLFlBQVksS0FDWHBHLElBQUksS0FBSyxPQUFULElBQ0FBLElBQUksS0FBSyxVQUZFLENBQVosSUFHQW9HLFlBQVksQ0FBQ2pDLE1BQWIsSUFBdUJwRSxHQUh2QixJQUlBQSxHQUFHLElBQUlxRyxZQUFZLENBQUMvQixVQUp4QixFQUlvQzs7O1NBR2xDK0IsWUFBWSxHQUFHLElBQWY7OztXQUdFbEUsTUFBTSxHQUFHa0UsWUFBWSxHQUFHQSxZQUFZLENBQUMxQixVQUFoQixHQUE2QixFQUF0RDtPQUNBeEMsTUFBTSxDQUFDbEMsSUFBUCxHQUFjQSxJQUFkO09BQ0FrQyxNQUFNLENBQUNuQyxHQUFQLEdBQWFBLEdBQWI7O1dBRUlxRyxZQUFKLEVBQWtCO2NBQ1hoRixNQUFMLEdBQWMsTUFBZDtjQUNLMEIsSUFBTCxHQUFZc0QsWUFBWSxDQUFDL0IsVUFBekI7Z0JBQ085RCxnQkFBUDs7O2NBR0ssS0FBSzhGLFFBQUwsQ0FBY25FLE1BQWQsQ0FBUDtNQXBJZ0I7S0F1SWxCbUUsUUFBUSxFQUFFLGtCQUFTbkUsTUFBVCxFQUFpQm9DLFFBQWpCLEVBQTJCO1dBQy9CcEMsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFwQixFQUE2QjtlQUNyQmtDLE1BQU0sQ0FBQ25DLEdBQWI7OztXQUdFbUMsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixPQUFoQixJQUNBa0MsTUFBTSxDQUFDbEMsSUFBUCxLQUFnQixVQURwQixFQUNnQztjQUN6QjhDLElBQUwsR0FBWVosTUFBTSxDQUFDbkMsR0FBbkI7UUFGRixNQUdPLElBQUltQyxNQUFNLENBQUNsQyxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO2NBQzlCNkYsSUFBTCxHQUFZLEtBQUs5RixHQUFMLEdBQVdtQyxNQUFNLENBQUNuQyxHQUE5QjtjQUNLcUIsTUFBTCxHQUFjLFFBQWQ7Y0FDSzBCLElBQUwsR0FBWSxLQUFaO1FBSEssTUFJQSxJQUFJWixNQUFNLENBQUNsQyxJQUFQLEtBQWdCLFFBQWhCLElBQTRCc0UsUUFBaEMsRUFBMEM7Y0FDMUN4QixJQUFMLEdBQVl3QixRQUFaOzs7Y0FHSy9ELGdCQUFQO01BdkpnQjtLQTBKbEIrRixNQUFNLEVBQUUsZ0JBQVNqQyxVQUFULEVBQXFCO1lBQ3RCLElBQUlnQixDQUFDLEdBQUcsS0FBS2QsVUFBTCxDQUFnQlMsTUFBaEIsR0FBeUIsQ0FBdEMsRUFBeUNLLENBQUMsSUFBSSxDQUE5QyxFQUFpRCxFQUFFQSxDQUFuRCxFQUFzRDthQUNoRG5CLEtBQUssR0FBRyxLQUFLSyxVQUFMLENBQWdCYyxDQUFoQixDQUFaOzthQUNJbkIsS0FBSyxDQUFDRyxVQUFOLEtBQXFCQSxVQUF6QixFQUFxQztnQkFDOUJnQyxRQUFMLENBQWNuQyxLQUFLLENBQUNRLFVBQXBCLEVBQWdDUixLQUFLLENBQUNJLFFBQXRDO1dBQ0FHLGFBQWEsQ0FBQ1AsS0FBRCxDQUFiO2tCQUNPM0QsZ0JBQVA7OztNQWhLWTtjQXFLVCxnQkFBUzRELE1BQVQsRUFBaUI7WUFDbkIsSUFBSWtCLENBQUMsR0FBRyxLQUFLZCxVQUFMLENBQWdCUyxNQUFoQixHQUF5QixDQUF0QyxFQUF5Q0ssQ0FBQyxJQUFJLENBQTlDLEVBQWlELEVBQUVBLENBQW5ELEVBQXNEO2FBQ2hEbkIsS0FBSyxHQUFHLEtBQUtLLFVBQUwsQ0FBZ0JjLENBQWhCLENBQVo7O2FBQ0luQixLQUFLLENBQUNDLE1BQU4sS0FBaUJBLE1BQXJCLEVBQTZCO2VBQ3ZCakMsTUFBTSxHQUFHZ0MsS0FBSyxDQUFDUSxVQUFuQjs7ZUFDSXhDLE1BQU0sQ0FBQ2xDLElBQVAsS0FBZ0IsT0FBcEIsRUFBNkI7aUJBQ3ZCdUcsTUFBTSxHQUFHckUsTUFBTSxDQUFDbkMsR0FBcEI7YUFDQTBFLGFBQWEsQ0FBQ1AsS0FBRCxDQUFiOzs7a0JBRUtxQyxNQUFQOztRQVRvQjs7OzthQWVsQixJQUFJdEQsS0FBSixDQUFVLHVCQUFWLENBQU47TUFwTGdCO0tBdUxsQnVELGFBQWEsRUFBRSx1QkFBU3RCLFFBQVQsRUFBbUJyQixVQUFuQixFQUErQkMsT0FBL0IsRUFBd0M7WUFDaERYLFFBQUwsR0FBZ0I7U0FDZDlFLFFBQVEsRUFBRXlDLE1BQU0sQ0FBQ29FLFFBQUQsQ0FERjtTQUVkckIsVUFBVSxFQUFFQSxVQUZFO1NBR2RDLE9BQU8sRUFBRUE7UUFIWDs7V0FNSSxLQUFLMUMsTUFBTCxLQUFnQixNQUFwQixFQUE0Qjs7O2NBR3JCckIsR0FBTCxHQUFXOUIsU0FBWDs7O2NBR0tzQyxnQkFBUDs7SUFwTUo7RUEzZkQ7OztDQXNzQkUsWUFBVztVQUNILFFBQVMsT0FBT3JCLElBQVAsS0FBZ0IsUUFBaEIsSUFBNEJBLElBQTVDO0VBREYsTUFFUXVILFFBQVEsQ0FBQyxhQUFELENBQVIsRUF4c0JULENBQUQ7OztDQ1BBOzs7Ozs7OztDQVNBLElBQUlDLENBQUMsR0FBSSxZQUFXO1VBQ1gsUUFBUyxPQUFPeEgsSUFBUCxLQUFnQixRQUFoQixJQUE0QkEsSUFBNUM7RUFETSxNQUVBdUgsUUFBUSxDQUFDLGFBQUQsQ0FBUixFQUZSOzs7O0NBTUEsSUFBSUUsVUFBVSxHQUFHRCxDQUFDLENBQUMvSCxrQkFBRixJQUNmZCxNQUFNLENBQUMrSSxtQkFBUCxDQUEyQkYsQ0FBM0IsRUFBOEJHLE9BQTlCLENBQXNDLG9CQUF0QyxLQUErRCxDQURqRTs7Q0FJQSxJQUFJQyxVQUFVLEdBQUdILFVBQVUsSUFBSUQsQ0FBQyxDQUFDL0gsa0JBQWpDOztDQUdBK0gsQ0FBQyxDQUFDL0gsa0JBQUYsR0FBdUJWLFNBQXZCO0NBRUFXLGlCQUFBLEdBQWlCbUksT0FBakI7O0NBRUEsSUFBSUosVUFBSixFQUFnQjs7R0FFZEQsQ0FBQyxDQUFDL0gsa0JBQUYsR0FBdUJtSSxVQUF2QjtFQUZGLE1BR087O09BRUQ7WUFDS0osQ0FBQyxDQUFDL0gsa0JBQVQ7SUFERixDQUVFLE9BQU1xSSxDQUFOLEVBQVM7S0FDVE4sQ0FBQyxDQUFDL0gsa0JBQUYsR0FBdUJWLFNBQXZCOzs7O0NDbENKVyxlQUFBLEdBQWlCbUksYUFBakI7O0NDQUEsU0FBU0Usa0JBQVQsQ0FBNEJDLEdBQTVCLEVBQWlDbEYsT0FBakMsRUFBMENDLE1BQTFDLEVBQWtEa0YsS0FBbEQsRUFBeURDLE1BQXpELEVBQWlFdEMsR0FBakUsRUFBc0UvRSxHQUF0RSxFQUEyRTtPQUNyRTtTQUNFNkQsSUFBSSxHQUFHc0QsR0FBRyxDQUFDcEMsR0FBRCxDQUFILENBQVMvRSxHQUFULENBQVg7U0FDSXFDLEtBQUssR0FBR3dCLElBQUksQ0FBQ3hCLEtBQWpCO0lBRkYsQ0FHRSxPQUFPSSxLQUFQLEVBQWM7S0FDZFAsTUFBTSxDQUFDTyxLQUFELENBQU47Ozs7T0FJRW9CLElBQUksQ0FBQ2IsSUFBVCxFQUFlO0tBQ2JmLE9BQU8sQ0FBQ0ksS0FBRCxDQUFQO0lBREYsTUFFTztLQUNMQyxPQUFPLENBQUNMLE9BQVIsQ0FBZ0JJLEtBQWhCLEVBQXVCRSxJQUF2QixDQUE0QjZFLEtBQTVCLEVBQW1DQyxNQUFuQzs7OztDQUlKLFNBQVNDLGlCQUFULENBQTJCeEgsRUFBM0IsRUFBK0I7VUFDdEIsWUFBWTtTQUNiWCxJQUFJLEdBQUcsSUFBWDtTQUNJb0ksSUFBSSxHQUFHQyxTQURYO1lBRU8sSUFBSWxGLE9BQUosQ0FBWSxVQUFVTCxPQUFWLEVBQW1CQyxNQUFuQixFQUEyQjtXQUN4Q2lGLEdBQUcsR0FBR3JILEVBQUUsQ0FBQzJILEtBQUgsQ0FBU3RJLElBQVQsRUFBZW9JLElBQWYsQ0FBVjs7Z0JBRVNILEtBQVQsQ0FBZS9FLEtBQWYsRUFBc0I7U0FDcEI2RSxrQkFBa0IsQ0FBQ0MsR0FBRCxFQUFNbEYsT0FBTixFQUFlQyxNQUFmLEVBQXVCa0YsS0FBdkIsRUFBOEJDLE1BQTlCLEVBQXNDLE1BQXRDLEVBQThDaEYsS0FBOUMsQ0FBbEI7OztnQkFHT2dGLE1BQVQsQ0FBZ0JsSCxHQUFoQixFQUFxQjtTQUNuQitHLGtCQUFrQixDQUFDQyxHQUFELEVBQU1sRixPQUFOLEVBQWVDLE1BQWYsRUFBdUJrRixLQUF2QixFQUE4QkMsTUFBOUIsRUFBc0MsT0FBdEMsRUFBK0NsSCxHQUEvQyxDQUFsQjs7O09BR0ZpSCxLQUFLLENBQUNsSixTQUFELENBQUw7TUFYSyxDQUFQO0lBSEY7OztDQW1CRlcsb0JBQUEsR0FBaUJ5SSxpQkFBakI7O0NDcENBLFNBQVNJLGVBQVQsQ0FBeUJDLFFBQXpCLEVBQW1DQyxXQUFuQyxFQUFnRDtPQUMxQyxFQUFFRCxRQUFRLFlBQVlDLFdBQXRCLENBQUosRUFBd0M7V0FDaEMsSUFBSWhFLFNBQUosQ0FBYyxtQ0FBZCxDQUFOOzs7O0NBSUovRSxrQkFBQSxHQUFpQjZJLGVBQWpCOztDQ05BLFNBQVNHLGlCQUFULENBQTJCQyxNQUEzQixFQUFtQ0MsS0FBbkMsRUFBMEM7UUFDbkMsSUFBSXpDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd5QyxLQUFLLENBQUM5QyxNQUExQixFQUFrQ0ssQ0FBQyxFQUFuQyxFQUF1QztTQUNqQzBDLFVBQVUsR0FBR0QsS0FBSyxDQUFDekMsQ0FBRCxDQUF0QjtLQUNBMEMsVUFBVSxDQUFDQyxVQUFYLEdBQXdCRCxVQUFVLENBQUNDLFVBQVgsSUFBeUIsS0FBakQ7S0FDQUQsVUFBVSxDQUFDRSxZQUFYLEdBQTBCLElBQTFCO1NBQ0ksV0FBV0YsVUFBZixFQUEyQkEsVUFBVSxDQUFDRyxRQUFYLEdBQXNCLElBQXRCO0tBQzNCckssTUFBTSxDQUFDc0ssY0FBUCxDQUFzQk4sTUFBdEIsRUFBOEJFLFVBQVUsQ0FBQ2pELEdBQXpDLEVBQThDaUQsVUFBOUM7Ozs7Q0FJSixTQUFTSyxZQUFULENBQXNCVCxXQUF0QixFQUFtQ1UsVUFBbkMsRUFBK0NDLFdBQS9DLEVBQTREO09BQ3RERCxVQUFKLEVBQWdCVCxpQkFBaUIsQ0FBQ0QsV0FBVyxDQUFDN0osU0FBYixFQUF3QnVLLFVBQXhCLENBQWpCO09BQ1pDLFdBQUosRUFBaUJWLGlCQUFpQixDQUFDRCxXQUFELEVBQWNXLFdBQWQsQ0FBakI7VUFDVlgsV0FBUDs7O0NBR0YvSSxlQUFBLEdBQWlCd0osWUFBakI7O0NDaEJBOzs7Ozs7Ozs7O0NBVUEsSUFBSUcsZUFBZSxHQUFHLHFCQUF0Qjs7O0NBR0EsSUFBSUMsR0FBRyxHQUFHLElBQUksQ0FBZDs7O0NBR0EsSUFBSUMsU0FBUyxHQUFHLGlCQUFoQjs7O0NBR0EsSUFBSUMsTUFBTSxHQUFHLFlBQWI7OztDQUdBLElBQUlDLFVBQVUsR0FBRyxvQkFBakI7OztDQUdBLElBQUlDLFVBQVUsR0FBRyxZQUFqQjs7O0NBR0EsSUFBSUMsU0FBUyxHQUFHLGFBQWhCOzs7Q0FHQSxJQUFJQyxZQUFZLEdBQUdDLFFBQW5COzs7Q0FHQSxJQUFJQyxVQUFVLEdBQUcsT0FBT3JMLGNBQVAsSUFBaUIsUUFBakIsSUFBNkJBLGNBQTdCLElBQXVDQSxjQUFNLENBQUNFLE1BQVAsS0FBa0JBLE1BQXpELElBQW1FRixjQUFwRjs7O0NBR0EsSUFBSXNMLFFBQVEsR0FBRyxPQUFPL0osSUFBUCxJQUFlLFFBQWYsSUFBMkJBLElBQTNCLElBQW1DQSxJQUFJLENBQUNyQixNQUFMLEtBQWdCQSxNQUFuRCxJQUE2RHFCLElBQTVFOzs7Q0FHQSxJQUFJZ0ssSUFBSSxHQUFHRixVQUFVLElBQUlDLFFBQWQsSUFBMEJ4QyxRQUFRLENBQUMsYUFBRCxDQUFSLEVBQXJDOzs7Q0FHQSxJQUFJMEMsV0FBVyxHQUFHdEwsTUFBTSxDQUFDQyxTQUF6Qjs7Ozs7OztDQU9BLElBQUlzTCxjQUFjLEdBQUdELFdBQVcsQ0FBQ3BGLFFBQWpDOzs7Q0FHQSxJQUFJc0YsU0FBUyxHQUFHQyxJQUFJLENBQUNDLEdBQXJCO0tBQ0lDLFNBQVMsR0FBR0YsSUFBSSxDQUFDRyxHQURyQjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUJBLElBQUlDLEdBQUcsR0FBRyxTQUFOQSxHQUFNLEdBQVc7VUFDWlIsSUFBSSxDQUFDUyxJQUFMLENBQVVELEdBQVYsRUFBUDtFQURGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EwREEsU0FBU0UsUUFBVCxDQUFrQkMsSUFBbEIsRUFBd0JDLElBQXhCLEVBQThCQyxPQUE5QixFQUF1QztPQUNqQ0MsUUFBSjtPQUNJQyxRQURKO09BRUlDLE9BRko7T0FHSS9ILE1BSEo7T0FJSWdJLE9BSko7T0FLSUMsWUFMSjtPQU1JQyxjQUFjLEdBQUcsQ0FOckI7T0FPSUMsT0FBTyxHQUFHLEtBUGQ7T0FRSUMsTUFBTSxHQUFHLEtBUmI7T0FTSUMsUUFBUSxHQUFHLElBVGY7O09BV0ksT0FBT1gsSUFBUCxJQUFlLFVBQW5CLEVBQStCO1dBQ3ZCLElBQUlsRyxTQUFKLENBQWM0RSxlQUFkLENBQU47OztHQUVGdUIsSUFBSSxHQUFHVyxRQUFRLENBQUNYLElBQUQsQ0FBUixJQUFrQixDQUF6Qjs7T0FDSVksUUFBUSxDQUFDWCxPQUFELENBQVosRUFBdUI7S0FDckJPLE9BQU8sR0FBRyxDQUFDLENBQUNQLE9BQU8sQ0FBQ08sT0FBcEI7S0FDQUMsTUFBTSxHQUFHLGFBQWFSLE9BQXRCO0tBQ0FHLE9BQU8sR0FBR0ssTUFBTSxHQUFHbEIsU0FBUyxDQUFDb0IsUUFBUSxDQUFDVixPQUFPLENBQUNHLE9BQVQsQ0FBUixJQUE2QixDQUE5QixFQUFpQ0osSUFBakMsQ0FBWixHQUFxREksT0FBckU7S0FDQU0sUUFBUSxHQUFHLGNBQWNULE9BQWQsR0FBd0IsQ0FBQyxDQUFDQSxPQUFPLENBQUNTLFFBQWxDLEdBQTZDQSxRQUF4RDs7O1lBR09HLFVBQVQsQ0FBb0JDLElBQXBCLEVBQTBCO1NBQ3BCdEQsSUFBSSxHQUFHMEMsUUFBWDtTQUNJYSxPQUFPLEdBQUdaLFFBRGQ7S0FHQUQsUUFBUSxHQUFHQyxRQUFRLEdBQUdoTSxTQUF0QjtLQUNBb00sY0FBYyxHQUFHTyxJQUFqQjtLQUNBekksTUFBTSxHQUFHMEgsSUFBSSxDQUFDckMsS0FBTCxDQUFXcUQsT0FBWCxFQUFvQnZELElBQXBCLENBQVQ7WUFDT25GLE1BQVA7OztZQUdPMkksV0FBVCxDQUFxQkYsSUFBckIsRUFBMkI7O0tBRXpCUCxjQUFjLEdBQUdPLElBQWpCLENBRnlCOztLQUl6QlQsT0FBTyxHQUFHWSxVQUFVLENBQUNDLFlBQUQsRUFBZWxCLElBQWYsQ0FBcEIsQ0FKeUI7O1lBTWxCUSxPQUFPLEdBQUdLLFVBQVUsQ0FBQ0MsSUFBRCxDQUFiLEdBQXNCekksTUFBcEM7OztZQUdPOEksYUFBVCxDQUF1QkwsSUFBdkIsRUFBNkI7U0FDdkJNLGlCQUFpQixHQUFHTixJQUFJLEdBQUdSLFlBQS9CO1NBQ0llLG1CQUFtQixHQUFHUCxJQUFJLEdBQUdQLGNBRGpDO1NBRUlsSSxNQUFNLEdBQUcySCxJQUFJLEdBQUdvQixpQkFGcEI7WUFJT1gsTUFBTSxHQUFHZixTQUFTLENBQUNySCxNQUFELEVBQVMrSCxPQUFPLEdBQUdpQixtQkFBbkIsQ0FBWixHQUFzRGhKLE1BQW5FOzs7WUFHT2lKLFlBQVQsQ0FBc0JSLElBQXRCLEVBQTRCO1NBQ3RCTSxpQkFBaUIsR0FBR04sSUFBSSxHQUFHUixZQUEvQjtTQUNJZSxtQkFBbUIsR0FBR1AsSUFBSSxHQUFHUCxjQURqQyxDQUQwQjs7OztZQU9sQkQsWUFBWSxLQUFLbk0sU0FBakIsSUFBK0JpTixpQkFBaUIsSUFBSXBCLElBQXBELElBQ0xvQixpQkFBaUIsR0FBRyxDQURmLElBQ3NCWCxNQUFNLElBQUlZLG1CQUFtQixJQUFJakIsT0FEL0Q7OztZQUlPYyxZQUFULEdBQXdCO1NBQ2xCSixJQUFJLEdBQUdsQixHQUFHLEVBQWQ7O1NBQ0kwQixZQUFZLENBQUNSLElBQUQsQ0FBaEIsRUFBd0I7Y0FDZlMsWUFBWSxDQUFDVCxJQUFELENBQW5CO01BSG9COzs7S0FNdEJULE9BQU8sR0FBR1ksVUFBVSxDQUFDQyxZQUFELEVBQWVDLGFBQWEsQ0FBQ0wsSUFBRCxDQUE1QixDQUFwQjs7O1lBR09TLFlBQVQsQ0FBc0JULElBQXRCLEVBQTRCO0tBQzFCVCxPQUFPLEdBQUdsTSxTQUFWLENBRDBCOzs7U0FLdEJ1TSxRQUFRLElBQUlSLFFBQWhCLEVBQTBCO2NBQ2pCVyxVQUFVLENBQUNDLElBQUQsQ0FBakI7OztLQUVGWixRQUFRLEdBQUdDLFFBQVEsR0FBR2hNLFNBQXRCO1lBQ09rRSxNQUFQOzs7WUFHT21KLE1BQVQsR0FBa0I7U0FDWm5CLE9BQU8sS0FBS2xNLFNBQWhCLEVBQTJCO09BQ3pCc04sWUFBWSxDQUFDcEIsT0FBRCxDQUFaOzs7S0FFRkUsY0FBYyxHQUFHLENBQWpCO0tBQ0FMLFFBQVEsR0FBR0ksWUFBWSxHQUFHSCxRQUFRLEdBQUdFLE9BQU8sR0FBR2xNLFNBQS9DOzs7WUFHT3VOLEtBQVQsR0FBaUI7WUFDUnJCLE9BQU8sS0FBS2xNLFNBQVosR0FBd0JrRSxNQUF4QixHQUFpQ2tKLFlBQVksQ0FBQzNCLEdBQUcsRUFBSixDQUFwRDs7O1lBR08rQixTQUFULEdBQXFCO1NBQ2ZiLElBQUksR0FBR2xCLEdBQUcsRUFBZDtTQUNJZ0MsVUFBVSxHQUFHTixZQUFZLENBQUNSLElBQUQsQ0FEN0I7S0FHQVosUUFBUSxHQUFHekMsU0FBWDtLQUNBMEMsUUFBUSxHQUFHLElBQVg7S0FDQUcsWUFBWSxHQUFHUSxJQUFmOztTQUVJYyxVQUFKLEVBQWdCO1dBQ1Z2QixPQUFPLEtBQUtsTSxTQUFoQixFQUEyQjtnQkFDbEI2TSxXQUFXLENBQUNWLFlBQUQsQ0FBbEI7OztXQUVFRyxNQUFKLEVBQVk7O1NBRVZKLE9BQU8sR0FBR1ksVUFBVSxDQUFDQyxZQUFELEVBQWVsQixJQUFmLENBQXBCO2dCQUNPYSxVQUFVLENBQUNQLFlBQUQsQ0FBakI7Ozs7U0FHQUQsT0FBTyxLQUFLbE0sU0FBaEIsRUFBMkI7T0FDekJrTSxPQUFPLEdBQUdZLFVBQVUsQ0FBQ0MsWUFBRCxFQUFlbEIsSUFBZixDQUFwQjs7O1lBRUszSCxNQUFQOzs7R0FFRnNKLFNBQVMsQ0FBQ0gsTUFBVixHQUFtQkEsTUFBbkI7R0FDQUcsU0FBUyxDQUFDRCxLQUFWLEdBQWtCQSxLQUFsQjtVQUNPQyxTQUFQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztDQTRCRixTQUFTZixRQUFULENBQWtCdEksS0FBbEIsRUFBeUI7T0FDbkJwQyxJQUFJLEdBQUcsT0FBT29DLEtBQWxCO1VBQ08sQ0FBQyxDQUFDQSxLQUFGLEtBQVlwQyxJQUFJLElBQUksUUFBUixJQUFvQkEsSUFBSSxJQUFJLFVBQXhDLENBQVA7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0EyQkYsU0FBUzJMLFlBQVQsQ0FBc0J2SixLQUF0QixFQUE2QjtVQUNwQixDQUFDLENBQUNBLEtBQUYsSUFBVyxPQUFPQSxLQUFQLElBQWdCLFFBQWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FvQkYsU0FBU3dKLFFBQVQsQ0FBa0J4SixLQUFsQixFQUF5QjtVQUNoQixPQUFPQSxLQUFQLElBQWdCLFFBQWhCLElBQ0p1SixZQUFZLENBQUN2SixLQUFELENBQVosSUFBdUJnSCxjQUFjLENBQUNuSixJQUFmLENBQW9CbUMsS0FBcEIsS0FBOEJxRyxTQUR4RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMkJGLFNBQVNnQyxRQUFULENBQWtCckksS0FBbEIsRUFBeUI7T0FDbkIsT0FBT0EsS0FBUCxJQUFnQixRQUFwQixFQUE4QjtZQUNyQkEsS0FBUDs7O09BRUV3SixRQUFRLENBQUN4SixLQUFELENBQVosRUFBcUI7WUFDWm9HLEdBQVA7OztPQUVFa0MsUUFBUSxDQUFDdEksS0FBRCxDQUFaLEVBQXFCO1NBQ2Z5SixLQUFLLEdBQUcsT0FBT3pKLEtBQUssQ0FBQzBKLE9BQWIsSUFBd0IsVUFBeEIsR0FBcUMxSixLQUFLLENBQUMwSixPQUFOLEVBQXJDLEdBQXVEMUosS0FBbkU7S0FDQUEsS0FBSyxHQUFHc0ksUUFBUSxDQUFDbUIsS0FBRCxDQUFSLEdBQW1CQSxLQUFLLEdBQUcsRUFBM0IsR0FBaUNBLEtBQXpDOzs7T0FFRSxPQUFPekosS0FBUCxJQUFnQixRQUFwQixFQUE4QjtZQUNyQkEsS0FBSyxLQUFLLENBQVYsR0FBY0EsS0FBZCxHQUFzQixDQUFDQSxLQUE5Qjs7O0dBRUZBLEtBQUssR0FBR0EsS0FBSyxDQUFDMkosT0FBTixDQUFjckQsTUFBZCxFQUFzQixFQUF0QixDQUFSO09BQ0lzRCxRQUFRLEdBQUdwRCxVQUFVLENBQUNxRCxJQUFYLENBQWdCN0osS0FBaEIsQ0FBZjtVQUNRNEosUUFBUSxJQUFJbkQsU0FBUyxDQUFDb0QsSUFBVixDQUFlN0osS0FBZixDQUFiLEdBQ0gwRyxZQUFZLENBQUMxRyxLQUFLLENBQUNxRCxLQUFOLENBQVksQ0FBWixDQUFELEVBQWlCdUcsUUFBUSxHQUFHLENBQUgsR0FBTyxDQUFoQyxDQURULEdBRUZyRCxVQUFVLENBQUNzRCxJQUFYLENBQWdCN0osS0FBaEIsSUFBeUJvRyxHQUF6QixHQUErQixDQUFDcEcsS0FGckM7OztDQUtGeEQsbUJBQUEsR0FBaUJnTCxRQUFqQjs7QUN4WEEsb0JBQWUsVUFBQ3NDLFVBQUQsRUFBZ0I7Q0FDN0IsU0FBT0MsUUFBUSxDQUFDQyxXQUFULEdBQXVCQyx3QkFBdkIsQ0FBZ0RILFVBQWhELENBQVA7Q0FDRCxDQUZEOztBQ0FBLGNBQWUsVUFBQ0ksaUJBQUQsRUFBdUI7Q0FDcEMsTUFBTUMsSUFBSSxHQUFHLFNBQVBBLElBQU8sQ0FBQ3ZLLE9BQUQsRUFBYTtDQUN4QixRQUFJc0ssaUJBQWlCLEVBQXJCLEVBQXlCdEssT0FBTyxHQUFoQyxLQUNLK0ksVUFBVSxDQUFDO0NBQUEsYUFBTXdCLElBQUksQ0FBQ3ZLLE9BQUQsQ0FBVjtDQUFBLEtBQUQsRUFBc0IsR0FBdEIsQ0FBVjtDQUNOLEdBSEQ7O0NBS0EsU0FBTyxJQUFJSyxPQUFKLENBQVlrSyxJQUFaLENBQVA7Q0FDRCxDQVBEOztBQ0FBLHFCQUFlLFVBQUNDLFlBQUQsRUFBa0I7Q0FDL0IsTUFBTUMsR0FBRyxHQUFHTixRQUFRLENBQUNPLGFBQVQsQ0FDVixrRUFEVSxDQUFaO0NBR0EsU0FBT0QsR0FBRyxHQUFHQSxHQUFHLENBQUNFLFdBQVAsR0FBcUIsS0FBL0I7Q0FDRCxDQUxEOztBQ0FBLG9CQUFlLFVBQUNDLE1BQUQsRUFBWTtDQUN6QixTQUFPQyxNQUFNLENBQUNDLFdBQVAsQ0FBbUJDLFdBQW5CLENBQStCSCxNQUEvQixDQUFQO0NBQ0QsQ0FGRDs7Q0NBQTs7Ozs7Q0FPQSxJQUFNSSxTQUFTLEdBQUc7O0NBR2hCO0dBQ0VDLE9BQU8sRUFBRSxDQUNQLHFCQURPLEVBRVAsMkJBRk8sRUFHUCx1Q0FITyxFQUlQLHNDQUpPLENBRFg7R0FPRUMsS0FBSyxFQUFFO0tBQUNDLFFBQVEsRUFBRTs7RUFWSjtDQWFoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQyw2Q0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBZko7Q0FrQmhCO0dBQ0VGLE9BQU8sRUFBRSxDQUNQLHFCQURPLEVBRVAsMkJBRk8sRUFHUCwyQkFITyxFQUlQLDBCQUpPLENBRFg7R0FPRUMsS0FBSyxFQUFFO0tBQUNDLFFBQVEsRUFBRTs7RUF6Qko7O0NBOEJoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQywwQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBaENKO0NBbUNoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQywwQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBckNKO0NBd0NoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQywwQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBMUNKO0NBNkNoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQywwQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBL0NKO0NBa0RoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQywwQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBcERKO0NBdURoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQywwQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBekRKO0NBNERoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBOURKO0NBaUVoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQywwQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBbkVKO0NBc0VoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQyxrQ0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUU7O0VBeEVKOztDQThFaEI7R0FDRUYsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUUsUUFBWDtLQUFvQkMsS0FBSyxFQUFDOztFQWhGbkI7Q0FtRmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUFyRnBCO0NBd0ZoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkQsS0FBSyxFQUFDOztFQTFGakI7Q0E2RmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUEvRnBCO0NBa0doQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBcEdBO0NBdUdoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkQsS0FBSyxFQUFDOztFQXpHakI7Q0E0R2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUE5R0E7Q0FpSGhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUFuSGxCO0NBc0hoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBeEhsQjtDQTJIaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQTdIbEI7Q0FnSWhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUFsSWxCO0NBcUloQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBdklwQjtDQTBJaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQTVJQTtDQStJaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkMsTUFBTSxFQUFDOztFQWpKbEI7Q0FvSmhCO0dBQ0VMLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUF0SnBCO0NBeUpoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBM0pwQjtDQThKaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQWhLQTtDQW1LaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQzs7RUFyS25EO0NBd0toQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUExS0E7Q0E2S2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQS9LQTtDQW1MaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQXJMbEI7Q0F3TGhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUExTHBCO0NBNkxoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDSyxNQUFNLEVBQUMsUUFBUjtLQUFpQkgsS0FBSyxFQUFDOztFQS9MaEI7Q0FrTWhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUFwTXBCO0NBdU1oQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBek1BO0NBNE1oQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkQsS0FBSyxFQUFDOztFQTlNakI7Q0FpTmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUFuTkE7Q0FzTmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUF4TmxCO0NBMk5oQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBN05sQjtDQWdPaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQWxPbEI7Q0FxT2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUF2T2pCO0NBME9oQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBNU9uQjtDQStPaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQWpQQTtDQW9QaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkMsTUFBTSxFQUFDOztFQXRQakI7Q0F5UGhCO0dBQ0VMLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUEzUG5CO0NBOFBoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBaFFuQjtDQW1RaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXJRQTtDQXdRaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQzs7RUExUWxEO0NBNlFoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUEvUUE7Q0FrUmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXBSQTtDQXVSaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQXpSakI7Q0E0UmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQTlSQTtDQWlTaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQW5TakI7Q0FzU2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUF4U25CO0NBMlNoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBN1NBO0NBZ1RoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBbFRBO0NBcVRoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBdlRuQjtDQTBUaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQTVUbkI7Q0ErVGhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBalVoQjtDQW9VaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQXRVbkI7Q0F5VWhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUEzVWpCO0NBOFVoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBaFZqQjtDQW1WaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQXJWakI7Q0F3VmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUExVm5CO0NBNlZoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBL1ZuQjtDQWtXaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQXBXbkI7Q0F1V2hCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBeldoQjtDQTRXaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQTlXbkI7Q0FpWGhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUFuWEE7Q0FzWGhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUF4WGpCO0NBMlhoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBN1hqQjtDQWdZaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQWxZbkI7Q0FxWWhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUF2WW5CO0NBMFloQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBNVlBO0NBK1loQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBalpBO0NBb1poQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBdFpBO0NBeVpoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBM1pqQjtDQThaaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQWhhakI7Q0FtYWhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUFyYW5CO0NBd2FoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBMWFBO0NBNmFoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBL2FuQjtDQWtiaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXBiQTtDQXViaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXpiQTtDQTRiaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQTliakI7Q0FpY2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDOztFQW5jRjtDQXNjaEI7R0FDRUYsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQXhjbkI7Q0EyY2hCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUE3Y25CO0NBZ2RoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDRyxPQUFPLEVBQUM7O0VBbGREO0NBcWRoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDRyxPQUFPLEVBQUM7O0VBdmREO0NBMGRoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNHLE9BQU8sRUFBQzs7RUE1ZEQ7Q0ErZGhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDOztFQWplRjtDQW9laEI7R0FDRUYsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQXRlakI7Q0F5ZWhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUEzZW5CO0NBOGVoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBaGZBO0NBbWZoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBcmZBO0NBd2ZoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBMWZuQjtDQTZmaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQS9mQTtDQWtnQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBcGdCakI7Q0F1Z0JoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBemdCQTtDQTRnQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUE5Z0JqQjtDQWloQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUFuaEJqQjtDQXNoQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUF4aEJqQjtDQTJoQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUE3aEJuQjtDQWdpQmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUFsaUJuQjtDQXFpQmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUF2aUJuQjtDQTBpQmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7O0VBNWlCbEQ7Q0EraUJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDOztFQWpqQmxEO0NBb2pCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDLFFBQVQ7S0FBa0JELEtBQUssRUFBQzs7RUF0akJqQjtDQXlqQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUEzakJBO0NBOGpCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQWhrQmpCO0NBbWtCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQXJrQmpCO0NBd2tCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUM7O0VBMWtCRjtDQTZrQmhCO0dBQ0VGLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUEva0JuQjtDQWtsQmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUFwbEJuQjtDQXVsQmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUF6bEJqQjtDQTRsQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUE5bEJqQjtDQWltQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUFubUJqQjtDQXNtQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUF4bUJqQjtDQTJtQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUE3bUJqQjtDQWduQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUFsbkJqQjtDQXFuQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUF2bkJuQjtDQTBuQmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUE1bkJBO0NBK25CaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDLFFBQVQ7S0FBa0JELEtBQUssRUFBQzs7RUFqb0JqQjtDQW9vQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUF0b0JBO0NBeW9CaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBM29CRjtDQThvQmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUFocEJuQjtDQW1wQmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBcnBCakI7Q0F3cEJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkQsS0FBSyxFQUFDOztFQTFwQmpCO0NBNnBCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQS9wQkE7Q0FrcUJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBcHFCbkI7Q0F1cUJoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkQsS0FBSyxFQUFDOztFQXpxQmpCO0NBNHFCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQzs7RUE5cUJsRDtDQWlyQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBbnJCakI7Q0FzckJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBeHJCQTtDQTJyQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUE3ckJqQjtDQWdzQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQWxzQkE7Q0Fxc0JoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQzs7RUF2c0JGO0NBMHNCaEI7R0FDRUYsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQTVzQm5CO0NBK3NCaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDOztFQWp0QkY7Q0FvdEJoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBdHRCRjtDQXl0QmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUEzdEJBO0NBOHRCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQWh1Qm5CO0NBbXVCaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDOztFQXJ1QkY7Q0F3dUJoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBMXVCRjtDQTZ1QmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQzs7RUEvdUJGO0NBa3ZCaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXB2QkE7Q0F1dkJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBenZCbkI7Q0E0dkJoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBOXZCRjtDQWl3QmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQzs7RUFud0JGO0NBc3dCaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXh3QkE7Q0Eyd0JoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NELEtBQUssRUFBQzs7RUE3d0JsQztDQWd4QmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUFseEJBO0NBcXhCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUM7O0VBdnhCRjtDQTB4QmhCO0dBQ0VGLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUE1eEJqQjtDQSt4QmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUFqeUJuQjtDQW95QmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUF0eUJBO0NBeXlCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDOztFQTN5QkY7Q0E4eUJoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBaHpCQTtDQW16QmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDLFFBQVQ7S0FBa0JDLE1BQU0sRUFBQzs7RUFyekJsQjtDQXd6QmhCO0dBQ0VMLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUExekJuQjtDQTZ6QmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUEvekJBO0NBazBCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDLFFBQVQ7S0FBa0JELEtBQUssRUFBQzs7RUFwMEJqQjtDQXUwQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBejBCakI7Q0E0MEJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBOTBCQTtDQWkxQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUFuMUJuQjtDQXMxQmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7O0VBeDFCbEQ7Q0EyMUJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBNzFCQTtDQWcyQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUFsMkJBO0NBcTJCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBdjJCQTtDQTAyQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQTUyQkE7Q0ErMkJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBajNCakI7Q0FvM0JoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUF0M0JBO0NBeTNCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQTMzQmpCO0NBODNCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQWg0Qm5CO0NBbTRCaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQXI0Qm5CO0NBdzRCaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDLFFBQVQ7S0FBa0JELEtBQUssRUFBQzs7RUExNEJqQjtDQTY0QmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUEvNEJBO0NBazVCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXA1QkE7Q0F1NUJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBejVCakI7Q0E0NUJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQzs7RUE5NUJGO0NBaTZCaEI7R0FDRUYsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQW42QmpCO0NBczZCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQXg2Qm5CO0NBMjZCaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDLFFBQVQ7S0FBa0JELEtBQUssRUFBQzs7RUE3NkJqQjtDQWc3QmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUFsN0JBO0NBcTdCaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBdjdCRjtDQTA3QmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUE1N0JuQjtDQSs3QmhCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBajhCakI7Q0FvOEJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBdDhCakI7Q0F5OEJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBMzhCakI7Q0E4OEJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBaDlCakI7Q0FtOUJoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQzs7RUFyOUJuQztDQXc5QmhCO0dBQ0VMLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQzs7RUExOUJGO0NBNjlCaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkMsTUFBTSxFQUFDOztFQS85QmxCO0NBaytCaEI7R0FDRUwsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUM7O0VBcCtCbkM7Q0F1K0JoQjtHQUNFTCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBeitCQTtDQTQrQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQzs7RUE5K0JGO0NBaS9CaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUM7O0VBbi9CbkM7Q0FzL0JoQjtHQUNFTCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBeC9CQTtDQTIvQmhCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUE3L0JBO0NBZ2dDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUM7O0VBbGdDbkM7Q0FxZ0NoQjtHQUNFTCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkQsS0FBSyxFQUFDOztFQXZnQ2pCO0NBMGdDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDOztFQTVnQ0Y7Q0ErZ0NoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkQsS0FBSyxFQUFDOztFQWpoQ2pCO0NBb2hDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQXRoQ2pCO0NBeWhDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQTNoQ2pCO0NBOGhDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0ksTUFBTSxFQUFDOztFQWhpQ0Q7Q0FtaUNoQjtHQUNFTCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDSSxNQUFNLEVBQUM7O0VBcmlDRDtDQXdpQ2hCO0dBQ0VMLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNJLE1BQU0sRUFBQzs7RUExaUNEO0NBNmlDaEI7R0FDRUwsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQS9pQ2pCO0NBa2pDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQzs7RUFwakNsRDtDQXVqQ2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBempDakI7Q0E0akNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBOWpDQTtDQWlrQ2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDLFFBQVQ7S0FBa0JDLE1BQU0sRUFBQzs7RUFua0NsQjtDQXNrQ2hCO0dBQ0VMLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7O0VBeGtDbEQ7Q0Eya0NoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBN2tDQTtDQWdsQ2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7O0VBbGxDbEQ7Q0FxbENoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDOztFQXZsQ2xEO0NBMGxDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDLFFBQVQ7S0FBa0JELEtBQUssRUFBQzs7RUE1bENqQjtDQStsQ2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBam1DakI7Q0FvbUNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBdG1DakI7Q0F5bUNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBM21DakI7Q0E4bUNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBaG5DakI7Q0FtbkNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBcm5DbkI7Q0F3bkNoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQzs7RUExbkNuQztDQTZuQ2hCO0dBQ0VMLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCRCxLQUFLLEVBQUM7O0VBL25DakI7Q0Frb0NoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBcG9DRjtDQXVvQ2hCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUF6b0NBO0NBNG9DaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQTlvQ2pCO0NBaXBDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQW5wQ2pCO0NBc3BDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQXhwQ25CO0NBMnBDaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDLFFBQVQ7S0FBa0JELEtBQUssRUFBQzs7RUE3cENqQjtDQWdxQ2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQzs7RUFscUNGO0NBcXFDaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkMsTUFBTSxFQUFDOztFQXZxQ2xCO0NBMHFDaEI7R0FDRUwsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQTVxQ25CO0NBK3FDaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQWpyQ0E7Q0FvckNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBdHJDRjtDQXlyQ2hCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUEzckNBO0NBOHJDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQWhzQ25CO0NBbXNDaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXJzQ0E7Q0F3c0NoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBMXNDRjtDQTZzQ2hCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUEvc0NBO0NBa3RDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQzs7RUFwdENsRDtDQXV0Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUF6dENBO0NBNHRDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0csT0FBTyxFQUFDOztFQTl0Q0Y7Q0FpdUNoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBbnVDRjtDQXN1Q2hCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLG9CQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQzs7RUF4dUNGO0NBMnVDaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQTd1Q0E7Q0FndkNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUFsdkNBO0NBcXZDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBdnZDQTtDQTB2Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUE1dkNqQjtDQSt2Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQWp3Q0E7Q0Fvd0NoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQzs7RUF0d0NGO0NBeXdDaEI7R0FDRUYsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQTN3Q2pCO0NBOHdDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDSSxNQUFNLEVBQUM7O0VBaHhDRDtDQW14Q2hCO0dBQ0VMLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDOztFQXJ4Q0Y7Q0F3eENoQjtHQUNFRixPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDOztFQTF4Q2xEO0NBNnhDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBL3hDQTtDQWt5Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXB5Q0E7Q0F1eUNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBenlDakI7Q0E0eUNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUE5eUNBO0NBaXpDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DRCxLQUFLLEVBQUM7O0VBbnpDbEM7Q0FzekNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBeHpDakI7Q0EyekNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFDO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBN3pDbkI7Q0FnMENoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBbDBDQTtDQXEwQ2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUF2MENqQjtDQTAwQ2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUE1MENqQjtDQSswQ2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUFqMUNqQjtDQW8xQ2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0QsS0FBSyxFQUFDOztFQXQxQ2xDO0NBeTFDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQTMxQ25CO0NBODFDaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkMsTUFBTSxFQUFDOztFQWgyQ2xCO0NBbTJDaEI7R0FDRUwsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDOztFQXIyQ25CO0NBdzJDaEI7R0FDRUosT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUM7O0VBMTJDRjtDQTYyQ2hCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUM7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7O0VBLzJDbEQ7Q0FrM0NoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUFwM0NBO0NBdTNDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBQztLQUFDQyxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDOztFQXozQ2pCO0NBNDNDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBOTNDQTtDQWk0Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUFuNENsQjtDQXM0Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUF4NENsQjtDQTI0Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUE3NENsQjtDQWc1Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQzs7RUFsNUNsQjtDQXE1Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQXY1Q0E7Q0EwNUNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNHLE9BQU8sRUFBQyxRQUFUO0tBQWtCQyxNQUFNLEVBQUM7O0VBNTVDbEI7Q0ErNUNoQjtHQUNFTCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNDLFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUM7O0VBajZDcEI7Q0FvNkNoQjtHQUNFSixPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBdDZDQTtDQXk2Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQzs7RUEzNkNwQjtDQTg2Q2hCO0dBQ0VKLE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7O0VBaDdDbkQ7Q0FtN0NoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxvQkFBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRyxPQUFPLEVBQUMsUUFBVDtLQUFrQkQsS0FBSyxFQUFDOztFQXI3Q2pCO0NBdzdDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsb0JBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFDOztFQTE3Q0E7Q0E2N0NoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNFLEtBQUssRUFBQzs7RUEvN0NBO0NBazhDaEI7R0FDRUgsT0FBTyxFQUFFLENBQUMsY0FBRCxDQURYO0dBRUVDLEtBQUssRUFBRTtLQUFDRSxLQUFLLEVBQUM7O0VBcDhDQTtDQXU4Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0MsUUFBUSxFQUFFLFFBQVg7S0FBb0JDLEtBQUssRUFBRTs7RUF6OENwQjtDQTQ4Q2hCO0dBQ0VILE9BQU8sRUFBRSxDQUFDLGNBQUQsQ0FEWDtHQUVFQyxLQUFLLEVBQUU7S0FBQ0UsS0FBSyxFQUFFOztFQTk4Q0Q7Q0FpOUNoQjtHQUNFSCxPQUFPLEVBQUUsQ0FBQyxjQUFELENBRFg7R0FFRUMsS0FBSyxFQUFFO0tBQUNDLFFBQVEsRUFBRSxRQUFYO0tBQW9CRSxPQUFPLEVBQUUsUUFBN0I7S0FBc0NDLE1BQU0sRUFBRTs7RUFuOUN2QyxDQUFsQjtDQXU5Q0EsSUFBTUUsT0FBTyxHQUFHOzthQUVKO0tBQUNMLFFBQVEsRUFBQztJQUZOOzthQUlMO0tBQUNBLFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7SUFKcEI7O2FBTUw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQztJQU5wQjs7YUFRTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBUnBCOzthQVVMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7SUFWcEI7O2FBWUw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUFackQ7O2FBY0w7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQztJQWRwQjs7YUFnQkw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUFoQnJEOzthQWtCTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBbEJwQjs7YUFvQkw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUFwQnJEOzthQXNCTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQXRCckQ7O2FBd0JMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBeEJyRDs7YUEwQkw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUExQnJEOzthQTRCTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQTVCckQ7O2FBOEJMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7SUE5QnBCOzthQWdDTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBaENwQjs7YUFrQ0w7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQztJQWxDcEI7O2FBb0NMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7SUFwQ3BCOzthQXNDTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQXRDckQ7O2FBd0NMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBeENyRDs7YUEwQ0w7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUExQ3JEOzthQTRDTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQTVDckQ7O2FBOENMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBOUNyRDs7YUFnREw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUFoRHJEOzthQWtETDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQWxEckQ7O2FBb0RMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBcERyRDs7YUFzREw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUF0RHJEOzthQXdETDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQXhEckQ7O2FBMERMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBMURyRDs7YUE0REw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUE1RHJEOzthQThETDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQTlEckQ7O2FBZ0VMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBaEVyRDs7YUFrRUw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUFsRXJEOzthQW9FTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQXBFckQ7O2FBc0VMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7SUF0RXBCOzthQXdFTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBeEVwQjs7YUEwRUw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUExRXJEOzthQTRFTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBNUVwQjs7YUE4RUw7S0FBQ0QsUUFBUSxFQUFDO0lBOUVMOzthQWdGTDtLQUFDQSxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQWhGckQ7O2FBa0ZMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBbEZyRDs7YUFvRkw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUFwRnJEOzthQXNGTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQXRGckQ7O2FBd0ZMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBeEZyRDs7YUEwRkw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUExRnJEOzthQTRGTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQTVGckQ7O2FBOEZMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBOUZyRDs7YUFnR0w7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUFoR3JEOzthQWtHTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQWxHckQ7O2FBb0dMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7SUFwR3BCOzthQXNHTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBdEdwQjs7YUF3R0w7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQztJQXhHcEI7O2FBMEdMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7SUExR3BCOzthQTRHTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBNUdwQjs7YUE4R0w7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQztJQTlHcEI7O2FBZ0hMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBaEhyRDs7YUFrSEw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUFsSHJEOzthQW9ITDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQXBIckQ7O2FBc0hMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBdEhyRDs7YUF3SEw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUF4SHJEOzthQTBITDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQTFIckQ7O2FBNEhMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBNUhyRDs7YUE4SEw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQztJQTlIcEI7O2FBZ0lMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBaElyRDs7YUFrSUw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUFsSXJEOzthQW9JTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBcElwQjs7YUFzSUw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJFLE9BQU8sRUFBQyxRQUEzQjtLQUFvQ0MsTUFBTSxFQUFDLFFBQTNDO0tBQW9ERixLQUFLLEVBQUM7SUF0SXJEOzthQXdJTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBeElwQjs7YUEwSUw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQztJQTFJcEI7O2FBNElMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7SUE1SXBCOzthQThJTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkMsS0FBSyxFQUFDO0lBOUlwQjs7YUFnSkw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQztJQWhKcEI7O2FBa0pMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7SUFsSnBCOzthQW9KTDtLQUFDRCxRQUFRLEVBQUMsUUFBVjtLQUFtQkUsT0FBTyxFQUFDLFFBQTNCO0tBQW9DQyxNQUFNLEVBQUMsUUFBM0M7S0FBb0RGLEtBQUssRUFBQztJQXBKckQ7O2FBc0pMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CRSxPQUFPLEVBQUMsUUFBM0I7S0FBb0NDLE1BQU0sRUFBQyxRQUEzQztLQUFvREYsS0FBSyxFQUFDO0lBdEpyRDs7YUF3Skw7S0FBQ0QsUUFBUSxFQUFDLFFBQVY7S0FBbUJDLEtBQUssRUFBQztJQXhKcEI7O2FBMEpMO0tBQUNELFFBQVEsRUFBQyxRQUFWO0tBQW1CQyxLQUFLLEVBQUM7O0VBMUpwQzs7Q0E4SkEsSUFBTUssVUFBVSxHQUFHLElBQUlDLE1BQUosQ0FBVyxrSEFBWCxDQUFuQjs7Q0FFQSxTQUFTQyw0QkFBVCxDQUFzQ0MsTUFBdEMsRUFBOEM7T0FDMUMsQ0FBQ0osT0FBTyxDQUFDSSxNQUFELENBQVosRUFBc0I7WUFDYixLQUFQOzs7T0FFRVYsS0FBSyxHQUFHTSxPQUFPLENBQUNJLE1BQUQsQ0FBbkI7VUFDT1YsS0FBSyxDQUFDRSxLQUFOLElBQWVGLEtBQUssQ0FBQ0ksTUFBNUI7OztDQUdBLFNBQVNPLDJCQUFULENBQXFDRCxNQUFyQyxFQUE2QztPQUN6QyxDQUFDSixPQUFPLENBQUNJLE1BQUQsQ0FBWixFQUFzQjtZQUNiLEtBQVA7OztPQUVFVixLQUFLLEdBQUdNLE9BQU8sQ0FBQ0ksTUFBRCxDQUFuQjtVQUNPVixLQUFLLENBQUNHLE9BQU4sSUFBaUJILEtBQUssQ0FBQ0ksTUFBOUI7OztDQUdBLFNBQVNRLHVDQUFULENBQWlERixNQUFqRCxFQUF5RDtPQUNyRCxDQUFDSixPQUFPLENBQUNJLE1BQUQsQ0FBWixFQUFzQjtZQUNiLEtBQVA7OztPQUVFVixLQUFLLEdBQUdNLE9BQU8sQ0FBQ0ksTUFBRCxDQUFuQjtVQUNPVixLQUFLLENBQUNJLE1BQWI7Ozs7Ozs7Ozs7Q0FVQSxTQUFTUyxPQUFULENBQWlCQyxJQUFqQixFQUF1QmpFLE9BQXZCLEVBQWdDO09BQzVCLENBQUNpRSxJQUFMLEVBQVc7WUFDRixFQUFQOzs7T0FFRSxDQUFDakUsT0FBTCxFQUFjO0tBQ1pBLE9BQU8sR0FBRyxFQUFWOzs7T0FFRWtFLE1BQU0sR0FBRyxFQUFiO09BRU1DLE1BQU0sR0FBRyxDQUFmO09BQ01DLElBQUksR0FBRyxDQUFiO09BQ01DLGFBQWEsR0FBRyxDQUFDLENBQXZCLENBWGdDOztPQWM1QkMsY0FBYyxHQUFHdEUsT0FBTyxDQUFDc0UsY0FBUixJQUEwQixLQUEvQzs7UUFDSyxJQUFJaEosQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzJJLElBQUksQ0FBQ2hKLE1BQXpCLEVBQWlDSyxDQUFDLEVBQWxDLEVBQXNDO1NBQ2hDdUksTUFBTSxHQUFHSSxJQUFJLENBQUMzSSxDQUFELENBQWpCLENBRG9DOztTQUloQ2dKLGNBQWMsSUFBSVosVUFBVSxDQUFDYSxLQUFYLENBQWlCVixNQUFqQixDQUF0QixFQUFnRDtPQUM5Q0ssTUFBTSxDQUFDekosSUFBUCxDQUFZLENBQUMsRUFBRCxFQUFLNEosYUFBTCxDQUFaOzs7U0FHRSxDQUFDWixPQUFPLENBQUNJLE1BQUQsQ0FBWixFQUFzQjs7T0FFcEJLLE1BQU0sQ0FBQ3pKLElBQVAsQ0FBWSxDQUFDb0osTUFBRCxFQUFTUSxhQUFULENBQVo7TUFGRixNQUdPLElBQUksQ0FBQ0gsTUFBTSxDQUFDakosTUFBWixFQUFvQjs7T0FFekJpSixNQUFNLENBQUN6SixJQUFQLENBQVksQ0FBQ29KLE1BQUQsRUFBUyxVQUFULENBQVo7TUFGSyxNQUdBO1dBQ0RXLGVBQWUsR0FBR04sTUFBTSxDQUFDQSxNQUFNLENBQUNqSixNQUFQLEdBQWdCLENBQWpCLENBQTVCOztXQUNJdUosZUFBZSxDQUFDSixJQUFELENBQWYsS0FBMEJDLGFBQTlCLEVBQTZDOztTQUUzQ0gsTUFBTSxDQUFDekosSUFBUCxDQUFZLENBQUNvSixNQUFELEVBQVMsVUFBVCxDQUFaO1FBRkYsTUFHTyxJQUFJLENBQUVELDRCQUE0QixDQUFDQyxNQUFELENBQWxDLEVBQTZDOztTQUVsREssTUFBTSxDQUFDekosSUFBUCxDQUFZLENBQUNvSixNQUFELEVBQVMsVUFBVCxDQUFaO1FBRkssTUFHQSxJQUFJLENBQUVDLDJCQUEyQixDQUFDVSxlQUFlLENBQUNMLE1BQUQsQ0FBaEIsQ0FBakMsRUFBNkQ7O1NBRWxFRCxNQUFNLENBQUN6SixJQUFQLENBQVksQ0FBQ29KLE1BQUQsRUFBUyxVQUFULENBQVo7UUFGSyxNQUdBLElBQUlXLGVBQWUsQ0FBQ0osSUFBRCxDQUFmLEtBQTBCLE9BQTFCLElBQXFDLENBQUNMLHVDQUF1QyxDQUFDUyxlQUFlLENBQUNMLE1BQUQsQ0FBaEIsQ0FBakYsRUFBNEc7O1NBRWpIRCxNQUFNLENBQUN6SixJQUFQLENBQVksQ0FBQ29KLE1BQUQsRUFBUyxVQUFULENBQVo7UUFGSyxNQUdBLElBQUlXLGVBQWUsQ0FBQ0osSUFBRCxDQUFmLElBQXlCLFVBQTdCLEVBQXlDOzs7U0FHOUNGLE1BQU0sQ0FBQ0EsTUFBTSxDQUFDakosTUFBUCxHQUFnQixDQUFqQixDQUFOLENBQTBCLENBQTFCLElBQStCLFNBQS9CO1NBQ0FpSixNQUFNLENBQUN6SixJQUFQLENBQVksQ0FBQ29KLE1BQUQsRUFBUyxPQUFULENBQVo7UUFKSyxNQUtBOzs7U0FHTEssTUFBTSxDQUFDQSxNQUFNLENBQUNqSixNQUFQLEdBQWdCLENBQWpCLENBQU4sQ0FBMEIsQ0FBMUIsSUFBK0IsUUFBL0I7U0FDQWlKLE1BQU0sQ0FBQ3pKLElBQVAsQ0FBWSxDQUFDb0osTUFBRCxFQUFTLE9BQVQsQ0FBWjs7O0lBcEQwQjs7O09BMEQ1QjdELE9BQU8sQ0FBQ3lFLFNBQVIsS0FBc0IsS0FBMUIsRUFBaUM7VUFDMUIsSUFBSUMsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3pCLFNBQVMsQ0FBQ2hJLE1BQTlCLEVBQXNDeUosQ0FBQyxFQUF2QyxFQUEyQztXQUNyQ0MsUUFBUSxHQUFHMUIsU0FBUyxDQUFDeUIsQ0FBRCxDQUF4Qjs7WUFDSyxJQUFJRSxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHRCxRQUFRLENBQUN6QixPQUFULENBQWlCakksTUFBckMsRUFBNkMySixDQUFDLEVBQTlDLEVBQWtEO2FBQzVDQyxPQUFPLEdBQUdGLFFBQVEsQ0FBQ3pCLE9BQVQsQ0FBaUIwQixDQUFqQixDQUFkO2FBQ0lFLFlBQVksR0FBR2IsSUFBbkI7YUFDSWMsa0JBQWtCLEdBQUcsQ0FBekI7O2dCQUNPRCxZQUFZLENBQUNoSSxPQUFiLENBQXFCK0gsT0FBckIsSUFBZ0MsQ0FBQyxDQUF4QyxFQUEyQzs7ZUFFckNHLENBQUMsR0FBR0YsWUFBWSxDQUFDaEksT0FBYixDQUFxQitILE9BQXJCLENBQVI7ZUFDSUksVUFBVSxHQUFHZixNQUFNLENBQUNjLENBQUMsR0FBR0Qsa0JBQUwsQ0FBTixDQUErQlgsSUFBL0IsQ0FBakI7ZUFDSWMsUUFBUSxHQUFHaEIsTUFBTSxDQUFDYyxDQUFDLEdBQUdELGtCQUFKLEdBQXlCRixPQUFPLENBQUM1SixNQUFqQyxHQUEwQyxDQUEzQyxDQUFOLENBQW9EbUosSUFBcEQsQ0FBZjtlQUNJZSxhQUFhLEdBQUcsSUFBcEI7Ozs7Ozs7Ozs7OztlQWFJRixVQUFVLEtBQUssVUFBZixJQUE2QkEsVUFBVSxLQUFLLFNBQWhELEVBQTJEO2lCQUNyREMsUUFBUSxLQUFLLFVBQWIsSUFBMkJBLFFBQVEsS0FBSyxPQUE1QyxFQUFxRDtlQUNuREMsYUFBYSxHQUFHLFVBQWhCO2NBREYsTUFFTztlQUNMQSxhQUFhLEdBQUcsU0FBaEI7O1lBSkosTUFNTztpQkFDREQsUUFBUSxLQUFLLFVBQWIsSUFBMkJBLFFBQVEsS0FBSyxPQUE1QyxFQUFxRDtlQUNuREMsYUFBYSxHQUFHLE9BQWhCO2NBREYsTUFFTztlQUNMQSxhQUFhLEdBQUcsUUFBaEI7Ozs7ZUFHQSxDQUFDUixRQUFRLENBQUN4QixLQUFULENBQWVnQyxhQUFmLENBQUwsRUFBb0M7O2FBRWxDSixrQkFBa0IsSUFBSUMsQ0FBQyxHQUFHLENBQTFCO2FBQ0FGLFlBQVksR0FBR0EsWUFBWSxDQUFDTSxTQUFiLENBQXVCTCxrQkFBdkIsQ0FBZjs7OztXQUdGYixNQUFNLENBQUNjLENBQUMsR0FBR0Qsa0JBQUwsQ0FBTixDQUErQixDQUEvQixJQUFvQ0osUUFBUSxDQUFDeEIsS0FBVCxDQUFlZ0MsYUFBZixDQUFwQztXQUNBakIsTUFBTSxDQUFDYyxDQUFDLEdBQUdELGtCQUFMLENBQU4sQ0FBK0IsQ0FBL0IsSUFBb0NWLGFBQXBDOztnQkFDSyxJQUFJZ0IsQ0FBQyxHQUFHTCxDQUFDLEdBQUdELGtCQUFKLEdBQXlCLENBQXRDLEVBQXlDTSxDQUFDLEdBQUdMLENBQUMsR0FBR0Qsa0JBQUosR0FBeUJGLE9BQU8sQ0FBQzVKLE1BQTlFLEVBQXNGb0ssQ0FBQyxFQUF2RixFQUEyRjthQUN6Rm5CLE1BQU0sQ0FBQ21CLENBQUQsQ0FBTixHQUFZLENBQUMsRUFBRCxFQUFLaEIsYUFBTCxDQUFaOzs7V0FFRlUsa0JBQWtCLElBQUlDLENBQUMsR0FBRyxDQUExQjtXQUNBRixZQUFZLEdBQUdBLFlBQVksQ0FBQ00sU0FBYixDQUF1Qkwsa0JBQXZCLENBQWY7Ozs7OztVQU1EYixNQUFNLENBQUNvQixHQUFQLENBQVcsVUFBU0MsQ0FBVCxFQUFZO1NBQ3hCQSxDQUFDLENBQUNuQixJQUFELENBQUQsS0FBWUMsYUFBWixJQUE2QmtCLENBQUMsQ0FBQ3BCLE1BQUQsQ0FBRCxDQUFVbEosTUFBM0MsRUFBbUQ7Y0FDMUNzSyxDQUFDLENBQUNwQixNQUFELENBQVI7TUFERixNQUVPLElBQUluRSxPQUFPLENBQUN3RixjQUFSLElBQTBCRCxDQUFDLENBQUNuQixJQUFELENBQUQsS0FBWSxVQUExQyxFQUFzRDtjQUNwRG1CLENBQUMsQ0FBQ3BCLE1BQUQsQ0FBRCxJQUFhLEVBQXBCO01BREssTUFFQTtjQUNFLENBQUNWLE9BQU8sQ0FBQzhCLENBQUMsQ0FBQ3BCLE1BQUQsQ0FBRixDQUFQLElBQXNCLEVBQXZCLEVBQTJCb0IsQ0FBQyxDQUFDbkIsSUFBRCxDQUE1QixLQUF1QyxFQUE5Qzs7SUFORyxFQVFKcUIsSUFSSSxDQVFDLEVBUkQsQ0FBUDs7O0NBV0E1USxvQkFBQSxHQUFpQjtHQUNqQjRPLE9BQU8sRUFBRUEsT0FEUTtHQUVqQlIsU0FBUyxFQUFUQSxTQUZpQjtHQUVOQSxTQUFTLEVBQVRBLFNBRk07R0FHakJlLE9BQU8sRUFBRUE7RUFIVDs7O0NDeHhEQW5QLGVBQUEsR0FBaUI2USxTQUFqQjtDQUVBLElBQUlDLEdBQUcsR0FBRyx5Q0FBVjtDQUNBLElBQUlDLEdBQUcsR0FDTCw2QkFDQSwwREFEQSxHQUVBLDRCQUhGO0NBS0EsSUFBSUMsR0FBRyxHQUFHLElBQUlsQyxNQUFKLENBQVcsUUFBUWlDLEdBQVIsR0FBYyxLQUFkLEdBQXNCRCxHQUF0QixHQUE0QixHQUF2QyxDQUFWO0NBQ0EsSUFBSUcsR0FBRyxHQUFHLElBQUluQyxNQUFKLENBQVcsUUFBUWdDLEdBQVIsR0FBYyxLQUFkLEdBQXNCQyxHQUF0QixHQUE0QixHQUF2QyxDQUFWOztDQUVBLFNBQVNGLFNBQVQsQ0FBbUJyTixLQUFuQixFQUEwQjtHQUN4QkEsS0FBSyxHQUFHME4sTUFBTSxDQUFDMU4sS0FBSyxJQUFJLEVBQVYsQ0FBZDs7T0FFSXdOLEdBQUcsQ0FBQzNELElBQUosQ0FBUzdKLEtBQVQsQ0FBSixFQUFxQjtZQUNaLEtBQVA7OztPQUdFeU4sR0FBRyxDQUFDNUQsSUFBSixDQUFTN0osS0FBVCxDQUFKLEVBQXFCO1lBQ1osS0FBUDs7O1VBR0ssU0FBUDs7O0FDeEJGLGdCQUFlLFVBQUMyTixHQUFELEVBQVM7Q0FDdEIsU0FBT0EsR0FBRyxDQUFDQyxLQUFKLENBQVUsRUFBVixFQUFjakwsT0FBZCxHQUF3QnlLLElBQXhCLENBQTZCLEVBQTdCLENBQVA7Q0FDRCxDQUZEOztDQ0lBLElBQU1TLEtBQUssR0FBRyxTQUFSQSxLQUFRLENBQUNGLEdBQUQ7Q0FBQSxTQUFTTixXQUFTLENBQUNNLEdBQUQsQ0FBVCxLQUFtQixLQUE1QjtDQUFBLENBQWQ7O0NBRUEsSUFBTUcsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0gsR0FBRDtDQUFBLFNBQVNOLFdBQVMsQ0FBQ00sR0FBRCxDQUFULEtBQW1CLFNBQTVCO0NBQUEsQ0FBbEI7O0NBRUEsSUFBTUMsS0FBSyxHQUFHLFNBQVJBLEtBQVEsQ0FBQ0QsR0FBRCxFQUFNSSxNQUFOLEVBQWlCO0NBQzdCLE1BQUlDLFFBQVEsR0FBR0QsTUFBTSxDQUFDLENBQUQsQ0FBckIsQ0FENkI7O0NBRTdCLE9BQUssSUFBSTlLLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUc4SyxNQUFNLENBQUNuTCxNQUEzQixFQUFtQ0ssQ0FBQyxFQUFwQyxFQUF1QztDQUNuQzBLLElBQUFBLEdBQUcsR0FBR0EsR0FBRyxDQUFDQyxLQUFKLENBQVVHLE1BQU0sQ0FBQzlLLENBQUQsQ0FBaEIsRUFBcUJtSyxJQUFyQixDQUEwQlksUUFBMUIsQ0FBTjtDQUNIOztDQUNETCxFQUFBQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ0MsS0FBSixDQUFVSSxRQUFWLENBQU47Q0FDQSxTQUFPTCxHQUFQO0NBQ0QsQ0FQRDs7Q0FTQSxJQUFNTSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDTixHQUFELEVBQTZFO0NBQUEsaUZBQVAsRUFBTztDQUFBLDRCQUF0RU8sU0FBc0U7Q0FBQSxNQUF0RUEsU0FBc0UsK0JBQTFELEtBQTBEO0NBQUEsNEJBQW5EOUIsU0FBbUQ7Q0FBQSxNQUFuREEsU0FBbUQsK0JBQXZDLEtBQXVDO0NBQUEsaUNBQWhDZSxjQUFnQztDQUFBLE1BQWhDQSxjQUFnQyxvQ0FBZixJQUFlOztDQUU3RixNQUFNZ0IsT0FBTyxHQUFHUixHQUFHLENBQUNDLEtBQUosQ0FBVSxFQUFWLEVBQWNRLE1BQWQsQ0FBcUIsVUFBQUMsSUFBSTtDQUFBLFdBQUlQLFNBQVMsQ0FBQ08sSUFBRCxDQUFiO0NBQUEsR0FBekIsQ0FBaEI7Q0FFQSxNQUFJQyxRQUFKLENBSjZGOztDQU83RixNQUFJSCxPQUFPLENBQUN2TCxNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0NBQ3hCMEwsSUFBQUEsUUFBUSxHQUFHVCxLQUFLLENBQUNGLEdBQUQsQ0FBTCxHQUFhQSxHQUFiLEdBQW1CaEwsT0FBTyxDQUFDZ0wsR0FBRCxDQUFyQztDQUNELEdBRkQsTUFHSztDQUNIVyxJQUFBQSxRQUFRLEdBQUdWLEtBQUssQ0FBQ0QsR0FBRCxFQUFNUSxPQUFOLENBQUwsQ0FBb0JsQixHQUFwQixDQUF3QixVQUFBc0IsSUFBSSxFQUFJO0NBQ3pDLFVBQUlWLEtBQUssQ0FBQ1UsSUFBRCxDQUFULEVBQWlCO0NBQ2YsZUFBT0EsSUFBUDtDQUNELE9BRkQsTUFHSztDQUNILFlBQU1DLFlBQVksR0FBRzdDLGtCQUFPLENBQUM0QyxJQUFELEVBQU87Q0FBQ25DLFVBQUFBLFNBQVMsRUFBVEEsU0FBRDtDQUFZZSxVQUFBQSxjQUFjLEVBQWRBO0NBQVosU0FBUCxDQUE1QjtDQUNBLFlBQU1zQixXQUFXLEdBQUc5TCxPQUFPLENBQUM2TCxZQUFELENBQTNCO0NBQ0EsZUFBT0MsV0FBUDtDQUNEO0NBQ0YsS0FUVSxDQUFYO0NBVUQ7O0NBRUQsTUFBSUMsV0FBSjs7Q0FFQSxNQUFJQyxLQUFLLENBQUNDLE9BQU4sQ0FBY04sUUFBZCxDQUFKLEVBQTZCO0NBQzNCLFFBQU1PLE1BQU0sR0FBR1AsUUFBUSxDQUFDckIsR0FBVCxDQUFhLFVBQUM2QixDQUFELEVBQUc3TCxDQUFIO0NBQUEsYUFBUyxDQUFDNkwsQ0FBRCxFQUFJWCxPQUFPLENBQUNsTCxDQUFELENBQVgsQ0FBVDtDQUFBLEtBQWIsRUFBdUM4TCxNQUF2QyxDQUE4QyxVQUFDcEMsQ0FBRCxFQUFHcUMsQ0FBSDtDQUFBLGFBQVNyQyxDQUFDLENBQUNzQyxNQUFGLENBQVNELENBQVQsQ0FBVDtDQUFBLEtBQTlDLENBQWY7Q0FDQU4sSUFBQUEsV0FBVyxHQUFHRyxNQUFNLENBQUNsTSxPQUFQLEdBQWlCeUssSUFBakIsQ0FBc0IsRUFBdEIsQ0FBZDtDQUNELEdBSEQsTUFJSztDQUNIc0IsSUFBQUEsV0FBVyxHQUFHSixRQUFkO0NBQ0Q7O0NBRUQsTUFBSUosU0FBSixFQUFlO0NBQ2JRLElBQUFBLFdBQVcsR0FBR0EsV0FBVyxDQUFDZCxLQUFaLENBQWtCLEVBQWxCLEVBQXNCUixJQUF0QixDQUEyQixRQUEzQixDQUFkO0NBQ0Q7O0NBRUQsU0FBT3NCLFdBQVA7Q0FDRCxDQXRDRDs7Q0F3Q0EsSUFBRyxPQUFPUSxPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxPQUFPLENBQUNDLEdBQVIsQ0FBWUMsWUFBakQsRUFBK0Q7Q0FDN0QsTUFBTXhELElBQUksR0FBRywrREFBYjtDQUNBeUQsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlyQixTQUFTLENBQUNyQyxJQUFELEVBQU87Q0FBQ1EsSUFBQUEsU0FBUyxFQUFFO0NBQVosR0FBUCxDQUFyQjtDQUNEOztBQzVERCwwQkFBZSxVQUFDbUQsU0FBRCxFQUFlO0NBQzVCLE1BQU1DLGFBQWEsR0FBR0QsU0FBUyxDQUFDbE0sS0FBVixDQUFnQixDQUFoQixFQUFtQjZELElBQUksQ0FBQ3VJLEtBQUwsQ0FBV0YsU0FBUyxDQUFDM00sTUFBVixHQUFtQixDQUE5QixDQUFuQixDQUF0QjtDQUNBLE1BQU04TSxjQUFjLEdBQUdILFNBQVMsQ0FBQ2xNLEtBQVYsQ0FBZ0I2RCxJQUFJLENBQUN1SSxLQUFMLENBQVdGLFNBQVMsQ0FBQzNNLE1BQVYsR0FBbUIsQ0FBOUIsQ0FBaEIsRUFBa0QyTSxTQUFTLENBQUMzTSxNQUE1RCxDQUF2QjtDQUVBLG1CQUFVakIsUUFBUSxDQUFDNk4sYUFBRCxDQUFsQixjQUFxQzdOLFFBQVEsQ0FBQytOLGNBQUQsQ0FBN0M7Q0FDRCxDQUxEOztDQU9BLElBQU0vTixRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDZ08sS0FBRDtDQUFBLFNBQVdBLEtBQUssQ0FBQ1osTUFBTixDQUFhLFVBQUNhLFdBQUQsRUFBY0MsWUFBZCxFQUE0QkMsS0FBNUIsRUFBc0M7Q0FDN0UsV0FBT0YsV0FBVyxHQUFJQyxZQUFZLEdBQUczSSxJQUFJLENBQUM2SSxHQUFMLENBQVMsR0FBVCxFQUFjRCxLQUFkLENBQXJDO0NBQ0QsR0FGMkIsQ0FBWDtDQUFBLENBQWpCOztBQ1BBLHdCQUFlLFlBQU07Q0FDbkIsTUFBTUUsT0FBTyxHQUFHdlUsTUFBTSxDQUFDK0csSUFBUCxDQUFZeU4sR0FBRyxDQUFDQyxNQUFKLENBQVdDLE1BQVgsQ0FBa0JDLG1CQUE5QixDQUFoQjs7Q0FFQSxNQUFJSixPQUFPLENBQUNwTixNQUFSLEtBQW1CLENBQW5CLElBQXdCb04sT0FBTyxDQUFDLENBQUQsQ0FBbkMsRUFBd0M7Q0FDdEMsV0FBT3ZGLE1BQU0sQ0FBQ0MsV0FBUCxDQUFtQkMsV0FBbkIsQ0FBK0JxRixPQUFPLENBQUMsQ0FBRCxDQUF0QyxDQUFQO0NBQ0Q7O0NBRUQsU0FBTyxLQUFQO0NBQ0QsQ0FSRDs7QUNBQSw0QkFBZSxZQUFNO0NBQ25CLFNBQU92VSxNQUFNLENBQUMrRyxJQUFQLENBQVl5TixHQUFHLENBQUNDLE1BQUosQ0FBV0MsTUFBWCxDQUFrQkMsbUJBQTlCLENBQVA7Q0FDRCxDQUZEOztDQ2NBLElBQU1DLFNBQVMsaTVGQUFmOztLQWdDcUJDOzs7Q0FDbkIsMkJBQWM7Q0FBQTs7Q0FDWixTQUFLQyxNQUFMO0NBQ0E5RixJQUFBQSxNQUFNLENBQUN3RixHQUFQLENBQVdPLGNBQVgsQ0FBMEJDLEVBQTFCLENBQ0UsNEJBREYsRUFFRSxLQUFLQyxnQkFBTCxDQUFzQkMsSUFBdEIsQ0FBMkIsSUFBM0IsQ0FGRjtDQUlBbEcsSUFBQUEsTUFBTSxDQUFDd0YsR0FBUCxDQUFXTyxjQUFYLENBQTBCQyxFQUExQixDQUNFLHdCQURGLEVBRUUsS0FBS0MsZ0JBQUwsQ0FBc0JDLElBQXRCLENBQTJCLElBQTNCLENBRkY7Q0FLQUMsSUFBQUEsV0FBVyxDQUFDLEtBQUtMLE1BQUwsQ0FBWUksSUFBWixDQUFpQixJQUFqQixDQUFELEVBQXlCLEdBQXpCLENBQVg7Q0FDRDs7OztnQ0FFVTtDQUNULGFBQU81RyxRQUFRLENBQUM4RyxjQUFULENBQXdCLGdCQUF4QixDQUFQO0NBQ0Q7OzttQ0FFYTtDQUNaLGFBQU85RyxRQUFRLENBQUM4RyxjQUFULENBQXdCLHlCQUF4QixDQUFQO0NBQ0Q7Ozs0Q0FFc0I7Q0FDckIsYUFBTzlHLFFBQVEsQ0FBQzhHLGNBQVQsQ0FBd0Isa0JBQXhCLENBQVA7Q0FDRDs7OzJDQUVxQjtDQUNwQixhQUFPOUcsUUFBUSxDQUFDOEcsY0FBVCxDQUF3QixpQkFBeEIsQ0FBUDtDQUNEOzs7NkNBRXVCO0NBQ3RCLGFBQU85RyxRQUFRLENBQUM4RyxjQUFULENBQXdCLGFBQXhCLENBQVA7Q0FDRDs7Ozs7Ozs7Ozs7Ozt3QkFHT0MsS0FBSyxDQUNUO0NBQUEseUJBQU0xRyxZQUFZLE9BQU8sUUFBbkIsSUFBK0IyRyxlQUFlLE9BQU8sTUFBM0Q7Q0FBQSxpQkFEUzs7O3FCQUlOLEtBQUtDLFFBQUw7Ozs7O0NBQ0dDLGdCQUFBQSxRQUFRQyxXQUFXLENBQUNiLFNBQUQ7Q0FDbkJjLGdCQUFBQSxZQUFZLEdBQUc5TixLQUFILENBQ2Z4RixJQURlLENBRWRrTSxRQUFRLENBQ0xxSCxzQkFESCxDQUVJLDBDQUZKLEVBR0ksQ0FISixFQUlHQSxzQkFKSCxDQUkwQixlQUoxQixDQUZjLEVBUWZoRCxNQVJlLENBUVIsVUFBQWlELEtBQUs7Q0FBQSx5QkFBSUEsS0FBSyxDQUFDOUcsV0FBTixDQUFrQjlGLE9BQWxCLENBQTBCLE1BQTFCLE1BQXNDLENBQUMsQ0FBM0M7Q0FBQSxpQkFSRyxFQVEyQyxDQVIzQztDQVNsQjBNLGdCQUFBQSxTQUFTLENBQUNHLFdBQVYsQ0FBc0JMLEtBQXRCO0NBRU1NLGdCQUFBQSxXQUFXLEtBQUtDLFdBQUw7Q0FDWEMsZ0JBQUFBLG9CQUFvQixLQUFLQyxvQkFBTDtDQUNwQkMsZ0JBQUFBLG1CQUFtQixLQUFLQyxtQkFBTDtDQUNuQkMsZ0JBQUFBLHFCQUFxQixLQUFLQyxxQkFBTDtDQUNyQkMsZ0JBQUFBLGlCQUFpQkMsbUJBQW1CLEdBQUcsQ0FBSDtDQUMxQyxxQkFBS0QsY0FBTCxHQUFzQkEsY0FBdEI7O3dCQUVNakIsS0FBSyxDQUFDO0NBQUEseUJBQU0sT0FBT2lCLGNBQVAsS0FBMEIsV0FBaEM7Q0FBQSxpQkFBRDs7O0NBRUxFLGdCQUFBQSxtQkFBbUIsS0FBS0MsZUFBTDtDQUN6QlgsZ0JBQUFBLFFBQVEsQ0FBQ3ZSLEtBQVQsR0FBaUJpUyxnQkFBZ0IsQ0FBQ3JHLElBQWxDOztDQUVBLG9CQUFHcUcsZ0JBQWdCLENBQUNFLFFBQXBCLEVBQThCO0NBQzVCVixrQkFBQUEsaUJBQWlCLENBQUNXLE9BQWxCLEdBQTRCSCxnQkFBZ0IsQ0FBQ0UsUUFBakIsQ0FBMEIsQ0FBMUIsQ0FBNUI7Q0FDQVIsa0JBQUFBLGdCQUFnQixDQUFDUyxPQUFqQixHQUEyQkgsZ0JBQWdCLENBQUNFLFFBQWpCLENBQTBCLENBQTFCLENBQTNCO0NBQ0FOLGtCQUFBQSxrQkFBa0IsQ0FBQ08sT0FBbkIsR0FBNkJILGdCQUFnQixDQUFDRSxRQUFqQixDQUEwQixDQUExQixDQUE3QjtDQUNEOztDQUVEWixnQkFBQUEsUUFBUSxDQUFDYyxnQkFBVCxDQUNFLE9BREYsRUFFRTdLLGVBQVEsQ0FBQyxLQUFLOEssV0FBTCxDQUFpQjNCLElBQWpCLENBQXNCLElBQXRCLENBQUQsRUFBOEIsR0FBOUIsQ0FGVjtDQUtBYyxnQkFBQUEsaUJBQWlCLENBQUNZLGdCQUFsQixDQUNFLFFBREYsRUFFRTdLLGVBQVEsQ0FBQyxLQUFLK0ssY0FBTCxDQUFvQjVCLElBQXBCLENBQXlCLElBQXpCLENBQUQsRUFBaUMsR0FBakMsQ0FGVjtDQUtBZ0IsZ0JBQUFBLGdCQUFnQixDQUFDVSxnQkFBakIsQ0FDRSxRQURGLEVBRUU3SyxlQUFRLENBQUMsS0FBSytLLGNBQUwsQ0FBb0I1QixJQUFwQixDQUF5QixJQUF6QixDQUFELEVBQWlDLEdBQWpDLENBRlY7Q0FLQWtCLGdCQUFBQSxrQkFBa0IsQ0FBQ1EsZ0JBQW5CLENBQ0UsUUFERixFQUVFN0ssZUFBUSxDQUFDLEtBQUsrSyxjQUFMLENBQW9CNUIsSUFBcEIsQ0FBeUIsSUFBekIsQ0FBRCxFQUFpQyxHQUFqQyxDQUZWOzs7Ozs7Ozs7Ozs7Ozs7Ozs7c0NBT2E2QixPQUFPO0NBQ3RCLFVBQU1DLEVBQUUsR0FBRyxLQUFLekIsUUFBTCxFQUFYO0NBQ0EsVUFBTTBCLFVBQVUsR0FBRy9ELEtBQUssQ0FBQ2dFLElBQU4sQ0FBV0gsS0FBSyxDQUFDSSxNQUFqQixDQUFuQjtDQUNBLFVBQU14QyxtQkFBbUIsR0FBRzNVLE1BQU0sQ0FBQytHLElBQVAsQ0FDMUJpSSxNQUFNLENBQUN3RixHQUFQLENBQVdDLE1BQVgsQ0FBa0JDLE1BQWxCLENBQXlCQyxtQkFEQyxDQUE1QjtDQUlBLFVBQ0VxQyxFQUFFLEtBQUssSUFBUCxJQUNBQyxVQUFVLENBQUM5UCxNQUFYLEtBQXNCLENBRHRCLElBRUF3TixtQkFBbUIsQ0FBQ3hOLE1BQXBCLEdBQTZCLENBSC9CLEVBS0U7Q0FFRixVQUFNbVAsY0FBYyxHQUFHYyxpQkFBaUIsQ0FBQ0gsVUFBRCxDQUF4QztDQUNBLFdBQUtYLGNBQUwsR0FBc0JBLGNBQXRCO0NBQ0EsVUFBTWUsUUFBUSxHQUFHbkksV0FBVyxDQUFDb0gsY0FBRCxDQUE1Qjs7Q0FFQSxVQUFJZSxRQUFRLEtBQUssTUFBakIsRUFBeUI7Q0FDdkJMLFFBQUFBLEVBQUUsQ0FBQ00sS0FBSCxDQUFTQyxPQUFULEdBQW1CLE9BQW5CO0NBQ0EsWUFBTXpCLFFBQVEsR0FBRyxLQUFLQyxXQUFMLEVBQWpCO0NBQ0EsWUFBTUMsaUJBQWlCLEdBQUcsS0FBS0Msb0JBQUwsRUFBMUI7Q0FDQSxZQUFNQyxnQkFBZ0IsR0FBRyxLQUFLQyxtQkFBTCxFQUF6QjtDQUNBLFlBQU1DLGtCQUFrQixHQUFHLEtBQUtDLHFCQUFMLEVBQTNCO0NBQ0EsWUFBTUcsZ0JBQWdCLEdBQUcsS0FBS0MsZUFBTCxFQUF6QjtDQUNBWCxRQUFBQSxRQUFRLENBQUN2UixLQUFULEdBQWlCaVMsZ0JBQWdCLENBQUNyRyxJQUFsQzs7Q0FFQSxZQUFHcUcsZ0JBQWdCLENBQUNFLFFBQXBCLEVBQThCO0NBQzVCVixVQUFBQSxpQkFBaUIsQ0FBQ1csT0FBbEIsR0FBNEJILGdCQUFnQixDQUFDRSxRQUFqQixDQUEwQixDQUExQixDQUE1QjtDQUNBUixVQUFBQSxnQkFBZ0IsQ0FBQ1MsT0FBakIsR0FBMkJILGdCQUFnQixDQUFDRSxRQUFqQixDQUEwQixDQUExQixDQUEzQjtDQUNBTixVQUFBQSxrQkFBa0IsQ0FBQ08sT0FBbkIsR0FBNkJILGdCQUFnQixDQUFDRSxRQUFqQixDQUEwQixDQUExQixDQUE3QjtDQUNEO0NBQ0YsT0FkRCxNQWNPO0NBQ0xNLFFBQUFBLEVBQUUsQ0FBQ00sS0FBSCxDQUFTQyxPQUFULEdBQW1CLE1BQW5COztDQUNBLFlBQU16QixTQUFRLEdBQUcsS0FBS0MsV0FBTCxFQUFqQjs7Q0FDQSxZQUFNQyxrQkFBaUIsR0FBRyxLQUFLQyxvQkFBTCxFQUExQjs7Q0FDQSxZQUFNQyxpQkFBZ0IsR0FBRyxLQUFLQyxtQkFBTCxFQUF6Qjs7Q0FDQSxZQUFNQyxtQkFBa0IsR0FBRyxLQUFLQyxxQkFBTCxFQUEzQjs7Q0FDQVAsUUFBQUEsU0FBUSxDQUFDdlIsS0FBVCxHQUFpQixFQUFqQjtDQUNBLGFBQUsrUixjQUFMLEdBQXNCLElBQXRCO0NBQ0FOLFFBQUFBLGtCQUFpQixDQUFDVyxPQUFsQixHQUE0QixLQUE1QjtDQUNBVCxRQUFBQSxpQkFBZ0IsQ0FBQ1MsT0FBakIsR0FBMkIsSUFBM0I7Q0FDQVAsUUFBQUEsbUJBQWtCLENBQUNPLE9BQW5CLEdBQTZCLEtBQTdCO0NBQ0Q7Q0FDRjs7O3VDQUVrQjtDQUNqQixVQUFNYSxTQUFTLEdBQUdoRCxHQUFHLENBQUNDLE1BQUosQ0FBV0MsTUFBWCxDQUFrQitDLFVBQWxCLENBQTZCQyxHQUE3QixDQUFpQyxLQUFLcEIsY0FBdEMsRUFBc0QzUyxJQUF4RTs7Q0FFQSxVQUFJNlQsU0FBUyxDQUFDeE8sT0FBVixDQUFrQixVQUFsQixNQUFrQyxDQUFDLENBQXZDLEVBQTJDO0NBQ3pDLFlBQU0wTixRQUFRLEdBQUdpQixJQUFJLENBQUNDLEtBQUwsQ0FBV0osU0FBUyxDQUFDL0csS0FBVixDQUFnQixnQkFBaEIsRUFBa0MsQ0FBbEMsQ0FBWCxDQUFqQjtDQUNBLFlBQU1OLElBQUksR0FBR3FILFNBQVMsQ0FBQ3RKLE9BQVYsQ0FBa0IsbUJBQWxCLEVBQXVDLEVBQXZDLENBQWI7Q0FDQSxlQUFPO0NBQ0xpQyxVQUFBQSxJQUFJLEVBQUpBLElBREs7Q0FFTHVHLFVBQUFBLFFBQVEsRUFBUkE7Q0FGSyxTQUFQO0NBSUQsT0FQRCxNQVFLO0NBQ0gsZUFBTztDQUNMdkcsVUFBQUEsSUFBSSxFQUFFO0NBREQsU0FBUDtDQUdEO0NBQ0Y7OztzQ0FFaUJBLE1BQU11RyxVQUFVO0NBRWhDLFVBQU1tQixnQkFBZ0IscUJBQWNuQixRQUFRLENBQUMvRixTQUF2QixjQUFvQytGLFFBQVEsQ0FBQ2hGLGNBQTdDLGNBQStEZ0YsUUFBUSxDQUFDakUsU0FBeEUsaUJBQXdGdEMsSUFBeEYsQ0FBdEI7Q0FFQXFFLE1BQUFBLEdBQUcsQ0FBQ3NELFdBQUosQ0FBZ0IsaUJBQWhCLEVBQW1DO0NBQ2pDL0ksUUFBQUEsTUFBTSxFQUFFLEtBQUt1SCxjQURvQjtDQUVqQ3lCLFFBQUFBLFFBQVEsRUFBRSxNQUZ1QjtDQUdqQ3hULFFBQUFBLEtBQUssRUFBRXNUO0NBSDBCLE9BQW5DO0NBS0Q7OztpQ0FFV2QsT0FBTztDQUNqQixXQUFLaUIsYUFBTCxDQUFtQmpCLEtBQUssQ0FBQy9NLE1BQU4sQ0FBYXpGLEtBQWhDO0NBQ0Q7OztzQ0FFZ0I7Q0FDZixVQUFNNEwsSUFBSSxHQUFHLEtBQUs0RixXQUFMLEdBQW1CeFIsS0FBaEM7Q0FDQSxXQUFLeVQsYUFBTCxDQUFtQjdILElBQW5CO0NBQ0Q7OzttQ0FFYUEsTUFBTTtDQUNsQixVQUFNdUcsUUFBUSxHQUFHO0NBQ2YvRixRQUFBQSxTQUFTLEVBQUUsS0FBS3NGLG9CQUFMLEdBQTRCVSxPQUR4QjtDQUVmakYsUUFBQUEsY0FBYyxFQUFFLEtBQUt5RSxtQkFBTCxHQUEyQlEsT0FGNUI7Q0FHZmxFLFFBQUFBLFNBQVMsRUFBRSxLQUFLNEQscUJBQUwsR0FBNkJNO0NBSHpCLE9BQWpCO0NBTUEsV0FBS3NCLGdCQUFMLENBQXNCOUgsSUFBdEIsRUFBNEJ1RyxRQUE1QjtDQUNBLFVBQU13QixlQUFlLEdBQUcxRixTQUFTLENBQUNyQyxJQUFELEVBQU91RyxRQUFQLENBQWpDO0NBQ0ExSCxNQUFBQSxNQUFNLENBQUNDLFdBQVAsQ0FBbUJrSixXQUFuQixDQUErQkQsZUFBL0I7Q0FDQSxVQUFNcEMsUUFBUSxHQUFHLEtBQUtDLFdBQUwsRUFBakI7Q0FDQUQsTUFBQUEsUUFBUSxDQUFDc0MsS0FBVDtDQUNEOzs7Ozs7Q0N6T0gsSUFBSSxPQUFPcEosTUFBUCxLQUFrQixXQUF0QixFQUFtQ0EsTUFBTSxDQUFDcUosYUFBUCxHQUF1QixJQUFJeEQsYUFBSixFQUF2Qjs7OzsifQ==
