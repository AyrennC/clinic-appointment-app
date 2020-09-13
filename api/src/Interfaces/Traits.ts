export interface HasTimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface HasId {
  id: string;
}

export interface HasPassword {
  password: string;
  salt: string;
}

export interface HasClinic {
  clinicId: string;
}

export interface HasFollowUp {
  followUpId: string;
}
