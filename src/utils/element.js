import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';


import {
    Button,
    MessageBox,
    Alert,
    Message,
    Pagination,
    Form,
    FormItem,
    Input
} from 'element-ui';

Vue.use(Button)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)



Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message