export interface ITodoItem {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  priority: number;
}

export interface IUserData {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IUserAddressData;
  phone: string;
  website: string;
  company: IUserCompanyData;
}

export interface IUserAddressData {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

export interface IUserCompanyData {
  name: string;
  catchPhrase: string;
  bs: string;
}
