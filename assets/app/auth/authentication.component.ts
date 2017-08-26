import {Component} from "@angular/core";
@Component({
    selector: 'app-authentication',
    template: `
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li routerLinkActive="active" [routerLink]="['signup']"><a>Signup</a></li>
                    <li routerLinkActive="active" [routerLink]="['signin']"><a>Signin</a></li>
                    <li routerLinkActive="active" [routerLink]="['logout']"><a>Logout</a></li>
                </ul>
            </nav>
        </header>
        <div class="row spacing">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AuthenticationComponent {

}