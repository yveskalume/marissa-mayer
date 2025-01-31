import dayjs from 'dayjs';
import { ICours } from 'app/shared/model/cours.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IEvaluation {
  id?: number;
  commentaire?: string;
  createdAt?: string;
  cours?: ICours;
  user?: IUtilisateur;
}

export const defaultValue: Readonly<IEvaluation> = {};
