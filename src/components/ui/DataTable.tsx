"use client";

import { cn } from "@/lib/utils";

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
}

export function DataTable<T extends { id: string | number }>({ 
  columns, 
  data, 
  onRowClick,
  isLoading 
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-hidden rounded-3xl border border-border bg-card transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-muted/50">
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  className={cn(
                    "px-6 py-4 text-xs font-bold text-muted-foreground uppercase tracking-wider border-b border-border",
                    col.className
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="animate-pulse">
                  {columns.map((_, idx) => (
                    <td key={idx} className="px-6 py-4">
                      <div className="h-4 bg-muted rounded w-3/4" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-muted-foreground">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((item) => (
                <tr 
                  key={item.id} 
                  onClick={() => onRowClick?.(item)}
                  className={cn(
                    "group transition-all duration-200 hover:bg-muted/30 cursor-pointer",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  {columns.map((col, idx) => (
                    <td 
                      key={idx} 
                      className={cn(
                        "px-6 py-4 text-sm text-foreground",
                        col.className
                      )}
                    >
                      {typeof col.accessor === "function" 
                        ? col.accessor(item) 
                        : (item[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
