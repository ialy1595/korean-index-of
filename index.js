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