const isEmpty = (obj) => {
    if (obj === undefined) {
        return true;
    }
    if (obj == null) {
        return true;
    }
    return Object.keys(obj).length === 0;
}

export { isEmpty };