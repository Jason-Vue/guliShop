import { reqAddressInfo, reqOrderInfo } from "@/api/index";

const state = {
    addressInfo: [],
    orderInfo: {}
};

const mutations = {
    GETADDRESSINFO(state, addressInfo) {
        state.addressInfo = addressInfo
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo
    }
};

const actions = {
    // 1.获取用户地址信息
    async getAddressInfo({ commit }) {
        const result = await reqAddressInfo();
        if (result.code == 200) {
            commit("GETADDRESSINFO", result.data);
        }
    },
    // 2.获取商品清单
    async getOrderInfo({ commit }) {
        const result = await reqOrderInfo()
        if (result.code == 200) {
            commit("GETORDERINFO", result.data)
        }
    }
};

const getters = {};

const TradeAbout = {
    state,
    actions,
    mutations,
    getters,
};

export default TradeAbout;
