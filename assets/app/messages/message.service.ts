import {Message} from "./message.model";
import {Headers, Http} from "@angular/http";
import {EventEmitter, Injectable} from "@angular/core";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";
import {Response} from "@angular/http";
import {ErrorService} from "../errors/error.service";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    messageIsEdit = new EventEmitter<Message>();

    constructor(private http: Http, private errorService: ErrorService) {}

    addMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ?
            '?token=' + localStorage.getItem('token') : '';
        if(token === '') {
            var error: object = {
                title: 'Cannot save message',
                error: {
                    message: 'Please Sign in or Sign up'
                }
            };
            this.errorService.handleError(error);
            return Observable.throw(error);
        }
        return this.http.post('http://localhost:3000/message' + token,body, {headers: headers})
            .map((response: Response) => {
                const result = response.json();
                const message = new Message(result.obj.content,
                                            result.obj.user.firstName,
                                            result.obj._id,
                                            result.obj.user._id);
                this.messages.push(message);
                return message;
            })
            .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json())
                }
            );
    }

    getMessages() {
        return this.http.get('http://localhost:3000/message')
            .map((response: Response) => {
                const messages = response.json().obj;
                var transformedMessages: Message[] = [];
                for(var message of messages) {
                    transformedMessages.push(
                        new Message(message.content,
                                    message.user.firstName,
                                    message._id,
                                    message.user._id)
                                    );
                }
                this.messages = transformedMessages;
                return transformedMessages;
            })
            .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json())
                }
            );
    }

    //pre fill input with message
    editMessage(message: Message) {
        this.messageIsEdit.emit(message);
    }

    updateMessage(message: Message) {
        const body = JSON.stringify(message);
        const headers = new Headers({'Content-Type': 'application/json'});
        const token = localStorage.getItem('token') ?
            '?token=' + localStorage.getItem('token') : '';
        return this.http.patch('http://localhost:3000/message/' + message.messageId + token, body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json())
                }
            );
    }

    deleteMessage(message: Message) {
        this.messages.splice(this.messages.indexOf(message),1);
        const token = localStorage.getItem('token') ?
            '?token=' + localStorage.getItem('token') : '';

        return this.http.delete('http://localhost:3000/message/' + message.messageId + token)
            .map((response: Response) => response.json())
            .catch((error: Response) => {
                    this.errorService.handleError(error.json());
                    return Observable.throw(error.json())
                }
            );
    }
}