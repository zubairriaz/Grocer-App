export enum Role {
  None = 'none',
  Clerk = 'clerk',
  Cashier = 'cashier',
  Manager = 'manager',
}

export interface IUser {
  _id: string
  name: IName
  email: string
  role: Role | string
  picture: string
  dateOfBirth?: Date | null | string
  userStatus?: boolean
  level?: number
  address?: IAddress
  phones?: IPhone[]
  readonly fullName?: string
}

export interface IName {
  firstName: string
  lastName: string
  middle?: string
}
export interface IAddress {
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
}

export interface IPhone {
  type: PhoneType
  digits: string
  id: number
}

export enum PhoneType {
  None = 'none',
  Mobile = 'mobile',
  Home = 'home',
  Work = 'work',
}

export enum AuthMode {
  InMemeory = 'InMemeory',
  CustomServer = 'CustomServer',
  Firebase = 'FireBase',
}
