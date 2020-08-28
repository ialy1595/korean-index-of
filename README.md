# korean-index-of

This package is helpful when you implement incremental search in Korean. Korean combines all members of a syllable into one letter, it can be a problem in incremental search.

For example, when you type "code", the process"c", "co", "cod" and "
code" are all substring of "code" so we can take it with string match function like `indexOf` or `includes`.

But when you type "코드", the process is "ㅋ", "코", "콛", and "코드", only "코" and "코드" is substring of "코드". For this reason, incremental search with normal string match function provides a poor UX because it repeats whether the results are included or not.

The improved `indexOf` function, `koreanIndexOf` can solve this problem because they can determine that "ㅋ", "코", "콛", and "코드" is substring of "코드".

# installation

Install it from npm.

```
npm install --save korean-index-of
```

# Usage

```
import { koreanIndexOf } from 'korean-index-of';

koreanIndexOf("콛", "내 코드");
/// 2
```

If you want to prototype function of `String` like original `indexOf` function, try using it like this.

```
import { koreanIndexOf } from 'korean-index-of';

String.prototype.kIndexOf = function(query) {
    return koreanIndexOf(query, this);
}

"내 코드".kIndexOf("콛");
/// 2
```

If you want to get all match results, use `koreanAllIndexOf`.It return the result indices in an array. If there is no match result, it return empty array, `[]`.

```
import { koreanAllIndexOf } from 'korean-index-of';

koreanIndexOf("갭", "개와 개불과 개발자 사이의 갭");
/// [3, 7, 15]
```

# Performance

The [Z algorithm](https://www.geeksforgeeks.org/z-algorithm-linear-time-pattern-searching-algorithm/) is used, both `koreanIndexOf` and `koreanAllIndexOf` takes a linear time.

# License

[MIT](https://github.com/ialy1595/korean-index-of/blob/master/LICENSE)
