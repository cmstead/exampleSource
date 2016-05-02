(function () {
    function addJS (a, b) {
        return a + b;
    }

    function addTS (a: number, b: number): number{
        return a + b;
    }

    function curriedAddJS (a) {
        return function (b) {
            return a + b;
        };
    }

    /*
    def add(a:Int)(b:Int) = { a + b }
    */
    
    function curriedAddTS (a: number): Function {
        return function (b: number): number {
            return a + b;
        }
    }

    const curriedAdd = signet.enforce('number => number => number', curriedAddJS);

    console.log(curriedAdd.signature); // number => number => number
    console.log(curriedAdd(1).signature); // number => number
})();
