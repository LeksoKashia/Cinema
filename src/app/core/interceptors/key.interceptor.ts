import { HttpInterceptorFn, HttpParams } from "@angular/common/http";
import { LoaderService } from "../services/loader.service";
import { finalize } from "rxjs/operators";
import { inject } from "@angular/core";

export const KeyInterceptor: HttpInterceptorFn = (req, next) => {
    const loaderService = inject(LoaderService);
    loaderService.show(); 
    
    let newParams = new HttpParams({fromString: req.params.toString()});
    newParams = newParams.append('api_key', '7a5d0f9bed5d907ff9ae138bd5469601');
    
    const requestClone = req.clone({
        params: newParams
    });
    
    return next(requestClone).pipe(
        finalize(() => {
            loaderService.hide();
        })
    );
};
