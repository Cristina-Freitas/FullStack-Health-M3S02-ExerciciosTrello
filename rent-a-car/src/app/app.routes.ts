import { Routes } from '@angular/router';
import { CarListComponent } from './pages/car-list/car-list.component';
import { CarDetailComponent } from './pages/car-detail/car-detail.component';

export const routes: Routes = [
    {
        path: "",
        redirectTo: "/car/list",
        pathMatch: "full"
    },
    {
        path: "car",
        children: [
            { path: "list",component: CarListComponent },
            { path: ":id", component: CarDetailComponent },
        ],
    },
];
