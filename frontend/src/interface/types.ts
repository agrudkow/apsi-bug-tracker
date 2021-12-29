export interface listA{
    detailsRowList: detailsRow[];
}
export interface detailsRow{
    definition: string;
    description: string;
}

export interface ProblemData {
    Problem_ID: number,
    Username: string,
    Observers: string,
    Problem_type: string,
    Weight: string,
    Urgency: string,
    Product: string,
    Component: string,
    Version: string,
    Keywords: string,
    Description: string,
    Related_problems: string,
    Proposed_deadline: Date,
    Status: string,
    Responsible_person: string
  }