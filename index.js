const zArray = (query, data) => {
    const mold = `${query}${data}`;

    const Z = [mold.length];
    let l, r;
    l = r = 0;

    for(let i = 1; i < mold.length; i++) {
        if(i > r) {
            l = r = i;
            while(mold[r] === mold[r - l]) r++;
            Z.push(r - l);
            r--;
        }
        else {
            if(Z[i - l] <= r - i) Z.push(Z[i - l]);
            else {
                l = i;
                while(mold[r] === mold[r - l]) r++;
                Z.push(r - l);
                r--;
            }
        }
    }
    return Z.slice(query.length).reduce((a, x, i) => {
        if(x >= query.length) a.push(i);
        return a;
    }, [])
}

const factorization = (c) => {
    const ga = "가".charCodeAt(0);
    const hih = "힣".charCodeAt(0);
    const choseong = [
        "ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", 
        "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const jungseong = [
        ["ㅏ"], ["ㅐ"], ["ㅑ"], ["ㅒ"], ["ㅓ"], ["ㅔ"], ["ㅕ"], ["ㅖ"], ["ㅗ"], 
        ["ㅗ", "ㅏ"], ["ㅗ", "ㅐ"], ["ㅗ", "ㅣ"], ["ㅛ"], ["ㅜ"], ["ㅜ", "ㅓ"], 
        ["ㅜ", "ㅔ"], ["ㅜ", "ㅣ"], ["ㅠ"], ["ㅡ"], ["ㅡ", "ㅣ"], ["ㅣ"]];
    const jongseong = [
        [], ["ㄱ"], ["ㄲ"], ["ㄱ", "ㅅ"], ["ㄴ"], ["ㄴ", "ㅈ"], ["ㄴ", "ㅎ"], 
        ["ㄷ"], ["ㄹ"], ["ㄹ", "ㄱ"], ["ㄹ", "ㅁ"], ["ㄹ", "ㅂ"], ["ㄹ", "ㅅ"], 
        ["ㄹ", "ㅌ"], ["ㄹ", "ㅍ"], ["ㄹ", "ㅎ"], ["ㅁ"], ["ㅂ"], ["ㅂ", "ㅅ"], 
        ["ㅅ"], ["ㅆ"], ["ㅇ"], ["ㅈ"], ["ㅊ"], ["ㅋ"], ["ㅌ"], ["ㅍ"], ["ㅎ"]];

    if(c.charCodeAt(0) < ga || c.charCodeAt(0) > hih) return [c];
    
    const korCode = (c.charCodeAt(0) - ga);
    
    const res = [
        choseong[Math.floor(korCode / (jungseong.length * jongseong.length))],
        ...jungseong[Math.floor((korCode % (jungseong.length * jongseong.length)) / jongseong.length)],
        ...jongseong[korCode % jongseong.length]
    ]
    return res;
}

const expendString = (str) => {
    return str.split('').reduce((a, x, i) => {
        const fac = factorization(x);
        for(let ii = 0; ii < fac.length; ii++) {
            a.str += fac[ii];
            a.idx.push(ii);
            a.org.push(i);
        }
        return a;
    }, {str: "", idx: [], org: []})
}

const onsetString = (str) => {
    return str.split('').map(x => factorization(x)[0]).join('');
}

const koreanAllIndexOf = (query, data) => {
    const expendedQuery = expendString(query);
    const expendedData = expendString(data);
    return zArray(expendedQuery.str, expendedData.str)
           .filter(x => expendedData.idx[x] === 0)
           .map(x => expendedData.org[x]);
}

const koreanIndexOf = (query, data) => {
    const allRes = koreanAllIndexOf(query, data);
    if(allRes.length) return allRes[0];
    return -1;
}

const koreanAllIndexRangeOf = (query, data) => {
    const expendedQuery = expendString(query);
    const expendedData = expendString(data);
    return zArray(expendedQuery.str, expendedData.str)
           .filter(x => expendedData.idx[x] === 0)
           .map(x => [expendedData.org[x], expendedData.org[x + expendedQuery.str.length - 1]]);
}

const koreanIndexRangeOf = (query, data) => {
    const allRes = koreanAllIndexRangeOf(query, data);
    if(allRes.length) return allRes[0];
    return [-1, -1];
}

const koreanAllOnsetIndexOf = (query, data) => {
    const onsetData = onsetString(data);
    return zArray(query, onsetData);
}

const koreanOnsetIndexOf = (query, data) => {
    const allRes = koreanAllOnsetIndexOf(query, data);
    if(allRes.length) return allRes[0];
    return -1;
}

export {
    koreanAllIndexOf, 
    koreanIndexOf, 
    koreanAllIndexRangeOf, 
    koreanIndexRangeOf, 
    koreanAllOnsetIndexOf, 
    koreanOnsetIndexOf,
};