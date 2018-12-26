(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(factory());
}(this, (function () { 'use strict';

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

	function createNodes (htmlString) {
	  return document.createRange().createContextualFragment(htmlString);
	}

	function until (conditionFunction) {
	  var poll = function poll(resolve) {
	    if (conditionFunction()) resolve();else setTimeout(function () {
	      return poll(resolve);
	    }, 500);
	  };

	  return new Promise(poll);
	}

	function getActiveTab (getActiveTab) {
	  var tab = document.querySelector(".properties_panel--activeTab--eBYRG.properties_panel--tab--1g-EF");
	  return tab ? tab.textContent : false;
	}

	function getNodeType (nodeId) {
	  return window.figmaPlugin.getNodeType(nodeId);
	}

	function reverseString(str) {
	  return str.split('').reverse().join('');
	}

	function getNodeText (nodeId) {
	  return window.App.sendMessage("inspectNodeForInteractionTests", {
	    nodeId: nodeId
	  }).args.extractedText;
	}

	function selectionToNodeId (selection) {
	  var leftSideArray = selection.slice(0, Math.floor(selection.length / 2));
	  var rightSideArray = selection.slice(Math.floor(selection.length / 2), selection.length);
	  return "".concat(toString(leftSideArray), ":").concat(toString(rightSideArray));
	}

	var toString = function toString(array) {
	  return array.reduce(function (accumulator, currentValue, index) {
	    return accumulator + currentValue * Math.pow(256, index);
	  });
	};

	function getSelectedType () {
	  var nodeId = Object.keys(App._state.mirror.sceneGraphSelection)[0];

	  if (nodeId) {
	    return window.figmaPlugin.getNodeType(nodeId);
	  }

	  return false;
	}

	function getSelectedNodeId () {
	  return Object.keys(App._state.mirror.sceneGraphSelection)[0];
	}

	var nodesText = "<div id=\"arabic-support\" class=\"raw_components--panel--3IcXg \"><div><div class=\"raw_components--panelTitle--7MaOu raw_components--base--3TpZG raw_components--row--3dLxJ collapsible_property_panel--panelTitle--1cZql\"><div class=\"collapsible_property_panel--panelTitleText--3GA0U\">Arabic</div></div><span></span><div><div class=\"raw_components--row--3dLxJ type_panel--twoCol--Fj7rw\" style=\"height: auto;\"><label class=\"\" style=\"display: flex;flex-direction: column;align-items: flex-start;justify-content: stretch;width: 100%;\"><textarea dir=\"rtl\" id=\"arabic-support-textarea\" type=\"text\" spellcheck=\"false\" value=\"0\" style=\"background: #fcfcfc;width: 100%;height: 24px;padding: 4px;box-sizing: border-box;border: 1px solid #d4d4d4;border-radius: 3px;height: 80px;margin-bottom: 8px;\"></textarea></label></div></div></div></div>";

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
	    key: "inject",
	    value: function () {
	      var _inject = asyncToGenerator(
	      /*#__PURE__*/
	      regenerator.mark(function _callee() {
	        var nodes, textPanel, textarea, selectedNodeId, selectedNodeText;
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
	                  _context.next = 13;
	                  break;
	                }

	                nodes = createNodes(nodesText);
	                textPanel = [].slice.call(document.getElementsByClassName("properties_panel--propertiesPanel--3PCth")[0].getElementsByClassName("cachedSubtree")).filter(function (panel) {
	                  return panel.textContent.indexOf("Text") !== -1;
	                })[0];
	                textPanel.appendChild(nodes);
	                textarea = this.getTextarea();
	                selectedNodeId = getSelectedNodeId();
	                _context.next = 10;
	                return until(function () {
	                  return typeof selectedNodeId !== "undefined";
	                });

	              case 10:
	                selectedNodeText = getNodeText(selectedNodeId);
	                textarea.value = reverseString(selectedNodeText);
	                textarea.addEventListener("input", this.handleInput.bind(this));

	              case 13:
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
	      if (ui === null || selections.length !== 8) return;
	      var selectedNodeId = selectionToNodeId(selections);
	      var nodeType = getNodeType(selectedNodeId);

	      if (nodeType === "TEXT") {
	        ui.style.display = "block";
	        var textarea = this.getTextarea();
	        var selectedNodeText = getNodeText(selectedNodeId);
	        textarea.value = reverseString(selectedNodeText);
	      } else {
	        ui.style.display = "none";

	        var _textarea = this.getTextarea();

	        _textarea.value = "";
	      }
	    }
	  }, {
	    key: "handleInput",
	    value: function handleInput(event) {
	      // TODO: use proper RTL support instead of just reversing.
	      // 1. Extract Arabic words (by splitting text according to netural charactars )
	      // 2. Reverse & reshape Arabic words.
	      // https://www.npmjs.com/package/direction
	      // https://github.com/louy/Javascript-Arabic-Reshaper
	      // https://github.com/mapmeld/js-arabic-reshaper
	      window.figmaPlugin.replaceText(reverseString(event.target.value));
	      var textarea = this.getTextarea();
	      textarea.focus();
	    }
	  }]);

	  return ArabicSupport;
	}();

	window.arabicSupport = new ArabicSupport();

})));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlnbWEtcGx1Z2luLWJvaWxlcnBsYXRlLmpzIiwic291cmNlcyI6WyIuLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwiLi4vbm9kZV9tb2R1bGVzL3JlZ2VuZXJhdG9yLXJ1bnRpbWUvcnVudGltZS1tb2R1bGUuanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvcmVnZW5lcmF0b3IvaW5kZXguanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9hc3luY1RvR2VuZXJhdG9yLmpzIiwiLi4vbm9kZV9tb2R1bGVzL0BiYWJlbC9ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCIuLi9ub2RlX21vZHVsZXMvQGJhYmVsL3J1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIi4uL3NyYy91dGlscy9jcmVhdGUtbm9kZXMuanMiLCIuLi9zcmMvdXRpbHMvdW50aWwuanMiLCIuLi9zcmMvdXRpbHMvZ2V0LWFjdGl2ZS10YWIuanMiLCIuLi9zcmMvdXRpbHMvZ2V0LW5vZGUtdHlwZS5qcyIsIi4uL3NyYy91dGlscy9yZXZlcnNlLXN0cmluZy5qcyIsIi4uL3NyYy91dGlscy9nZXQtbm9kZS10ZXh0LmpzIiwiLi4vc3JjL3V0aWxzL3NlbGVjdGlvbi10by1ub2RlLWlkLmpzIiwiLi4vc3JjL3V0aWxzL2dldC1zZWxlY3RlZC10eXBlLmpzIiwiLi4vc3JjL3V0aWxzL2dldC1zZWxlY3RlZC1ub2RlLWlkLmpzIiwiLi4vc3JjL2FyYWJpYy1zdXBwb3J0LmpzIiwiLi4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG4hKGZ1bmN0aW9uKGdsb2JhbCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICB2YXIgT3AgPSBPYmplY3QucHJvdG90eXBlO1xuICB2YXIgaGFzT3duID0gT3AuaGFzT3duUHJvcGVydHk7XG4gIHZhciB1bmRlZmluZWQ7IC8vIE1vcmUgY29tcHJlc3NpYmxlIHRoYW4gdm9pZCAwLlxuICB2YXIgJFN5bWJvbCA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbCA6IHt9O1xuICB2YXIgaXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLml0ZXJhdG9yIHx8IFwiQEBpdGVyYXRvclwiO1xuICB2YXIgYXN5bmNJdGVyYXRvclN5bWJvbCA9ICRTeW1ib2wuYXN5bmNJdGVyYXRvciB8fCBcIkBAYXN5bmNJdGVyYXRvclwiO1xuICB2YXIgdG9TdHJpbmdUYWdTeW1ib2wgPSAkU3ltYm9sLnRvU3RyaW5nVGFnIHx8IFwiQEB0b1N0cmluZ1RhZ1wiO1xuXG4gIHZhciBpbk1vZHVsZSA9IHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCI7XG4gIHZhciBydW50aW1lID0gZ2xvYmFsLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgaWYgKHJ1bnRpbWUpIHtcbiAgICBpZiAoaW5Nb2R1bGUpIHtcbiAgICAgIC8vIElmIHJlZ2VuZXJhdG9yUnVudGltZSBpcyBkZWZpbmVkIGdsb2JhbGx5IGFuZCB3ZSdyZSBpbiBhIG1vZHVsZSxcbiAgICAgIC8vIG1ha2UgdGhlIGV4cG9ydHMgb2JqZWN0IGlkZW50aWNhbCB0byByZWdlbmVyYXRvclJ1bnRpbWUuXG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IHJ1bnRpbWU7XG4gICAgfVxuICAgIC8vIERvbid0IGJvdGhlciBldmFsdWF0aW5nIHRoZSByZXN0IG9mIHRoaXMgZmlsZSBpZiB0aGUgcnVudGltZSB3YXNcbiAgICAvLyBhbHJlYWR5IGRlZmluZWQgZ2xvYmFsbHkuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRGVmaW5lIHRoZSBydW50aW1lIGdsb2JhbGx5IChhcyBleHBlY3RlZCBieSBnZW5lcmF0ZWQgY29kZSkgYXMgZWl0aGVyXG4gIC8vIG1vZHVsZS5leHBvcnRzIChpZiB3ZSdyZSBpbiBhIG1vZHVsZSkgb3IgYSBuZXcsIGVtcHR5IG9iamVjdC5cbiAgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWUgPSBpbk1vZHVsZSA/IG1vZHVsZS5leHBvcnRzIDoge307XG5cbiAgZnVuY3Rpb24gd3JhcChpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIC8vIElmIG91dGVyRm4gcHJvdmlkZWQgYW5kIG91dGVyRm4ucHJvdG90eXBlIGlzIGEgR2VuZXJhdG9yLCB0aGVuIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yLlxuICAgIHZhciBwcm90b0dlbmVyYXRvciA9IG91dGVyRm4gJiYgb3V0ZXJGbi5wcm90b3R5cGUgaW5zdGFuY2VvZiBHZW5lcmF0b3IgPyBvdXRlckZuIDogR2VuZXJhdG9yO1xuICAgIHZhciBnZW5lcmF0b3IgPSBPYmplY3QuY3JlYXRlKHByb3RvR2VuZXJhdG9yLnByb3RvdHlwZSk7XG4gICAgdmFyIGNvbnRleHQgPSBuZXcgQ29udGV4dCh0cnlMb2NzTGlzdCB8fCBbXSk7XG5cbiAgICAvLyBUaGUgLl9pbnZva2UgbWV0aG9kIHVuaWZpZXMgdGhlIGltcGxlbWVudGF0aW9ucyBvZiB0aGUgLm5leHQsXG4gICAgLy8gLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzLlxuICAgIGdlbmVyYXRvci5faW52b2tlID0gbWFrZUludm9rZU1ldGhvZChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcblxuICAgIHJldHVybiBnZW5lcmF0b3I7XG4gIH1cbiAgcnVudGltZS53cmFwID0gd3JhcDtcblxuICAvLyBUcnkvY2F0Y2ggaGVscGVyIHRvIG1pbmltaXplIGRlb3B0aW1pemF0aW9ucy4gUmV0dXJucyBhIGNvbXBsZXRpb25cbiAgLy8gcmVjb3JkIGxpa2UgY29udGV4dC50cnlFbnRyaWVzW2ldLmNvbXBsZXRpb24uIFRoaXMgaW50ZXJmYWNlIGNvdWxkXG4gIC8vIGhhdmUgYmVlbiAoYW5kIHdhcyBwcmV2aW91c2x5KSBkZXNpZ25lZCB0byB0YWtlIGEgY2xvc3VyZSB0byBiZVxuICAvLyBpbnZva2VkIHdpdGhvdXQgYXJndW1lbnRzLCBidXQgaW4gYWxsIHRoZSBjYXNlcyB3ZSBjYXJlIGFib3V0IHdlXG4gIC8vIGFscmVhZHkgaGF2ZSBhbiBleGlzdGluZyBtZXRob2Qgd2Ugd2FudCB0byBjYWxsLCBzbyB0aGVyZSdzIG5vIG5lZWRcbiAgLy8gdG8gY3JlYXRlIGEgbmV3IGZ1bmN0aW9uIG9iamVjdC4gV2UgY2FuIGV2ZW4gZ2V0IGF3YXkgd2l0aCBhc3N1bWluZ1xuICAvLyB0aGUgbWV0aG9kIHRha2VzIGV4YWN0bHkgb25lIGFyZ3VtZW50LCBzaW5jZSB0aGF0IGhhcHBlbnMgdG8gYmUgdHJ1ZVxuICAvLyBpbiBldmVyeSBjYXNlLCBzbyB3ZSBkb24ndCBoYXZlIHRvIHRvdWNoIHRoZSBhcmd1bWVudHMgb2JqZWN0LiBUaGVcbiAgLy8gb25seSBhZGRpdGlvbmFsIGFsbG9jYXRpb24gcmVxdWlyZWQgaXMgdGhlIGNvbXBsZXRpb24gcmVjb3JkLCB3aGljaFxuICAvLyBoYXMgYSBzdGFibGUgc2hhcGUgYW5kIHNvIGhvcGVmdWxseSBzaG91bGQgYmUgY2hlYXAgdG8gYWxsb2NhdGUuXG4gIGZ1bmN0aW9uIHRyeUNhdGNoKGZuLCBvYmosIGFyZykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcIm5vcm1hbFwiLCBhcmc6IGZuLmNhbGwob2JqLCBhcmcpIH07XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4geyB0eXBlOiBcInRocm93XCIsIGFyZzogZXJyIH07XG4gICAgfVxuICB9XG5cbiAgdmFyIEdlblN0YXRlU3VzcGVuZGVkU3RhcnQgPSBcInN1c3BlbmRlZFN0YXJ0XCI7XG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkID0gXCJzdXNwZW5kZWRZaWVsZFwiO1xuICB2YXIgR2VuU3RhdGVFeGVjdXRpbmcgPSBcImV4ZWN1dGluZ1wiO1xuICB2YXIgR2VuU3RhdGVDb21wbGV0ZWQgPSBcImNvbXBsZXRlZFwiO1xuXG4gIC8vIFJldHVybmluZyB0aGlzIG9iamVjdCBmcm9tIHRoZSBpbm5lckZuIGhhcyB0aGUgc2FtZSBlZmZlY3QgYXNcbiAgLy8gYnJlYWtpbmcgb3V0IG9mIHRoZSBkaXNwYXRjaCBzd2l0Y2ggc3RhdGVtZW50LlxuICB2YXIgQ29udGludWVTZW50aW5lbCA9IHt9O1xuXG4gIC8vIER1bW15IGNvbnN0cnVjdG9yIGZ1bmN0aW9ucyB0aGF0IHdlIHVzZSBhcyB0aGUgLmNvbnN0cnVjdG9yIGFuZFxuICAvLyAuY29uc3RydWN0b3IucHJvdG90eXBlIHByb3BlcnRpZXMgZm9yIGZ1bmN0aW9ucyB0aGF0IHJldHVybiBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0cy4gRm9yIGZ1bGwgc3BlYyBjb21wbGlhbmNlLCB5b3UgbWF5IHdpc2ggdG8gY29uZmlndXJlIHlvdXJcbiAgLy8gbWluaWZpZXIgbm90IHRvIG1hbmdsZSB0aGUgbmFtZXMgb2YgdGhlc2UgdHdvIGZ1bmN0aW9ucy5cbiAgZnVuY3Rpb24gR2VuZXJhdG9yKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb24oKSB7fVxuICBmdW5jdGlvbiBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSgpIHt9XG5cbiAgLy8gVGhpcyBpcyBhIHBvbHlmaWxsIGZvciAlSXRlcmF0b3JQcm90b3R5cGUlIGZvciBlbnZpcm9ubWVudHMgdGhhdFxuICAvLyBkb24ndCBuYXRpdmVseSBzdXBwb3J0IGl0LlxuICB2YXIgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcbiAgSXRlcmF0b3JQcm90b3R5cGVbaXRlcmF0b3JTeW1ib2xdID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIHZhciBnZXRQcm90byA9IE9iamVjdC5nZXRQcm90b3R5cGVPZjtcbiAgdmFyIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG8gJiYgZ2V0UHJvdG8oZ2V0UHJvdG8odmFsdWVzKFtdKSkpO1xuICBpZiAoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUgJiZcbiAgICAgIE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICE9PSBPcCAmJlxuICAgICAgaGFzT3duLmNhbGwoTmF0aXZlSXRlcmF0b3JQcm90b3R5cGUsIGl0ZXJhdG9yU3ltYm9sKSkge1xuICAgIC8vIFRoaXMgZW52aXJvbm1lbnQgaGFzIGEgbmF0aXZlICVJdGVyYXRvclByb3RvdHlwZSU7IHVzZSBpdCBpbnN0ZWFkXG4gICAgLy8gb2YgdGhlIHBvbHlmaWxsLlxuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gTmF0aXZlSXRlcmF0b3JQcm90b3R5cGU7XG4gIH1cblxuICB2YXIgR3AgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZS5wcm90b3R5cGUgPVxuICAgIEdlbmVyYXRvci5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlKTtcbiAgR2VuZXJhdG9yRnVuY3Rpb24ucHJvdG90eXBlID0gR3AuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUuY29uc3RydWN0b3IgPSBHZW5lcmF0b3JGdW5jdGlvbjtcbiAgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGVbdG9TdHJpbmdUYWdTeW1ib2xdID1cbiAgICBHZW5lcmF0b3JGdW5jdGlvbi5kaXNwbGF5TmFtZSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcblxuICAvLyBIZWxwZXIgZm9yIGRlZmluaW5nIHRoZSAubmV4dCwgLnRocm93LCBhbmQgLnJldHVybiBtZXRob2RzIG9mIHRoZVxuICAvLyBJdGVyYXRvciBpbnRlcmZhY2UgaW4gdGVybXMgb2YgYSBzaW5nbGUgLl9pbnZva2UgbWV0aG9kLlxuICBmdW5jdGlvbiBkZWZpbmVJdGVyYXRvck1ldGhvZHMocHJvdG90eXBlKSB7XG4gICAgW1wibmV4dFwiLCBcInRocm93XCIsIFwicmV0dXJuXCJdLmZvckVhY2goZnVuY3Rpb24obWV0aG9kKSB7XG4gICAgICBwcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKGFyZykge1xuICAgICAgICByZXR1cm4gdGhpcy5faW52b2tlKG1ldGhvZCwgYXJnKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24gPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICB2YXIgY3RvciA9IHR5cGVvZiBnZW5GdW4gPT09IFwiZnVuY3Rpb25cIiAmJiBnZW5GdW4uY29uc3RydWN0b3I7XG4gICAgcmV0dXJuIGN0b3JcbiAgICAgID8gY3RvciA9PT0gR2VuZXJhdG9yRnVuY3Rpb24gfHxcbiAgICAgICAgLy8gRm9yIHRoZSBuYXRpdmUgR2VuZXJhdG9yRnVuY3Rpb24gY29uc3RydWN0b3IsIHRoZSBiZXN0IHdlIGNhblxuICAgICAgICAvLyBkbyBpcyB0byBjaGVjayBpdHMgLm5hbWUgcHJvcGVydHkuXG4gICAgICAgIChjdG9yLmRpc3BsYXlOYW1lIHx8IGN0b3IubmFtZSkgPT09IFwiR2VuZXJhdG9yRnVuY3Rpb25cIlxuICAgICAgOiBmYWxzZTtcbiAgfTtcblxuICBydW50aW1lLm1hcmsgPSBmdW5jdGlvbihnZW5GdW4pIHtcbiAgICBpZiAoT2JqZWN0LnNldFByb3RvdHlwZU9mKSB7XG4gICAgICBPYmplY3Quc2V0UHJvdG90eXBlT2YoZ2VuRnVuLCBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGdlbkZ1bi5fX3Byb3RvX18gPSBHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZTtcbiAgICAgIGlmICghKHRvU3RyaW5nVGFnU3ltYm9sIGluIGdlbkZ1bikpIHtcbiAgICAgICAgZ2VuRnVuW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yRnVuY3Rpb25cIjtcbiAgICAgIH1cbiAgICB9XG4gICAgZ2VuRnVuLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoR3ApO1xuICAgIHJldHVybiBnZW5GdW47XG4gIH07XG5cbiAgLy8gV2l0aGluIHRoZSBib2R5IG9mIGFueSBhc3luYyBmdW5jdGlvbiwgYGF3YWl0IHhgIGlzIHRyYW5zZm9ybWVkIHRvXG4gIC8vIGB5aWVsZCByZWdlbmVyYXRvclJ1bnRpbWUuYXdyYXAoeClgLCBzbyB0aGF0IHRoZSBydW50aW1lIGNhbiB0ZXN0XG4gIC8vIGBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpYCB0byBkZXRlcm1pbmUgaWYgdGhlIHlpZWxkZWQgdmFsdWUgaXNcbiAgLy8gbWVhbnQgdG8gYmUgYXdhaXRlZC5cbiAgcnVudGltZS5hd3JhcCA9IGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiB7IF9fYXdhaXQ6IGFyZyB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIEFzeW5jSXRlcmF0b3IoZ2VuZXJhdG9yKSB7XG4gICAgZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChnZW5lcmF0b3JbbWV0aG9kXSwgZ2VuZXJhdG9yLCBhcmcpO1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgcmVqZWN0KHJlY29yZC5hcmcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHJlY29yZC5hcmc7XG4gICAgICAgIHZhciB2YWx1ZSA9IHJlc3VsdC52YWx1ZTtcbiAgICAgICAgaWYgKHZhbHVlICYmXG4gICAgICAgICAgICB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKHZhbHVlLCBcIl9fYXdhaXRcIikpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlLl9fYXdhaXQpLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgIGludm9rZShcIm5leHRcIiwgdmFsdWUsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJ0aHJvd1wiLCBlcnIsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKGZ1bmN0aW9uKHVud3JhcHBlZCkge1xuICAgICAgICAgIC8vIFdoZW4gYSB5aWVsZGVkIFByb21pc2UgaXMgcmVzb2x2ZWQsIGl0cyBmaW5hbCB2YWx1ZSBiZWNvbWVzXG4gICAgICAgICAgLy8gdGhlIC52YWx1ZSBvZiB0aGUgUHJvbWlzZTx7dmFsdWUsZG9uZX0+IHJlc3VsdCBmb3IgdGhlXG4gICAgICAgICAgLy8gY3VycmVudCBpdGVyYXRpb24uXG4gICAgICAgICAgcmVzdWx0LnZhbHVlID0gdW53cmFwcGVkO1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAvLyBJZiBhIHJlamVjdGVkIFByb21pc2Ugd2FzIHlpZWxkZWQsIHRocm93IHRoZSByZWplY3Rpb24gYmFja1xuICAgICAgICAgIC8vIGludG8gdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBzbyBpdCBjYW4gYmUgaGFuZGxlZCB0aGVyZS5cbiAgICAgICAgICByZXR1cm4gaW52b2tlKFwidGhyb3dcIiwgZXJyb3IsIHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBwcmV2aW91c1Byb21pc2U7XG5cbiAgICBmdW5jdGlvbiBlbnF1ZXVlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBmdW5jdGlvbiBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZygpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICAgIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBwcmV2aW91c1Byb21pc2UgPVxuICAgICAgICAvLyBJZiBlbnF1ZXVlIGhhcyBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gd2Ugd2FudCB0byB3YWl0IHVudGlsXG4gICAgICAgIC8vIGFsbCBwcmV2aW91cyBQcm9taXNlcyBoYXZlIGJlZW4gcmVzb2x2ZWQgYmVmb3JlIGNhbGxpbmcgaW52b2tlLFxuICAgICAgICAvLyBzbyB0aGF0IHJlc3VsdHMgYXJlIGFsd2F5cyBkZWxpdmVyZWQgaW4gdGhlIGNvcnJlY3Qgb3JkZXIuIElmXG4gICAgICAgIC8vIGVucXVldWUgaGFzIG5vdCBiZWVuIGNhbGxlZCBiZWZvcmUsIHRoZW4gaXQgaXMgaW1wb3J0YW50IHRvXG4gICAgICAgIC8vIGNhbGwgaW52b2tlIGltbWVkaWF0ZWx5LCB3aXRob3V0IHdhaXRpbmcgb24gYSBjYWxsYmFjayB0byBmaXJlLFxuICAgICAgICAvLyBzbyB0aGF0IHRoZSBhc3luYyBnZW5lcmF0b3IgZnVuY3Rpb24gaGFzIHRoZSBvcHBvcnR1bml0eSB0byBkb1xuICAgICAgICAvLyBhbnkgbmVjZXNzYXJ5IHNldHVwIGluIGEgcHJlZGljdGFibGUgd2F5LiBUaGlzIHByZWRpY3RhYmlsaXR5XG4gICAgICAgIC8vIGlzIHdoeSB0aGUgUHJvbWlzZSBjb25zdHJ1Y3RvciBzeW5jaHJvbm91c2x5IGludm9rZXMgaXRzXG4gICAgICAgIC8vIGV4ZWN1dG9yIGNhbGxiYWNrLCBhbmQgd2h5IGFzeW5jIGZ1bmN0aW9ucyBzeW5jaHJvbm91c2x5XG4gICAgICAgIC8vIGV4ZWN1dGUgY29kZSBiZWZvcmUgdGhlIGZpcnN0IGF3YWl0LiBTaW5jZSB3ZSBpbXBsZW1lbnQgc2ltcGxlXG4gICAgICAgIC8vIGFzeW5jIGZ1bmN0aW9ucyBpbiB0ZXJtcyBvZiBhc3luYyBnZW5lcmF0b3JzLCBpdCBpcyBlc3BlY2lhbGx5XG4gICAgICAgIC8vIGltcG9ydGFudCB0byBnZXQgdGhpcyByaWdodCwgZXZlbiB0aG91Z2ggaXQgcmVxdWlyZXMgY2FyZS5cbiAgICAgICAgcHJldmlvdXNQcm9taXNlID8gcHJldmlvdXNQcm9taXNlLnRoZW4oXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcsXG4gICAgICAgICAgLy8gQXZvaWQgcHJvcGFnYXRpbmcgZmFpbHVyZXMgdG8gUHJvbWlzZXMgcmV0dXJuZWQgYnkgbGF0ZXJcbiAgICAgICAgICAvLyBpbnZvY2F0aW9ucyBvZiB0aGUgaXRlcmF0b3IuXG4gICAgICAgICAgY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmdcbiAgICAgICAgKSA6IGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCk7XG4gICAgfVxuXG4gICAgLy8gRGVmaW5lIHRoZSB1bmlmaWVkIGhlbHBlciBtZXRob2QgdGhhdCBpcyB1c2VkIHRvIGltcGxlbWVudCAubmV4dCxcbiAgICAvLyAudGhyb3csIGFuZCAucmV0dXJuIChzZWUgZGVmaW5lSXRlcmF0b3JNZXRob2RzKS5cbiAgICB0aGlzLl9pbnZva2UgPSBlbnF1ZXVlO1xuICB9XG5cbiAgZGVmaW5lSXRlcmF0b3JNZXRob2RzKEFzeW5jSXRlcmF0b3IucHJvdG90eXBlKTtcbiAgQXN5bmNJdGVyYXRvci5wcm90b3R5cGVbYXN5bmNJdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG4gIHJ1bnRpbWUuQXN5bmNJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3I7XG5cbiAgLy8gTm90ZSB0aGF0IHNpbXBsZSBhc3luYyBmdW5jdGlvbnMgYXJlIGltcGxlbWVudGVkIG9uIHRvcCBvZlxuICAvLyBBc3luY0l0ZXJhdG9yIG9iamVjdHM7IHRoZXkganVzdCByZXR1cm4gYSBQcm9taXNlIGZvciB0aGUgdmFsdWUgb2ZcbiAgLy8gdGhlIGZpbmFsIHJlc3VsdCBwcm9kdWNlZCBieSB0aGUgaXRlcmF0b3IuXG4gIHJ1bnRpbWUuYXN5bmMgPSBmdW5jdGlvbihpbm5lckZuLCBvdXRlckZuLCBzZWxmLCB0cnlMb2NzTGlzdCkge1xuICAgIHZhciBpdGVyID0gbmV3IEFzeW5jSXRlcmF0b3IoXG4gICAgICB3cmFwKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KVxuICAgICk7XG5cbiAgICByZXR1cm4gcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uKG91dGVyRm4pXG4gICAgICA/IGl0ZXIgLy8gSWYgb3V0ZXJGbiBpcyBhIGdlbmVyYXRvciwgcmV0dXJuIHRoZSBmdWxsIGl0ZXJhdG9yLlxuICAgICAgOiBpdGVyLm5leHQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICAgIHJldHVybiByZXN1bHQuZG9uZSA/IHJlc3VsdC52YWx1ZSA6IGl0ZXIubmV4dCgpO1xuICAgICAgICB9KTtcbiAgfTtcblxuICBmdW5jdGlvbiBtYWtlSW52b2tlTWV0aG9kKGlubmVyRm4sIHNlbGYsIGNvbnRleHQpIHtcbiAgICB2YXIgc3RhdGUgPSBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZykge1xuICAgICAgaWYgKHN0YXRlID09PSBHZW5TdGF0ZUV4ZWN1dGluZykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBydW5uaW5nXCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlQ29tcGxldGVkKSB7XG4gICAgICAgIGlmIChtZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHRocm93IGFyZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJlIGZvcmdpdmluZywgcGVyIDI1LjMuMy4zLjMgb2YgdGhlIHNwZWM6XG4gICAgICAgIC8vIGh0dHBzOi8vcGVvcGxlLm1vemlsbGEub3JnL35qb3JlbmRvcmZmL2VzNi1kcmFmdC5odG1sI3NlYy1nZW5lcmF0b3JyZXN1bWVcbiAgICAgICAgcmV0dXJuIGRvbmVSZXN1bHQoKTtcbiAgICAgIH1cblxuICAgICAgY29udGV4dC5tZXRob2QgPSBtZXRob2Q7XG4gICAgICBjb250ZXh0LmFyZyA9IGFyZztcblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgdmFyIGRlbGVnYXRlID0gY29udGV4dC5kZWxlZ2F0ZTtcbiAgICAgICAgaWYgKGRlbGVnYXRlKSB7XG4gICAgICAgICAgdmFyIGRlbGVnYXRlUmVzdWx0ID0gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKGRlbGVnYXRlUmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQgPT09IENvbnRpbnVlU2VudGluZWwpIGNvbnRpbnVlO1xuICAgICAgICAgICAgcmV0dXJuIGRlbGVnYXRlUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCA9PT0gXCJuZXh0XCIpIHtcbiAgICAgICAgICAvLyBTZXR0aW5nIGNvbnRleHQuX3NlbnQgZm9yIGxlZ2FjeSBzdXBwb3J0IG9mIEJhYmVsJ3NcbiAgICAgICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgICAgIGNvbnRleHQuc2VudCA9IGNvbnRleHQuX3NlbnQgPSBjb250ZXh0LmFyZztcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQpIHtcbiAgICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgICB0aHJvdyBjb250ZXh0LmFyZztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb250ZXh0LmRpc3BhdGNoRXhjZXB0aW9uKGNvbnRleHQuYXJnKTtcblxuICAgICAgICB9IGVsc2UgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInJldHVyblwiKSB7XG4gICAgICAgICAgY29udGV4dC5hYnJ1cHQoXCJyZXR1cm5cIiwgY29udGV4dC5hcmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUV4ZWN1dGluZztcblxuICAgICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG4gICAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIikge1xuICAgICAgICAgIC8vIElmIGFuIGV4Y2VwdGlvbiBpcyB0aHJvd24gZnJvbSBpbm5lckZuLCB3ZSBsZWF2ZSBzdGF0ZSA9PT1cbiAgICAgICAgICAvLyBHZW5TdGF0ZUV4ZWN1dGluZyBhbmQgbG9vcCBiYWNrIGZvciBhbm90aGVyIGludm9jYXRpb24uXG4gICAgICAgICAgc3RhdGUgPSBjb250ZXh0LmRvbmVcbiAgICAgICAgICAgID8gR2VuU3RhdGVDb21wbGV0ZWRcbiAgICAgICAgICAgIDogR2VuU3RhdGVTdXNwZW5kZWRZaWVsZDtcblxuICAgICAgICAgIGlmIChyZWNvcmQuYXJnID09PSBDb250aW51ZVNlbnRpbmVsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdmFsdWU6IHJlY29yZC5hcmcsXG4gICAgICAgICAgICBkb25lOiBjb250ZXh0LmRvbmVcbiAgICAgICAgICB9O1xuXG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIHN0YXRlID0gR2VuU3RhdGVDb21wbGV0ZWQ7XG4gICAgICAgICAgLy8gRGlzcGF0Y2ggdGhlIGV4Y2VwdGlvbiBieSBsb29waW5nIGJhY2sgYXJvdW5kIHRvIHRoZVxuICAgICAgICAgIC8vIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpIGNhbGwgYWJvdmUuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIC8vIENhbGwgZGVsZWdhdGUuaXRlcmF0b3JbY29udGV4dC5tZXRob2RdKGNvbnRleHQuYXJnKSBhbmQgaGFuZGxlIHRoZVxuICAvLyByZXN1bHQsIGVpdGhlciBieSByZXR1cm5pbmcgYSB7IHZhbHVlLCBkb25lIH0gcmVzdWx0IGZyb20gdGhlXG4gIC8vIGRlbGVnYXRlIGl0ZXJhdG9yLCBvciBieSBtb2RpZnlpbmcgY29udGV4dC5tZXRob2QgYW5kIGNvbnRleHQuYXJnLFxuICAvLyBzZXR0aW5nIGNvbnRleHQuZGVsZWdhdGUgdG8gbnVsbCwgYW5kIHJldHVybmluZyB0aGUgQ29udGludWVTZW50aW5lbC5cbiAgZnVuY3Rpb24gbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCkge1xuICAgIHZhciBtZXRob2QgPSBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF07XG4gICAgaWYgKG1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAvLyBBIC50aHJvdyBvciAucmV0dXJuIHdoZW4gdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBubyAudGhyb3dcbiAgICAgIC8vIG1ldGhvZCBhbHdheXMgdGVybWluYXRlcyB0aGUgeWllbGQqIGxvb3AuXG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcblxuICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgaWYgKGRlbGVnYXRlLml0ZXJhdG9yLnJldHVybikge1xuICAgICAgICAgIC8vIElmIHRoZSBkZWxlZ2F0ZSBpdGVyYXRvciBoYXMgYSByZXR1cm4gbWV0aG9kLCBnaXZlIGl0IGFcbiAgICAgICAgICAvLyBjaGFuY2UgdG8gY2xlYW4gdXAuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICAgIGNvbnRleHQuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG1heWJlSW52b2tlRGVsZWdhdGUoZGVsZWdhdGUsIGNvbnRleHQpO1xuXG4gICAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIC8vIElmIG1heWJlSW52b2tlRGVsZWdhdGUoY29udGV4dCkgY2hhbmdlZCBjb250ZXh0Lm1ldGhvZCBmcm9tXG4gICAgICAgICAgICAvLyBcInJldHVyblwiIHRvIFwidGhyb3dcIiwgbGV0IHRoYXQgb3ZlcnJpZGUgdGhlIFR5cGVFcnJvciBiZWxvdy5cbiAgICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IG5ldyBUeXBlRXJyb3IoXG4gICAgICAgICAgXCJUaGUgaXRlcmF0b3IgZG9lcyBub3QgcHJvdmlkZSBhICd0aHJvdycgbWV0aG9kXCIpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2gobWV0aG9kLCBkZWxlZ2F0ZS5pdGVyYXRvciwgY29udGV4dC5hcmcpO1xuXG4gICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSByZWNvcmQuYXJnO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICB2YXIgaW5mbyA9IHJlY29yZC5hcmc7XG5cbiAgICBpZiAoISBpbmZvKSB7XG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcIml0ZXJhdG9yIHJlc3VsdCBpcyBub3QgYW4gb2JqZWN0XCIpO1xuICAgICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG5cbiAgICBpZiAoaW5mby5kb25lKSB7XG4gICAgICAvLyBBc3NpZ24gdGhlIHJlc3VsdCBvZiB0aGUgZmluaXNoZWQgZGVsZWdhdGUgdG8gdGhlIHRlbXBvcmFyeVxuICAgICAgLy8gdmFyaWFibGUgc3BlY2lmaWVkIGJ5IGRlbGVnYXRlLnJlc3VsdE5hbWUgKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHRbZGVsZWdhdGUucmVzdWx0TmFtZV0gPSBpbmZvLnZhbHVlO1xuXG4gICAgICAvLyBSZXN1bWUgZXhlY3V0aW9uIGF0IHRoZSBkZXNpcmVkIGxvY2F0aW9uIChzZWUgZGVsZWdhdGVZaWVsZCkuXG4gICAgICBjb250ZXh0Lm5leHQgPSBkZWxlZ2F0ZS5uZXh0TG9jO1xuXG4gICAgICAvLyBJZiBjb250ZXh0Lm1ldGhvZCB3YXMgXCJ0aHJvd1wiIGJ1dCB0aGUgZGVsZWdhdGUgaGFuZGxlZCB0aGVcbiAgICAgIC8vIGV4Y2VwdGlvbiwgbGV0IHRoZSBvdXRlciBnZW5lcmF0b3IgcHJvY2VlZCBub3JtYWxseS4gSWZcbiAgICAgIC8vIGNvbnRleHQubWV0aG9kIHdhcyBcIm5leHRcIiwgZm9yZ2V0IGNvbnRleHQuYXJnIHNpbmNlIGl0IGhhcyBiZWVuXG4gICAgICAvLyBcImNvbnN1bWVkXCIgYnkgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yLiBJZiBjb250ZXh0Lm1ldGhvZCB3YXNcbiAgICAgIC8vIFwicmV0dXJuXCIsIGFsbG93IHRoZSBvcmlnaW5hbCAucmV0dXJuIGNhbGwgdG8gY29udGludWUgaW4gdGhlXG4gICAgICAvLyBvdXRlciBnZW5lcmF0b3IuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgIT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gUmUteWllbGQgdGhlIHJlc3VsdCByZXR1cm5lZCBieSB0aGUgZGVsZWdhdGUgbWV0aG9kLlxuICAgICAgcmV0dXJuIGluZm87XG4gICAgfVxuXG4gICAgLy8gVGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGlzIGZpbmlzaGVkLCBzbyBmb3JnZXQgaXQgYW5kIGNvbnRpbnVlIHdpdGhcbiAgICAvLyB0aGUgb3V0ZXIgZ2VuZXJhdG9yLlxuICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICB9XG5cbiAgLy8gRGVmaW5lIEdlbmVyYXRvci5wcm90b3R5cGUue25leHQsdGhyb3cscmV0dXJufSBpbiB0ZXJtcyBvZiB0aGVcbiAgLy8gdW5pZmllZCAuX2ludm9rZSBoZWxwZXIgbWV0aG9kLlxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoR3ApO1xuXG4gIEdwW3RvU3RyaW5nVGFnU3ltYm9sXSA9IFwiR2VuZXJhdG9yXCI7XG5cbiAgLy8gQSBHZW5lcmF0b3Igc2hvdWxkIGFsd2F5cyByZXR1cm4gaXRzZWxmIGFzIHRoZSBpdGVyYXRvciBvYmplY3Qgd2hlbiB0aGVcbiAgLy8gQEBpdGVyYXRvciBmdW5jdGlvbiBpcyBjYWxsZWQgb24gaXQuIFNvbWUgYnJvd3NlcnMnIGltcGxlbWVudGF0aW9ucyBvZiB0aGVcbiAgLy8gaXRlcmF0b3IgcHJvdG90eXBlIGNoYWluIGluY29ycmVjdGx5IGltcGxlbWVudCB0aGlzLCBjYXVzaW5nIHRoZSBHZW5lcmF0b3JcbiAgLy8gb2JqZWN0IHRvIG5vdCBiZSByZXR1cm5lZCBmcm9tIHRoaXMgY2FsbC4gVGhpcyBlbnN1cmVzIHRoYXQgZG9lc24ndCBoYXBwZW4uXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVnZW5lcmF0b3IvaXNzdWVzLzI3NCBmb3IgbW9yZSBkZXRhaWxzLlxuICBHcFtpdGVyYXRvclN5bWJvbF0gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICBHcC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBcIltvYmplY3QgR2VuZXJhdG9yXVwiO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHB1c2hUcnlFbnRyeShsb2NzKSB7XG4gICAgdmFyIGVudHJ5ID0geyB0cnlMb2M6IGxvY3NbMF0gfTtcblxuICAgIGlmICgxIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmNhdGNoTG9jID0gbG9jc1sxXTtcbiAgICB9XG5cbiAgICBpZiAoMiBpbiBsb2NzKSB7XG4gICAgICBlbnRyeS5maW5hbGx5TG9jID0gbG9jc1syXTtcbiAgICAgIGVudHJ5LmFmdGVyTG9jID0gbG9jc1szXTtcbiAgICB9XG5cbiAgICB0aGlzLnRyeUVudHJpZXMucHVzaChlbnRyeSk7XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFRyeUVudHJ5KGVudHJ5KSB7XG4gICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb24gfHwge307XG4gICAgcmVjb3JkLnR5cGUgPSBcIm5vcm1hbFwiO1xuICAgIGRlbGV0ZSByZWNvcmQuYXJnO1xuICAgIGVudHJ5LmNvbXBsZXRpb24gPSByZWNvcmQ7XG4gIH1cblxuICBmdW5jdGlvbiBDb250ZXh0KHRyeUxvY3NMaXN0KSB7XG4gICAgLy8gVGhlIHJvb3QgZW50cnkgb2JqZWN0IChlZmZlY3RpdmVseSBhIHRyeSBzdGF0ZW1lbnQgd2l0aG91dCBhIGNhdGNoXG4gICAgLy8gb3IgYSBmaW5hbGx5IGJsb2NrKSBnaXZlcyB1cyBhIHBsYWNlIHRvIHN0b3JlIHZhbHVlcyB0aHJvd24gZnJvbVxuICAgIC8vIGxvY2F0aW9ucyB3aGVyZSB0aGVyZSBpcyBubyBlbmNsb3NpbmcgdHJ5IHN0YXRlbWVudC5cbiAgICB0aGlzLnRyeUVudHJpZXMgPSBbeyB0cnlMb2M6IFwicm9vdFwiIH1dO1xuICAgIHRyeUxvY3NMaXN0LmZvckVhY2gocHVzaFRyeUVudHJ5LCB0aGlzKTtcbiAgICB0aGlzLnJlc2V0KHRydWUpO1xuICB9XG5cbiAgcnVudGltZS5rZXlzID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIGtleXMgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICBrZXlzLnB1c2goa2V5KTtcbiAgICB9XG4gICAga2V5cy5yZXZlcnNlKCk7XG5cbiAgICAvLyBSYXRoZXIgdGhhbiByZXR1cm5pbmcgYW4gb2JqZWN0IHdpdGggYSBuZXh0IG1ldGhvZCwgd2Uga2VlcFxuICAgIC8vIHRoaW5ncyBzaW1wbGUgYW5kIHJldHVybiB0aGUgbmV4dCBmdW5jdGlvbiBpdHNlbGYuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICB3aGlsZSAoa2V5cy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGtleSA9IGtleXMucG9wKCk7XG4gICAgICAgIGlmIChrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgICAgbmV4dC52YWx1ZSA9IGtleTtcbiAgICAgICAgICBuZXh0LmRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUbyBhdm9pZCBjcmVhdGluZyBhbiBhZGRpdGlvbmFsIG9iamVjdCwgd2UganVzdCBoYW5nIHRoZSAudmFsdWVcbiAgICAgIC8vIGFuZCAuZG9uZSBwcm9wZXJ0aWVzIG9mZiB0aGUgbmV4dCBmdW5jdGlvbiBvYmplY3QgaXRzZWxmLiBUaGlzXG4gICAgICAvLyBhbHNvIGVuc3VyZXMgdGhhdCB0aGUgbWluaWZpZXIgd2lsbCBub3QgYW5vbnltaXplIHRoZSBmdW5jdGlvbi5cbiAgICAgIG5leHQuZG9uZSA9IHRydWU7XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9O1xuICB9O1xuXG4gIGZ1bmN0aW9uIHZhbHVlcyhpdGVyYWJsZSkge1xuICAgIGlmIChpdGVyYWJsZSkge1xuICAgICAgdmFyIGl0ZXJhdG9yTWV0aG9kID0gaXRlcmFibGVbaXRlcmF0b3JTeW1ib2xdO1xuICAgICAgaWYgKGl0ZXJhdG9yTWV0aG9kKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvck1ldGhvZC5jYWxsKGl0ZXJhYmxlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHR5cGVvZiBpdGVyYWJsZS5uZXh0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhYmxlO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTmFOKGl0ZXJhYmxlLmxlbmd0aCkpIHtcbiAgICAgICAgdmFyIGkgPSAtMSwgbmV4dCA9IGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgd2hpbGUgKCsraSA8IGl0ZXJhYmxlLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGhhc093bi5jYWxsKGl0ZXJhYmxlLCBpKSkge1xuICAgICAgICAgICAgICBuZXh0LnZhbHVlID0gaXRlcmFibGVbaV07XG4gICAgICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0LnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgIG5leHQuZG9uZSA9IHRydWU7XG5cbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfTtcblxuICAgICAgICByZXR1cm4gbmV4dC5uZXh0ID0gbmV4dDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gaXRlcmF0b3Igd2l0aCBubyB2YWx1ZXMuXG4gICAgcmV0dXJuIHsgbmV4dDogZG9uZVJlc3VsdCB9O1xuICB9XG4gIHJ1bnRpbWUudmFsdWVzID0gdmFsdWVzO1xuXG4gIGZ1bmN0aW9uIGRvbmVSZXN1bHQoKSB7XG4gICAgcmV0dXJuIHsgdmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZSB9O1xuICB9XG5cbiAgQ29udGV4dC5wcm90b3R5cGUgPSB7XG4gICAgY29uc3RydWN0b3I6IENvbnRleHQsXG5cbiAgICByZXNldDogZnVuY3Rpb24oc2tpcFRlbXBSZXNldCkge1xuICAgICAgdGhpcy5wcmV2ID0gMDtcbiAgICAgIHRoaXMubmV4dCA9IDA7XG4gICAgICAvLyBSZXNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgLy8gZnVuY3Rpb24uc2VudCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgIHRoaXMuc2VudCA9IHRoaXMuX3NlbnQgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmRvbmUgPSBmYWxzZTtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICB0aGlzLm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIHRoaXMudHJ5RW50cmllcy5mb3JFYWNoKHJlc2V0VHJ5RW50cnkpO1xuXG4gICAgICBpZiAoIXNraXBUZW1wUmVzZXQpIHtcbiAgICAgICAgZm9yICh2YXIgbmFtZSBpbiB0aGlzKSB7XG4gICAgICAgICAgLy8gTm90IHN1cmUgYWJvdXQgdGhlIG9wdGltYWwgb3JkZXIgb2YgdGhlc2UgY29uZGl0aW9uczpcbiAgICAgICAgICBpZiAobmFtZS5jaGFyQXQoMCkgPT09IFwidFwiICYmXG4gICAgICAgICAgICAgIGhhc093bi5jYWxsKHRoaXMsIG5hbWUpICYmXG4gICAgICAgICAgICAgICFpc05hTigrbmFtZS5zbGljZSgxKSkpIHtcbiAgICAgICAgICAgIHRoaXNbbmFtZV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIHN0b3A6IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5kb25lID0gdHJ1ZTtcblxuICAgICAgdmFyIHJvb3RFbnRyeSA9IHRoaXMudHJ5RW50cmllc1swXTtcbiAgICAgIHZhciByb290UmVjb3JkID0gcm9vdEVudHJ5LmNvbXBsZXRpb247XG4gICAgICBpZiAocm9vdFJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcm9vdFJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0aGlzLnJ2YWw7XG4gICAgfSxcblxuICAgIGRpc3BhdGNoRXhjZXB0aW9uOiBmdW5jdGlvbihleGNlcHRpb24pIHtcbiAgICAgIGlmICh0aGlzLmRvbmUpIHtcbiAgICAgICAgdGhyb3cgZXhjZXB0aW9uO1xuICAgICAgfVxuXG4gICAgICB2YXIgY29udGV4dCA9IHRoaXM7XG4gICAgICBmdW5jdGlvbiBoYW5kbGUobG9jLCBjYXVnaHQpIHtcbiAgICAgICAgcmVjb3JkLnR5cGUgPSBcInRocm93XCI7XG4gICAgICAgIHJlY29yZC5hcmcgPSBleGNlcHRpb247XG4gICAgICAgIGNvbnRleHQubmV4dCA9IGxvYztcblxuICAgICAgICBpZiAoY2F1Z2h0KSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRpc3BhdGNoZWQgZXhjZXB0aW9uIHdhcyBjYXVnaHQgYnkgYSBjYXRjaCBibG9jayxcbiAgICAgICAgICAvLyB0aGVuIGxldCB0aGF0IGNhdGNoIGJsb2NrIGhhbmRsZSB0aGUgZXhjZXB0aW9uIG5vcm1hbGx5LlxuICAgICAgICAgIGNvbnRleHQubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gISEgY2F1Z2h0O1xuICAgICAgfVxuXG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gXCJyb290XCIpIHtcbiAgICAgICAgICAvLyBFeGNlcHRpb24gdGhyb3duIG91dHNpZGUgb2YgYW55IHRyeSBibG9jayB0aGF0IGNvdWxkIGhhbmRsZVxuICAgICAgICAgIC8vIGl0LCBzbyBzZXQgdGhlIGNvbXBsZXRpb24gdmFsdWUgb2YgdGhlIGVudGlyZSBmdW5jdGlvbiB0b1xuICAgICAgICAgIC8vIHRocm93IHRoZSBleGNlcHRpb24uXG4gICAgICAgICAgcmV0dXJuIGhhbmRsZShcImVuZFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2KSB7XG4gICAgICAgICAgdmFyIGhhc0NhdGNoID0gaGFzT3duLmNhbGwoZW50cnksIFwiY2F0Y2hMb2NcIik7XG4gICAgICAgICAgdmFyIGhhc0ZpbmFsbHkgPSBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpO1xuXG4gICAgICAgICAgaWYgKGhhc0NhdGNoICYmIGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5jYXRjaExvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmNhdGNoTG9jLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNDYXRjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIGlmIChoYXNGaW5hbGx5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAgICAgICByZXR1cm4gaGFuZGxlKGVudHJ5LmZpbmFsbHlMb2MpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcInRyeSBzdGF0ZW1lbnQgd2l0aG91dCBjYXRjaCBvciBmaW5hbGx5XCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBhYnJ1cHQ6IGZ1bmN0aW9uKHR5cGUsIGFyZykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS50cnlMb2MgPD0gdGhpcy5wcmV2ICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbChlbnRyeSwgXCJmaW5hbGx5TG9jXCIpICYmXG4gICAgICAgICAgICB0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgdmFyIGZpbmFsbHlFbnRyeSA9IGVudHJ5O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkgJiZcbiAgICAgICAgICAodHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgIHR5cGUgPT09IFwiY29udGludWVcIikgJiZcbiAgICAgICAgICBmaW5hbGx5RW50cnkudHJ5TG9jIDw9IGFyZyAmJlxuICAgICAgICAgIGFyZyA8PSBmaW5hbGx5RW50cnkuZmluYWxseUxvYykge1xuICAgICAgICAvLyBJZ25vcmUgdGhlIGZpbmFsbHkgZW50cnkgaWYgY29udHJvbCBpcyBub3QganVtcGluZyB0byBhXG4gICAgICAgIC8vIGxvY2F0aW9uIG91dHNpZGUgdGhlIHRyeS9jYXRjaCBibG9jay5cbiAgICAgICAgZmluYWxseUVudHJ5ID0gbnVsbDtcbiAgICAgIH1cblxuICAgICAgdmFyIHJlY29yZCA9IGZpbmFsbHlFbnRyeSA/IGZpbmFsbHlFbnRyeS5jb21wbGV0aW9uIDoge307XG4gICAgICByZWNvcmQudHlwZSA9IHR5cGU7XG4gICAgICByZWNvcmQuYXJnID0gYXJnO1xuXG4gICAgICBpZiAoZmluYWxseUVudHJ5KSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICAgIHRoaXMubmV4dCA9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jO1xuICAgICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGUocmVjb3JkKTtcbiAgICB9LFxuXG4gICAgY29tcGxldGU6IGZ1bmN0aW9uKHJlY29yZCwgYWZ0ZXJMb2MpIHtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHRocm93IHJlY29yZC5hcmc7XG4gICAgICB9XG5cbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJicmVha1wiIHx8XG4gICAgICAgICAgcmVjb3JkLnR5cGUgPT09IFwiY29udGludWVcIikge1xuICAgICAgICB0aGlzLm5leHQgPSByZWNvcmQuYXJnO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJyZXR1cm5cIikge1xuICAgICAgICB0aGlzLnJ2YWwgPSB0aGlzLmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIHRoaXMubWV0aG9kID0gXCJyZXR1cm5cIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gXCJlbmRcIjtcbiAgICAgIH0gZWxzZSBpZiAocmVjb3JkLnR5cGUgPT09IFwibm9ybWFsXCIgJiYgYWZ0ZXJMb2MpIHtcbiAgICAgICAgdGhpcy5uZXh0ID0gYWZ0ZXJMb2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH0sXG5cbiAgICBmaW5pc2g6IGZ1bmN0aW9uKGZpbmFsbHlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkuZmluYWxseUxvYyA9PT0gZmluYWxseUxvYykge1xuICAgICAgICAgIHRoaXMuY29tcGxldGUoZW50cnkuY29tcGxldGlvbiwgZW50cnkuYWZ0ZXJMb2MpO1xuICAgICAgICAgIHJlc2V0VHJ5RW50cnkoZW50cnkpO1xuICAgICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIFwiY2F0Y2hcIjogZnVuY3Rpb24odHJ5TG9jKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA9PT0gdHJ5TG9jKSB7XG4gICAgICAgICAgdmFyIHJlY29yZCA9IGVudHJ5LmNvbXBsZXRpb247XG4gICAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgICAgIHZhciB0aHJvd24gPSByZWNvcmQuYXJnO1xuICAgICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aHJvd247XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gVGhlIGNvbnRleHQuY2F0Y2ggbWV0aG9kIG11c3Qgb25seSBiZSBjYWxsZWQgd2l0aCBhIGxvY2F0aW9uXG4gICAgICAvLyBhcmd1bWVudCB0aGF0IGNvcnJlc3BvbmRzIHRvIGEga25vd24gY2F0Y2ggYmxvY2suXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIGNhdGNoIGF0dGVtcHRcIik7XG4gICAgfSxcblxuICAgIGRlbGVnYXRlWWllbGQ6IGZ1bmN0aW9uKGl0ZXJhYmxlLCByZXN1bHROYW1lLCBuZXh0TG9jKSB7XG4gICAgICB0aGlzLmRlbGVnYXRlID0ge1xuICAgICAgICBpdGVyYXRvcjogdmFsdWVzKGl0ZXJhYmxlKSxcbiAgICAgICAgcmVzdWx0TmFtZTogcmVzdWx0TmFtZSxcbiAgICAgICAgbmV4dExvYzogbmV4dExvY1xuICAgICAgfTtcblxuICAgICAgaWYgKHRoaXMubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAvLyBEZWxpYmVyYXRlbHkgZm9yZ2V0IHRoZSBsYXN0IHNlbnQgdmFsdWUgc28gdGhhdCB3ZSBkb24ndFxuICAgICAgICAvLyBhY2NpZGVudGFsbHkgcGFzcyBpdCBvbiB0byB0aGUgZGVsZWdhdGUuXG4gICAgICAgIHRoaXMuYXJnID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQ29udGludWVTZW50aW5lbDtcbiAgICB9XG4gIH07XG59KShcbiAgLy8gSW4gc2xvcHB5IG1vZGUsIHVuYm91bmQgYHRoaXNgIHJlZmVycyB0byB0aGUgZ2xvYmFsIG9iamVjdCwgZmFsbGJhY2sgdG9cbiAgLy8gRnVuY3Rpb24gY29uc3RydWN0b3IgaWYgd2UncmUgaW4gZ2xvYmFsIHN0cmljdCBtb2RlLiBUaGF0IGlzIHNhZGx5IGEgZm9ybVxuICAvLyBvZiBpbmRpcmVjdCBldmFsIHdoaWNoIHZpb2xhdGVzIENvbnRlbnQgU2VjdXJpdHkgUG9saWN5LlxuICAoZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMgfHwgKHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiICYmIHNlbGYpO1xuICB9KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKVxuKTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuLy8gVGhpcyBtZXRob2Qgb2Ygb2J0YWluaW5nIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0IG5lZWRzIHRvIGJlXG4vLyBrZXB0IGlkZW50aWNhbCB0byB0aGUgd2F5IGl0IGlzIG9idGFpbmVkIGluIHJ1bnRpbWUuanNcbnZhciBnID0gKGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcyB8fCAodHlwZW9mIHNlbGYgPT09IFwib2JqZWN0XCIgJiYgc2VsZik7XG59KSgpIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcblxuLy8gVXNlIGBnZXRPd25Qcm9wZXJ0eU5hbWVzYCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCBjYWxsaW5nXG4vLyBgaGFzT3duUHJvcGVydHlgIG9uIHRoZSBnbG9iYWwgYHNlbGZgIG9iamVjdCBpbiBhIHdvcmtlci4gU2VlICMxODMuXG52YXIgaGFkUnVudGltZSA9IGcucmVnZW5lcmF0b3JSdW50aW1lICYmXG4gIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGcpLmluZGV4T2YoXCJyZWdlbmVyYXRvclJ1bnRpbWVcIikgPj0gMDtcblxuLy8gU2F2ZSB0aGUgb2xkIHJlZ2VuZXJhdG9yUnVudGltZSBpbiBjYXNlIGl0IG5lZWRzIHRvIGJlIHJlc3RvcmVkIGxhdGVyLlxudmFyIG9sZFJ1bnRpbWUgPSBoYWRSdW50aW1lICYmIGcucmVnZW5lcmF0b3JSdW50aW1lO1xuXG4vLyBGb3JjZSByZWV2YWx1dGF0aW9uIG9mIHJ1bnRpbWUuanMuXG5nLnJlZ2VuZXJhdG9yUnVudGltZSA9IHVuZGVmaW5lZDtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9ydW50aW1lXCIpO1xuXG5pZiAoaGFkUnVudGltZSkge1xuICAvLyBSZXN0b3JlIHRoZSBvcmlnaW5hbCBydW50aW1lLlxuICBnLnJlZ2VuZXJhdG9yUnVudGltZSA9IG9sZFJ1bnRpbWU7XG59IGVsc2Uge1xuICAvLyBSZW1vdmUgdGhlIGdsb2JhbCBwcm9wZXJ0eSBhZGRlZCBieSBydW50aW1lLmpzLlxuICB0cnkge1xuICAgIGRlbGV0ZSBnLnJlZ2VuZXJhdG9yUnVudGltZTtcbiAgfSBjYXRjaChlKSB7XG4gICAgZy5yZWdlbmVyYXRvclJ1bnRpbWUgPSB1bmRlZmluZWQ7XG4gIH1cbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZ2VuZXJhdG9yLXJ1bnRpbWVcIik7XG4iLCJmdW5jdGlvbiBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIGtleSwgYXJnKSB7XG4gIHRyeSB7XG4gICAgdmFyIGluZm8gPSBnZW5ba2V5XShhcmcpO1xuICAgIHZhciB2YWx1ZSA9IGluZm8udmFsdWU7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmVqZWN0KGVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoaW5mby5kb25lKSB7XG4gICAgcmVzb2x2ZSh2YWx1ZSk7XG4gIH0gZWxzZSB7XG4gICAgUHJvbWlzZS5yZXNvbHZlKHZhbHVlKS50aGVuKF9uZXh0LCBfdGhyb3cpO1xuICB9XG59XG5cbmZ1bmN0aW9uIF9hc3luY1RvR2VuZXJhdG9yKGZuKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB0aGlzLFxuICAgICAgICBhcmdzID0gYXJndW1lbnRzO1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgZ2VuID0gZm4uYXBwbHkoc2VsZiwgYXJncyk7XG5cbiAgICAgIGZ1bmN0aW9uIF9uZXh0KHZhbHVlKSB7XG4gICAgICAgIGFzeW5jR2VuZXJhdG9yU3RlcChnZW4sIHJlc29sdmUsIHJlamVjdCwgX25leHQsIF90aHJvdywgXCJuZXh0XCIsIHZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gX3Rocm93KGVycikge1xuICAgICAgICBhc3luY0dlbmVyYXRvclN0ZXAoZ2VuLCByZXNvbHZlLCByZWplY3QsIF9uZXh0LCBfdGhyb3csIFwidGhyb3dcIiwgZXJyKTtcbiAgICAgIH1cblxuICAgICAgX25leHQodW5kZWZpbmVkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBfYXN5bmNUb0dlbmVyYXRvcjsiLCJmdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IF9jbGFzc0NhbGxDaGVjazsiLCJmdW5jdGlvbiBfZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gIH1cbn1cblxuZnVuY3Rpb24gX2NyZWF0ZUNsYXNzKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICBpZiAocHJvdG9Qcm9wcykgX2RlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgaWYgKHN0YXRpY1Byb3BzKSBfZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICByZXR1cm4gQ29uc3RydWN0b3I7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gX2NyZWF0ZUNsYXNzOyIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGh0bWxTdHJpbmcpIHtcbiAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZVJhbmdlKCkuY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50KGh0bWxTdHJpbmcpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29uZGl0aW9uRnVuY3Rpb24pIHtcbiAgY29uc3QgcG9sbCA9IGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICBpZiAoY29uZGl0aW9uRnVuY3Rpb24oKSkgcmVzb2x2ZSgpO1xuICAgIGVsc2Ugc2V0VGltZW91dCgoKSA9PiBwb2xsKHJlc29sdmUpLCA1MDApO1xuICB9O1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShwb2xsKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGdldEFjdGl2ZVRhYikge1xuICBjb25zdCB0YWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgIFwiLnByb3BlcnRpZXNfcGFuZWwtLWFjdGl2ZVRhYi0tZUJZUkcucHJvcGVydGllc19wYW5lbC0tdGFiLS0xZy1FRlwiXG4gICk7XG4gIHJldHVybiB0YWIgPyB0YWIudGV4dENvbnRlbnQgOiBmYWxzZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGVJZCkge1xuICByZXR1cm4gd2luZG93LmZpZ21hUGx1Z2luLmdldE5vZGVUeXBlKG5vZGVJZCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZXZlcnNlU3RyaW5nIChzdHIpIHtcbiAgcmV0dXJuIHN0ci5zcGxpdCgnJykucmV2ZXJzZSgpLmpvaW4oJycpO1xufSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChub2RlSWQpIHtcbiAgcmV0dXJuIHdpbmRvdy5BcHAuc2VuZE1lc3NhZ2UoXCJpbnNwZWN0Tm9kZUZvckludGVyYWN0aW9uVGVzdHNcIiwge25vZGVJZH0pLmFyZ3MuZXh0cmFjdGVkVGV4dDtcbn0iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2VsZWN0aW9uKSB7XG4gIGNvbnN0IGxlZnRTaWRlQXJyYXkgPSBzZWxlY3Rpb24uc2xpY2UoMCwgTWF0aC5mbG9vcihzZWxlY3Rpb24ubGVuZ3RoIC8gMikpO1xuICBjb25zdCByaWdodFNpZGVBcnJheSA9IHNlbGVjdGlvbi5zbGljZShNYXRoLmZsb29yKHNlbGVjdGlvbi5sZW5ndGggLyAyKSwgc2VsZWN0aW9uLmxlbmd0aCk7XG5cbiAgcmV0dXJuIGAke3RvU3RyaW5nKGxlZnRTaWRlQXJyYXkpfToke3RvU3RyaW5nKHJpZ2h0U2lkZUFycmF5KX1gO1xufVxuXG5jb25zdCB0b1N0cmluZyA9IChhcnJheSkgPT4gYXJyYXkucmVkdWNlKChhY2N1bXVsYXRvciwgY3VycmVudFZhbHVlLCBpbmRleCkgPT4ge1xuICByZXR1cm4gYWNjdW11bGF0b3IgKyAoY3VycmVudFZhbHVlICogTWF0aC5wb3coMjU2LCBpbmRleCkpO1xufSkiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgY29uc3Qgbm9kZUlkID0gT2JqZWN0LmtleXMoQXBwLl9zdGF0ZS5taXJyb3Iuc2NlbmVHcmFwaFNlbGVjdGlvbilbMF07XG5cbiAgaWYgKG5vZGVJZCkge1xuICAgIHJldHVybiB3aW5kb3cuZmlnbWFQbHVnaW4uZ2V0Tm9kZVR5cGUobm9kZUlkKTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKEFwcC5fc3RhdGUubWlycm9yLnNjZW5lR3JhcGhTZWxlY3Rpb24pWzBdO1xufSIsImltcG9ydCB7XG4gIHNlbGVjdGlvblRvTm9kZUlkLFxuICBjcmVhdGVOb2RlcyxcbiAgdW50aWwsXG4gIGdldEFjdGl2ZVRhYixcbiAgZ2V0Tm9kZVR5cGUsXG4gIHJldmVyc2VTdHJpbmcsXG4gIGdldE5vZGVUZXh0LFxuICBnZXRTZWxlY3RlZFR5cGUsXG4gIGdldFNlbGVjdGVkTm9kZUlkXG59IGZyb20gXCIuL3V0aWxzXCI7XG5cbmNvbnN0IG5vZGVzVGV4dCA9IGA8ZGl2IGlkPVwiYXJhYmljLXN1cHBvcnRcIiBjbGFzcz1cInJhd19jb21wb25lbnRzLS1wYW5lbC0tM0ljWGcgXCI+PGRpdj48ZGl2IGNsYXNzPVwicmF3X2NvbXBvbmVudHMtLXBhbmVsVGl0bGUtLTdNYU91IHJhd19jb21wb25lbnRzLS1iYXNlLS0zVHBaRyByYXdfY29tcG9uZW50cy0tcm93LS0zZEx4SiBjb2xsYXBzaWJsZV9wcm9wZXJ0eV9wYW5lbC0tcGFuZWxUaXRsZS0tMWNacWxcIj48ZGl2IGNsYXNzPVwiY29sbGFwc2libGVfcHJvcGVydHlfcGFuZWwtLXBhbmVsVGl0bGVUZXh0LS0zR0EwVVwiPkFyYWJpYzwvZGl2PjwvZGl2PjxzcGFuPjwvc3Bhbj48ZGl2PjxkaXYgY2xhc3M9XCJyYXdfY29tcG9uZW50cy0tcm93LS0zZEx4SiB0eXBlX3BhbmVsLS10d29Db2wtLUZqN3J3XCIgc3R5bGU9XCJoZWlnaHQ6IGF1dG87XCI+PGxhYmVsIGNsYXNzPVwiXCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4O2ZsZXgtZGlyZWN0aW9uOiBjb2x1bW47YWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7anVzdGlmeS1jb250ZW50OiBzdHJldGNoO3dpZHRoOiAxMDAlO1wiPjx0ZXh0YXJlYSBkaXI9XCJydGxcIiBpZD1cImFyYWJpYy1zdXBwb3J0LXRleHRhcmVhXCIgdHlwZT1cInRleHRcIiBzcGVsbGNoZWNrPVwiZmFsc2VcIiB2YWx1ZT1cIjBcIiBzdHlsZT1cImJhY2tncm91bmQ6ICNmY2ZjZmM7d2lkdGg6IDEwMCU7aGVpZ2h0OiAyNHB4O3BhZGRpbmc6IDRweDtib3gtc2l6aW5nOiBib3JkZXItYm94O2JvcmRlcjogMXB4IHNvbGlkICNkNGQ0ZDQ7Ym9yZGVyLXJhZGl1czogM3B4O2hlaWdodDogODBweDttYXJnaW4tYm90dG9tOiA4cHg7XCI+PC90ZXh0YXJlYT48L2xhYmVsPjwvZGl2PjwvZGl2PjwvZGl2PjwvZGl2PmA7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFyYWJpY1N1cHBvcnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmluamVjdCgpO1xuICAgIHdpbmRvdy5BcHAuZnJvbUZ1bGxzY3JlZW4ub24oXG4gICAgICBcInNlbGVjdGlvbjpyZXBsYWNlU2VsZWN0b3JzXCIsXG4gICAgICB0aGlzLm9uTGF5ZXJzU2VsZWN0ZWQuYmluZCh0aGlzKVxuICAgICk7XG4gICAgd2luZG93LkFwcC5mcm9tRnVsbHNjcmVlbi5vbihcbiAgICAgIFwic2VsZWN0aW9uOmFkZFNlbGVjdG9yc1wiLFxuICAgICAgdGhpcy5vbkxheWVyc1NlbGVjdGVkLmJpbmQodGhpcylcbiAgICApO1xuXG4gICAgc2V0SW50ZXJ2YWwodGhpcy5pbmplY3QuYmluZCh0aGlzKSwgNTAwKTtcbiAgfVxuXG4gIGdldFBhbmVsKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImFyYWJpYy1zdXBwb3J0XCIpO1xuICB9XG5cbiAgZ2V0VGV4dGFyZWEoKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYXJhYmljLXN1cHBvcnQtdGV4dGFyZWFcIik7XG4gIH1cblxuICBhc3luYyBpbmplY3QoKSB7XG4gICAgYXdhaXQgdW50aWwoXG4gICAgICAoKSA9PiBnZXRBY3RpdmVUYWIoKSA9PT0gXCJERVNJR05cIiAmJiBnZXRTZWxlY3RlZFR5cGUoKSA9PT0gXCJURVhUXCJcbiAgICApO1xuXG4gICAgaWYgKCF0aGlzLmdldFBhbmVsKCkpIHtcbiAgICAgIGNvbnN0IG5vZGVzID0gY3JlYXRlTm9kZXMobm9kZXNUZXh0KTtcbiAgICAgIGNvbnN0IHRleHRQYW5lbCA9IFtdLnNsaWNlXG4gICAgICAgIC5jYWxsKFxuICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcbiAgICAgICAgICAgICAgXCJwcm9wZXJ0aWVzX3BhbmVsLS1wcm9wZXJ0aWVzUGFuZWwtLTNQQ3RoXCJcbiAgICAgICAgICAgIClbMF1cbiAgICAgICAgICAgIC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY2FjaGVkU3VidHJlZVwiKVxuICAgICAgICApXG4gICAgICAgIC5maWx0ZXIocGFuZWwgPT4gcGFuZWwudGV4dENvbnRlbnQuaW5kZXhPZihcIlRleHRcIikgIT09IC0xKVswXTtcbiAgICAgIHRleHRQYW5lbC5hcHBlbmRDaGlsZChub2Rlcyk7XG5cbiAgICAgIGNvbnN0IHRleHRhcmVhID0gdGhpcy5nZXRUZXh0YXJlYSgpO1xuICAgICAgY29uc3Qgc2VsZWN0ZWROb2RlSWQgPSBnZXRTZWxlY3RlZE5vZGVJZCgpO1xuXG4gICAgICBhd2FpdCB1bnRpbCgoKSA9PiB0eXBlb2Ygc2VsZWN0ZWROb2RlSWQgIT09IFwidW5kZWZpbmVkXCIpO1xuXG4gICAgICBjb25zdCBzZWxlY3RlZE5vZGVUZXh0ID0gZ2V0Tm9kZVRleHQoc2VsZWN0ZWROb2RlSWQpO1xuICAgICAgdGV4dGFyZWEudmFsdWUgPSByZXZlcnNlU3RyaW5nKHNlbGVjdGVkTm9kZVRleHQpO1xuICAgICAgdGV4dGFyZWEuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIHRoaXMuaGFuZGxlSW5wdXQuYmluZCh0aGlzKSk7XG4gICAgfVxuICB9XG5cbiAgb25MYXllcnNTZWxlY3RlZChldmVudCkge1xuICAgIGNvbnN0IHVpID0gdGhpcy5nZXRQYW5lbCgpO1xuICAgIGNvbnN0IHNlbGVjdGlvbnMgPSBBcnJheS5mcm9tKGV2ZW50LmJ1ZmZlcik7XG5cbiAgICBpZiAodWkgPT09IG51bGwgfHwgc2VsZWN0aW9ucy5sZW5ndGggIT09IDgpIHJldHVybjtcblxuICAgIGNvbnN0IHNlbGVjdGVkTm9kZUlkID0gc2VsZWN0aW9uVG9Ob2RlSWQoc2VsZWN0aW9ucyk7XG4gICAgY29uc3Qgbm9kZVR5cGUgPSBnZXROb2RlVHlwZShzZWxlY3RlZE5vZGVJZCk7XG5cbiAgICBpZiAobm9kZVR5cGUgPT09IFwiVEVYVFwiKSB7XG4gICAgICB1aS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgY29uc3QgdGV4dGFyZWEgPSB0aGlzLmdldFRleHRhcmVhKCk7XG4gICAgICBjb25zdCBzZWxlY3RlZE5vZGVUZXh0ID0gZ2V0Tm9kZVRleHQoc2VsZWN0ZWROb2RlSWQpO1xuICAgICAgdGV4dGFyZWEudmFsdWUgPSByZXZlcnNlU3RyaW5nKHNlbGVjdGVkTm9kZVRleHQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1aS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICBjb25zdCB0ZXh0YXJlYSA9IHRoaXMuZ2V0VGV4dGFyZWEoKTtcbiAgICAgIHRleHRhcmVhLnZhbHVlID0gXCJcIjtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVJbnB1dChldmVudCkge1xuICAgIC8vIFRPRE86IHVzZSBwcm9wZXIgUlRMIHN1cHBvcnQgaW5zdGVhZCBvZiBqdXN0IHJldmVyc2luZy5cbiAgICAvLyAxLiBFeHRyYWN0IEFyYWJpYyB3b3JkcyAoYnkgc3BsaXR0aW5nIHRleHQgYWNjb3JkaW5nIHRvIG5ldHVyYWwgY2hhcmFjdGFycyApXG4gICAgLy8gMi4gUmV2ZXJzZSAmIHJlc2hhcGUgQXJhYmljIHdvcmRzLlxuICAgIC8vIGh0dHBzOi8vd3d3Lm5wbWpzLmNvbS9wYWNrYWdlL2RpcmVjdGlvblxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9sb3V5L0phdmFzY3JpcHQtQXJhYmljLVJlc2hhcGVyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL21hcG1lbGQvanMtYXJhYmljLXJlc2hhcGVyXG4gICAgd2luZG93LmZpZ21hUGx1Z2luLnJlcGxhY2VUZXh0KHJldmVyc2VTdHJpbmcoZXZlbnQudGFyZ2V0LnZhbHVlKSk7XG4gICAgY29uc3QgdGV4dGFyZWEgPSB0aGlzLmdldFRleHRhcmVhKCk7XG4gICAgdGV4dGFyZWEuZm9jdXMoKTtcbiAgfVxufVxuIiwiaW1wb3J0IEFyYWJpY1N1cHBvcnQgZnJvbSBcIi4vYXJhYmljLXN1cHBvcnQuanNcIjtcblxud2luZG93LmFyYWJpY1N1cHBvcnQgPSBuZXcgQXJhYmljU3VwcG9ydCgpO1xuIl0sIm5hbWVzIjpbImdsb2JhbCIsIk9wIiwiT2JqZWN0IiwicHJvdG90eXBlIiwiaGFzT3duIiwiaGFzT3duUHJvcGVydHkiLCJ1bmRlZmluZWQiLCIkU3ltYm9sIiwiU3ltYm9sIiwiaXRlcmF0b3JTeW1ib2wiLCJpdGVyYXRvciIsImFzeW5jSXRlcmF0b3JTeW1ib2wiLCJhc3luY0l0ZXJhdG9yIiwidG9TdHJpbmdUYWdTeW1ib2wiLCJ0b1N0cmluZ1RhZyIsInJ1bnRpbWUiLCJyZWdlbmVyYXRvclJ1bnRpbWUiLCJtb2R1bGUiLCJpbk1vZHVsZSIsImV4cG9ydHMiLCJ3cmFwIiwiaW5uZXJGbiIsIm91dGVyRm4iLCJzZWxmIiwidHJ5TG9jc0xpc3QiLCJwcm90b0dlbmVyYXRvciIsIkdlbmVyYXRvciIsImdlbmVyYXRvciIsImNyZWF0ZSIsImNvbnRleHQiLCJDb250ZXh0IiwiX2ludm9rZSIsIm1ha2VJbnZva2VNZXRob2QiLCJ0cnlDYXRjaCIsImZuIiwib2JqIiwiYXJnIiwidHlwZSIsImNhbGwiLCJlcnIiLCJHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0IiwiR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCIsIkdlblN0YXRlRXhlY3V0aW5nIiwiR2VuU3RhdGVDb21wbGV0ZWQiLCJDb250aW51ZVNlbnRpbmVsIiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsIkl0ZXJhdG9yUHJvdG90eXBlIiwiZ2V0UHJvdG8iLCJnZXRQcm90b3R5cGVPZiIsIk5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlIiwidmFsdWVzIiwiR3AiLCJjb25zdHJ1Y3RvciIsImRpc3BsYXlOYW1lIiwiZGVmaW5lSXRlcmF0b3JNZXRob2RzIiwiZm9yRWFjaCIsIm1ldGhvZCIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJnZW5GdW4iLCJjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiX19hd2FpdCIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJyZXNvbHZlIiwicmVqZWN0IiwicmVjb3JkIiwicmVzdWx0IiwidmFsdWUiLCJQcm9taXNlIiwidGhlbiIsInVud3JhcHBlZCIsImVycm9yIiwicHJldmlvdXNQcm9taXNlIiwiZW5xdWV1ZSIsImNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnIiwiYXN5bmMiLCJpdGVyIiwibmV4dCIsImRvbmUiLCJzdGF0ZSIsIkVycm9yIiwiZG9uZVJlc3VsdCIsImRlbGVnYXRlIiwiZGVsZWdhdGVSZXN1bHQiLCJtYXliZUludm9rZURlbGVnYXRlIiwic2VudCIsIl9zZW50IiwiZGlzcGF0Y2hFeGNlcHRpb24iLCJhYnJ1cHQiLCJyZXR1cm4iLCJUeXBlRXJyb3IiLCJpbmZvIiwicmVzdWx0TmFtZSIsIm5leHRMb2MiLCJ0b1N0cmluZyIsInB1c2hUcnlFbnRyeSIsImxvY3MiLCJlbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0Iiwia2V5cyIsIm9iamVjdCIsImtleSIsInJldmVyc2UiLCJsZW5ndGgiLCJwb3AiLCJpdGVyYWJsZSIsIml0ZXJhdG9yTWV0aG9kIiwiaXNOYU4iLCJpIiwic2tpcFRlbXBSZXNldCIsInByZXYiLCJjaGFyQXQiLCJzbGljZSIsInN0b3AiLCJyb290RW50cnkiLCJyb290UmVjb3JkIiwicnZhbCIsImV4Y2VwdGlvbiIsImhhbmRsZSIsImxvYyIsImNhdWdodCIsImhhc0NhdGNoIiwiaGFzRmluYWxseSIsImZpbmFsbHlFbnRyeSIsImNvbXBsZXRlIiwiZmluaXNoIiwidGhyb3duIiwiZGVsZWdhdGVZaWVsZCIsIkZ1bmN0aW9uIiwiZyIsImhhZFJ1bnRpbWUiLCJnZXRPd25Qcm9wZXJ0eU5hbWVzIiwiaW5kZXhPZiIsIm9sZFJ1bnRpbWUiLCJyZXF1aXJlIiwiZSIsImFzeW5jR2VuZXJhdG9yU3RlcCIsImdlbiIsIl9uZXh0IiwiX3Rocm93IiwiX2FzeW5jVG9HZW5lcmF0b3IiLCJhcmdzIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfY2xhc3NDYWxsQ2hlY2siLCJpbnN0YW5jZSIsIkNvbnN0cnVjdG9yIiwiX2RlZmluZVByb3BlcnRpZXMiLCJ0YXJnZXQiLCJwcm9wcyIsImRlc2NyaXB0b3IiLCJlbnVtZXJhYmxlIiwiY29uZmlndXJhYmxlIiwid3JpdGFibGUiLCJkZWZpbmVQcm9wZXJ0eSIsIl9jcmVhdGVDbGFzcyIsInByb3RvUHJvcHMiLCJzdGF0aWNQcm9wcyIsImh0bWxTdHJpbmciLCJkb2N1bWVudCIsImNyZWF0ZVJhbmdlIiwiY3JlYXRlQ29udGV4dHVhbEZyYWdtZW50IiwiY29uZGl0aW9uRnVuY3Rpb24iLCJwb2xsIiwic2V0VGltZW91dCIsImdldEFjdGl2ZVRhYiIsInRhYiIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXh0Q29udGVudCIsIm5vZGVJZCIsIndpbmRvdyIsImZpZ21hUGx1Z2luIiwiZ2V0Tm9kZVR5cGUiLCJyZXZlcnNlU3RyaW5nIiwic3RyIiwic3BsaXQiLCJqb2luIiwiQXBwIiwic2VuZE1lc3NhZ2UiLCJleHRyYWN0ZWRUZXh0Iiwic2VsZWN0aW9uIiwibGVmdFNpZGVBcnJheSIsIk1hdGgiLCJmbG9vciIsInJpZ2h0U2lkZUFycmF5IiwiYXJyYXkiLCJyZWR1Y2UiLCJhY2N1bXVsYXRvciIsImN1cnJlbnRWYWx1ZSIsImluZGV4IiwicG93IiwiX3N0YXRlIiwibWlycm9yIiwic2NlbmVHcmFwaFNlbGVjdGlvbiIsIm5vZGVzVGV4dCIsIkFyYWJpY1N1cHBvcnQiLCJpbmplY3QiLCJmcm9tRnVsbHNjcmVlbiIsIm9uIiwib25MYXllcnNTZWxlY3RlZCIsImJpbmQiLCJzZXRJbnRlcnZhbCIsImdldEVsZW1lbnRCeUlkIiwidW50aWwiLCJnZXRTZWxlY3RlZFR5cGUiLCJnZXRQYW5lbCIsIm5vZGVzIiwiY3JlYXRlTm9kZXMiLCJ0ZXh0UGFuZWwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZmlsdGVyIiwicGFuZWwiLCJhcHBlbmRDaGlsZCIsInRleHRhcmVhIiwiZ2V0VGV4dGFyZWEiLCJzZWxlY3RlZE5vZGVJZCIsImdldFNlbGVjdGVkTm9kZUlkIiwic2VsZWN0ZWROb2RlVGV4dCIsImdldE5vZGVUZXh0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImhhbmRsZUlucHV0IiwiZXZlbnQiLCJ1aSIsInNlbGVjdGlvbnMiLCJBcnJheSIsImZyb20iLCJidWZmZXIiLCJzZWxlY3Rpb25Ub05vZGVJZCIsIm5vZGVUeXBlIiwic3R5bGUiLCJkaXNwbGF5IiwicmVwbGFjZVRleHQiLCJmb2N1cyIsImFyYWJpY1N1cHBvcnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0NBQUE7Ozs7OztDQU9BLENBQUUsVUFBU0EsTUFBVCxFQUFpQjs7T0FHYkMsRUFBRSxHQUFHQyxNQUFNLENBQUNDLFNBQWhCO09BQ0lDLE1BQU0sR0FBR0gsRUFBRSxDQUFDSSxjQUFoQjtPQUNJQyxTQUFKLENBTGlCOztPQU1iQyxPQUFPLEdBQUcsT0FBT0MsTUFBUCxLQUFrQixVQUFsQixHQUErQkEsTUFBL0IsR0FBd0MsRUFBdEQ7T0FDSUMsY0FBYyxHQUFHRixPQUFPLENBQUNHLFFBQVIsSUFBb0IsWUFBekM7T0FDSUMsbUJBQW1CLEdBQUdKLE9BQU8sQ0FBQ0ssYUFBUixJQUF5QixpQkFBbkQ7T0FDSUMsaUJBQWlCLEdBQUdOLE9BQU8sQ0FBQ08sV0FBUixJQUF1QixlQUEvQztPQUdJQyxPQUFPLEdB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
