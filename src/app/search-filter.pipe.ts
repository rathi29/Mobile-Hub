import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {
  transform(mobiles: any[], searchText: string): any[] {
    if (!mobiles) return [];
    if (!searchText) return mobiles;

    searchText = searchText.toLowerCase();

    return mobiles.filter(mobile => {
      return mobile.model.toLowerCase().includes(searchText) ||
             mobile.description.toLowerCase().includes(searchText);
    });
  }
}
