function searchTree(rootNode, predicate){
    let children = Boolean(rootNode.children) ? rootNode.children : [],
        childCount = children.length,
        found = predicate(rootNode) ? rootNode : null;

    for(let i = 0; i < childCount; i++){
        if(predicate(children[i])){
            found = children[i];
        } else {
			found = searchTree(children[i]);
		}
    }

    return found;
}
