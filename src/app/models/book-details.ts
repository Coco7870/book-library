export interface BookDetail {
    title: string
    subject_places: string[]
    key: string
    authors: Author[]
    subjects: string[]
    type: Type2
    covers: number[]
    latest_revision: number
    revision: number
    created: Created
    last_modified: LastModified
    coverUrl:string;
    first_publish_date:string
  }
  
  export interface Author {
    type: Type
    author: Author2
  }
  
  export interface Type {
    key: string
  }
  
  export interface Author2 {
    key: string
  }
  
  export interface Type2 {
    key: string
  }
  
  export interface Created {
    type: string
    value: string
  }
  
  export interface LastModified {
    type: string
    value: string
  }
  