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








String.CHAR_PRINTABLE = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!\"#$%&'()*+,-./:;<=>?[\\]^_{|}~";
    String.CHAR_ALPHA = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    String.CHAR_ALPHALOW = "abcdefghijklmnopqrstuvwxyz";
    String.CHAR_ALPHAUP = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    String.CHAR_NUM = "0123456789";
    String.CHAR_ALHPANUM = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    String.CHAR_ALHPAUPNUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    String.CHAR_ALHPALOWNUM = "abcdefghijklmnopqrstuvwxyz0123456789";
    String.CHAR_SYM = "!\"#$%&'()*+,-./:;<=>?[\\]^_{|}~";

    var deletion = OBJ.Deletion = function(str,n){
        if((0 <= n) && (n < str.length)){
            var a = str.substring(0,n);
            var b = str.substring(n+1);
            return a+b;
        }
    }
    methodize(prototype,deletion,"deletion");
    
    var genDeletions = OBJ.GenDeletions = function(str){
        var a = [];
        for(var i = 0; i < str.length; i++){
            a.push(str.deletion(i));
        }
        return a;
    }
    methodize(prototype,genDeletions,"genDeletions");

    var transposition = OBJ.Transposition = function(str,n){
        if((0 <= n) && (n < str.length-1)){
            var a = str.substring(0,n);
            var c = str[n];
            var b = str[n+1];
            var d = str.substring(n+2);
            return a+b+c+d;
        }
    }
    methodize(prototype,transposition,"transposition");
    var genTranspositions = OBJ.GenTranspositions = function(str){
        var a = [];
        for(var i = 0; i < str.length -1; i++){
            a.push(this.transposition(i));
        }
        return a;
    }
    methodize(prototype,genTranspositions,"genTranspositions");


    var substitution = OBJ.substitution = function(str,n,b,single){
        if(single) b = b[0];
        if((0 <= n) && (n < str.length)){
            var a = str.substring(0,n)
            var c = str.substring(n+1);
            return a+b+c;
        }
    }
    methodize(prototype,substitution,"substitution");
    var genSubstitutions = OBJ.GenSubstitutions = function(str,subStr){
        subStr = subStr || String.CHAR_ALHPANUM;
        subStr = subStr.split("");
        var a = [];
        for(var i = 0; i < str.length; i++){
            for(var j = 0; j < subStr.length; j++){
                if(str[i] !== subStr[j]) a.push(str.substitution(i,subStr[j]));
            }
        }
        return a;
    }
    methodize(prototype,genSubstitutions,"genSubstitutions");
    var insertion = OBJ.Insertion = function(str,n,b,single){
        if(single) b = b[0];
        if((0 <= n) && (n < str.length+1)){
            var a = str.substring(0,n)
            var c = str.substring(n);
            return a+b+c;
        }
    }
    methodize(prototype,insertion,"insertion");

    var genInsertions = OBJ.genInsertions = function(str,subStr){
        subStr = subStr || String.CHAR_ALHPANUM;
        subStr = subStr.split("");
        var a = [];
        for(var i = 0; i < str.length + 1; i++){
            for(var j = 0; j < subStr.length; j++){
                a.push(str.insertion(i,subStr[j]));
            }
        }
        return a;
    }
    methodize(prototype,genInsertions,"genInsertions");

    var genDamerauLevenshtein =  OBJ.GenDamerauLevenshtein = function(str,d,subStr,rd){
        d = d || 1;
        var a = [].concat(
            str.genDeletions(),
            str.genTranspositions(),
            str.genSubstitutions(subStr),
            str.genInsertions(subStr)
            );
        if(d > 1){
            var b = a.concat();
            a.map(function(item){
                var c = item.genDamerauLevenshtein(d - 1, subStr);
                if(rd){
                    for(var i = 0; i < c.length; i++){
                        if(b.indexOf(c[i]) === -1) b.push(c[i]);
                    }
                }else{
                   b = b.concat(c); 
                }
            })
            return b;
        }
        var n = a.indexOf(str);
        if(n > -1) a.splice(n,1);
        return a;
    }
    methodize(prototype,genDamerauLevenshtein,"genDamerauLevenshtein");
})(typeof global === 'undefined'? window : global,true)