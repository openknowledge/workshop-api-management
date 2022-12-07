export interface NewCustomer {
  name: string;
}

export interface CustomerWrapper extends SimpleCustomerData {
  get(): Promise<Customer>;

  setBillingAddress(address: Address): Promise<Customer>;

  setDeliveryAddress(address: Address): Promise<Customer>;
}

export interface SimpleCustomerData {
  number: string;

  name: string;
}

export interface CustomerData extends SimpleCustomerData {
  billingAddress: Address;

  deliveryAddress: Address;
}

export interface Customer extends CustomerWrapper, CustomerData {}

export interface Address {
  recipient: string;

  street: {
    name: string;
    number: string;
  };

  city: string;
}

export const CustomerApi = {
  async getAllCustomer(): Promise<CustomerWrapper[]> {
    const response = await fetch("http://localhost:4000/customers");

    const simpleCustomers = (await response.json()) as SimpleCustomerData[];

    return simpleCustomers.map((simpleCustomer) => {
      return {
        name: simpleCustomer.name,

        number: simpleCustomer.number,

        async setBillingAddress(address) {
          return setBillingAddress(simpleCustomer.number, address);
        },

        async setDeliveryAddress(address) {
          return setDeliveryAddress(simpleCustomer.number, address);
        },

        get() {
          return getCustomerViaUrl(buildCustomerUrl(simpleCustomer.number));
        },
      };
    });
  },

  async getCustomer(customerNumber: string): Promise<Customer> {
    return getCustomerViaUrl(buildCustomerUrl(customerNumber));
  },

  async createCustomer(newCustomer: NewCustomer): Promise<CustomerWrapper> {
    const response = await fetch("http://localhost:4000/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCustomer),
    });

    if (response.status !== 201) {
      throw new Error("Failed to create user");
    }

    const customerUrl = response.headers.get("Location");

    if (customerUrl === null) {
      throw new Error("Failed to create user");
    }

    const customerNumber =
      customerUrl.split("/")[customerUrl.split("/").length - 1];

    return {
      name: newCustomer.name,

      number: customerNumber,

      async setBillingAddress(address) {
        return setBillingAddress(customerNumber, address);
      },

      async setDeliveryAddress(address) {
        return setDeliveryAddress(customerNumber, address);
      },

      get() {
        return getCustomerViaUrl(customerUrl);
      },
    };
  },
};

const buildCustomerUrl = (customerNumber: string): string => {
  return `http://localhost:4000/customers/${customerNumber}`;
};

const setBillingAddress = async (customerNumber: string, address: Address) => {
  const response = await fetch(
    `http://localhost:4000/customers/${customerNumber}/billing-address`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    }
  );

  if (response.status !== 204) {
    throw new Error("Failed to set billing address");
  }

  return getCustomerViaUrl(buildCustomerUrl(customerNumber));
};

const setDeliveryAddress = async (customerNumber: string, address: Address) => {
  const response = await fetch(
    `http://localhost:4000/customers/${customerNumber}/delivery-address`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(address),
    }
  );

  console.log(response);

  if (response.status !== 204) {
    throw new Error("Failed to set delivery address");
  }

  return getCustomerViaUrl(buildCustomerUrl(customerNumber));
};

const getCustomerViaUrl = async (customerUrl: string): Promise<Customer> => {
  const response = await fetch(customerUrl);

  if (response.status !== 200) {
    throw new Error("Failed to get user");
  }

  const customerData = (await response.json()) as CustomerData;

  return {
    number: customerData.number,

    name: customerData.name,

    billingAddress: customerData.billingAddress,

    deliveryAddress: customerData.deliveryAddress,

    async get() {
      return getCustomerViaUrl(customerUrl);
    },

    async setBillingAddress(address) {
      return setBillingAddress(customerData.number, address);
    },

    async setDeliveryAddress(address) {
      return setDeliveryAddress(customerData.number, address);
    },
  };
};
