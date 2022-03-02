export interface User {
  id: string;
  city: string;
  company: string;
  country: string;
  firstName: string;
  lastName: string;
  organizationType: string;
  phone: string;
  state: string;
  zipCode: string;
  disclaimerAccepted: boolean;
  languageCode: string;
  emailAddress: string;
  registered?: boolean;
  projectIds?: string[];
}
