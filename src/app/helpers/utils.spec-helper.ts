
export function getElement(element: Element, query: string): HTMLElement[] {
  return Array.from(element.querySelectorAll(query));
}

export function getTableHeaderRow(element: Element): HTMLElement[] {
  return getElement(element, '.mat-header-row')
}

export function getTableRows(element: Element): HTMLElement[] {
  return getElement(element, '.mat-row')
}

export function getTableHeaderCells(headerRow: Element): HTMLElement[] {
  return getElement(headerRow, '.mat-header-cell')
}


