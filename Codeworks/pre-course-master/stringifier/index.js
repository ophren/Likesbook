
/* 
Stringifier - description

-- First, we determine if the input is a simple type (not an object/array). If so, we directly stringify        the result via the converter function (e.g. if the input is a single number, a single function, etc.)
   *
   
-- The "converter" function returns a string for each type of element (e.g. converting arr to string,...)
     *
-- The "test" function identifies & replicates the struture of the main input (obj within array, etc.)
-- The test function is split into two parts, handling respectively arrays [] and objects {}.
-- The test function returns a result with extra comma. The last for loop removes them and returns
     the final result -> the variable stringified

My questions : 
#1 - should return undefined, but print null, why not print undefined?
#2 - How to 


*/


function stringifier (input) {

console.log(input);
    var res = "";
    var stringified = "";

    // test with simple variables (excludes arr/obj)
    if ((input == null || undefined) || typeof input !== "object") {

        return converter(input);
    }
 
 
 
    test(input);


    function converter (part) {

             if (typeof part == "number") {
                var convert_num = part.toString();
                return part.toString();
            }

            if (typeof part == "function") { // it returns undefined but it prints null??

                return undefined;

            }

            if (typeof part == "string") {
                 var test = "\"" + part.toString()+ "\"";
                return test;
            }

             
             if (part == null && typeof part == "object" ) {

                return "null";
             }

             /*
               if ((part == undefined) && typeof part !== "undefined") {
                    var conv_null = "null";
                    return conv_null;

                }*/


            

    }
    
    



    function test (input) {

        // If string, number, function, see
        // See cheat code or code on Sublime Text


    // handling arrays
    if (Array.isArray(input)) {

                res = res + "[";

                for (var i = 0; i < input.length; i++) {

                    if (typeof input[i] == "object" && input[i] !== null) {
                        test (input[i]);
                    }

                    else {
                        var tmp = null;

                            if (converter(input[i]) == undefined) {
                                res = res + tmp + ",";
                            }

                            else {

                            res = res + converter(input[i]) + ",";}
                    }

                }

                res = res + "]" + ",";
    }


    //handling objects
    if (typeof input == "object" && Array.isArray(input) == false) {

        res = res + "{";

              for (var key in input) {

                    //ignoring object prototype
                    if (input.hasOwnProperty(key) == false) {

                        continue;
                }

                    //4 cases

                    if (typeof key == "object") {

                      test (key);
                    }

                    //ignoring function
                    if (typeof key !== "object" && typeof input[key] !== "function" && typeof input[key] !== "undefined") {

                      res = res + "\""+key+"\"" + ":";
                    }


                    if (typeof input[key] == "object") {

                        if (input[key] == null) {

                            res = res + converter(input[key]) + ",";
                        }

                        else {

                        test (input[key]);
                        }
                    }


                    if (typeof input[key] !== "object" && typeof input[key] !== "function" && typeof input[key] !== "undefined") {

                        res = res + converter(input[key]) + ",";
                    }

              }

            res = res + "},";

    }


    }


    // LAST STEP -> STRINGIFY RESULT (removing useless commas) 

      for (var i=0; i<res.length; i++) {

                if ((i == (res.length-1) && res.charAt(i) == ",") 
                    || res.charAt(i) == "," && (res.charAt(i+1) == "}" || res.charAt(i+1) =="]")) {
                          continue;
                      }

                     else {

                       stringified = stringified + res.charAt(i);}
      }

  
     return stringified;

}



// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}




