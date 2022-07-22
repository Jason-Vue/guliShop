import { reqMyOrder } from "@/api/index"

const state = {
    myOrder: {}
}

const actions = {
    async getMyOrder({ commit }, paramsObj) {
        const result = await reqMyOrder(paramsObj.page, paramsObj.limit);
        if (result.code == 200) {
            commit("GETMYORDER", result.data)
        }
    }
}

const mutations = {
    GETMYORDER(state, myOrder) {
        state.myOrder = myOrder
    }
}

const getters = {
    // 1.个人购买记录
    records(state) {
        return state.myOrder.records
    }
}

const CenterAbout = {
    state,
    actions,
    mutations,
    getters
}

export default CenterAbout