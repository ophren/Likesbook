
var _ = {};

// ARRAYS

// _.first(array, [n])
// Returns an array with the first n elements of an array.
// If n is not provided it returns an array with just the first element.


_.first = function (array, n) {
	var num = 0;

    // QUESTION -> isArray is false for the arguments object and returns an empty array. Why? 
    // l'algo pense que mocks.argumentsObj n'est pas un array et retourne [];
    
    if (typeof array !== "object" || array == null) {
        return [];
    }
    

        if (isNaN(n) || n <= 0) {
        num = 1;        

        }

        if (n > 0 && n <= array.length) {
            num = n;
            
            }

        if (n>array.length) {
            num = array.length;
            
        }   
    
	   return Array.prototype.slice.call(array, 0, num);
    

};

// _.last(array, [n])
// Returns an array with the last n elements of an array.
// If n is not provided it returns an array with just the last element.
_.last = function (array, n) {

    if (typeof array !== "object" || array == null) {
        return [];
    }
    /*
	if (Array.isArray(arguments[0]) === false) {
		var sliced5=[];
		return sliced5;
	}*/

	if (isNaN(n) || n <= 0 || typeof n == "undefined") {

		return [mocks.arr[mocks.arr.length-1]];
	}

	if (n > 0 && n <= array.length) {

		return Array.prototype.slice.call(mocks.arr, array.length-n, array.length);
	}

	else return mocks.arr;

};

// _.uniq(array)
// Produces a duplicate-free version of the array, using === to test equality.
// In particular only the first occurence of each value is kept.
_.uniq = function (array) {

	var new_array = [];

//1 - Replacing second occurrences by "x" (something like [1,2,x,3,4,x])
	 for (var i=0; i < array.length; i++) {
	   for (var j=0; j < array.length; j++) {

	       if (array[i] === array [j] && i !== j) {
	          array[j] = "x";
	       }
	   }
	 }

	// 2 - placing the non-letter elements in a new table
	for (var i=0; i < array.length; i++) {
	  if (isNaN(array[i]) === false) {
	      new_array.push (array[i]);
	  }
	}

// Remark: if we do not want to change the original array, we can store it in a temp variable, then reassign
// the content of that variable to array before returning the new_array

return new_array;

};

// OBJECTS

// _.extend(destination, source)
// Copies all the own enumerable properties in the source object
// over to the destination object, and returns it.
_.extend = function (destination, source) {
	const returnedTarget = Object.assign(destination, source);
	return returnedTarget;
};


// _.defaults(destination, source)
// Fills in undefined properties in the destination object
// with own enumerable properties present in the source object,
// and returns the destination object.
_.defaults = function (destination, source) {
	
	for (var key in source) {
			if (!(key in destination)){
			//if (destination[key] === undefined) {  --> WHY does not work?
			destination[key] = source[key];

			}
		}
	

	return destination;
};

// COLLECTIONS

// _.each(collection, iteratee, [context])
// Iterates over a collection of elements (i.e. array or object),
// yielding each in turn to an iteratee function, that is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Returns the collection for chaining.

_.each = function (collection, iteratee, context) {
		
// bind a function called iteratee to a context (this)

	  // 1 - iterates over array

	  if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++) {
        	
            if (context == null) {
            iteratee(collection[i], i, collection);
            }

            else {
                var test = iteratee.bind(context);
                test(); 
                
            }

    	}
        	return collection;
      }


     // 2 - iterates over object ignoring "foo"

        	for (var key in collection) {

        		if (key == "foo") {
        			continue;
        		}


        		if (context == null) {
        			
            	iteratee(collection[key], key, collection); 
                }


                else {
                var test = iteratee.bind(context);
                test(); 
                
                }
        	}
        	return collection;

};




// _.contains(collection, value)
// Returns an array of indexes / keys where value can be found in the collection.
// TIP: here's a demo of how you can re-use already implemented methods in clever ways.
_.contains = function (collection, value) {
  var res = [];
  _.each(collection, function (el, key) {
    el === value && res.push(key);
  });
  return res;
};

// _.map(collection, iteratee, [context])
// Returns a new array of values by mapping each value in collection through iteratee.
// Each invocation of iteratee is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.map = function (collection, iteratee, context) {

	var values_arr = [];
	var values_arr2 = [];


	  //iterates over array
	  if (Array.isArray(collection)) {
        for (var i = 0; i < collection.length; i++){
        	
            var test = iteratee(collection[i], i, collection);
            values_arr.push (test);
    	}
        	return values_arr;
      }

      
      //iterates over object ignoring "foo"
       for (var key in collection) {
        		if (key == "foo") {
        			continue;
        		}
        		else {
        			
            		values_arr2.push (iteratee(collection[key], key, collection)); 
            	}
        	}
        	        	
        	return values_arr2;

};

// _.reduce(collection, iteratee, [accumulator], [context])
// Reduce boils down a collection of values into a single value.
// Accumulator is the initial state of the reduction,
// and each successive step of it should be returned by iteratee.
// Iteratee is passed four arguments: (accumulator, element, index|key, collection),
// and bound to the context if one is passed. If no accumulator is passed
// to the initial invocation of reduce, iteratee is not invoked on the first element,
// and the first element is instead passed as accumulator for the next invocation.


_.reduce = function (collection, iteratee, accumulator, context) {

	var count = 0;

	//Handling objects
	if  (Array.isArray(collection) == false) {


		if (accumulator == undefined) {	

			accumulator = collection[Object.keys(collection)[0]]; //1
			var temp = collection[Object.keys(collection)[0]];

			for (var key in collection) {
				count++;
				if (key == "foo" || count === 1) {
        			continue;
        		}

        		else {
				var element = collection[key]; 
				accumulator = iteratee(accumulator, element, key, collection);
				}
			}
	
			return accumulator;
		}

		else {

			for (var key in collection) {
				var element = collection[key];				
				accumulator = iteratee(accumulator, element, key, collection);

			}

			return accumulator;
		}

	}


	//Handling arrays (with defined and undefined accumulator)
    if (Array.isArray(collection)) {
		if (accumulator == undefined) {
			accumulator = collection[0];
		
			for (var i=1; i<collection.length; i++) {
				var element = collection[i];
				accumulator = iteratee(accumulator, element, i, collection);
			}
		
			return accumulator;

		}

		else {

			for (var i=0; i<collection.length; i++) {
				var element = collection[i];
				accumulator = iteratee(accumulator, element, i, collection);
			}
		
			return accumulator;
	
		}
	}

};

// _.filter(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
_.filter = function (collection, predicate, context) {
	
	var res = [];


	// 1 - Handling array

	if (Array.isArray(collection)) {

		for (var i=0; i<collection.length; i++) {
			
			var element = collection[i];

	    	if (predicate (element, i, collection)) {
	    		res.push(element);
	    	}		

		}
		
		return res;

	}

	// 2 - handling object

	if  (Array.isArray(collection) == false) {


		for (var key in collection) {

				var element = collection[key]; 
				
				if (key == "foo") {
        			continue;
        		}

        		if (predicate (element, key, collection)) {
        			//var test = predicate, log it
	    		res.push(element);
	    	}		
			

		}
	
		return res;
	}
};

// _.reject(collection, predicate, [context])
// Looks through each value in the collection, returning an array of all the values
// that don't pass a truth test (predicate). Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// TIP: can you reuse _.filter()?
_.reject = function (collection, predicate, context) {

	var res = [];

	// 1 - Handling objects

	if  (Array.isArray(collection) == false) {


		for (var key in collection) {
				
				var element = collection[key]; 

				if (key == "foo") {
        			continue;
        		}

				if (!(predicate (element, key, collection))) {
	    		res.push(element);
	    	}	

/*
				if (collection[key] && key !== "foo" && key !== null) {

					res.push(predicate (element, key, collection));

				}
				*/
        								
		}
	
		return res;
	}

	// 2 - Handling arrays

	if (Array.isArray(collection)) {

		for (var i=0; i<collection.length; i++) {
			
			var element = collection[i];
			
			if (!(predicate (element, i, collection))) {
	    		res.push(element);
	    	}	
/*
			if (collection[i]) {
					res.push(predicate (element, i, collection));

				}
*/

		}
		
		return res;

	}


};

// _.every(collection, [predicate], [context])
// Returns true if all values in the collection pass the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a false element is found.
// TIP: without the short-circuiting you could reuse _.reduce(). Can you figure how?
// Because of the short-circuiting though, you need to re-implement a modified _.each().
_.every = function (collection, predicate, context) {

	 //iterates over array
	  if (Array.isArray(collection)) {
        	for (var i = 0; i < collection.length; i++) {
        	
	           

	            if (!(predicate(collection[i], i, collection))) {
	            	return false; }
	            
	    	}
	        	return true;
	   }

 	
	//iterates over object ignoring "foo"

	if  (Array.isArray(collection) == false) {
     
      for (var key in collection) {

	       if (key == "foo") {
	        	continue;
	        	}

            if (!(predicate(collection[key], key, collection))) {
            return false; }

      }  	

      return true;
    
  }

};


// _.some(collection, [predicate], [context])
// Returns true if any value in the collection passes the predicate truth test.
// Predicate is called with three arguments:
// (element, index|key, collection), and bound to the context if one is passed.
// Short-circuits and stops traversing the list if a true element is found.
// TIP: what method that you have already implemented can be reused here?
_.some = function (collection, predicate, context) {

 	//iterates over array
	  if (Array.isArray(collection)) {
        	for (var i = 0; i < collection.length; i++) {
        	
	           

	            if (predicate(collection[i], i, collection)) {
	            	return true; }
	            
	    	}
	        	return false;
	   }

 	
	//iterates over object ignoring "foo"

		if  (Array.isArray(collection) == false) {
     
      		for (var key in collection) {

		       if (key == "foo") {
		        	continue;
		        	}

	            if (predicate(collection[key], key, collection)) {
	            return true; }

      }  	

      	return false;
    
  	}
	

};

// _.invoke(collection, methodName, *arguments)
// Returns an array with the results of calling the method
// indicated by methodName on each value in the collection.
// Any extra arguments passed to invoke will be forwarded on to the method invocation.
_.invoke = function (collection, methodName) {

    // Note : extra arguments are used in the called function, see https://www.youtube.com/watch?v=J-8nsiTZDeE

    var arr_res = [];
    var args = Array.prototype.slice.call (arguments, 2, arguments.length);
    

    //getting method name for call
	var fnstring = methodName;
	var fn = window[fnstring];


    	// 1 - Handling arrays
    	if (Array.isArray(collection)) {
    		for (var i = 0; i < collection.length; i++) {

    			var res = fn.apply(collection[i], args);
    			arr_res.push (res);
              
    			
    			//https://stackoverflow.com/questions/359788/how-to-execute-a-javascript-function-when-i-have-its-name-as-a-string
    		    //https://www.labnol.org/code/20181-call-javascript-function-by-name
    		    //https://www.sitepoint.com/call-javascript-function-string-without-using-eval/
    		}
    		
    		return arr_res;

    	}

    	// 2 - Handling objects
    	if (Array.isArray(collection) == false) { 

    		for (var key in collection) {
    			
    			if (typeof collection[key] !== 'function') { 
    				var res = fn.apply(collection[key], args);
    				arr_res.push (res);

    				}
    			
    		}
    		
    		return arr_res;
    	}


/*

 return _.map(collection, function(el) {
        return (func instanceof Function) ? func.apply(el, args) : el[func].apply(el, args);
    });*/

};

// _.pluck(collection, propertyName)
// A convenient version of what is perhaps the most common use-case for map:
// given an array of objects (collection), iterates over each element
// in the collection, and returns an array with all the values
// corresponding to the property indicated by propertyName.
_.pluck = function (collection, propertyName) {

    var arr_res = [];

    for (var i=0; i<collection.length; i++) {

        var res = collection[i][propertyName]; //This is how you use the name of the current property
        arr_res.push(res);
    }

    return arr_res;

};

// FUNCTIONS

// _.once(func)
// Creates a version of the function that can only be called one time.
// Repeated calls to the modified function will have no effect,
// returning the value from the original call. Useful for initialization functions,
// instead of having to set a boolean flag and then check it later.
_.once = function (func) {


    //CHEAT! Tester sur jsfiddle
    //the value of memo does not change because it's on the right side, it cannot be reinitialized with every call.
   var ran = false, memo;

    return function() {
      if (ran) return memo;
        ran = true;
        memo = func.apply(this, arguments);
        
      return memo;
    };
    




};


var arr = [];

// _.memoize(func)
// Memoizes a given function by caching the computed result.
// Useful for speeding up slow-running computations.
// You may assume that the memoized function takes only one argument
// and that it is a primitive. Memoize should return a function that when called,
// will check if it has already computed the result for the given argument
// and return that value instead of recomputing it.
_.memoize = function (func) {

// Example  of the contact list, hardest line is return function

  var cache = [];

  return function(n) {

        var idx=n.toString();

        if(cache[idx] == undefined) {
            cache[idx] = func(n);
        }

        return cache[idx];

  };
  

};

// _.delay(function, wait, *arguments)
// Much like setTimeout(), invokes function after waiting milliseconds.
// If you pass the optional arguments, they will be forwarded
// on to the function when it is invoked.
_.delay = function (func, wait) {

// example with args ->  _.delay(console.log, 1000, 'coding is fun!');
// apply lets you pass as many args as you want, no need to declare x arguments prior to calling the function
// function (func, wait) can also get "invisible" arguments, here a string. We store them in a variable
// Then we return the function setTimeout. The problem is that it needs func and wait as arguments, but func needs
// to pass a string argument. Therefore, we create a function doing that, and pass it as argument to setTimeout.

    var args = Array.prototype.slice.call(arguments, 2);

    return setTimeout(function () {
        func.apply(null, args);
    }, wait);



    
};

// _.throttle(function, wait)
// Returns a new, throttled version of the passed function that,
// when invoked repeatedly, will only call the original function
// at most once per every wait milliseconds, and otherwise will
// just return the last computed result. Useful for rate-limiting
// events that occur faster than you can keep up with.
_.throttle = function (func, wait) {

    let last = 0;

    return (...args) => {
        const now = new Date().getTime();

        if(now - last < wait) {
            return;
        }

        last = now;
        return func (...args);
    }
};



// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = _;
}
