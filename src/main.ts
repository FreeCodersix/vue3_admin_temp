import { createApp } from 'vue';
import pinia from '/@/stores/index';
import App from '/@/App.vue';
import router from '/@/router';
import { directive } from '/@/directive/index';
import other from '/@/utils/other';
import ElementPlus from 'element-plus';
import '/@/theme/index.scss';
import i18n from './language/index';
import ViewUiPlus from 'view-ui-plus';
import 'view-ui-plus/dist/styles/viewuiplus.css';
// import './styles/index.less';
import VueLazyLoad from 'vue3-lazyload';
import '/@/views/fabricEditor/assets/fonts/font.css';
const app = createApp(App);

directive(app);
other.elSvg(app);

app.use(pinia).use(router).use(i18n).use(VueLazyLoad, {}).use(ViewUiPlus).use(ElementPlus).mount('#app');
