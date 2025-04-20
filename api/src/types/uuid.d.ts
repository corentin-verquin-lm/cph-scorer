declare type uuid = `${string}-${string}-${string}-${string}-${string}`;

declare type teamMate = Record<uuid, uuid[]>;

declare type tournament = Array<Array<[teamOne: uuid[], teamTwo: uuid[]]>>;
