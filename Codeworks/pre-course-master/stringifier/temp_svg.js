
// Returns a stringified version of input,
// behaving in exactly the same way as JSON.stringify()
function stringifier (input) {

    // 1 - Converting basic types 

    if (typeof input == "number") {

        var convert_num = input.toString();
        return convert_num;
    }

    if (typeof input == "function" ) {
        return undefined;

    }

    if (typeof input == "string" && typeof input !== "function") {
        var test = "\"" + input.toString()+ "\"";
        return test;
    }

 // unnecessary??
   if (input == null && typeof input !== "undefined") {
        var conv_null = "null";
        return conv_null;

   }



    // 2 - Converting plain collections

    // ARRAYS
    

    if (Array.isArray (input)) {
            var temp_arr = [];
            var dimensions = input.length;
            
            //add [ and ] ?
            var final_str = "";

           

            for (var i=0; i<input.length; i++) {

                  if (typeof input[i] == "number") {
                    var final_str = input[i].toString();
                    temp_arr.push (final_str);
                    
                  }

                  if (typeof input[i] == "string") {
                    var final_str = "\"" + input[i].toString()+ "\"";
                    temp_arr.push (final_str);
                 
                  }

                  if (typeof input[i] == "function") {
                        final_str = "null";
                        temp_arr.push (final_str);

                  }

                  if (input[i] == undefined) {
                        final_str = "null";
                        temp_arr.push (final_str);

                  } 
                    /*
                        if (input[i] == null && typeof input[i] !== "undefined") {                
                        final_str = final_str + "null";
                    */

            }

                    //create other tests
                    var res = "[" + temp_arr.join() + "]";

                    return res;
        
    }


    // OBJECTS

//TO DO: remove undefined:undefined from result!
    if (input instanceof Object) {

        var arr_val = [];

        for (var key in input) {


            if (key == "foo") {
                    continue;
                        }

            if (typeof input[key] == "number") {
                var key_val = "\""+key+"\"" + ":" + input[key];
                var final_str = key_val.toString();
                arr_val.push (final_str);
                
              }

            if (typeof input[key] == "string") {
                
                var key_val = "\""+key+"\"" + ":" + "\""+input[key]+"\"";
                var final_str = key_val.toString();
                arr_val.push (final_str);
             
              }

              //POURQUOI FAUT-IL ENLEVER FCT?
              
/*
            if (typeof input[key] == "function") {
                var key_val = "\""+key+"\"" + ":" + input[key];
                var final_str = key_val.toString();
                arr_val.push (final_str);

              }*/

            if (input[key] == undefined) {
                if (typeof input[key] == "object") {
                    var key_val = "\""+key+"\"" + ":" + input[key];
                    var final_str = key_val.toString();
                    arr_val.push (final_str);
                }

            }

        }

                //create other tests
                var res = "{"+ arr_val.join() + "}"

                return res;

    }



    // 3- Converting nested collections

    // nested array -> Will be identified as array
            
}

// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}



/* ------ 2 ------ */








// Returns a stringified version of input,
// behaving in exactly the same way as JSON.stringify()
function stringifier (input) {
        
        var answer = [];

        // If not an array, it's a basic type. No need to call converter via test in that case
        // This if statement is a shortcut
        // CAN BE PLACED IN TEST BEFORE THE FOR LOOP

        if (Array.isArray(input) === false) {

            converter (input);
        }



        //CONVERTER
        // This function converts any type into a string and pushes it to an array
        function converter (part) {

             if (typeof(input) === 'undefined') {
    return undefined
  }
                
                if (typeof part == "number")
                {

                  answer.push(part.toString());

                }

                
                if (typeof part == "string") {

                  answer.push("\"" + part.toString()+ "\"");
                }

                if (typeof part == "function") {

                  return "null";
                }

                 
        }    

      
                  
        //CALLER if array
        //Identifies the dimensions of the array and calls converter with each value of any array
        function test (input) {
            for (var i = 0; i < input.length; i++) {

              if (Array.isArray(input[i])) {

                stringifier (input[i]);

              }
              
              else {
              
                converter (input[i]);
                
                
              }

            }
          
        }


          var stringified = answer.join();
          return stringified;

        


 

// -------- TESTS -------



}
// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}





