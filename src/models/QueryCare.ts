export interface BodyType {
  id?: string;
  de?: string;
  kw?: string;
  os?: string;
  ra?: string;
  rt?: string;
  rl?: string;
  ac?: string;
  dt?: string;
  sq?: string;
  rd?: string;
}

export interface ResponseQueryCre {
  ac: string;
  dt: string;
  de: string;
  kw: string;
  os: string;
  ra: string;
  rt: string;
  rl: string;
  rc: string;
  rd: string;
  sq: string;
  note: string;
  color: string;
  id: string;
}

export interface Field {
  title: string;
  data: string;
  update: (value: string) => void;
}
