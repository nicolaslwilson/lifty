import { Component, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Content } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthenticatorService } from "../../../providers/authenticator";
import { Loader } from '../../../providers/loader';
import { User } from "../../../providers/user";
import { Set, Lift, Workout} from '../../../providers/workout';
import { Subscription } from "rxjs/Subscription";
import * as firebase from 'firebase';

@Component({
  selector: 'page-workout',
  templateUrl: 'workout.page.html'
})
export class WorkoutPage {
  @ViewChild(Content) content: Content;

  userDetails: User;
  chatControl: any;

  workouts: FirebaseListObservable<any[]>;
  subscription: Subscription;
  workout: Workout;

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private loader: Loader,
    private formBuilder: FormBuilder,
    private authenticatorService: AuthenticatorService
  ) {
    this.workouts = <FirebaseListObservable<any>> db.list('workouts', {
      query: { limitToLast: 1, orderByKey: true }
    });
    this.workout = new Workout();
    let lifts = 'bench squat dead press'.split(' ') ;
    for (let liftString of lifts) {
      let lift = new Lift(liftString);
      lift.reps = 5;
      lift.weight = 315;
      this.workout.addLift(lift);
    }

  }

  addSet(lift) {
    let set = new Set(lift.reps, lift.weight);
    lift.addSet(set);
  }

  inputReps(lift, reps){
    lift.reps = reps;
  }

  inputWeight(lift, weight) {
    lift.weight = weight;
  }

  sendWorkout() {
    console.debug("sending workout to firebase! " + this.constructor.name);
    this.db.list('/workouts')
    .push({
      fullName: this.userDetails.fullName,
      provider: this.userDetails.provider,
      avatar: this.userDetails.avatar,
      userUid: this.userDetails.uid,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
      workout: this.workout
    });
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {

  }

  ionViewWillLoad() {
    this.chatControl = this.formBuilder.group({
      message: ['', Validators.required]
    });
    this.userDetails = new User(this.authenticatorService.getUser().uid);
  }

  ionViewWillUnload() {
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.pop();
  }
}
