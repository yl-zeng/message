import { Component } from '@angular/core';
import {Message} from "./messages/message.model";
import {MessageService} from "./messages/message.service";
import {AuthService} from "./auth/auth.service";
import {ErrorService} from "./errors/error.service";

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
})
export class AppComponent {

}
