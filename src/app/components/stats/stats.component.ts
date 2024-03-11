// In stats.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CoffeeService, Coworker } from '../../services/coffee.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  @Input() coworkers: Coworker[] = [];
  averagePaid: number = 0;

  constructor(private coffeeService: CoffeeService) {}

  ngOnInit() {
    this.averagePaid = this.coffeeService.averagePaid;
  }
}
