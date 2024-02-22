export interface ProductEntity {
  id: number;
  name: string;
  price: number;
  description: string;
  delivery_hour: {
    start: string;
    end: string;
  };
  image_url: string;
  created_at: Date;
  updated_at: Date;
}
