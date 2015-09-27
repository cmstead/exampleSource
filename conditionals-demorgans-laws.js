if((Boolean(valueList) && (externalValue && (dataValueA || dataValueB))) || (Boolean(valueList) && !externalValue)){
    //Functionality went here.
}

if(Boolean(valueList) && ((externalValue && (dataValueA || dataValueB))) || !externalValue){
    //Functionality went here.
}

if(Boolean(valueList) && ((!externalValue || externalValue) && (!externalValue || (dataValueA || dataValueB)))){
    //Functionality went here.
}

if(Boolean(valueList) && (!externalValue || dataValueA || dataValueB)){
    //Functionality went here.
}

if(valueA || valueB){
    //Do one thing
} else {
    //Do another
}

//Reversal

if(!(valueA || valueB)){
    //Do another
} else {
    //Do one thing
}

//Distribute

if(!valueA && !valueB){
    //Do another
} else {
    //Do one thing
}