/**
 * Interface: User  
 */
export interface User {

  //Unique identifier for this user/residency/job listing.
  id: number;

  //Title or description of the residency or role.
  title: string;

  //Salary for the role or residency.
  salary: number;

  //Name of the company offering this role or residency.
  company_name: string;
}
