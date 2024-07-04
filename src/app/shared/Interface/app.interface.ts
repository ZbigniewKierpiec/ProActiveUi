// Define interface for a Gridster item Dashboard Component
export interface GridsterItem {
  id: number;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rows: number;
  cols: number;
  hasHeader: boolean;
}
// Define interface for chart menu items
export interface ChartMenuItems {
  name: string;
}

// Interfaces defining the structure of Country, Profile, and Notification objects in Header Component

export interface Country {
  id: number;
  name: string;
  flag: string;
  lang:string;
}
export interface Profile {
[x: string]: any;
  icon: string;
  name: string;
  inbox: boolean;
}

export interface Notification {
  id: number;
  name: string;
  message: string;
  date: Date;
}

// Define the interface for the Link object Side-menu
export interface Link {
  id: number;
  icon: string;
  name: string;
}
