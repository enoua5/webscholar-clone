import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe metadata
 */
@Pipe({
    name: 'grdFilter'
})

/**
 * A pipe used for searching the table of requests
 */
export class GrdFilterPipe implements PipeTransform {
    /**
     * A function used for filtering out data
     * @param items the array to filter
     * @param value search string
     * @returns filtered array based on a string
     */
    transform(items: any[], value: string): any[] {
        if (!items) {
            return [];
        }
        if (!value) {
            return items;
        }

        return items.filter(
            (singleItem) =>
                singleItem['first_name']
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                singleItem['last_name']
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                singleItem['email']
                    .toLowerCase()
                    .includes(value.toLowerCase()) ||
                singleItem['role'].toLowerCase().includes(value.toLowerCase())
        );
    }
}
