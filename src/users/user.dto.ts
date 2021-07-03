import { AutoMap } from '@automapper/classes';

export class UserDto {
  @AutoMap()
  id = -1;

  @AutoMap()
  email = '';

  @AutoMap()
  password = '';

  @AutoMap()
  role = '';
}
