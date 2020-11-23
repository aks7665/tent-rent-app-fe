import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import { initialize } from 'src/app/store/initialize/initialize.actions';
import { isInitializeLoading } from '../../store/initialize/initialize.selectors';

@Component({
  selector: 'app-initialize',
  templateUrl: './initialize.component.html',
  styleUrls: ['./initialize.component.css']
})
export class InitializeComponent implements OnInit {

  loading = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select(isInitializeLoading).subscribe((status) => {
      this.loading = status;
    });
  }

  onInitialize(): void {
    this.store.dispatch(initialize());
  }

}
