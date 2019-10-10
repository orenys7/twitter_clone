import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from './api.service';
import { IProfile } from '../models';
import { map } from 'rxjs/operators';

@Injectable()
export class ProfileService {
  constructor (
    private apiService: ApiService
  ) {}

  get(id: String): Observable<IProfile> {
    return this.apiService.get(`/members/:${id}`)
      .pipe(map((data: {profile: IProfile}) => data.profile));
  }
}
