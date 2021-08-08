import 'date-wizard';

declare module 'date-wizard' {
  // Module's Are Merged Here.
  export const pad: (num: number) => string;
  export interface DateDetails {
    hours: number
    minutes: number
    seconds: number
  }
}
