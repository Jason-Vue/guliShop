import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';


import {
    Button,
    MessageBox,
    Alert,
    Message
} from 'element-ui';

Vue.use(Button)

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message=Message