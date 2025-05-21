import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from "rxjs";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

    token = localStorage.getItem('token');

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        const modifiedreq = req.clone({
            setHeaders: {
                'client_id': 'xzXNJFzxNtMvyLIFXCUL1005',
                'Authorization': `${this.token}`
            }
        })


        return next.handle(modifiedreq).pipe(tap((event) => {
            if (event.type === HttpEventType.Response) {
                console.log(event);
            }
        }));
    }
}