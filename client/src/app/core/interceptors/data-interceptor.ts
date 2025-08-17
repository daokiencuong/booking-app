import { HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { RestResponse } from '../../model/response/common/rest-response.model';

export function DataInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  return next(req).pipe(
    map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        const body = event.body as RestResponse<any>;

        // nếu body có status + data => chỉ trả về data
        if (body && 'status' in body && 'data' in body) {
          return event.clone({ body: body.data });
        }
      }
      return event;
    })
  );
}
