import {Routes, RouterModule} from "@angular/router";

import {AuthGuard} from "./lib/guards/auth.guard";
import {GlobalErrorComponent} from "./error/error.component";
import {LoginComponent} from "./components/login/login.component";
import {ViewRulesComponent} from "./components/rules/rules-view.component";
import {CreateRulesComponent} from "./components/rules/rules-create.component";
import {ViewPayloadsComponent} from "./components/payloads/payloads-view.component";
import {CreatePayloadsComponent} from "./components/payloads/payloads-create.component";
import {HierarchicalMapComponent} from "./components/hierarchicalmap/hierarchical-map.component";
import {UpdateRulesComponent} from "./components/rules/rules-update.component";
import {UnAuthorizedComponent} from "./components/unauth/unauth.component";
import {ViewQosComponent} from "./components/payloads/qos-view.component";
import {CreateQosComponent} from "./components/payloads/qos-create.component";
import {EventsSummaryCompoent} from "./components/dashboard/events-summary.component";


const appRoutes: Routes = [
  { path: '', component: ViewRulesComponent, canActivate: [AuthGuard] },
  { path: 'viewRules', component: ViewRulesComponent, canActivate: [AuthGuard] },
  { path: 'createRules', component: CreateRulesComponent, canActivate: [AuthGuard], data: { roles: ['super-admin', 'admin']}},
  { path: 'updateRules', component: UpdateRulesComponent, canActivate: [AuthGuard], data: { roles: ['super-admin', 'admin']}},
  { path: 'viewPayloads', component: ViewPayloadsComponent, canActivate: [AuthGuard]},
  { path: 'uploadPayload', component: CreatePayloadsComponent, canActivate: [AuthGuard], data: { roles: ['super-admin', 'admin']}},
  { path: 'createQos', component: CreateQosComponent, canActivate: [AuthGuard], data: { roles: ['super-admin']}},
  { path: 'viewQos', component: ViewQosComponent, canActivate: [AuthGuard], data: { roles: ['super-admin']}},
  { path: 'hierarchicalMap', component: HierarchicalMapComponent, canActivate: [AuthGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'error', component: GlobalErrorComponent},
  { path: 'temp', component: EventsSummaryCompoent},

  { path: 'unAuthorized', component: UnAuthorizedComponent}
];

export const routing = RouterModule.forRoot(appRoutes);
