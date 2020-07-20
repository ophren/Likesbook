

// ECRIRE LA SUPERSTRUCTURE SANS LE CONVERTER, AVEC UN FAUX CONVERTER POUR TESTER LES RECURSIONS
// ENSUITE DEFINIR LES CONVERSIONS

// Returns a stringified version of input,
// behaving in exactly the same way as JSON.stringify()
function stringifier (input) {
         
        var answer = [];

        // If not an array, it's a basic type. No need to call converter via test in that case
        // This if statement is a shortcut
        // CAN BE PLACED IN TEST BEFORE THE FOR LOOP
        if (Array.isArray(input) === false) {

            var res = converter (input);
            return res;
        }

        else {

            test (input);
        }


        //CONVERTER
        // This function converts any type into a string and pushes it to an array
        function converter (part) {

             if (typeof part == "number") {
                var convert_num = part.toString();
                return part.toString();
            }

            if (typeof part == "function" ) {

                //PROBLEME HERE -> returns two results
                //answer.push("null");
                return undefined;

            }

            if (typeof part == "string" && typeof part !== "undefined") {
                 var test = "\"" + part.toString()+ "\"";
                return test;
            }

             
               if (part == null && typeof part !== "undefined") {
                    var conv_null = "null";
                    return conv_null;

                }


                 
        }    

    //can arrays be handled like objects??
    //test -> rename "stringify array"
                  
        //CALLER if array
        //Identifies the dimensions of the array and calls converter with each value of any array
        function test (input) {
            for (var i = 0; i < input.length; i++) {

                  if (Array.isArray(input[i])) {
    //STRINGIFIER REPLACED BY TEST
                    test (input[i]);

                  }
                  
                  else {
                 //insert recursion here

                    var res = converter(input[i]);
                    
                    answer.push(res);

            // THIS IS NO RECURSION!!        
                    
              }

            }
        

          
        } 


          var stringified = answer.join();
         
          //if statement -> if one dimension, if two dimensions, etc.
          return "[" + stringified + "]";

        
// -------- TESTS -------


}
// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}




