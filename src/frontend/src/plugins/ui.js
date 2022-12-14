import Vue from "vue";
import AppLayout from "@/layouts/AppLayout";
import AppNotifications from '@/common/components/AppNotifications'

// import AppModal from '@/common/components/AppModal';
// import AppButton from '@/common/components/AppButton';
import AppInput from '@/common/components/AppInput';
// import AppTextarea from '@/common/components/AppTextarea';
// import AppIcon from '@/common/components/AppIcon';

Vue.component("AppLayout", AppLayout);
Vue.component('AppNotifications', AppNotifications);

// Vue.component('AppModal', AppModal);
// Vue.component('AppButton', AppButton);
Vue.component('AppInput', AppInput);
// Vue.component('AppTextarea', AppTextarea);
// Vue.component('AppIcon', AppIcon);