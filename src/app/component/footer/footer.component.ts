import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public credit: string;
  public language: string;
  constructor() {}

  ngOnInit(): void {
    this.credit = ' Design By : Harshal Raverkar with ';
    this.language = 'Angular';
  }
}
