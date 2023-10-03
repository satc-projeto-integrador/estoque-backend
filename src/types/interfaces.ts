export interface Page<T> {
  page: number;
  rpp: number;
  list: Array<T>;
  totalCount: number;
}

export interface AccessTokenPayload {
  usuarioId: number;
}
