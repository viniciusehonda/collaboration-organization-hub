export interface LoadCompanyList {
    loadAll: () => Promise<LoadCompanyList.Model[]>
  }
  
  export namespace LoadCompanyList {
    export type Model = {
      id: string
      name: string,
      description: string
    }
  }