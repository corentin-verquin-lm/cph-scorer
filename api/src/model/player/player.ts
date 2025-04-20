export class Player {
  public id: uuid;

  public firstName: string;

  public lastName: string;

  public register: boolean;

  constructor(props?: Partial<Player>) {
    if (props !== null) Object.assign(this, props);
  }
}
