export interface ITodo {
  id: string;
  todo: string;
  readonly?: boolean;
  completed: boolean;
}

export interface TodoProps {
  todo: ITodo
}

