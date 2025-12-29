const ExistInWatchlist = (items = [], coin) => {
    
    if (!Array.isArray(items)) return false;

    for(let item of items) {
        if(item?.id === coin?.id) return true;
    }
    return false;
}

export default ExistInWatchlist