export interface Author {
    numFound: number
    start: number
    numFoundExact: boolean
    docs: Doc[]
  }
  
  export interface Doc {
    key: string
    type: string
    name: string
    alternate_names?: string[]
    top_work: string
    work_count: number
    top_subjects?: string[]
    _version_: number
    date?: string
    birth_date?: string
    death_date?: string
    photoUrl?: string
  }
  