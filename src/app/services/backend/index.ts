import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {ExpressInterceptor} from "./express_interceptor";

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: ExpressInterceptor, multi: true },
];
