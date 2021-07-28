import { Component, OnInit } from '@angular/core';
import {Store, select} from "@ngrx/store";
import {selectUser} from "../state";
import {UserState} from "../state/user/user.reducer";
import {faUserEdit} from "@fortawesome/free-solid-svg-icons/faUserEdit";
import {faTwitter, faInstagram, faFacebook, faWhatsapp} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userEdit = faUserEdit
  twitter = faTwitter
  facebook = faFacebook
  instagram = faInstagram
  whatsapp = faWhatsapp
  // @ts-ignore
  user: UserState
  caption = "Your Favourite Books"
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.pipe(select(selectUser)).subscribe(user => this.user = user)
  }

}
