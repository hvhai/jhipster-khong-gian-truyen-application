import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ILike, Like } from '../like.model';
import { LikeService } from '../service/like.service';

@Injectable({ providedIn: 'root' })
export class LikeRoutingResolveService implements Resolve<ILike> {
  constructor(protected service: LikeService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ILike> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((like: HttpResponse<Like>) => {
          if (like.body) {
            return of(like.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Like());
  }
}
