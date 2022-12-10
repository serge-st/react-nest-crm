import { RouteType } from "src/app.service";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column("text", {array: true, default: []})
    forbiddenRoutes: RouteType[];
}