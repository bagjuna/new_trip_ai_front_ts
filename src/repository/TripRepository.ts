import HttpRepository from '@/repository/HttpRepository';
import type Login from '@/entity/user/Login';
import { inject, singleton } from 'tsyringe';
import type TripWrite from '@/entity/trip/TripWrite';
import { plainToInstance } from 'class-transformer';
import Trip from '@/entity/trip/Trip';
import Paging from '@/entity/data/Paging';

@singleton()
export default class TripRepository {
  constructor(
    @inject(HttpRepository) private readonly httpRepository: HttpRepository
  ) {}

  public write(request: TripWrite) {
    return this.httpRepository.post({
      path: '/api/trips',
      body: request,
    });
  }

  public get(tripId: number): Promise<Trip> {
    return this.httpRepository
      .get({
        path: `/api/trips/${tripId}`,
      })
      .then((response) => {
        return plainToInstance(Trip, response);
      });
  }

  public getList(page: number): Promise<Paging<Trip>> {
    return this.httpRepository
      .get({
        path: `/api/trips?page=${page}&size=3`,
      })
      .then((response) => {
        const paging = plainToInstance<Paging<Trip>, any>(Paging, response);
        const items = plainToInstance<Trip, any[]>(Trip, response.items);
        paging.setItems(items);
        return paging;
      });
  }
}
