//The worst conditional code I've done ever seen
function initcriteriaAssets() {
    var $this = this,
        dataAssets = null,
        coreData = $this.$scope.coreData,
        criteria = $this.$scope.criteria;

    if (coreData && criteria) {
        dataAssets = coreData.criteriaAssets;
        if (criteria.length > 0 && dataAssets.length > 0) {
            var count = 0,
                callback = function (data) {
                    count--;
                    if (data) {
                        for (var i in dataAssets) {
                            if (dataAssets[i].assetId === data.id) {
                                for (var j in criteria) {
                                    if (criteria[j].criteriaId === dataAssets[i].criteriaId) {
                                        criteria[j].asset = data;

                                        if (data.metaData.recordId) {
                                            criteria[j].showDialog = false;
                                        }
                                        break;
                                    }
                                }
                                break;
                            }
                        }
                    }
                    if (count === 0) {
                        $this.setDataTemplate();
                    }
                };
            for (var k in dataAssets) {
                if (typeof dataAssets[k].assetId !== "undefined") {
                    count++;
                    $this.$dataModel.initById(dataAssets[k].assetId, callback);
                }
            }
        } else {
            $this.setDataTemplate();
        }
    }
}

//multi-layer conditional refactoring
function myFunction(myList, aValue){
    let defaultValue = 'defaultStr',
        newList = [];
    
    if (myList.length > 0) {
        if (aValue !== null) {
            newList = myList.map(value => value + aValue);
        } else {
            newList = myList.map(value => value + defaultValue);
        }
    } else if (aValue !== null) {
        newList.push(aValue);
    } else {
        newList.push(defaultValue);
    }
    
    return newList;
}

function refactoredFunction1(myList, aValue){
    let defaultValue = 'defaultStr',
        newList = [];
    
    if (myList.length > 0 && aValue !== null) {
        newList = myList.map(value => value + aValue);
    } else if (myList.length > 0) {
        newList = myList.map(value => value + defaultValue);
    } else if (aValue !== null) {
        newList.push(aValue);
    } else {
        newList.push(defaultValue);
    }
    
    return newList;
}

function conditionalFactorization(myList, aValue){
    let defaultValue = 'defaultStr',
        newList = [],
        postfix = '';
    
    // aValue comparison to null is a common factor
    // Our conditionals continually switched between aValue and defaultValue
    if (aValue === null) {
        postfix = defaultValue;
    } else {
        postfix = aValue;
    }
    
    if (myList.length > 0) {
        newList = myList.map(value => value + postfix);
    } else {
        newList.push(postfix);
    }
    
    return newList;
}

function refactoredFunction2(myList, aValue){
	let postfix = aValue !== null ? aValue : 'defaultStr',
        newList = [];
	
	if(myList.length > 0){
		newList = myList.map(value => value + postfix);
	} else {
		newList.push(postfix);
	}
    
    return newList;
}