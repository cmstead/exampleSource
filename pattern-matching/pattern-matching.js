(function () {

    // This is a sketch of a $match higher-order function
    function $match(value) {
        return function (matcher) {
            return matchOn(matcher(pattern));
        };
    }

    // Basic pattern matching
    $match(x)(function (pattern) {
        return [
            [1, 'one'],
            [2, 'two'],
            [3, 'three'],
            [pattern.else(), 'I don\'t know that number']
        ];
    });

    // Common factorial example
    function factorial(n) {
        return $match(n)(function (pattern) {
            return [
                [0, 1],
                [pattern.else(), () => n * factorial(n - 1)]
            ];
        });
    }

    // Complex matching on arrays
    function vectorMatcher(vector) {
        return $match(vector)(function (pattern) {
            [[pattern.number(), 0], 'x'],
            [[0, pattern.number()], 'y'],
            [[pattern.number(), pattern.number()], 'x,y'],
            [pattern.else(), new TypeError('invalid vector')]
        });
    }

    function vectorMatcher(vector) {
        return $match(vector)(function (pattern) {
            [pattern('[<n>, 0]'), 'x'],
            [pattern('[0, <n>]'), 'y'],
            [pattern('[<n>, <n>]'), 'x,y'],
            [pattern.else(), new TypeError('invalid vector')]
        });
    }

    function vectorMatcher(vector) {
        return $match(vector)(function (pattern) {
            [pattern.array([
                pattern.number(),
                pattern.number(0)
            ]), 'x'],
            [pattern.array([
                pattern.number(0),
                pattern.number()
            ]), 'y'],
            [pattern.array([
                pattern.number(),
                pattern.number()
            ]), 'x,y'],
            [pattern.else(), new TypeError('invalid vector')]
        });
    }



    // Constructing an executable pattern AST by hand
    [[pattern.array([
         pattern.string(),
         pattern.any(),
         pattern.string()
     ]), true],
     [pattern.array([
         pattern.number(0),
         pattern.number(1),
         pattern.string('foo')
     ]).rest(), true],
     [pattern.else(), false]]

/*

match(vector) {
    case [1, 2, 3]:
        return 'Low number sequence';
    case [_, _, 0]:
        return '2D vector in 3d plane';
    default:
        return 'I have no idea what you gave me';
}

if([1, 2, 3]) {
    return ;
} else if ([_, _, 0]) {
    return '2D vector in 3d plane';
} else {
    return ;
}

*/

})();