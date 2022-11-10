import { AGES, UnitModel } from '../features/units/models/units.models';


export const mockedData: UnitModel[] = [{
  "id": 3,
  "name": "Arbalest",
  "description": "Upgraded crossbowman",
  "expansion": "Age of Kings",
  "age": AGES.IMPERIAL,
  "cost": {
    "Food": 40,
  },
  "build_time": 27,
  "reload_time": 2,
  "attack_delay": 0.35,
  "movement_rate": 0.96,
  "line_of_sight": 7,
  "hit_points": 40,
  "range": 5,
  "attack": 6,
  "armor": "0/0",
  "attack_bonus": [
    "+3 spearmen"
  ]
},
{
  "id": 4,
  "name": "Cavalry Archer",
  "description": "Fast with ranged attack. Ideal for hit-and-run attacks",
  "expansion": "Age of Kings",
  "age": AGES.CASTLE,
  "cost": {
    "Wood": 40,
  },
  "build_time": 34,
  "reload_time": 2,
  "attack_delay": 1,
  "movement_rate": 1.4,
  "line_of_sight": 5,
  "hit_points": 50,
  "range": 4,
  "attack": 6,
  "armor": "0/0",
  "attack_bonus": [
    "+2 spearmen"
  ],
  "search_radius": 6,
  "accuracy": "50%"
},
{
  "id": 5,
  "name": "Heavy Cavalry Archer",
  "description": "Upgraded Cavalry Archer",
  "expansion": "Age of Kings",
  "age": AGES.IMPERIAL,
  "cost": {
    "Gold": 170
  },
  "build_time": 27,
  "reload_time": 2,
  "attack_delay": 1,
  "movement_rate": 1.4,
  "line_of_sight": 6,
  "hit_points": 60,
  "range": 4,
  "attack": 7,
  "armor": "1/0",
  "attack_bonus": [
    "+2 spearmen"
  ],
  "accuracy": "50%"
}]
