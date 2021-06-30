import {Component, OnInit} from '@angular/core';
import {faTwitter, faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";
import {faAngleDoubleRight} from "@fortawesome/free-solid-svg-icons/faAngleDoubleRight";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  public twitter = faTwitter
  public facebook = faFacebook
  public instagram = faInstagram
  public angleDoubleRight = faAngleDoubleRight
  constructor() { }

  ngOnInit(): void {
  }

}
