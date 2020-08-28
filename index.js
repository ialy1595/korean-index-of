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