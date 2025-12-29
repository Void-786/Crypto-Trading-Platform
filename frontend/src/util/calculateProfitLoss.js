const calculateProfitLoss = (order) => {

    if(order && order.orderItem?.buyPrice && order.orderItem?.sellPrice) {
        const buyPrice = Number(order.orderItem.buyPrice);
        const sellPrice = Number(order.orderItem.sellPrice);
        
        return sellPrice - buyPrice;
    }
    return 0;
}

export default calculateProfitLoss