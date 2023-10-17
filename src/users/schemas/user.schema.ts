import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  displayName: string;

  @Prop()
  refreshToken: string;

  @Prop()
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
