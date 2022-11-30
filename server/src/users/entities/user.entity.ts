import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "./userRole.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn('increment')
    id: string;

    @Column({
        length: 20,
        nullable: false,
    })
    username: string;

    @Column({
        nullable: false,
    })
    password: string;
    
    @ManyToOne(() => UserRole, (userRole) => userRole.id)
    roleId: UserRole;

    @Column({
        nullable: false,
        default: true,
    })
    isEnabled: boolean;
    
    @Column()
    fullName: string;
    
    @Column()
    email: string;
}
