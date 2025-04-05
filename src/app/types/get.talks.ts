export interface GetTalks {
  id: number
  name: string
  speakerDNI: string
}
export interface GetQuestions {
  id: number;
  question:string;
  talk: GetTalks;
  user: User;
}
export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  age: number;
  school: string;
  instagram: string;
  birthday: Date;
  documentNumber: string;
  password: string;
  groupId: number | null;
}