/**
 * Interface: Company
 * 
 * This interface defines the structure of a Company object.
 */
export interface Company {
   // A unique identifier for the company.
  id: number;

   //The display name of the companys
  name: string;

   //The number of candidates this company can accept for residencies
  capacity: number;

  // Boolean flag indicating whether the company has submitted its rankings.
  hasRanked: boolean;
}
