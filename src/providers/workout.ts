interface IWorkout {
  lifts: ILift[];
  totalVolume: number;
}

interface ILift {
  name: string;
  sets: ISet[];
  liftVolume: number;
}


interface ISet {
  reps: number;
  weight: number;
  volume: number;
}

export class Set implements ISet {
  reps: number;
  weight: number;

  constructor(reps, weight) {
    this.reps = reps;
    this.weight = weight;
  }

  get volume () {
    return this.reps * this.weight;
  }
}


export class Lift implements ILift {
  name: string;
  sets: Set[];
  reps: number;
  weight: number;

  constructor(lift: string, sets: Set[] = []) {
    this.name = lift;
    this.sets = [];

    if (sets.length) {
      for (let set of sets) {
        set = new Set(set.reps, set.weight);
        this.addSet(set);
      }
    }
  }

  addSet(set: Set) {
    this.sets.push(set);
  }

  get liftVolume() {
    return this.sets.reduce((volume, set) => volume += set.volume, 0);
  }
}

export class Workout implements IWorkout {
  lifts: Lift[];

  constructor(lifts: Lift[] = [] ) {
    this.lifts = [];
    if (lifts.length) {
      for (let lift of lifts) {
        lift = new Lift(lift.name, lift.sets);
        this.addLift(lift);
      }
    }
  }

  addLift(lift: Lift) {
    this.lifts.push(lift);
  }

  get totalVolume() {
    return this.lifts.reduce((volume, lift) => volume += lift.liftVolume, 0);
  }
}

