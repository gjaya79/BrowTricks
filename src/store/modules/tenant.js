import { ajax } from '@/services/ajax.js';
import { TenantService, FormAnswerService } from '@whynotearth/meredith-axios';

const notificationTypes = [
  // {
  //   name: 'Whatsapp',
  //   key: 'phone',
  //   value: 'whatsapp'
  // },
  {
    name: 'Text',
    key: 'phone',
    value: 'text'
  },
  {
    name: 'Email',
    key: 'email',
    value: 'email'
  }
];

const paymentMethods = [
  {
    name: 'Cash',
    id: 'cash'
  }
  // {
  //   name: 'ABA Bank Transfer',
  //   id: 'abaBankTransfer'
  // }
];

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const defaultNotificationTypes = ['email', 'text']; // notificationType values here
const defaultPaymentMethods = ['cash'];
const defaultBusinessHours = days.map(day => {
  return {
    dayOfWeek: day.toLocaleLowerCase(),
    isClosed: false,
    openingTime: '08:00:00',
    closingTime: '18:00:00'
  };
});

const state = {
  businessInfo: {
    name: '',
    email: '',
    phone: '',
    description: '',
    logoUrl: ''
  },
  selectedNotificationType: [...defaultNotificationTypes],
  selectedPaymentMethods: [...defaultPaymentMethods],
  businessHours: [...defaultBusinessHours],
  page: 1,
  // NOTE: this is available notificationTypes
  notificationTypes,
  paymentMethods
};

const getters = {
  getName(state) {
    return state.businessInfo.name;
  },
  getEmail(state) {
    return state.businessInfo.email;
  },
  getPhone(state) {
    return state.businessInfo.phone;
  },
  getDescription(state) {
    return state.businessInfo.description;
  },
  getLogo(state) {
    return state.businessInfo.logoUrl;
  },
  page(state) {
    return state.page;
  },
  getSelectedNotificationTypes(state) {
    return state.selectedNotificationType;
  },
  getSelectedPaymentMethods(state) {
    return state.selectedPaymentMethods;
  },
  getBusinessHours(state) {
    return state.businessHours;
  },
  notificationTypes(state) {
    return state.notificationTypes;
  }
};

const actions = {
  pmuEmptyPreview(context, { params }) {
    // NOTE: this is equal to clinet/pmuEmptyPreview
    return FormAnswerService.preview(params);
  },

  createTenant({ getters }) {
    const registerData = {
      name: getters.getName,
      email: getters.getEmail,
      phone: getters.getPhone,
      description: getters.getDescription,
      notificationTypes: getters.getSelectedNotificationTypes,
      paymentMethodTypes: getters.getSelectedPaymentMethods,
      companySlug: process.env.VUE_APP_COMPANY_SLUG,
      businessHours: getters.getBusinessHours,
      logoUrl: getters.getLogo
    };

    return new Promise((resolve, reject) => {
      // TODO: use meredith-axios
      ajax
        .post(
          `/api/v0/companies/${registerData.companySlug}/tenants`,
          registerData
        )
        .then(
          response => {
            resolve(response.data);
          },
          error => {
            reject(error);
          }
        );
    });
  },
  fetchUserTenants() {
    let companySlug = process.env.VUE_APP_COMPANY_SLUG;
    const params = { companySlug };
    return TenantService.mytenants(params);
  },
  userOwnsTenant(context, tenantSlug) {
    let companySlug = process.env.VUE_APP_COMPANY_SLUG;
    return TenantService.owns({
      companySlug: companySlug,
      tenantSlug: tenantSlug
    });
  },
  fetchUserTenant(context, { params }) {
    let companySlug = process.env.VUE_APP_COMPANY_SLUG;
    let _params = {
      ...params,
      companySlug
    };
    return TenantService.tenants2(_params);
  }
};

const mutations = {
  updateName(state, payload) {
    state.businessInfo.name = payload;
  },
  updateEmail(state, payload) {
    state.businessInfo.email = payload;
  },
  updatePhone(state, payload) {
    state.businessInfo.phone = payload;
  },
  updateDescription(state, payload) {
    state.businessInfo.description = payload;
  },
  updateLogo(state, payload) {
    state.businessInfo.logoUrl = payload;
  },
  pageChange(state, payload) {
    state.page = payload;
  },
  updateSelectedNotificationTypes(state, payload) {
    state.selectedNotificationType = [...payload];
  },
  updateSelectedPaymentMethods(state, payload) {
    state.selectedPaymentMethods = [...payload];
  },
  updateBusinessHours(state, payload) {
    state.businessHours = payload;
  },
  resetCreateTenantForm(state) {
    state.businessInfo.name = '';
    state.businessInfo.email = '';
    state.businessInfo.phone = '';
    state.businessInfo.description = '';
    state.businessInfo.logoUrl = '';
    state.selectedNotificationType = defaultNotificationTypes;
    state.paymentMethodTypes = defaultPaymentMethods;
    state.businessHours = defaultBusinessHours;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
