export interface listA{
    detailsRowList: detailsRow[];
}
export interface detailsRow{
    definition: string;
    description: string;
}

export interface ProblemData {
    problemID: number,
    username: string,
    observers: string,
    problemType: string,
    weight: string,
    urgency: string,
    product: string,
    component: string,
    version: string,
    keywords: string,
    description: string,
    relatedProblems: string,
    proposedDeadline: Date,
    status: string,
    responsiblePerson: string
  }

  export interface NewProblemData {
    username: string|null,
    observers: string,
    problemType: string,
    weight: string,
    urgency: string,
    product: string,
    component: string,
    version: string,
    keywords: string,
    description: string,
    relatedProblems: string,
    proposedDeadline: Date | null,
    status: string,
    responsiblePerson: string
  }
