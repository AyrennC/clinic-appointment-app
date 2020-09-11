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
