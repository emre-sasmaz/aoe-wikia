export enum AGES {
  ALL = 'All',
  DARK = 'Dark',
  FEUDAL = 'Feudal',
  CASTLE = 'Castle',
  IMPERIAL = 'Imperial',
}

export interface UnitModel {
  id?: number;
  name?: string;
  description?: string;
  expansion?: string;
  age?: AGES;
  cost?: CostModel;
  build_time?: number;
  reload_time?: number;
  attack_delay?: number;
  movement_rate?: number;
  line_of_sight?: number;
  hit_points?: number;
  range?: number;
  attack?: number;
  armor?: string;
  attack_bonus?: string[];
  accuracy?: string;
  blast_radius?: number; search_radius?: number
}

export interface CostModel {
  Food?: number;
  Gold?: number;
  Wood?: number;
}

export interface UnitResponseModel {
  units?: UnitModel[];
}
