import {
  AllowNull,
  AutoIncrement,
  Column,
  NotEmpty,
  PrimaryKey,
  Table,
  Model,
  HasMany,
} from "sequelize-typescript";
import Tweet from "./Tweet";

@Table({
  tableName: "users",
  timestamps: true,
})
export default class User extends Model<User> {
  @AutoIncrement
  @PrimaryKey
  @Column
  public id!: number;

  @AllowNull(false)
  @NotEmpty
  @Column
  public first_name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  public last_name!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  public dob!: Date;

  @AllowNull(false)
  @NotEmpty
  @Column
  public username!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  public password!: string;

  @AllowNull(true)
  @Column
  public profile_image_url?: string;

  @AllowNull(true)
  @Column
  public background_image_url?: string;

  @AllowNull(true)
  @Column
  public bio?: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  public email!: string;

  @AllowNull(false)
  @NotEmpty
  @Column
  public createdAt!: Date;

  @AllowNull(false)
  @NotEmpty
  @Column
  public updatedAt!: Date;

  @HasMany(() => Tweet)
  public tweets!: Tweet[];
}
