export const PLAYER = {
  READ: "/player",
  CREATE: "/player",
  READ_REGISTER: "/player/register",
  CREATE_REGISTER: "/player/register",
  UPDATE: "/player",
};

export const ROUND = {
  READ: (number) => `/round/${number}`,
  CREATE: (numberOfRound,numberOfField) => `/round/generate/${numberOfRound}/${numberOfField}`,
};

export const MATCH = {
  UPDATE: "/match",
};

export const RANKING = {
  READ: (rankedType) => `/ranking/${rankedType}`,
  READTYPE: "/ranking/type",
};

export const TOURNAMENT = {
  DELETE: "/tournament",
};
