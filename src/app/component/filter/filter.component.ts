import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() searchResName = new EventEmitter<string>();
  @Output() flagBool = new EventEmitter<boolean>();
  @Output() ratingFlagBool = new EventEmitter<boolean>();
  @Output() priceFlagBool = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  onSearch(from: NgForm) {
    const data = from.value;
    this.searchResName.emit(data.resName);
  }

  onVoteSortClick(flag: boolean) {
    this.flagBool.emit(flag);
  }

  onRatingSortClick(flag: boolean) {
    this.ratingFlagBool.emit(flag);
  }

  onPriceSortClick(flag: boolean) {
    this.priceFlagBool.emit(flag);
  }

  toggleChange(event) {
    const toggle = event.source;
    if (toggle) {
      const group = toggle.buttonToggleGroup;
      if (event.value.some((item) => item === toggle.value)) {
        if (toggle.value === 'Like') {
          this.onVoteSortClick(toggle.checked);
          group.value = [toggle.value];
        } else if (toggle.value === 'Rating') {
          this.onRatingSortClick(toggle.checked);
          group.value = [toggle.value];
        } else if (toggle.value === 'Price') {
          const val = toggle.value.checked;
          console.log(val);
          this.onPriceSortClick(toggle.checked);
          group.value = [toggle.value];
        }
      }
    } else {
      this.onVoteSortClick(false);
      this.onRatingSortClick(false);
      this.onPriceSortClick(false);
    }
  }
}
