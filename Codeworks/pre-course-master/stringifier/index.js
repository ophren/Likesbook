
// Returns a stringified version of input,
// behaving in exactly the same way as JSON.stringify()
function stringifier (input) {

   

}
// Allow tests to run on the server (leave at the bottom)
if (typeof window === 'undefined') {
  module.exports = stringifier;
}




/*
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

*/

