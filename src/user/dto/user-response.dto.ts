import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ description: 'The name of the user' })
  name: string;

  @ApiProperty({ description: 'The email of the user' })
  email: string;

  @ApiProperty({ description: 'The JWT token' })
  token: string;

  @ApiProperty({ description: 'The creation date of the user' })
  createdAt: Date;
}