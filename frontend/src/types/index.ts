export interface Item {
  id: string;
  name: string;
  price: number;
  category: string;
  type: string;
  imageUrl: string;
  stock: number;
}

export interface PlacedItem extends Item {
  instanceId: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
}
