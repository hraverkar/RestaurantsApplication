import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import * as _ from 'lodash';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public searchData: string;
  public character: any;
  public results: any;
  public Data: any;
  constructor(
    private dataService: DataService,
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
    private spinner: NgxSpinnerService
  ) {
    iconRegistry.addSvgIcon(
      'laptop',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/laptop.svg')
    );
    iconRegistry.addSvgIcon(
      'food-and-restaurant',
      sanitizer.bypassSecurityTrustResourceUrl(
        '../../assets/food-and-restaurant.svg'
      )
    );
    iconRegistry.addSvgIcon(
      'hand',
      sanitizer.bypassSecurityTrustResourceUrl('../../assets/hand.svg')
    );
  }

  ngOnInit(): void {
    this.spinner.show();
    this.dataService.getRestroAllData().subscribe((res) => {
      this.character = res.body;
      this.formateData(this.character);
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 3000);
    });
  }

  formateData(jsonData) {
    const restoData = new Array<any>();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < jsonData.length; i++) {
      restoData.push({
        restId: jsonData[i]['Restaurant ID'],
        restName: jsonData[i]['Restaurant Name'],
        cuisines: jsonData[i].Cuisines,
        avgCost: jsonData[i]['Average Cost for two'],
        currency: jsonData[i].Currency,
        tableBooking: jsonData[i]['Has Table booking'],
        onlineDelivery: jsonData[i]['Has Online delivery'],
        agRating: jsonData[i]['Aggregate rating'],
        ratingColor: jsonData[i]['Rating color'],
        ratingText: jsonData[i]['Rating text'],
        restVote: jsonData[i].Votes,
      });
    }
    this.Data = restoData;
  }

  searchName(message: string) {
    if (message.length > 0) {
      this.searchData = message;
      const result = this.Data.filter((x) => {
        return x.restName === message;
      });
      this.Data = result;
    }
  }

  sortLike(flag: boolean) {
    let sortedByLikeDesc;
    if (flag) {
      sortedByLikeDesc = _.sortBy(this.Data, 'restVote').reverse();
    } else {
      sortedByLikeDesc = _.sortBy(this.Data, 'restVote');
    }
    this.Data = sortedByLikeDesc;
  }

  sortRating(flag: boolean) {
    let sortedByRatingDesc;
    if (flag) {
      sortedByRatingDesc = _.sortBy(this.Data, 'agRating').reverse();
    } else {
      sortedByRatingDesc = _.sortBy(this.Data, 'agRating');
    }
    this.Data = sortedByRatingDesc;
  }

  sortPrice(flag: boolean) {
    let sortedByPriceDesc;
    if (flag) {
      sortedByPriceDesc = _.sortBy(this.Data, 'avgCost').reverse();
    } else {
      sortedByPriceDesc = _.sortBy(this.Data, 'avgCost');
    }
    this.Data = sortedByPriceDesc;
  }
}
