import {Component, OnInit} from "@angular/core";
import {Message} from "./message.model";
import {MessageService} from "./message.service";

@Component({
    selector: 'app-message-list',
    template: `
        <div class="col-md-8 col-md-offset-2">
            <app-message
                [inputMessage]="message" 
                *ngFor="let message of messages">
            </app-message>
        </div>
    `
})
export class MessageListComponent implements OnInit{
    constructor(private messageService: MessageService) {}

    messages: Message[];

    ngOnInit() {
        this.messageService.getMessages()
            .subscribe(
                (messages: Message[]) => {
                    this.messages = messages;
                }
            );
    }
}