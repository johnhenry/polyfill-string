/*!
 * Polyfill for Strings
 * Copyright(c) 2013 John Henry
 * MIT Licensed
 * Inspired By: http://javascript.crockford.com/remedial.html
 *      
 */

 
(function(global,bindToPrototype){
////////////
//Setup
////////////
    var OBJ = global.String;//The constructor object
    var prototype = global.String.prototype;//The prototype of instances of the constructor object

    //Methodize -- Attaches functions to objects as methods
    //Note:
        //Here, "ConstructorObject.FunctionName(objectInstance,parameters...)" and "objectInstance.functionName(parameters...)" are generally equivalent.
        //This allows for the use of both Object-Oriented and Functional paradigms
        //Being aware of this should make the source code a bit less confusing
    var methodize = function(target,method,method_name,overwrite){
        if(!target[method_name] || overwrite && bindToPrototype !== false)
        target[method_name] = function(){
            return method.apply(this,[this].concat(Array.prototype.slice.call(arguments,0)));
        }
        return target;
    }


////////////
//Prototype Functions
////////////

    //Ententify -- replaces characters within a string ('<','&','>') with their HTML entity equivalents
    //Example
        //console.log("<br />".enentityify()); //#"&lt;br /%gt;"

    var enentityify = OBJ.Enentityify = function(str){
        return str.replace(/&/g, "&amp;").replace(/</g,"&lt;").replace(/>/g, "&gt;");
    }
    methodize(prototype,enentityify,"enentityify");
    //Quote -- properly quotes string and escapes quotes within it.
    //Arguments
        //delimiter:string -- quotes with which to surround the string
    //Example
        //console.log("Hello!".quote()); //#"\"Hello!\""
    var quote = OBJ.Quote = function(str,delimiter){
            var c, i=0, o = '',delimiter = (delimiter === '' || delimiter)? delimiter : '"',m = {'\b':'\\b','\f':'\\f','\n':'\\n','\r':'\\r','\t':'\\t'};
            while (c = str.charAt(i++)) o += (c === delimiter || c === '"')? '\\' : (c >= ' ')? (c === '\\')? '\\' : c : (m.hasOwnProperty(c))? m[c] : '\\u00' + Math.floor(c.charCodeAt() / 16).toString(16) + (c.charCodeAt() % 16).toString(16);
            return delimiter+o+delimiter;
    }
    methodize(prototype,quote,"quote");

    //Supplant -- substitutes values within string for value within a given dictionary
    //Arguments
        //dict:object -- dictionary holding the values with which to supplant
    //Example
        //console.log("Hello {name}!".supplant({"name":"John"})); //#"Hello John!" 
    var supplant = OBJ.Supplant = function(str,dict){
            return str.replace(/\{([^{}]*)\}/g,function (a, b) {return typeof dict[b] === 'string' || typeof dict[b] === 'number'? dict[b] : a })
    }
    methodize(prototype,supplant,"supplant");

    var trim = OBJ.Trim = function(str){
            return str.replace(/^\s*(\S*(?:\s+\S+)*)\s*$/, "$1")
    }
    methodize(prototype,trim,"trim");


})(typeof global === 'undefined'? window : global,true)