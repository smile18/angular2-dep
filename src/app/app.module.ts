import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {ViewRulesComponent} from "./components/rules/rules-view.component";
import {LoginComponent} from "./components/login/login.component";
import {AuthGuard} from "./lib/guards/auth.guard";
import {AlertService} from "./services/alert.service";
import {AuthenticationService} from "./services/authentication.service";
import {routing} from "./app.routes";
import {GlobalErrorComponent} from "./error/error.component";
import {DataTableModule} from "primeng/components/datatable/datatable";
import {AlertComponent} from "./directives/alert.component";
import {ConfirmationService} from "primeng/components/common/api";
import {DialogModule} from "primeng/components/dialog/dialog";
import {ContextMenuModule} from "primeng/components/contextmenu/contextmenu";
import {ConfirmDialogModule} from "primeng/components/confirmdialog/confirmdialog";
import {RulesService} from "./services/rules.service";
import {CreateRulesComponent} from "./components/rules/rules-create.component";
import {ViewPayloadsComponent} from "./components/payloads/payloads-view.component";
import {CreatePayloadsComponent} from "./components/payloads/payloads-create.component";
import {HierarchicalMapComponent} from "./components/hierarchicalmap/hierarchical-map.component";
import {AppGlobals} from "./services/app-globals.service";
import {PanelModule} from "primeng/components/panel/panel";
import {UpdateRulesComponent} from "./components/rules/rules-update.component";
import {UnAuthorizedComponent} from "./components/unauth/unauth.component";
import {SideMenuComponent} from "./components/sidemenu/side-menu.component";
import {PanelMenuModule} from "primeng/components/panelmenu/panelmenu";
import {OverlayPanelModule} from "primeng/components/overlaypanel/overlaypanel";
import {GrowlModule} from "primeng/components/growl/growl";
import {FileUploadModule} from "primeng/components/fileupload/fileupload";
import {PayloadsService} from "./services/payloads.service";
import {ViewQosComponent} from "./components/payloads/qos-view.component";
import {CreateQosComponent} from "./components/payloads/qos-create.component";
import {InputSwitchModule} from "primeng/components/inputswitch/inputswitch";
import {SharedModule} from "primeng/components/common/shared";
import {TreeTableModule} from "primeng/components/treetable/treetable";
import {EventsSummaryCompoent} from "./components/dashboard/events-summary.component";
import {NodeService} from "./components/dashboard/node.service";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    LoginComponent,
    GlobalErrorComponent,
    ViewRulesComponent,
    CreateRulesComponent,
    ViewPayloadsComponent,
    CreatePayloadsComponent,
    HierarchicalMapComponent,
    UpdateRulesComponent,
    UnAuthorizedComponent,
    SideMenuComponent,
    CreateQosComponent,
    ViewQosComponent,
    EventsSummaryCompoent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    DataTableModule,
    DialogModule,
    ConfirmDialogModule,
    ContextMenuModule,
    PanelModule,
    OverlayPanelModule,
    PanelMenuModule,
    GrowlModule,
    FileUploadModule,
    InputSwitchModule,
    TreeTableModule,
    SharedModule
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    RulesService,
    PayloadsService,
    ConfirmationService,
    NodeService,
    AppGlobals
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
