# korean-index-of

This package is helpful when you implement incremental search in Korean. Korean combines all members of a syllable into one letter, it can be a problem in incremental search.

For example, when you type "code", the process "c", "co", "cod" and "
code" are all substring of "code" so we can take it with string match function like `indexOf` or `includes`.

But when you type "코드", the process is "ㅋ", "코", "콛", and "코드", only "코" and "코드" is substring of "코드". For this reason, incremental search with normal string match function provides a poor UX because it repeats whether the results are included or not.

The improved `indexOf` function, `koreanIndexOf` can solve this problem because they can determine that "ㅋ", "코", "콛", and "코드" is substring of "코드".

# installation

Install it from npm.

```
npm install --save korean-index-of
```

# Usage

Use it like this, `koreanIndexOf(query, data)`. It returns matching index or `-1` as original `indexOf` function.

```
import { koreanIndexOf } from 'korean-index-of';

koreanIndexOf("콛", "내 코드");
/// 2
```

If you want to get all the matching results at once, use `koreanAllIndexOf`. It returns the result indices in an array. If there is no match result, it returns empty array, `[]`.

```
import { koreanAllIndexOf } from 'korean-index-of';

koreanAllIndexOf("갭", "개와 개불과 개발자 사이의 갭");
/// [3, 7, 15]
```

For some tasks such as highlighting results, matching length will be required. Generally, the length of the match is the same as the length of the query, but it can be different in the case of Korean because we don't know the last letter is onset(초성) or coda(종성). The matching range can be obtained by `koreanIndexRangeOf` and `koreanAllIndexRangeOf` function. The result is given in the form `[matchStartIndex, matchEndIndex]`. If there is no match result in `koreanIndexRangeOf`, it returns `[-1, -1]`.

```
import { koreanIndexRangeOf, koreanAllIndexRangeOf } from 'korean-index-of';

koreanIndexRangeOf("콛", "내 코드");
/// [2, 3]

koreanAllIndexRangeOf("갭", "개와 개불과 개발자 사이의 갭");
/// [[3, 4], [7, 8], [15, 15]]
```

If you want to use those functions in the prototype function of `String` as the original `indexOf` function, try using it like this.

```
import { koreanIndexOf } from 'korean-index-of';

String.prototype.kIndexOf = function(query) {
    return koreanIndexOf(query, this);
}

"내 코드".kIndexOf("콛");
/// 2
```

# Performance

The [Z algorithm](https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/) is used, all functions in this package take a linear time.

# License

[MIT](https://github.com/ialy1595/korean-index-of/blob/master/LICENSE)
