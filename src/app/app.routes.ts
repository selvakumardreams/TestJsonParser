import { AppComponent } from './app.component';
import { ReportComponent } from './report/report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const ROUTES: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'report', component: ReportComponent },
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            ROUTES,
            {
                enableTracing: true
            }
        )],
    exports: [RouterModule]
})
export class AppRoutingModule { }
