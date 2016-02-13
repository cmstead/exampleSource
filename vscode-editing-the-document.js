(function () {
    'use strict';

    function positionFactory(line, char) {
        return new vscode.Position(line, char);
    }

    function rangeFactory(start, end) {
        return new vscode.Range(start, end);
    }

    function textEditFactory(range, content) {
        return new vscode.TextEdit(range, content);
    }

    function workspaceEditFactory() {
        return new vscode.WorkspaceEdit();
    }

    function editFactory (coords, content){
        var start = positionFactory(coords.start.line, coords.start.char);
        var end = positionFactory(coords.end.line, coords.end.char);
        var range = rangeFactory(start, end);
        
        return textEditFactory(range, content);
    }

    function setEditFactory(uri, coords, content) {
        var workspaceEdit = workspaceEditFactory();
        var edit = editFactory(coords, content);

        workspaceEdit.set(uri, [edit]);
        return workspaceEdit;
    }

    function getDocument (vsEditor){
        return vsEditor._document === undefined ? vsEditor._documentData : vsEditor._document;
    }

    function applyEdit (vsEditor, coords, content){
        var vsDocument = getDocument(vsEditor);
        var edit = setEditFactory(vsDocument._uri, coords, content);
        vscode.workspace.applyEdit(edit);
    }

})();