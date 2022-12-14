import JwtService from '@/services/jwt.service';
// import taskStatuses from '@/common/enums/taskStatuses';
// import timeStatuses from '@/common/enums/timeStatuses';
// import { DAY_IN_MILLISEC } from '@/common/constants';
import axios from '@/plugins/axios';

class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
};

export class ReadOnlyApiService extends BaseApiService {
  #resource;
  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
};

export class CrudApiService extends ReadOnlyApiService {
  #resource;
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  async put(entity) {
    const { data } = await axios.put(
      `${this.#resource}/${entity.id}`,
      entity
    );
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
};

export class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common['Authorization'] = token
      ? `Bearer ${token}`
      : '';
  }

  async login(params) {
    const { data } = await axios.post('login', params);
    return data;
  }

  async logout() {
    const { data } = await axios.delete('logout');
    return data;
  }

  async getMe() {
    const { data } = await axios.get('whoAmI');
    return data;
  }
};

export class OrdersApiService extends ReadOnlyApiService {
  #resource;
  constructor(notifier) {
    super("orders", notifier);
    this.#resource = "orders";
  }

  async post(newOrder) {
    const { data } = await axios.post(this.#resource, newOrder);
    return data;
  }

  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
};
