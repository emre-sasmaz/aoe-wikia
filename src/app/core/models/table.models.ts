export interface TableColumns<T> {
  key: keyof T;
  header: string;
}
