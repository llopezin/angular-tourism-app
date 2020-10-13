import activity from './activity.model';
import { Education } from './education';
import { Language } from './language';

export default class User {
  id?: number;
  name: string;
  surname: string;
  email: string;
  password: string;
  isAdmin: boolean;
  activitiesEnrolled?: number[];
  dob?: string;
  phone?: number;
  nationality?: string;
  NIF?: number;
  description?: string;
  education?: Education[];
  languages?: Language[];
  companyName?: string;
  companyDescription?: string;
  CIF?: number;
}
