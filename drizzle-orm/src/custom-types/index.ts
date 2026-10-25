import { SQL, sql } from 'drizzle-orm/sql';

export interface CustomTypeConfig<TData = any, TDriverParam = any> {
  dataType: (customData?: any) => string;
  toDriver: (val: TData) => TDriverParam;
  fromDriver: (val: TDriverParam) => TData;
  /**
   * Optional SQL wrapper function applied whenever the column is selected.
   * Enables custom SQL functions like `ST_AsGeoJSON(column)` or `fn(column)`.
   */
  sqlWrap?: (columnSql: SQL) => SQL;
}

export function applyColumnWrapper(columnSql: SQL, config?: CustomTypeConfig): SQL {
  if (config && typeof config.sqlWrap === 'function') {
    return config.sqlWrap(columnSql);
  }
  return columnSql;
}