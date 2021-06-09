import { MovieContract } from '../../../../../core/api/services/api-movies/contracts/movie.contract';
import { MovieModel } from '../models/movie.model';
import { ACTORS } from '../../../../../shared/constants/db.constants';


export class MoviesTranslator {

  static translateContractToModel(contract: MovieContract): MovieModel {
    let model: MovieModel = { ...contract };
    // TODO: Remove - temporal fake data
    model = this.hydrateActors(model);
    return model;
  }

  static translateModelToContract(model: MovieModel): MovieContract {
    model = this.deHydrateActors(model);
    let contract: MovieContract = { ...model };
    // TODO: Remove - temporal fake data
    contract = this.deHydrateActors(contract);
    return model;
  }

  static hydrateActors(movie: MovieModel): MovieModel {
    const actors: any[] = ACTORS;
    movie.actors = (movie?.actors?.length) ? movie.actors.map((id: number) => actors.find((actor: any) => actor.id === id)) : [];
    return movie;
  }

  static deHydrateActors(movie: MovieModel): MovieModel {
    movie.actors = (movie?.actors?.length) ? movie.actors.map((actor: any) => actor.id) : [];
    return movie;
  }

}
