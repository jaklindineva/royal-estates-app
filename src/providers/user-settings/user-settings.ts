import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
/*
  Generated class for the UserSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserSettingsProvider {

  constructor(public storage: Storage) {
    console.log('Hello UserSettingsProvider Provider');
  }

   saveEstate(estate, locationId, locationName) {
    let item = { estate: estate, locationId: locationId, locationName: locationName };
    console.log("SAVE");
    console.log(item);
    this.storage.set(estate.id.toString(), JSON.stringify(item));

  }

  removeEstate(team) {
    this.storage.remove(team.id.toString());
  }

  isSavedEstate(teamId) : Promise<boolean> {
    return this.storage.get(teamId.toString()).then(value => value ? true : false);
  }

  getAllSaved() : Promise<any[]> {
    return new Promise(resolve => {
        let results = [];
        this.storage.forEach(data => {
            results.push(JSON.parse(data));
        });
        console.log(results);
        return resolve(results);
    });
}

}
