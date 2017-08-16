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
import { WorkoutPage } from '../workout/workout.page';

@Component({
  selector: 'page-home',
  templateUrl: 'home.page.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;

  userDetails: User;
  chatControl: any;

  workoutSessions: FirebaseListObservable<any[]>;
  subscription: Subscription;
  message: string = '';

  constructor(
    public navCtrl: NavController,
    public db: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    private loader: Loader,
    private formBuilder: FormBuilder,
    private authenticatorService: AuthenticatorService
  ) {



  }

  newWorkout() {
    this.navCtrl.push(WorkoutPage);
  }

  ionViewDidLoad() {
    this.subscription = this.workoutSessions.subscribe();
  }

  ionViewWillLoad() {
    this.userDetails = new User(this.authenticatorService.getUser().uid);
    this.workoutSessions = <FirebaseListObservable<any>> this.db.list('workouts', {
      query: { limitToLast: 5, orderByChild: 'userUid', equalTo: this.userDetails.uid }
    })
      .map((response) => {
        console.log(response);
        return response
          .map((session)=>{
            session.workout = new Workout (session.workout.lifts);
            return session;
          })
          .sort((a,b) => a.timestamp - b.timestamp)
          .reverse();
      });
  }

  ionViewWillUnload() {
    this.subscription.unsubscribe();
  }

  logout() {
    this.afAuth.auth.signOut();
    this.navCtrl.pop();
  }
}
