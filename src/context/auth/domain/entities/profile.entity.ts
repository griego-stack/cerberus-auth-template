export interface IUserProfile {
  user_id: number;
  firstname: string;
  lastname: string;
  profileImage: string;
  dateOfBirth: Date;
}

export type CreateUserProfileDTO = IUserProfile;

export class UserProfileEntity implements IUserProfile {
  user_id: number;
  firstname: string;
  lastname: string;
  profileImage: string;
  dateOfBirth: Date;

  constructor(attrs: IUserProfile) {
    this.user_id = attrs.user_id;
    this.firstname = attrs.firstname;
    this.lastname = attrs.lastname;
    this.profileImage = attrs.profileImage;
    this.dateOfBirth = attrs.dateOfBirth;
  }

  static create(attrs: CreateUserProfileDTO) {
    return new UserProfileEntity(attrs);
  }
}
