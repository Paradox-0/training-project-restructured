import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProfilePageComponent } from './components/profile-page/profile-page.component';

import { BarChartComponent } from './components/dashboard/bar-chart/bar-chart.component';
import { NgChartsModule } from 'ng2-charts';
import { RenderTableComponent } from './components/dashboard/render-table/render-table.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    ProfilePageComponent,
    DashboardComponent,
    BarChartComponent,
    RenderTableComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule
  ]
})
export class HomeModule { }
