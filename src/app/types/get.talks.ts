export interface GetTalks {
  id: number
  name: string
  speakerDNI: string
}
export interface GetQuestions {
  id: number;
  question:string;
  talk: GetTalks;
}