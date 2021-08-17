import { IAddress, IName, IPhone, IUser, Role } from '../interfaces/auth'

export class User implements IUser {
  constructor(
    public _id = '',
    public email = '',
    public name = { firstName: '', lastName: '', middle: '' } as IName,
    public role = '',
    public picture = '',
    public dateOfBirth = null,
    public userStatus = false,
    public level = 0,
    public address = { line1: '', city: '', state: '', zip: '' } as IAddress,
    public phones: IPhone[] = []
  ) {}

  static Build(user: IUser) {
    console.log(user)
    if (!user) {
      return new User()
    }
    if (typeof user.dateOfBirth == 'string') {
      user.dateOfBirth = new Date(user.dateOfBirth)
    }

    return new User(
      user._id,
      user.email,
      user.name,
      user.role,
      user.picture,
      user.dateOfBirth,
      user.userStatus,
      user.level,
      user.address,
      user.phones
    )
  }
  public fullName = this.getFullName()
  public getFullName(): string {
    if (!this.name) {
      return ''
    } else if (this.name.middle) {
      return `${this.name.firstName} ${this.name.middle} ${this.name.lastName}`
    } else {
      return `${this.name.firstName} ${this.name.lastName}`
    }
  }

  toJSON(): object {
    let obj = Object.assign(this)
    delete obj._id
    delete obj.fullName
    return obj
  }
}
