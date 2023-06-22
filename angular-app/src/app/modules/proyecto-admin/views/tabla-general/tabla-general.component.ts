import { Component } from '@angular/core';
import { GeneralInfo } from '../../types/types';
import { MiscServiceService } from '../../services/misc-service.service';

@Component({
  selector: 'app-tabla-general',
  templateUrl: './tabla-general.component.html',
  styleUrls: ['./tabla-general.component.scss'],
})
export class TablaGeneralComponent {
  values: GeneralInfo[] = [];
  constructor(private miscService: MiscServiceService) {
    this.getGeneral();
  }

  getGeneral() {
    this.miscService.getGeneral().subscribe(values => {
      this.values = values;
    });
  }
}
