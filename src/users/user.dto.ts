import { AutoMap } from '@automapper/classes';
import { UserRole } from 'src/entity/constans';

export class UserDto {
  @AutoMap()
  id = -1;

  @AutoMap()
  email = '';

  @AutoMap()
  password = '';

  @AutoMap()
  role: UserRole;

  @AutoMap()
  token = '';
}
